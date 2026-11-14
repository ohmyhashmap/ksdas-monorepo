import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string; // Penerima (Admin)

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ length: 50 })
  type: string; // 'EXPIRY_H30', 'COMMENT'

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}