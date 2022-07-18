import {JwtStrategy} from './jwt.strategy';
import {Test} from '@nestjs/testing';
import {UserEntity} from '../user/user.entity';
import {UnauthorizedException} from '@nestjs/common';
import {UserModule} from '../user/user.module';
import {UserService} from '../user/user.service';
import {getRepositoryToken} from '@nestjs/typeorm';

const mockUserRepositoryFactory = jest.fn(() => ({
  findOneBy: jest.fn(entity => entity),
}));

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        JwtStrategy,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockUserRepositoryFactory,
        },

      ]
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userService = await module.get<UserService>(UserService);
  });

  describe('validate', () => {
    it('validates and returns user based on JWT payload', async () => {
      const user = new UserEntity();
      user.username = 'TestUser';

      userService.findOneBy.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: 'TestUser' });
      expect(userService.findOne).toHaveBeenCalledWith({ username: 'TestUser' });
      expect(result).toEqual(user);
    });

    it('throws an unauthorized exception as user cannot be found', async () => {
      userService.findOneBy.mockResolvedValue(null);
      expect(jwtStrategy.validate({ username: 'TestUser' })).rejects.toThrow(UnauthorizedException);
    });
  });
});
