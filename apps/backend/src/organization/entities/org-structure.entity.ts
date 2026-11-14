import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('org_structures')
export class OrgStructure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}