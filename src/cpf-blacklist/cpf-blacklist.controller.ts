import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CpfBlacklistService } from './cpf-blacklist.service';
import { CreateCpfBlacklistDto } from './dto/create-cpf-blacklist.dto';

@Controller('cpf')
export class CpfBlacklistController {
  constructor(private readonly cpfBlacklistService: CpfBlacklistService) {}

  @Post()
  addCPF(@Body() createCpfBlacklistDto: CreateCpfBlacklistDto) {
    return this.cpfBlacklistService.create(createCpfBlacklistDto);
  }

  @Get()
  findAllCPFs() {
    return this.cpfBlacklistService.findAll();
  }

  @Get(':cpf')
  checkCPF(@Param('cpf') cpf: string) {
    return this.cpfBlacklistService.findOne(cpf);
  }

  @Delete(':cpf')
  removeCPF(@Param('cpf') cpf: string) {
    return this.cpfBlacklistService.remove(cpf);
  }
}
