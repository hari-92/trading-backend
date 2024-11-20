import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  login(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }
}
