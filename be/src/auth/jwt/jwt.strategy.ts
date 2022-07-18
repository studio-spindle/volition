import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtPayload} from './jwt-payload.interface';
import * as config from 'config';
import {UserService} from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    })
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.userService.findOneBy({username});

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
