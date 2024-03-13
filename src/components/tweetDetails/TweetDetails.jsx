import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TweetCard from "../homeSection/TweetCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findTweetsById } from "../../store/tweet/Action";

const TweetDetails = () => {
    const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();
  const { id } = useParams()
  const {tweet} = useSelector((store)=>store)
  useEffect(() => {
    if (id) {
      dispatch(findTweetsById(id))
    }
  },[])
  return (
    <React.Fragment>
      <section className={`bg-white z-50 flex items-center top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Tweet</h1>
          </section>
          <section>
        <TweetCard item={ tweet.tweet} />
              <Divider sx={{margin:"2rem 0rem"}} />
          </section>
          <section>
        {tweet.tweet?.replyTweets.map((item) => <TweetCard key={item} item={ item} />)}
          </section>
    </React.Fragment>
  );
}

export default TweetDetails