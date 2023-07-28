import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);

  data.append("upload_preset", "doal1hg4");
  data.append("cloud_name", "diutgjcc8");
  data.append("public_id", "sample_image");

  data.append("api_key",'654831925494494');

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/diutgjcc8/auto/upload", data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
