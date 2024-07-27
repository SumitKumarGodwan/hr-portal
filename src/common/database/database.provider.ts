/* eslint-disable prettier/prettier */
import { ConfigService } from "@nestjs/config";
import mongoose, { ConnectOptions, Connection } from "mongoose";
import { IUser, userSchema } from "src/modules/login/models/customer.model";
import { DATABASE_CONNECTIONS, USER_ATTENDENCE, USER_LEAVES, USER_LOGIN } from "./database.constants";
import { IAttendence, attendenceSchema } from "src/modules/attendence/models/attendenace.model";
import { ILeaves, leaveSchema } from "src/modules/attendence/models/leaves.model";

/* eslint-disable prettier/prettier */
export const dataBaseProvider = [
    {
        provide: DATABASE_CONNECTIONS,
        useFactory: (configService: ConfigService) => {
            // console.log(`DB url ${configService.get('db.url')}`);
            // mongodb+srv://sumitgod510:Xz8nZJ2nzyu1NMXZ@cluster0.vsttzj8.mongodb.net/hr-portal?retryWrites=true&w=majority

            const connection = mongoose.connect(configService.get('db.url'), { serverApi: { version: '1', strict: true, deprecationErrors: true } })
            // mongoose.createConnection(configService.get('db.url'), {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true
            // } as ConnectOptions)

            return connection;

        },
        inject: [ConfigService]
    },
    {
        provide: USER_LOGIN,
        useFactory: (connection: mongoose.Connection, configService: ConfigService) => {
            const UserSchema = connection.model<IUser>(
                "userData",
                userSchema,
                "user"
            )
            if(configService.get('db.syncIndex')){
                UserSchema.syncIndexes();
            }

            return UserSchema;
        },
        inject: [DATABASE_CONNECTIONS, ConfigService]
    },
    {
        provide: USER_ATTENDENCE,
        useFactory: (connection: mongoose.Connection, configService: ConfigService) => {
            const UserSchema = connection.model<IAttendence>(
                "attendance",
                attendenceSchema,
                "user_attendance"
            )
            if(configService.get('db.syncIndex')){
                UserSchema.syncIndexes();
            }

            return UserSchema;
        },
        inject: [DATABASE_CONNECTIONS, ConfigService]
    },
    {
        provide: USER_LEAVES,
        useFactory: (connection: mongoose.Connection, configService: ConfigService) => {
            const UserLeaveSchema = connection.model<ILeaves>(
                "leaves",
                leaveSchema,
                "user_leaves"
            )
            if(configService.get('db.syncIndex')){
                UserLeaveSchema.syncIndexes();
            }

            return UserLeaveSchema;
        },
        inject: [DATABASE_CONNECTIONS, ConfigService]
    }
];