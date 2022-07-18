import {Injectable, UnauthorizedException, Logger} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import {UserService} from './user/user.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
      private userService: UserService,
      private jwtService: JwtService,
  ) {}

  async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userService.signUp(authcredentialsDto);
  }

  async signIn(authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authcredentialsDto;
    const user = await this.userService.findOneBy({username});

    if (!user && !(await bcrypt.compare(password, user?.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);

    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`)

    return { accessToken };
  }
}
