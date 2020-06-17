import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authcredentialsDto);
  }

  async signIn(authcredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(authcredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
