import { Inject, Injectable } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { USER_ATTENDENCE, USER_LEAVES } from "src/common/database/database.constants";
import { IAttendence } from "./models/attendenace.model";
import { IAttendance } from "./interfaces/attendance.Interface";
import { ILeaves } from "./models/leaves.model";

@Injectable()
export class AttendenceModelHelperService {
    constructor(
        @Inject(USER_ATTENDENCE)
        private readonly attendenceModel: Model<IAttendence>,

        @Inject(USER_LEAVES)
        private readonly leaveModel: Model<ILeaves>
    ){}

    async createAttendance(data: IAttendance) {
        return this.attendenceModel.create(data)
    }

    async createLeaves(data: any) {
        return this.leaveModel.create(data)
    }

    async updateUserAttandance(filter: FilterQuery<IAttendence>, updateObj: UpdateQuery<IAttendence>) {
        return this.attendenceModel.findOneAndUpdate(filter, updateObj, {
            new: true
        })
    }

    async findUserAttendance(filter: FilterQuery<IAttendence>) {
        return this.attendenceModel.find(filter);
    }

    async findlastAttendance(filter: FilterQuery<IAttendence>, limit: number) {
        return this.attendenceModel.find(filter).sort({dateTime: -1}).limit(limit);
    }

    async getAllLeaves(id: string) {
        return this.leaveModel.findOne({id})
    }

    async updateLeave(filter: FilterQuery<ILeaves>, updateObj: UpdateQuery<ILeaves>) {
        return this.leaveModel.findOneAndUpdate(filter, updateObj, {upsert: true, new: true});
    }
}