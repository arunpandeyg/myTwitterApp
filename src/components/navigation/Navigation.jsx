import React from "react";

import { navigationMenu } from "../navigation/NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/Action";


const Navigation = () => {
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()

const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout")
    handleClose()
    dispatch(logout())
    
}

  return (
    <div className=" h-screen sticky top-0">
      <div>
        <div className="py-5 ">
          <svg
            height="30"
            width="30"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr
            r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"
          >
            <g>
              {" "}
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99
              21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084
              4.126H5.117z"
              ></path>
            </g>
          </svg>
        </div>

        <div className="nav-items space-y-3">
          {navigationMenu.map((item) => (
            <div
              key={item}
              className="flex cursor-pointer  space-x-3 items-center"
              onClick={() =>
                item.title === "profile"
                  ? navigate(`/profile/${auth.user?.id}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="py-5">
          <Button
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#1d9bfe",
            }}
            variant="contained"
          >
            Tweet
          </Button>
        </div>
      </div>
      <div className="flex item-center justify-between">
        <div className="flex items-center space-x-3 ">
          <Avatar
            alt="username"
            src="https://th.bing.com/th/id/OIP.n6BW-VFjho3h1Nhhi_wjjgHaIn?w=194&h=220&c=7&r=0&o=5&dpr=1.5&pid=1.7"
          />

          <p>{auth.user?.fullName}</p>
          <span className="opacity-70">
            @{auth.user.fullName.split(" ").join("_").toLowerCase()}
          </span>
        </div>

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
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
