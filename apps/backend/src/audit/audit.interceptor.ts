import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    
    // Hanya catat aksi yang mengubah data
    const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

    return next.handle().pipe(
      tap(() => {
        if (writeMethods.includes(method)) {
          const user = request.user; // Dari JWT Strategy
          const userId = user ? user.userId : null; // Login/Register mungkin belum ada user
          const ip = request.ip || request.connection.remoteAddress;

          // Simpan ke database secara background
          this.auditService.log(userId, `${method} ${url}`, ip).catch((err) => {
            console.error('Gagal menyimpan audit log:', err);
          });
        }
      }),
    );
  }
}