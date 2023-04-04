import { HttpException, HttpStatus } from "@nestjs/common";


export class cpfException extends HttpException{
    constructor(msg?: any, status?: HttpStatus){
        super(msg, status);
    }
}