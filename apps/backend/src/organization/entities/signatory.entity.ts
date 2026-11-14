import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('signatories')
export class Signatory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  position: string; // Rektor, Kaprodi, dll

  @Column({ name: 'period_start', type: 'date', nullable: true })
  periodStart: Date;

  @Column({ name: 'period_end', type: 'date', nullable: true })
  periodEnd: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}