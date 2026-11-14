import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  // Berjalan setiap hari pada pukul 06:00 pagi
  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  handleCron() {
    this.logger.log('⏰ Menjalankan Cron Job Reminder H-30...');
    
    // TODO: Nanti di sini kita akan query tabel 'documents' milik Gideon
    // untuk mencari naskah yang tanggal_berakhirnya tepat 30 hari lagi.
    // Lalu buat notifikasi ke Admin.
    
    this.logger.log('✅ Cron Job Reminder H-30 selesai (Skeleton).');
  }
}