import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCpfBlacklistDto } from './dto/create-cpf-blacklist.dto';
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
        console.log(`failed to insert cpf ${createCpfBlacklistDto.cpf}: ${utilsCpfBlacklist.cpfAlreadyExists}`)
        throw new cpfException(utilsCpfBlacklist.cpfAlreadyExistsErr, HttpStatus.BAD_REQUEST)
      }
    }
  }

  async findAll() {
    try{
      const res = await this.cpfBlacklistRepository.find();
      console.log(`all blacklisted cpf were listed`)
      return res;
    }catch{
      console.log(`failed to list blacklisted cpfs`)
      throw new HttpException(utilsCpfBlacklist.erroInterno, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(cpf: string) {
    if(validations.cpfValidations(cpf)){
      const res = await this.cpfBlacklistRepository.findOne({ where: { cpf } });

      if(res == null){
        console.log(`failed to list cpf ${cpf}: ${utilsCpfBlacklist.notFoundCep}`)
        throw new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND)
      }
      console.log(`cpf ${cpf} returned successfully`)
      return res;
    }
  }

  async remove(cpf: string) {
    if(validations.cpfValidations(cpf)){
      const res = await this.cpfBlacklistRepository.delete({cpf: cpf});

      if(res.affected == 0){
        console.log(`failed to remove cpf ${cpf} from the blacklist`)
        throw new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND)
      }
      console.log(`cpf ${cpf} has been removed successfully from the blacklist`)
      return res;
    }
  }
}
