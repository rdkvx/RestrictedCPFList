import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateCpfBlacklistDto } from "../dto/create-cpf-blacklist.dto";
import { Repository } from 'typeorm/repository/Repository';

const cpfValidations = (createCpfBlacklistDto: CreateCpfBlacklistDto)=>{
    validaApenasNumero(createCpfBlacklistDto);
    validaNumeroRetido(createCpfBlacklistDto);

    return true
}

const validaNumeroRetido = (createCpfBlacklistDto: CreateCpfBlacklistDto)=>{
    const regexRepetedNumbers = /([0-9])\1+/;
    
    if(createCpfBlacklistDto.cpf.length != 11 || regexRepetedNumbers.test(createCpfBlacklistDto.cpf)){
        throw new HttpException("InvalidCpfException", HttpStatus.BAD_REQUEST)
    }
}

const validaApenasNumero = (createCpfBlacklistDto: CreateCpfBlacklistDto)=>{
    const regexApenasNumeros = /^[0-9]+$/;

    if(!regexApenasNumeros.test(createCpfBlacklistDto.cpf)){
        throw new HttpException("InvalidCpfException", HttpStatus.BAD_REQUEST)
    }
}

const validaCpfExistente = (createCpfBlacklistDto: CreateCpfBlacklistDto)=>{
    
}

export let validations = {
    cpfValidations
}