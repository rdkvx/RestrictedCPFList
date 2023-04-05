import { Test, TestingModule } from '@nestjs/testing';
import { CpfBlacklistService } from './cpf-blacklist.service';
import { CpfBlacklist } from './entities/cpf-blacklist.entity';
import { utilsCpfBlacklist } from './utils/constants';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { cpfException } from './exceptions/cpfExceptions';
import { CreateCpfBlacklistDto } from './dto/create-cpf-blacklist.dto';

const listaCpf = [
  new CpfBlacklist({
    cpf: '13262453761'
  }),
  new CpfBlacklist({
    cpf: '13262453764'
  })
]

const mockDelete = {
  "raw": [],
  "affected": 1
}

describe('CpfBlacklistService', () => {
  let cpfBLackListService: CpfBlacklistService;
  let cpfBlackListRepository: Repository<CpfBlacklist>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CpfBlacklistService,
        {
          provide: utilsCpfBlacklist.repository,
          useValue: {
            find: jest.fn().mockResolvedValue(listaCpf),
            findOne: jest.fn().mockResolvedValue(listaCpf[0]),
            save: jest.fn().mockResolvedValue(listaCpf[0]),
            delete: jest.fn().mockResolvedValue(mockDelete),

          },
        }
      ],
    }).compile();

    cpfBLackListService = module.get<CpfBlacklistService>(CpfBlacklistService);
    cpfBlackListRepository = module.get<Repository<CpfBlacklist>>(utilsCpfBlacklist.repository)
  });

  it('should be defined', () => {
    expect(cpfBLackListService).toBeDefined();
    expect(cpfBlackListRepository).toBeDefined();
  });

  describe('create', ()=>{
    it('should insert a cpf to the blacklist', async ()=>{
      const data: CreateCpfBlacklistDto = {
        cpf: '13262453761'
      }

      const mock = {
        "cpf": "13262453761",
        "createdAt": undefined
    }

      const result = await cpfBLackListService.create(data)

      expect(result).toEqual(mock);
      expect(cpfBlackListRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return a exception InvalidCpfException', async ()=>{
      const data: CreateCpfBlacklistDto = {
        cpf: '132624537611'
      }
      
      jest
        .spyOn(cpfBlackListRepository, 'save')
        .mockRejectedValueOnce(new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST))

      expect(cpfBLackListService.create(data)).rejects.toThrowError(
        new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST)
      );
    });

    it('should return a exception ExistsCpfException', async ()=>{
      const data: CreateCpfBlacklistDto = {
        cpf: '13262453761'
      }
      
      jest
        .spyOn(cpfBlackListRepository, 'save')
        .mockRejectedValueOnce(new cpfException(utilsCpfBlacklist.cpfAlreadyExistsErr, HttpStatus.BAD_REQUEST))

      expect(cpfBLackListService.create(data)).rejects.toThrowError(
        new cpfException(utilsCpfBlacklist.cpfAlreadyExistsErr, HttpStatus.BAD_REQUEST)
      );
      
    })
  });

  describe('findAll', ()=>{
    it('should return a blacklisted cpf list entity successfully', async ()=>{
      //chama o metodo findAll mockado
      const result = await cpfBLackListService.findAll();

      //assert
      expect(result).toEqual(listaCpf) // retornou uma lista mockada
      expect(cpfBlackListRepository.find).toHaveBeenCalledTimes(1); // o metodo find foi chamado
    });

    it('should throw an exception', ()=>{
      jest
        .spyOn(cpfBlackListRepository, 'find')
        .mockRejectedValueOnce(new HttpException(utilsCpfBlacklist.erroInterno, HttpStatus.INTERNAL_SERVER_ERROR));

      expect(cpfBLackListService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', ()=>{
    it('should return a existing cpf', async ()=>{
      const result = await cpfBLackListService.findOne(listaCpf[0].cpf);

      expect(result).toEqual(listaCpf[0])
      expect(cpfBlackListRepository.findOne).toHaveBeenCalledTimes(1); // o metodo find foi chamado
    });

    it('should return a exception NotFoundCpfException', async ()=>{
      jest
        .spyOn(cpfBlackListRepository, 'findOne')
        .mockRejectedValueOnce(new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND))

      expect(cpfBLackListService.findOne('13262453762')).rejects.toThrowError(
        new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND)
      )
    });

    it('should return a exception InvalidCpfException', async ()=>{
      jest
        .spyOn(cpfBlackListRepository, 'findOne')
        .mockRejectedValueOnce(new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST))

      expect(cpfBLackListService.findOne('13262453762')).rejects.toThrowError(
        new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST)
      )
    });
  });

  describe('remove', ()=>{
    it('should remove a cpf from backlist', async ()=>{
      const result = await cpfBLackListService.remove('13262453761')

      expect(result).toEqual(mockDelete)
      expect(cpfBlackListRepository.delete).toHaveBeenCalledTimes(1); // o metodo delete foi chamado
    });

    it('should return a exception NotFoundCpfException', async ()=>{
      jest
        .spyOn(cpfBlackListRepository, 'delete')
        .mockRejectedValueOnce(new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND))

      expect(cpfBLackListService.remove('13262453762')).rejects.toThrowError(
        new cpfException(utilsCpfBlacklist.notFoundCepErr, HttpStatus.NOT_FOUND)
      )
    });

    it('should return a exception InvalidCpfException', async ()=>{
      jest
        .spyOn(cpfBlackListRepository, 'delete')
        .mockRejectedValueOnce(new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST))

      expect(cpfBLackListService.remove('1326245376211')).rejects.toThrowError(
        new cpfException(utilsCpfBlacklist.invalidCepErr, HttpStatus.BAD_REQUEST)
      )
    })
  });
});
