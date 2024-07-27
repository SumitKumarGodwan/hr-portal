import { IsEnum, IsOptional, IsString } from "class-validator";
import { DocumentTypeEnum } from "../enums/enums";

export class DocumentUploadDto {
    @IsEnum(DocumentTypeEnum)
    documentCategoryType: DocumentTypeEnum;

    @IsString()
    @IsOptional()
    id: string
}