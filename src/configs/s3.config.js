import AWS from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../constants/env.constants";

const s3 = new AWS.S3({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});

const upload = multer({
	storage: multerS3({
		s3,
		bucket
	})
})
export { s3 };