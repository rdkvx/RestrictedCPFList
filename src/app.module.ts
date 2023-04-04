import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfBlacklistModule } from './cpf-blacklist/cpf-blacklist.module';

@Module({
  imports: [CpfBlacklistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
