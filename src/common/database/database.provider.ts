/* eslint-disable prettier/prettier */
import { ConfigService } from "@nestjs/config";
import mongoose, { ConnectOptions, Connection } from "mongoose";
import { IUser, userSchema } from "src/modules/login/models/customer.model";
import { DATABASE_CONNECTIONS, USER_LOGIN } from "./database.constants";

/* eslint-disable prettier/prettier */
export const dataBaseProvider = [
    {
        provide: DATABASE_CONNECTIONS,
        useFactory: (configService: ConfigService): Connection => {
            console.log(`DB url ${configService.get('db.url')}`);

            const connection = mongoose.createConnection(configService.get('db.url'), {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions)

            connection.on('connected', () => {
                console.log("connected")
            });

            connection.on('error', (error: any) => {
                console.log(error);
            });

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
    }
];