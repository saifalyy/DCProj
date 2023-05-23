import Post from "../Post"
import { useContext } from "react"
import { TwitterContext } from "@/app/context/TwitterContext"


// const tweets = [
//   {
//       displayName: "Saif Ali",
//       userName: "2x000ABH&90jhda00000xx0000CD",
//       avatar: "",
//       text: "gm",
//       isProfileNFT: false,
//       timeStamp : "2020-06-01T12:00:00.000Z",
//   },
//   {
//       displayName: "Saif Ali",
//       userName: "2x000ABH&90jhda00000xx0000CD",
//       avatar: "",
//       text: "gm",
//       isProfileNFT: false,
//       timeStamp : "2020-06-01T12:00:00.000Z"
//   },
//   {
//       displayName: "Saif Ali",
//       userName: "2x000ABH&90jhda00000xx0000CD",
//       avatar: "",
//       text: "gm",
//       isProfileNFT: false,
//       timeStamp : "2020-06-01T12:00:00.000Z"
//   }
// ]

const ProfileTweets = () => {
  const {currentUser, currentAccount, tweets} = useContext(TwitterContext)
  return (
    <div>
      {     
            
            currentUser.tweets?.map((tweet,index)=>(
                <Post
                key={index}
                displayName={currentUser.name === "Unnamed" 
                ? `${tweet.author.walletAddress.slice(0,4)}...${tweet.author.walletAddress.slice(-4)}` :
                currentUser.name
              }
                userName={`${currentAccount.slice(0,4)}...${currentAccount.slice(-4)}`}
                avatar={currentUser.profileImage}
                text={tweet.tweet}
                isProfileNFT={currentUser.isProfileNFT}
                timeStamp={tweet.timeStamp}
                ></Post>
            ))
        }
    </div>
  )
}

export default ProfileTweets