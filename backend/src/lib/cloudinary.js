import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;





// CLOUDINARY_CLOUD_NAME=divyesh032040
// CLOUDINARY_API_KEY=337844172419829
// CLOUDINARY_API_SECRET=_Bct0dtf8tzoik1bkFLJbQ0OF2s