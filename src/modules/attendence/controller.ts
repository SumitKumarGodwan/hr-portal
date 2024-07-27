import { Body, Controller, Get, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AttendenceService } from "./service";
import { AttendanceDto, UpdateLeaveDto } from "./dto/attendance.dto";
import { AuthGuard } from "src/common/guard/authguard";

const prefix = "ATTENDENCE_SERVICE";

@Controller("attendence")
export class AttendenceController {
    constructor(
        private attendenceService: AttendenceService
    ) {

    }

    @Post("")
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
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

    @Get("get-attendance")
    @UseGuards(AuthGuard)
    async getAttendanceForTimePeriod(
        @Query("fromDate") fromDate: string,
        @Query("toDate") toDate: string,
        @Query("transactionId") transactionId: string
    ) {
        try {
            const res = await this.attendenceService.getAttendanceForTimePeriod({fromDate, toDate, transactionId});
            console.log(`${prefix} (getAllAttendance) attendance for specific time period: ${JSON.stringify(res)}`);

            return res;
        } catch (error) {
            throw error
        }
    }

    @Post("create-leaves")
    @UseGuards(AuthGuard)
    async createUserLeaves(@Body() body: {id: string}){
        try {
            console.log(`${prefix} (createUserLeaves) initiating create leaves for id: ${body.id}`);
            const res = await this.attendenceService.createUserLeaves(body.id);
            return res;
        } catch (error) {
            throw error
        }
    }

    @Get("get-leaves")
    @UseGuards(AuthGuard)
    async getUserLeaves(@Query("id") id: string,) {
        try {
            console.log(`${prefix} (getUserLeaves) initiating get leaves for id: ${id}`);
            const res = await this.attendenceService.getLeaves(id);
            return res;
        } catch (error) {
            throw error;
        }
    }

    @Patch("update-leaves")
    @UseGuards(AuthGuard)
    async updateLeaves(@Body() body: UpdateLeaveDto) {
        try {
            const {id} = body
            console.log(`${prefix} (updateLeaves) initiating update leaves for id: ${id} body: ${JSON.stringify(body)}`);

            const res = await this.attendenceService.updateLeaves(body);
            return res;
        } catch (error) {
            throw error;
        }
    }
}