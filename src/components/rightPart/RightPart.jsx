import React from 'react'
import  SearchIcon  from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from '../subscription/SubscriptionModal';

const RightPart = () => {

  const [openSubscriptionModal, setOpenSubscriptionModal] = React.useState(false);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

    const handleChangeTheme = () => {
        console.log("Handle Change Theme");
    }
  return (
    <div className="py-5 sticky top">
      <div className="relative flex items-center">
        <input
          type="text "
          className="py-3 rounded-full text-gray-500 w-full pl-12"
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        <BrightnessMediumIcon
          className="ml-3 cursor-pointer"
          onClick={handleChangeTheme}
        />
      </div>
      <section className="my-5">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
        <Button
          variant="contained"
          sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
          onClick={handleOpenSubscriptionModal}
        >
          Get Verified
        </Button>
      </section>
      <section className="mt-7 space-y-5">
        <h1 className="font-bold text-xl py-1">What&apos;s happening</h1>
        <div>
          <p className="text-sm">FIFA women&apos;s World Cup . Live</p>
          <p className="font-bold">Our History Is Of Lord Ram</p>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <p>Entertainment . Trending </p>
            <p className="font-bold">#TheMarvels</p>
            <p>34.3K Tweets</p>
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between w-full">
            <div>
              <p>Democratic dakaiti . live </p>
              <p className="font-bold">#Shri Ram Mandir</p>
            </div>
            <MoreHorizIcon />
          </div>
        ))}
      </section>
      <section>
        <SubscriptionModal open={ openSubscriptionModal} handleClose={handleCloseSubscriptionModal} />
      </section>
    </div>
  );
}

export default RightPart