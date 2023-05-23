import { useContext, useEffect } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import TweetBox from './TweetBox'
import Post from "../Post"
import { BsStars } from 'react-icons/bs'



const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] `,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const Feed = () => {
    const {tweets} = useContext(TwitterContext)
    // const tweets = [
    //     {
    //         displayName: "Saif Ali",
    //         userName: "2x000ABH&90jhda00000xx0000CD",
    //         avatar: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png',
    //         text: "gm",
    //         isProfileNFT: false,
    //         timeStamp : "2020-06-01T12:00:00.000Z",
    //     },
    //     {
    //         displayName: "Saif Ali",
    //         userName: "2x000ABH&90jhda00000xx0000CD",
    //         avatar: "",
    //         text: "gm",
    //         isProfileNFT: false,
    //         timeStamp : "2020-06-01T12:00:00.000Z"
    //     },
    //     {
    //         displayName: "Saif Ali",
    //         userName: "2x000ABH&90jhda00000xx0000CD",
    //         avatar: "",
    //         text: "gm",
    //         isProfileNFT: false,
    //         timeStamp : "2020-06-01T12:00:00.000Z"
    //     }
    // ]
  return (
    <div className={style.wrapper}>
        <div className={style.header}>
            <div className={style.headerTitle}>Home</div>
            <BsStars></BsStars>
        </div>
        <TweetBox></TweetBox>
        {
            tweets.map((tweet,index)=>(
                <Post
                key={index}
                displayName={
                    tweet.author.name === 'Unnamed'
              ? `${tweet.author.walletAddress.slice(
                  0,
                  4,
                )}...${tweet.author.walletAddress.slice(41)}`
              : tweet.author.name
                }
                userName={`${tweet.author.walletAddress.slice(
                    0,
                    4,
                  )}...${tweet.author.walletAddress.slice(41)}`}
                avatar={tweet.author.profileImage}
                text={tweet.tweet}
                isProfileNFT={tweet.author.isProfileNFT}
                timeStamp={tweet.timeStamp}
                ></Post>
            ))
        }
    </div>
  )
}

export default Feed