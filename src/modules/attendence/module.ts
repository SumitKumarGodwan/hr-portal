import { Module } from "@nestjs/common";
import { AttendenceService } from "./service";
import { AttendancehelperService } from "./helper-service";
import { AttendenceModelHelperService } from "./model-helper.service";
import { AttendenceController } from "./controller";

@Module({
    imports: [],
    controllers: [AttendenceController],
    providers: [AttendenceService, AttendancehelperService, AttendenceModelHelperService],
    exports: [AttendenceService, AttendancehelperService, AttendenceModelHelperService]
})

export class Attendancemodule {}