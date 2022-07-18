import {Test} from "@nestjs/testing";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {UserEntity} from "./user.entity";
import * as bcrypt from 'bcrypt';
import {UserService} from './user.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {UserModule} from './user.module';

const mockCredentialsDto = { username: 'TestUsername', password: 'TestPassword'}

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('UserRepository', () => {
  let userService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository
        },
        UserService,
      ],
    }).compile();

    userService = await module.get<UserService>(UserService);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userService.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully signs up the user', async () => {
      save.mockResolvedValue(undefined);
      await expect(userService.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });
    
    it('throws an conflict exception as username already exists', async () => {
      save.mockRejectedValue({ code: '23505' });
      await expect(userService.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException);
    });

    it('throws an internal server error if the request cannot be handeled', async () => {
      save.mockRejectedValue({ code: '123' }); // unhandeled error code
      await expect(userService.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userService.findOne = jest.fn();
      user = new UserEntity();
      user.username = 'TestUsername';
      user.validatePassword = jest.fn();
    });

    it('returns the username as validation is successful', async () => {
      userService.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userService.validateUserPassword(mockCredentialsDto);
      expect(result).toEqual('TestUsername');
    });

    it('returns null as user cannot be found', async () => {
      userService.findOne.mockResolvedValue(null);
      const result = await userService.validateUserPassword(mockCredentialsDto);
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('returns null if password is invalid', async () => {
      userService.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);
      const result = await userService.validateUserPassword(mockCredentialsDto);
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('hasPassword', () => {
    it('call bcryp.hash to generate a hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userService.hashPassword('testPassword', 'testSalt');
      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
      expect(result).toEqual('testHash');
    });
  });
});
