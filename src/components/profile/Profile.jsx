import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TweetCard from "../../components/homeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUser } from "../../store/auth/Action";

import { getUsersTweet } from "../../store/tweet/Action";


const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();

  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const {auth, tweets } = useSelector((store) => store);
  const dispatch = useDispatch();
  const {id} = useParams();

  const handleBack = () => navigate(-1);

  // const handleOpenProfileModel = () => {
  //     console.log("Handle Open Profile Model")
  //   }

  const handleFollowUser = () => {
    dispatch(followUser(id))
      console.log("Handle Follow User")
    }
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    if (newValue === 4) {
      console.log("Like's Tweet's")
    }
    else if (newValue === 1) {
      console.log("User's Tweet's")
    }
  }
  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersTweet(id))
    },[id])

  return (
    <div>
      <section className={`bg-white z-50 flex items-center top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{auth.findUser.user?.fullName}</h1>
      </section>
      <section>
        <img
          className="w-[100%] h[15rem] object-cover"
          src="https://cdn.pixabay.com/photo/2023/11/13/03/07/pond-8384421_1280.jpg"
          alt=""
        />
      </section>
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            src={auth.findUser.user?.image || "https://www.ruchiskitchen.com/wp-content/uploads/2014/06/Lord-shree-ram.jpg"}
            alt="Arun Pandey"
            sx={{
              width: "10rem",
              height: "10rem",
              border: "4px solid white rounded",
            }}
          />
          {auth.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              
              Edit Profile
            </Button>
          ) : (
            <Button
              onclick={handleFollowUser}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              
              {auth.findUser?.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser.user?.fullName}</h1>
            {true && (
              <img
                className="ml-2 w-5 h-5"
                src="https://th.bing.com/th/id/OIP.1hR1iUxiaDcnMV1aixXnvwAAAA?rs=1&pid=ImgDetMain"
                alt=""
              />
            )}
          </div>
          <h1 className="text-gray-500">@{auth.findUser.user?.fullName.split(" ").join("_").toLowerCase()}</h1>
        </div>
        <div className="mt-2 mb-2 space-y-3">
          <p>{auth.findUser.user?.bio || "Hello it's Arun Pandey's Twitter project"}</p>
          <div className="py-1 flex space-x-5">
            <div className="mt-0 flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>
            <div className="mt-0 flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">{auth.findUser.user?.location || "Bharat"}</p>
            </div>
            <div className="mt-0 flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined Feb 2024</p>
            </div>
          </div>
          <div className=" flex items-center space-x-5">
            <div className="mt-0 flex items-center space-x-1 font-semibold">
              <span>{auth.findUser.user?.followings.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="mt-0 flex items-center space-x-1 font-semibold">
              <span>{auth.findUser.user?.followers.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box className="pl-2" sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">{tweets.tweets?.map((item) => <TweetCard item={item} />)}</TabPanel>
            <TabPanel value="2">Replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModal handleClose={handleClose} open={openProfileModal}/>
      </section>
    </div>
  );
};

export default Profile;
