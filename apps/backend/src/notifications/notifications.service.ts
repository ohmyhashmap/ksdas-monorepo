import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notifRepo: Repository<Notification>,
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
  ) {}

  // --- Komentar ---
  async createComment(userId: string, dto: CreateCommentDto) {
    // 1. Simpan komentar
    const comment = this.commentRepo.create({
      userId,
      documentId: dto.documentId,
      content: dto.content,
    });
    await this.commentRepo.save(comment);

    // 2. Buat notifikasi untuk Admin (Di sini kita asumsikan ID admin pertama)
    // Nanti bisa dicari dari tabel users, sementara kita hardcode notifikasinya
    const newNotif = this.notifRepo.create({
      userId: 'c78d3501-4903-43ad-ac96-bcf2ac3aa45a', // ID Admin kita
      title: 'Komentar Baru',
      message: `Ada komentar baru pada naskah: "${dto.content}"`,
      type: 'COMMENT',
    });
    await this.notifRepo.save(newNotif);

    return { message: 'Komentar berhasil dikirim', comment };
  }

  // --- Notifikasi ---
  async getMyNotifications(userId: string) {
    return this.notifRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string) {
    await this.notifRepo.update(id, { isRead: true });
    return { message: 'Notifikasi ditandai sudah dibaca' };
  }

  async getUnreadCount(userId: string) {
    return this.notifRepo.count({
      where: { userId, isRead: false },
    });
  }
}