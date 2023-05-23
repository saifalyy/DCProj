import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { client } from "../lib/client"

export const TwitterContext = createContext();

export const TwitterProvider = ({ children }) => {
  const router = useRouter()
  const [tweets, setTweets] = useState([])
  const [appStatus, setAppStatus] = useState('notConnected');
  const [currentAccount, setCurrentAccount] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    checkWalletConnected();
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus == 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchTweets()
  }, [currentAccount, appStatus])



  const checkWalletConnected = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts'
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      }
      else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectToWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')
      const addressArray = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
        setAppStatus('connected')
      }
      else {
        router.push('/')
        setAppStatus('notConnected')
      }

    } catch (error) {
      console.log(error)
    }
  }

  const createUserAccount = async (userAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    
    try {
      const userDoc = {
        _type: 'users',
        _id: userAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage:'',
        walletAddress: userAddress,
      }

      await client.createIfNotExists(userDoc)

      setAppStatus('connected')
    } catch (error) {
      console.log(error)
      router.push('/')
      setAppStatus('error')
    }
  }

  const getProfileImageUrl = async (imageUri, isNft) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`
    } else {
      return imageUri
    }
  }

  const fetchTweets = async () => {
    const query = `
          *[_type == "tweets"]{
            "author": author->{name, walletAddress, profileImage, isProfileImageNft},
            tweet,
            timestamp
          }|order(timestamp desc)
        `

    // setTweets(await client.fetch(query))

    const sanityResponse = await client.fetch(query)

    setTweets([])

    /**
     * Async await not available with for..of loops.
     */
    sanityResponse.forEach(async item => {
      const profileImageUrl = await getProfileImageUrl(
        item.author.profileImage,
        item.author.isProfileImageNft,
      )

      if (item.author.isProfileImageNft) {
        const newItem = {
          tweet: item.tweet,
          timestamp: item.timestamp,
          author: {
            name: item.author.name,
            walletAddress: item.author.walletAddress,
            profileImage: profileImageUrl,
            isProfileImageNft: item.author.isProfileImageNft,
          },
        }

        setTweets(prevState => [...prevState, newItem])
      } else {
        setTweets(prevState => [...prevState, item])
      }
    })
  }

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
          *[_type == "users" && _id == "${userAccount}"]{
            "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
            name,
            profileImage,
            isProfileImageNft,
            coverImage,
            walletAddress
          }
        `
    const response = await client.fetch(query)



    setCurrentUser({
      tweets: response[0].tweets,
      name: response[0].name,
      profileImage: response[0].profileImage,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    })
  }

  return (
    <TwitterContext.Provider value={{ appStatus, currentAccount, connectToWallet, fetchTweets, tweets, currentUser, getCurrentUserDetails }}>
      {children}
    </TwitterContext.Provider>
  )
}