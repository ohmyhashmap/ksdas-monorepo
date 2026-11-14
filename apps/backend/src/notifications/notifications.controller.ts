import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notifikasi & Komentar')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notifService: NotificationsService) {}

  @Post('comments')
  @ApiOperation({ summary: 'Kirim komentar (Kaprodi/Dosen)' })
  createComment(@Req() req: any, @Body() dto: CreateCommentDto) {
    // req.user didapat dari JwtStrategy
    return this.notifService.createComment(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lihat notifikasi saya (Admin)' })
  getMyNotifications(@Req() req: any) {
    return this.notifService.getMyNotifications(req.user.userId);
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Hitung notifikasi yang belum dibaca (Dashboard Admin)' })
  async getUnreadCount(@Req() req: any) {
    const count = await this.notifService.getUnreadCount(req.user.userId);
    return { unread: count };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Tandai notifikasi sudah dibaca' })
  markAsRead(@Param('id') id: string) {
    return this.notifService.markAsRead(id);
  }
}