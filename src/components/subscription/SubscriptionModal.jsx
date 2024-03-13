import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const fetures = ["Prioritized rankings in conversations and search",
  "See approximately twice as many tweets between ads in your for you and following timeline.",
  "Add bold and italic text in your Tweets.",
  "Post longer videos and 1080p video uploads.",
  "All the existing blue features, including Edit Tweet Bookmark Followers and early access to new features."];

export default function SubscriptionModal({handleClose, open}) {
  


  const [plan, setPlan] = React.useState("Annually");

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mt-0 flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg">
                <h1 className="text-xl pr-5">
                  Blue subscribers with a verified phone number will get a blue
                  check mark once approved.
                </h1>
                <img
                  className="w-10 h-10  rounded-full"
                  src="https://th.bing.com/th?id=OIP.zzdXx52JYg2RMC-mRK4PtAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                  alt=""
                />
              </div>
              <div className="flex justify-between border rounded-full px-5 py-3 border-gray-500">
                <div>
                  <span
                    onClick={() => setPlan("Annually")}
                    className={`${
                      plan === "Annually" ? "text-black" : "text-gray-400"
                    }cursor-pointer`}
                  >
                    Annually
                  </span>{" "}
                  <span className="text-green-500 text-sm ml-5">Save 12%</span>
                </div>
                <p
                  onClick={() => setPlan("monthly")}
                  className={`${
                    plan === "monthly" ? "text-black" : "text-gray-400"
                  }cursor-pointer`}
                >
                  Monthly
                </p>
              </div>
              <div className="space-y-3">
                {fetures.map((item) => (
                  <div key={item} className="flex items-center space-x-5">
                    <FiberManualRecordIcon
                      sx={{ width: "7px", height: "7px" }}
                    />
                    <p className="text-xs">{item}</p>
                    <p></p>
                  </div>
                ))}
              </div>
              <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
                <span className="line-through italic">₹7,800.00</span>
                <span className="px-5">₹6,800/year</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
