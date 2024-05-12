/* eslint-disable prettier/prettier */
import { Global, Module } from "@nestjs/common";
import { dataBaseProvider } from "./database.provider";

@Global()
@Module({
    providers: [...dataBaseProvider],
    exports: [...dataBaseProvider]
})

export class DataBaseModule{}