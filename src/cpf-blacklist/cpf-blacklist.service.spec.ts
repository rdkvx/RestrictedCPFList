import { Test, TestingModule } from '@nestjs/testing';
import { CpfBlacklistService } from './cpf-blacklist.service';

describe('CpfBlacklistService', () => {
  let service: CpfBlacklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpfBlacklistService],
    }).compile();

    service = module.get<CpfBlacklistService>(CpfBlacklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
