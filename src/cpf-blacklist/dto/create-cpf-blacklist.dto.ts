import {IsString, IsTimeZone} from 'class-validator'

export class CreateCpfBlacklistDto {

    @IsString()
    cpf: string;
}
