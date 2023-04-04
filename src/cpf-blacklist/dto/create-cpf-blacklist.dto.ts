import {IsString, IsTimeZone} from 'class-validator'
import { Timestamp } from 'typeorm';

export class CreateCpfBlacklistDto {

    @IsString()
    cpf: string;
}
