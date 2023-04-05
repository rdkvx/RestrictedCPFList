import { HttpStatus } from "@nestjs/common";
import { cpfException } from "../exceptions/cpfExceptions";
import { utilsCpfBlacklist } from "./constants";

// faz a chamada em todas as validações
const cpfValidations = (cpf: string)=>{
    validaApenasNumero(cpf);
    validaNumeroRepetido(cpf);
    return true
}

// regra de validação do CPF, valida se existem mais de 2 numeros iguais
// tambem valida se existem numeros repetidos em sequencia
const validaNumeroRepetido = (cpf: string)=>{
    const regexRepetedNumbers = /([0-9])\1+/;
    
    if(cpf.length != 11 || regexRepetedNumbers.test(cpf)){
        console.log(`failed to validate cpf ${cpf}: ${utilsCpfBlacklist.cpfIsNotValid}`)
        throw new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST)
    }
}

// regra para validar se contem apenas numeros nos digitos
const validaApenasNumero = (cpf: string)=>{
    const regexApenasNumeros = /^[0-9]+$/;

    if(!regexApenasNumeros.test(cpf)){
        console.log(`failed to validate cpf ${cpf}: ${utilsCpfBlacklist.cpfIsNotValid}`)
        throw new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST)
    }
}

export let validations = {
    cpfValidations
}