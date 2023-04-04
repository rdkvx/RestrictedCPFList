import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCpfBlacklistDto } from './dto/create-cpf-blacklist.dto';
import { UpdateCpfBlacklistDto } from './dto/update-cpf-blacklist.dto';
import { utilsCpfBlacklist } from './utils/constants';
import { CpfBlacklist } from './entities/cpf-blacklist.entity';
import { Repository } from 'typeorm/repository/Repository';
import { validations } from './utils/validations';

@Injectable()
export class CpfBlacklistService {
  constructor(
    @Inject(utilsCpfBlacklist.repository)
    private cpfBlacklistRepository: Repository<CpfBlacklist>,
  ) {}
  
  async create(createCpfBlacklistDto: CreateCpfBlacklistDto) {
    if(validations.cpfValidations(createCpfBlacklistDto)){
      try{
        const res = await this.cpfBlacklistRepository.save(createCpfBlacklistDto)
        console.log(`cpf ${res.cpf} inserted successfully`)
        return res

      }catch{
        console.log(`failed to insert cpf ${createCpfBlacklistDto.cpf}`)
        throw new HttpException("ExistsCpfException", HttpStatus.BAD_REQUEST)
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
    const res = await this.cpfBlacklistRepository.findOne({ where: { cpf } });

    if(res == null){
      throw new HttpException(utilsCpfBlacklist.erroInterno, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return res;
  }

  async remove(cpf: string) {
    const res = await this.cpfBlacklistRepository.delete({cpf: cpf});

    if(res.affected == 0){
      throw new HttpException(utilsCpfBlacklist.erroInterno, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return res;
  }
}
