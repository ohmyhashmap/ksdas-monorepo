import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(registerDto.password, salt);

    // Simpan user baru (is_active = false secara default di DB)
    const user = await this.usersService.create({
      email: registerDto.email,
      passwordHash,
      roleId: registerDto.roleId,
      facultyId: registerDto.facultyId,
      prodiId: registerDto.prodiId,
      isActive: true, // Untuk testing, kita set true agar bisa langsung login
    });

    return { message: 'Registrasi berhasil', userId: user.id };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Akun belum diaktifkan oleh Admin');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    // Buat JWT Token
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role.name, // admin, wr, dekan, dll
      facultyId: user.facultyId,
      prodiId: user.prodiId
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
      }
    };
  }
}