import { Test, TestingModule } from '@nestjs/testing';
import { CpfBlacklistController } from './cpf-blacklist.controller';
import { CpfBlacklistService } from './cpf-blacklist.service';

describe('CpfBlacklistController', () => {
  let controller: CpfBlacklistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpfBlacklistController],
      providers: [CpfBlacklistService],
    }).compile();

    controller = module.get<CpfBlacklistController>(CpfBlacklistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
