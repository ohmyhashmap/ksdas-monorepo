import { Controller, Get, Patch, Param, Body, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common'; // Tambah BadRequestException
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Users (Manajemen Akun)')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil daftar semua pengguna (Khusus Admin)' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Ubah role pengguna (Khusus Admin)' })
  async updateRole(@Param('id') id: string, @Body('roleId') roleId: number) {
    const user = await this.usersService.updateUser(id, { roleId });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    return { message: 'Role berhasil diubah', user };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Aktifkan atau blokir akun pengguna (Khusus Admin)' })
  async updateStatus(
    @Param('id') id: string, 
    @Body() updateStatusDto: UpdateStatusDto // <-- Ubah baris ini
  ) {
    const user = await this.usersService.updateUser(id, { isActive: updateStatusDto.isActive });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    return { 
      message: updateStatusDto.isActive ? 'Akun berhasil diaktifkan' : 'Akun berhasil diblokir', 
      user 
    };
  }
}