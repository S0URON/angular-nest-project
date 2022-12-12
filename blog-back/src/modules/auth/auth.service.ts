import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const passwordIsValid = await bcrypt.compare(pass, user.password);
      if (passwordIsValid) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };

    return {
      _id: user.id,
      role: payload.role,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: CreateUserDto) {
    await this.userService.create(user);
  }
}
