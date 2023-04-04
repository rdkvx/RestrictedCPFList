import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CpfBlacklistService } from './cpf-blacklist.service';
import { CreateCpfBlacklistDto } from './dto/create-cpf-blacklist.dto';
import { UpdateCpfBlacklistDto } from './dto/update-cpf-blacklist.dto';

@Controller('cpf')
export class CpfBlacklistController {
  constructor(private readonly cpfBlacklistService: CpfBlacklistService) {}

  @Post()
  create(@Body() createCpfBlacklistDto: CreateCpfBlacklistDto) {
    return this.cpfBlacklistService.create(createCpfBlacklistDto);
  }

  @Get()
  findAll() {
    return this.cpfBlacklistService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.cpfBlacklistService.findOne(cpf);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.cpfBlacklistService.remove(cpf);
  }
}
