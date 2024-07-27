import { BadRequestException, Injectable } from "@nestjs/common";
import { AttendenceModelHelperService } from "./model-helper.service";
import { ATTENDANCE_ENUM, LEAVES_TYPE } from "./enums/attendance.enum";
import { IAttendance } from "./interfaces/attendance.Interface";
import * as _ from "lodash";
import moment = require("moment-timezone")
import { error } from "console";
import { UpdateLeaveDto } from "./dto/attendance.dto";
import { filter } from "rxjs";
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

            if (_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKOUT) {
                throw new BadRequestException({
                    "message": "Dont have any previous attendance to be clockout",
                    "error": "Dont have any previous attendance to be clockout",
                    "statusCode": 400,
                });
            }

            let res: any
            if (!_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKIN) {
                return isUserAttended[0];
            }

            if (!_.isEmpty(isUserAttended) && attendancetype == ATTENDANCE_ENUM.CLOCKOUT) {

                res = await this.attendenceModelhelper.updateUserAttandance({ isClockedOut: false, id }, { isClockedOut: true, clockOutTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS") });

                console.log(`${prefix} (markAttendence) logged out user: ${JSON.stringify(res)}`);

                return res;
            }

            const lastAttendanceQuery: any = {
                id: id,
                isClockedOut: true
            }
            const lastClockedOut = await this.attendenceModelhelper.findlastAttendance(lastAttendanceQuery, 1);
            console.log(`${prefix} (markAttendence) lastClocked out attendance: ${JSON.stringify(lastClockedOut)}`);

            if (!_.isEmpty(lastClockedOut)) {
                const {
                    dateTime,
                    _id
                } = lastClockedOut[0];

                const currentDateTime = moment().format("YYYY-MM-DD");
                const lastClockedOutDateTime = moment(dateTime).format("YYYY-MM-DD");

                if (currentDateTime === lastClockedOutDateTime) {
                    const res = await this.attendenceModelhelper.updateUserAttandance({ _id, id }, { isClockedOut: false, clockOutTime: moment().format("YYYY-MM-DDTHH:mm:ss.SSS") });
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
            const result = await this.attendenceModelhelper.findlastAttendance({ id: transactionId }, 93);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAttendanceForTimePeriod(input: { fromDate: string, toDate: string, transactionId: string }) {
        try {

            const fromDate = new Date(input.fromDate)
            const toDate = new Date(input.toDate)

            console.log(`${prefix} (getAttendanceForTimePeriod) fromDate: ${fromDate} toDate: ${toDate} for transactionId: ${input.transactionId}`);
            const filter: any = {
                id: input.transactionId,
                createdAt: {
                    $gte: fromDate,
                    $lte: toDate
                }
            }

            console.log(`${prefix} (getAttendanceForTimePeriod) query to find attendance: ${JSON.stringify(filter)}`)
            const result = await this.attendenceModelhelper.findUserAttendance(filter);

            return result;
        } catch (error) {
            throw error;
        }
    }

    async createUserLeaves(id: string) {
        try {
            const leaveValues = {
                [LEAVES_TYPE.CASUAL_AND_SICK]: {
                    availableLeaves: 12,
                    accuredLeaves: 12,
                    creditedFromLastYear: 0,
                    annualLeaves: 12,
                    usedLeaves: 0
                },
                [LEAVES_TYPE.EARNED_LEAVES]: {
                    availableLeaves: 1.5,
                    accuredLeaves: 1.5,
                    creditedFromLastYear: 0,
                    annualLeaves: 18,
                    usedLeaves: 0
                },
                [LEAVES_TYPE.OPTIONAL_HOLIDAY]: {
                    availableLeaves: 1,
                    accuredLeaves: 1,
                    creditedFromLastYear: 0,
                    annualLeaves: 1,
                    usedLeaves: 0
                },
                [LEAVES_TYPE.PATERNITY_LEAVES]: {
                    availableLeaves: 5,
                    accuredLeaves: 5,
                    creditedFromLastYear: 0,
                    annualLeaves: 5,
                    usedLeaves: 0
                },
                [LEAVES_TYPE.MATERNITY_LEAVES]: {
                    availableLeaves: 5,
                    accuredLeaves: 5,
                    creditedFromLastYear: 0,
                    annualLeaves: 5,
                    usedLeaves: 0
                },
                [LEAVES_TYPE.LEAVE_WITHOUT_PAY]: {
                    availableLeaves: 0,
                    accuredLeaves: 0,
                    creditedFromLastYear: 0,
                    annualLeaves: 0,
                    usedLeaves: 0
                }
            };

            const leaveTypes = Object.values(LEAVES_TYPE);
            const leaves = leaveTypes.map(type => ({
                type,
                ...leaveValues[type] // Spread the predefined values for each leave type
            }));

            const leavesDocument = {
                id: id, // Generate a new ObjectId as a string for the id
                leaves
            };

            const createdLeaves = await this.attendenceModelhelper.createLeaves(leavesDocument);
            console.log(`${prefix} (createUserLeaves) id: ${id} created Leaves: ${JSON.stringify(createdLeaves)}`);

            return createdLeaves;
        } catch (error) {
            console.log(`${prefix} (createUserLeaves) id: ${id} | Error: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    async getLeaves(id: string) {
        try {
            const leavesRes = await this.attendenceModelhelper.getAllLeaves(id);
            console.log(`${prefix} (getLeaves) id: ${id} total Leaves: ${JSON.stringify(leavesRes)}`);

            return leavesRes
        } catch (error) {
            console.log(`${prefix} (getLeaves) id: ${id} | Error: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    async updateLeaves(body: UpdateLeaveDto) {
        try {
            const { id, type, newAvailableLeaves, usedLeaves } = body;
            const filter: any = {
                id: id, 'leaves.type': type
            }

            const updateObj: any = {
                $set: {
                    'leaves.$.availableLeaves': newAvailableLeaves,
                    'leaves.$.usedLeaves': usedLeaves
                }
            }
            const updatedLeaves = await this.attendenceModelhelper.updateLeave(filter, updateObj);
            console.log(`${prefix} (getLeaves) id: ${id} total Leaves: ${JSON.stringify(updatedLeaves)}`);

            return updatedLeaves;
        } catch (error) {
            console.log(`${prefix} (getLeaves) id: ${body.id} Error: ${JSON.stringify(error)}`);
            throw error
        }
    }
}