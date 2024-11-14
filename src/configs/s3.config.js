import AWS from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../constants/env.constants.js";

// AWS SDK에서 제공하는 S3 서비스를 사용하기 위해 S3 인스턴스를 생성
const s3 = new AWS.S3({
  // S3 리소스가 위치한 리전 설정
  region: AWS_REGION,
  // S3에 접근하기 위한 자격 증명 설정
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export { s3 };
