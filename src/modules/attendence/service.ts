import { BadRequestException, Injectable } from "@nestjs/common";
import { AttendenceModelHelperService } from "./model-helper.service";
import { ATTENDANCE_ENUM } from "./enums/attendance.enum";
import { IAttendance } from "./interfaces/attendance.Interface";
import * as _ from "lodash";
import moment = require("moment-timezone")
import { error } from "console";
moment.tz.setDefault("Asia/kolkata")

const prefix = "ATTENDANCE_SERVICE"

@Injectable()
export class AttendenceService {
    constructor(
        private attendenceModelhelper: AttendenceModelHelperService,
        // private attendanceHelperService: AttendancehelperService
    ) {

    }

    async markAttendence(id: string, attendancetype: ATTENDANCE_ENUM) {
        const query: any = {
            id: id,
            isClockedOut: false
        }

        try {
            const isUserAttended = await this.attendenceModelhelper.findUserAttendance(query);

            if(_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKOUT){
                throw new BadRequestException({
                    "message": "Dont have any previous attendance to be clockout",
                    "error": "Dont have any previous attendance to be clockout",
                    "statusCode": 400,
                }); 
            }
    
            let res: any
            if(!_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKIN){
                return isUserAttended[0];
            }
            
            if(!_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKOUT){
                
                res = await this.attendenceModelhelper.updateUserAttandance({isClockedOut: false, id}, {isClockedOut: true, clockOutTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS")});
    
                console.log(`${prefix} (markAttendence) logged out user: ${JSON.stringify(res)}`);
    
                return res;
            }

            const lastAttendanceQuery: any = {
                id: id,
                isClockedOut: true
            }
            const lastClockedOut = await this.attendenceModelhelper.findlastAttendance(lastAttendanceQuery, 1);
            console.log(`${prefix} (markAttendence) lastClocked out attendance: ${JSON.stringify(lastClockedOut)}`);

            if(!_.isEmpty(lastClockedOut)) {
                const {
                    dateTime,
                    _id
                } = lastClockedOut[0];

                const currentDateTime = moment().format("YYYY-MM-DD");
                const lastClockedOutDateTime = moment(dateTime).format("YYYY-MM-DD");

                if(currentDateTime === lastClockedOutDateTime) {
                    const res = await this.attendenceModelhelper.updateUserAttandance({_id, id}, {isClockedOut: false, clockOutTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS")});
                    return res;
                }

            }
    
            const obj: IAttendance = {
                id: id,
                dateTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                clockInTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                clockOutTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS"),
                isClockedOut: false
            }
    
            res = await this.attendenceModelhelper.createAttendance(obj);
            console.log(`${prefix} (markAttendence) successfullu marked attemdance: ${JSON.stringify(res)}`);
    
            return res;
        } catch (error) {
            console.log(`${prefix} (markAttendence) failed to mark attemdance for id: ${id} | Error: ${error.message}`);
            throw error;
        }
    }

    async getLastThreeMonthsAttendance(transactionId: string) {
        try {
            const result = await this.attendenceModelhelper.findlastAttendance({id: transactionId, isClockedOut: true}, 90);
            return result;
        } catch (error) {
            throw error;
        }
    }
}