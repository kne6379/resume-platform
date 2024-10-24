import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../configs/s3.config.js";
import { S3_BUCKET_NAME } from "../constants/env.constants.js";

// multer와 multerS3를 사용하여 파일 업로드 설정을 정의
const upload = multer({
  // S3 스토리지 설정을 사용하여 파일을 S3에 업로드
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET_NAME, // 업로드할 S3 버킷 이름 설정
    key: function (req, file, cb) {
      // S3에 저장될 객체의 키를 설정. 파일 이름이 고유해야 하므로 랜덤 숫자와 현재 시간을 조합하여 중복을 방지.
      // file.originalname.split(".").pop()은 파일의 확장자를 가져옴
      cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
});
// 단일 파일 업로드 미들웨어로 사용하기 위한 설정 ("profileUrl" 필드에서 파일을 업로드)
const uploadSingleFile = upload.single("profileUrl");

export { uploadSingleFile };
