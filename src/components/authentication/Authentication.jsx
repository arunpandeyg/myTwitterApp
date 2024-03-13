import React, { useState } from 'react'
import { Grid, Button } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';
import AuthModal from './AuthModel';


const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const handleOpenAuthModel = () => setOpenAuthModel(true);
  const handleCloseAuthModel = () => setOpenAuthModel(false);
  return (
    <div>
      <Grid className="overflow-y-hidden " container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://deadline.com/wp-content/uploads/2023/07/x-twitter-logo.jpg?w=1024"
            alt=""
          />
          <div className="absolute top-[26%] left-[19%]">
            <svg
              height="300"
              width="300"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </Grid>
        <Grid className="px-10" lg={5} xs={12}>
          <h1 className="mt-10 font-bold text-5xl">Happening now</h1>
          <h1 className="font-bold text-3xl py-16">Join today.</h1>
          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin width={330} />

              <p className="py-5 text-center">OR</p>
              <Button
                onClick={handleOpenAuthModel}
                fullWidth
                variant="contained"
                size="large"
                sx={{ borderRadius: "29px", py: "7px" }}
              >
                 Create Account
              </Button>
              <p className="text-sm mt-2">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>
            <div className="mt-10">
              <h1 className=" font-bold text-xl mb-5">
                Already have an account?
              </h1>
              <Button
                onClick={handleOpenAuthModel}
                fullWidth
                variant="outlined"
                size="large"
                sx={{ borderRadius: "29px", py: "7px" }}
              >
                 Sign In
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
}

export default Authentication