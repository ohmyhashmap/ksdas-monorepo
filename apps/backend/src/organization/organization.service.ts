import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgStructure } from './entities/org-structure.entity';
import { Signatory } from './entities/signatory.entity';
import { CreateOrgDto } from './dto/create-org.dto';
import { CreateSignatoryDto } from './dto/create-signatory.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrgStructure)
    private orgRepo: Repository<OrgStructure>,
    @InjectRepository(Signatory)
    private signatoryRepo: Repository<Signatory>,
  ) {}

  // --- Struktur Organisasi ---
  async createOrg(dto: CreateOrgDto) {
    const org = this.orgRepo.create(dto);
    return this.orgRepo.save(org);
  }

  async findAllOrg() {
    return this.orgRepo.find();
  }

  async deleteOrg(id: string) {
    const result = await this.orgRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Data tidak ditemukan');
    return { message: 'Berhasil dihapus' };
  }

  // --- Pejabat Penandatangan ---
  async createSignatory(dto: CreateSignatoryDto) {
    const signatory = this.signatoryRepo.create(dto);
    return this.signatoryRepo.save(signatory);
  }

  async findAllSignatories() {
    // Urutkan berdasarkan status aktif (terbaru di atas)
    return this.signatoryRepo.find({ order: { isActive: 'DESC' } });
  }

  async deleteSignatory(id: string) {
    const result = await this.signatoryRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Data tidak ditemukan');
    return { message: 'Berhasil dihapus' };
  }
}