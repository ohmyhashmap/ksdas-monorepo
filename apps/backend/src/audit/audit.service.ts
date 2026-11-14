import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditRepository: Repository<AuditLog>,
  ) {}

  async log(userId: string, action: string, ipAddress: string) {
    const newLog = this.auditRepository.create({
      userId,
      action,
      ipAddress,
    });
    await this.auditRepository.save(newLog);
  }
}