import { Inject, Injectable } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { USER_ATTENDENCE } from "src/common/database/database.constants";
import { IAttendence } from "./models/attendenace.model";
import { IAttendance } from "./interfaces/attendance.Interface";

@Injectable()
export class AttendenceModelHelperService {
    constructor(
        @Inject(USER_ATTENDENCE)
        private readonly attendenceModel: Model<IAttendence>
    ){}

    async createAttendance(data: IAttendance) {
        return this.attendenceModel.create(data)
    }

    async findUserAttendance(filter: FilterQuery<IAttendence>) {
        return this.attendenceModel.find(filter);
    }

    async findlastAttendance(filter: FilterQuery<IAttendence>, limit: number) {
        return this.attendenceModel.find(filter).sort({dateTime: -1}).limit(limit);
    }

    async updateUserAttandance(filter: FilterQuery<IAttendence>, updateObj: UpdateQuery<IAttendence>) {
        return this.attendenceModel.findOneAndUpdate(filter, updateObj, {
            new: true
        })
    }
}