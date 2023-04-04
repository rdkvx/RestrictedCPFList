import { Module } from '@nestjs/common';
import { CpfBlacklistService } from './cpf-blacklist.service';
import { CpfBlacklistController } from './cpf-blacklist.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cpfBlacklistProviders } from './cpf-blacklist.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CpfBlacklistController],
  providers: [...cpfBlacklistProviders, CpfBlacklistService]
})
export class CpfBlacklistModule {}
