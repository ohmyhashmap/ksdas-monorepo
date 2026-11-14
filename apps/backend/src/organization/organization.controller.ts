import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { CreateSignatoryDto } from './dto/create-signatory.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Struktur Organisasi & Panduan')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  // --- Endpoint Struktur Organisasi ---
  @Post('structures')
  @Roles('admin')
  @ApiOperation({ summary: 'Tambah bagan struktur (Khusus Admin)' })
  createOrg(@Body() dto: CreateOrgDto) {
    return this.orgService.createOrg(dto);
  }

  @Get('structures')
  @ApiOperation({ summary: 'Lihat semua bagan struktur (Semua Role)' })
  findAllOrg() {
    return this.orgService.findAllOrg();
  }

  @Delete('structures/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Hapus bagan struktur (Khusus Admin)' })
  deleteOrg(@Param('id') id: string) {
    return this.orgService.deleteOrg(id);
  }

  // --- Endpoint Pejabat Penandatangan ---
  @Post('signatories')
  @Roles('admin')
  @ApiOperation({ summary: 'Tambah riwayat pejabat (Khusus Admin)' })
  createSignatory(@Body() dto: CreateSignatoryDto) {
    return this.orgService.createSignatory(dto);
  }

  @Get('signatories')
  @ApiOperation({ summary: 'Lihat semua pejabat (Semua Role)' })
  findAllSignatories() {
    return this.orgService.findAllSignatories();
  }

  @Delete('signatories/:id')
  @Roles('admin')
  @ApiOperation({ summary: 'Hapus riwayat pejabat (Khusus Admin)' })
  deleteSignatory(@Param('id') id: string) {
    return this.orgService.deleteSignatory(id);
  }
}