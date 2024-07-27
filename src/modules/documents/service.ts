import { Injectable } from "@nestjs/common";
import { IUploadDocument } from "./interfaces/upload-document.interface";
import { S3Service } from "../s3/service";

const prefix = '[DOCUMENT_SERVICE]'

@Injectable()
export class DocumentService {
    constructor(
        private readonly s3Service: S3Service
    ) {

    }

    async uploadDocument(body: IUploadDocument) {
        try {
            console.log(`${prefix} (uploadDocument) uploading document with payload: ${JSON.stringify(body)}`);
            const res = await this.s3Service.uploadDocumentToS3({bucket: "hr-policy-user", key: "1.txt", body: "hello_world"});

            return res;
        } catch (error) {
            console.log(`${prefix} (uploadDocument) Error in uploading file: ${JSON.stringify(error)}`);
            throw error;
        }
    }
}