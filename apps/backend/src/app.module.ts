import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule'; // <-- Import Cron Job

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuditModule } from './audit/audit.module';
import { OrganizationModule } from './organization/organization.module';
import { NotificationsModule } from './notifications/notifications.module'; // <-- Import Notifikasi

import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, 
        logging: true,      
      }),
    }),
    ScheduleModule.forRoot(), // <-- Aktifkan Cron Job
    UsersModule,
    AuthModule,
    AuditModule,
    OrganizationModule,
    NotificationsModule, // <-- Daftarkan Notifikasi
    SchedulerModule, // <-- Daftarkan Scheduler
  ],
})
export class AppModule {}