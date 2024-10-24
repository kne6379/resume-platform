import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../configs/s3.config.js";
import { S3_BUCKET_NAME } from "../constants/env.constants.js";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET_NAME, // 객체를 업로드할 버킷 이름
    key: function (req, file, cb) {
      // 객체의 키로 고유한 식별자 이기 때문에 겹치면 안됨
      cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
});

const uploadSingleFile = upload.single("profileUrl");

export { uploadSingleFile };
