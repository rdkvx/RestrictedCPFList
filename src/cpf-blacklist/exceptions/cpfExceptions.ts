import { HttpException, HttpStatus } from "@nestjs/common";

// foi criada uma exceção personalizada para atender os requisitos
export class cpfException extends HttpException{
    constructor(msg?: any, status?: HttpStatus){
        super(msg, status);
    }
}