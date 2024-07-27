import { IsEnum, IsNumber, IsString, isString } from "class-validator";
import { ATTENDANCE_ENUM, LEAVES_TYPE } from "../enums/attendance.enum";

export class AttendanceDto {
    @IsString()
    transactionId: string;

    @IsEnum(ATTENDANCE_ENUM)
    attendancetype: ATTENDANCE_ENUM
}

export class UpdateLeaveDto {
    @IsEnum(LEAVES_TYPE)
    type: LEAVES_TYPE;

    @IsString()
    id: string;

    @IsNumber()
    newAvailableLeaves: number;

    @IsNumber()
    usedLeaves: number
}