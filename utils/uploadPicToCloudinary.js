import axios from "axios";

const uploadPic = async media => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "doal1hg4");
    form.append("cloud_name", "diutgjcc8");
    form.append("public_id", "sample_image");

    form.append("api_key",'654831925494494');
    console.log("uploadPicToCloudinary.js: form:", form);
    const res = await axios.post("https://api.cloudinary.com/v1_1/diutgjcc8/auto/upload", form);
    // const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.secure_url;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default uploadPic;
