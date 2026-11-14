import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ 
      where: { email },
      relations: { role: true } // <-- Ini yang diubah
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }

  // 1. Ambil semua user (untuk ditampilkan di tabel Admin)
  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: { role: true } });
  }

  // 2. Ubah role atau status aktif user
  async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
    // Jika data kosong, lempar error yang jelas
    if (Object.keys(updateData).length === 0) {
       throw new Error('Data update tidak boleh kosong');
    }
    
    await this.usersRepository.update(id, updateData);
    return this.usersRepository.findOne({ 
      where: { id }, 
      relations: { role: true } 
    });
  }

}