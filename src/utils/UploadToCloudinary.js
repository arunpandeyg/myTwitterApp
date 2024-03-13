export const uploadToCloudinary = async(pics) => {
    if (pics) {
        const data = new FormData();
        data.append("file", pics)
        data.append("upload_preset", "my_twitter");
        data.append("cloud_name", "dfziunsus");

        const res = await fetch("https://api.cloudinary.com/v1_1/dfziunsus/image/upload", {
            method: "post",
            body:data
        });
        const fileData = await res.json();
        return fileData.url.toString();
    }
    else {
        console.log("error form upload function")
    }
}