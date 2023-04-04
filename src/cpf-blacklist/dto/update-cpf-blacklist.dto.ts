import { PartialType } from '@nestjs/swagger';
import { CreateCpfBlacklistDto } from './create-cpf-blacklist.dto';

export class UpdateCpfBlacklistDto extends PartialType(CreateCpfBlacklistDto) {}
