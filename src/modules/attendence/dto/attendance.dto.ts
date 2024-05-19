import { IsEnum, IsString } from "class-validator";
import { ATTENDANCE_ENUM } from "../enums/attendance.enum";

export class AttendanceDto {
    @IsString()
    transactionId: string;

    @IsEnum(ATTENDANCE_ENUM)
    attendancetype: ATTENDANCE_ENUM
}