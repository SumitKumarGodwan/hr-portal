import { Injectable } from "@nestjs/common";
import { AttendenceModelHelperService } from "./model-helper.service";
import { ATTENDANCE_ENUM } from "./enums/attendance.enum";
import { IAttendance } from "./interfaces/attendance.Interface";
import * as _ from "lodash";
import moment = require("moment-timezone")
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
    
            let res: any
            if(!_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKOUT){
                
                res = await this.attendenceModelhelper.updateUserAttandance({isClockedOut: false, id}, {isClockedOut: true, clockOutTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS")});
    
                console.log(`${prefix} (markAttendence) logged out user: ${JSON.stringify(res)}`);
    
                return res;
            }

            if(!_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKIN){
                return isUserAttended[0];
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
}