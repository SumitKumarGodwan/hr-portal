import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const prefix = '[S3_SERVICE]'
@Injectable()
export class S3Service {
    constructor() {

    }

    async uploadDocumentToS3({bucket, key, body}: {bucket: string, key: string, body: any}) {
        try {
            const s3Client = new S3Client({
                region: 'ap-south-1', // e.g., 'us-west-2'
                credentials: {
                    accessKeyId: '',
                    secretAccessKey: '',
                },
            });

            const uploadParams = {
                Bucket: bucket,
                Key: key, // The name of the file in the bucket
                Body:body,
            };

            const command = new PutObjectCommand(uploadParams);

            const response = await s3Client.send(command);

            console.log(`${prefix} (uploadDocumentToS3) file uploading successful in s3: ${JSON.stringify(response)}`);
        } catch (error) {
            console.log(`${prefix} (uploadDocumentToS3) uploading file to s3 Failed: ${JSON.stringify(error)}`);
            throw error;
        }
    }
}