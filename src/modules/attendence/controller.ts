import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AttendenceService } from "./service";
import { AttendanceDto } from "./dto/attendance.dto";

const prefix = "ATTENDENCE_SERVICE";

@Controller("attendence")
export class AttendenceController {
    constructor(
        private attendenceService: AttendenceService
    ) {

    }

    @Post("")
    async markAttendence(
        @Body() body: AttendanceDto
    ) {
        const {transactionId, attendancetype} = body
        try {
            const res = await this.attendenceService.markAttendence(transactionId, attendancetype);
            console.log(`${prefix} (markAttendence) successfully marked attendence for user transactionId: ${transactionId}`);
            return res;
        } catch (error) {
            console.log(`${prefix} (markAttendence) failed to mark attendence for user transactionId | Error: ${error.message}`);
            throw error;
        }
    }

    @Get("attendance-view")
    async getAllAttendance(
        @Query("transactionId") transactionId: string
    ) {
        try {
            const res = await this.attendenceService.getLastThreeMonthsAttendance(transactionId);
            console.log(`${prefix} (getAllAttendance) last 3 months attendance: ${res.length}`);

            return res;
        } catch (error) {
            throw error
        }
    }
}