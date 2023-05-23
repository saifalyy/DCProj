'use client';
import SideBar from "../components/SideBar"
import Widgets from "../components/Widgets"
import ProfileHeader from "../components/Profile/ProfileHeader"
import ProfileTweets from "../components/Profile/ProfileTweets"
import { TwitterContext, TwitterProvider } from "../context/TwitterContext";
import {useContext} from "react"

const style = {
    wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
    content: `max-w-[1400px] w-2/3 flex space-between`,
    mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
  }
  
  const profile = () => {
    const {currentUser, currentAccount} = useContext(TwitterContext)
    return (
      <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <SideBar initialSelectedIcon={'Profile'} />
          <div className={style.mainContent}>
            <ProfileHeader/>
            <ProfileTweets/>
          </div>
          <Widgets />
        </div>
      </div>
      </>
    )
  }

export default profile