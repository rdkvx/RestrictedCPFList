import { Exclude, instanceToPlain } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp, Unique } from 'typeorm';

@Entity()
export class CpfBlacklist {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11, unique: true})
    cpf: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Timestamp;

    toJSON() {
        return instanceToPlain(this)
    }
}