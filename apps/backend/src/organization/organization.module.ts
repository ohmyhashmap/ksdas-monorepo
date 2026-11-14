import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrgStructure } from './entities/org-structure.entity';
import { Signatory } from './entities/signatory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrgStructure, Signatory])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}