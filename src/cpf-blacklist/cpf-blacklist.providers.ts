import { DataSource } from 'typeorm';
import { CpfBlacklist } from './entities/cpf-blacklist.entity';
import { utilsCpfBlacklist } from './utils/constants';

export const cpfBlacklistProviders = [
  {
    provide: utilsCpfBlacklist.repository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CpfBlacklist),
    inject: [utilsCpfBlacklist.dataSource],
  },
];