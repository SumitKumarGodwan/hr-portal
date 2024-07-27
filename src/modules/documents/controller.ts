import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { DocumentService } from "./service";
import { AuthGuard } from "src/common/guard/authguard";
import { DocumentUploadDto } from "./dto/document.dto";

const prefix = "[DOCUMENT_CONTROLELR]"
@Controller("document")
export class DocumentController {
    constructor(
        private documentService: DocumentService
    ) {
    }

    @Post("upload")
    @UseGuards(AuthGuard)
    async uploadDocument(@Body() body: DocumentUploadDto) {
        console.log(`${prefix} (uploadDocument) uploading document with payload: ${JSON.stringify(body)}`);

        try {
            const res = await this.documentService.uploadDocument(body);

            console.log(`${prefix} (uploadDocument) successfully uploaded document with response: ${JSON.stringify(res)}`);
            return res;
        } catch (error) {
            console.log(`${prefix} (uploadDocument) Error in uploading files: ${JSON.stringify(error)}`);
            throw error
        }
    }
}