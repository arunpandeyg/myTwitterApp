import React, {useState} from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Button, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReplyModal from "./ReplyModal";
import { useDispatch } from "react-redux";
import { createRetweet, likeTweet } from "../../store/tweet/Action";

const TweetCard = ({item}) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [openReplyModal, setOpenReplyModal] = useState(false);
  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTweet = () => {
    console.log("Delete tweet");
    handleClose();
  };

  

  const handleCreateRetweet = () => {
    dispatch(createRetweet(item?.id))
    console.log("Handle Create Retweet");
  };

  const handleLikeTweet = () => {
    dispatch(likeTweet(item?.id))
    console.log("Handle Like tweet");
  };

  return (
    <React.Fragment>
      {/* <div className="flex items-center font-semibold text-gray-700 py-2">
              <RepeatIcon />
              <p>Retweet</p>
          </div> */}
      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          className="cursor-pointer"
          alt="username"
          src= "https://www.ruchiskitchen.com/wp-content/uploads/2014/06/Lord-shree-ram.jpg"
        />
        <div className=" w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className=" text-gray-600">@{item?.user?.fullName.split(" ").join("_").toLowerCase()}</span>
              <img
                className="ml-2 w-5 h-5"
                src="https://th.bing.com/th/id/OIP.1hR1iUxiaDcnMV1aixXnvwAAAA?rs=1&pid=ImgDetMain"
                alt=""
              />
            </div>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2">
            <div onClick={() => navigate(`/tweet/${item?.id}`)}
              className="cursor-pointer">
              <p className="mb-2 p-0">{item?.content}</p>
              <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                // src="https://p7.hiclipart.com/preview/7/618/505/avatar-icon-fashion-men-vector-avatar.jpg"
                src={item?.image}
                alt=""
              />
            </div>
            <div className="mt-1 flex justify-between items-center ">
              <div className="mt-1 space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>
              <div
                className={`${
                  item?.retweet ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-start`}
              >
                <RepeatIcon
                  onClick={handleCreateRetweet}
                  className="cursor-pointer"
                />
                <p>{ item?.totalRetweets}</p>
              </div>
              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-start`}
              >
                {item?.liked ? (
                  <FavoriteOutlinedIcon
                    onClick={handleLikeTweet}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteIcon
                    onClick={handleLikeTweet}
                    className="cursor-pointer"
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>
              <div className="mt-1 space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>500</p>
              </div>
              <div className="mt-1 space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <ReplyModal item{...item} open={openReplyModal} handleClose={handleCloseReplyModal} />
      </section>
    </React.Fragment>
  );
};

export default TweetCard;
