import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCpfBlacklistDto } from './dto/create-cpf-blacklist.dto';
import { UpdateCpfBlacklistDto } from './dto/update-cpf-blacklist.dto';
import { utilsCpfBlacklist } from './utils/constants';
import { CpfBlacklist } from './entities/cpf-blacklist.entity';
import { Repository } from 'typeorm/repository/Repository';
import { validations } from './utils/validations';
import { error } from 'console';
import { cpfException } from './exceptions/cpfExceptions';

@Injectable()
export class CpfBlacklistService {
  constructor(
    @Inject(utilsCpfBlacklist.repository)
    private cpfBlacklistRepository: Repository<CpfBlacklist>,
  ) {}
  
  async create(createCpfBlacklistDto: CreateCpfBlacklistDto) {
    if(validations.cpfValidations(createCpfBlacklistDto.cpf)){
      try{
        const res = await this.cpfBlacklistRepository.save(createCpfBlacklistDto)
        console.log(`cpf ${res.cpf} inserted successfully`)
        return res

      }catch{ (error)
        console.log(`failed to insert cpf ${createCpfBlacklistDto.cpf}`)
        throw new cpfException(utilsCpfBlacklist.cpfAlreadyExistsErr, HttpStatus.BAD_REQUEST)
      }
    }
  }

  async findAll() {
    try{
      const res = await this.cpfBlacklistRepository.find();
      return res;
    }catch{
      throw new HttpException(utilsCpfBlacklist.erroInterno, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(cpf: string) {
    if(validations.cpfValidations(cpf)){
      const res = await this.cpfBlacklistRepository.findOne({ where: { cpf } });

      if(res == null){
        throw new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND)
      }

      return res;
    }
  }

  async remove(cpf: string) {
    if(validations.cpfValidations(cpf)){
      const res = await this.cpfBlacklistRepository.delete({cpf: cpf});

      if(res.affected == 0){
        throw new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND)
      }

      return res;
    }
  }
}
