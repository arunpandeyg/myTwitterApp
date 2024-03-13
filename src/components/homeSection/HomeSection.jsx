import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweet,  getAllTweets } from "../../store/tweet/Action";
import { uploadToCloudinary } from "../../utils/UploadToCloudinary";


const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});
const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { tweet } = useSelector((store) => store);
  console.log("tweet", tweet)

  const handleSubmit = (values, actions) => {
    dispatch(createTweet(values))
    actions.resetForm()
    console.log("values", values);
    setSelectedImage("")
  };

  useEffect(() => {
  dispatch(getAllTweets())
  },[tweet.like, tweet.retweet])

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isTweet:true
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async(event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0])
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <>
      <div className="space-y-5">
        <section>
          <h1 className="py-5 text-xl font-bold opacity-90 text-center text-gray-500">
            Home
          </h1>
        </section>
        <section className={`pb-10`}>
          <div className="flex space-x-5">
            <Avatar
              alt="username"
              src="https://th.bing.com/th/id/OIP.9r9wwcUYUzDLJOQ2r04l2AHaHa?pid=ImgDet&w=196&h=196&c=7&dpr=1.5"
            />
            <div className="w-full">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="content"
                    placeholder="What is happening"
                    className={`boarder-none outline-none text-xl bg-transparent`}
                    {...formik.getFieldProps("content")}
                  />
                  {formik.errors.content && formik.touched.content && (
                    <span className="text-red-500">
                      {formik.errors.content}
                    </span>
                  )}
                </div>
                {/* <div>
                              <img src="" alt="" />
                          </div> */}
                <div className="flex justify-between items-center mt-5">
                  <div className="flex space-x-5 items-center">
                    {/* <label className="flex items-center space-x-2 rounded-md cursor-pointer"> */}
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                    {/* </label> */}
                    <FmdGoodIcon className="text-[#1d9bf0]" />
                    <TagFacesIcon className="text-[#1d9bf0]" />
                    {/* </div>
                <div> */}
                    <Button
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        paddingY: "8px",
                        paddingX: "20px",
                        bgcolor: "#1d9bfe",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      Tweet
                    </Button>
                  </div>
                </div>
              </form>
              <div>{selectedImage && <img src={selectedImage} alt="" />}</div>
            </div>
          </div>
        </section>
        <section>
          {tweet.tweets?.map((item) => <TweetCard key={item} item={item} />)}
        </section>
      </div>
    </>
  );
};

export default HomeSection;
