import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "portfolio",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            return reject(error);
          }
          resolve(result.secure_url);
        },
      )
      .end(fileBuffer);
  });
};

export const deleteImage = async (url) => {
  try {
    // Extract public ID from URL
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/portfolio/public_id.ext
    const urlParts = url.split("/");
    const filename = urlParts[urlParts.length - 1]; // Get filename with extension
    const publicId = filename.split(".")[0]; // Remove extension
    const fullPublicId = `portfolio/${publicId}`;

    await cloudinary.uploader.destroy(fullPublicId);
  } catch (error) {
    throw new Error("Image deletion failed: " + error.message);
  }
};
