import { Module } from "@nestjs/common";
import { DocumentController } from "./controller";
import { DocumentService } from "./service";
import { DocumentHelperService } from "./service-helper";
import { S3Module } from "../s3/module";

@Module({
    controllers: [DocumentController],
    providers: [DocumentService, DocumentHelperService],
    imports: [S3Module],
    exports: [DocumentService, DocumentHelperService]
})

export class DocumentModule{}