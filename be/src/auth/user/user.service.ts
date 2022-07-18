import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {AuthCredentialsDto} from '../dto/auth-credentials.dto';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import * as bcrypt from 'bcrypt';
import {InjectRepository} from '@nestjs/typeorm';

enum ErrorCodes {
    DUPLICATE_USERNAME = '23505'
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    static async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authcredentialsDto;

        const user = this.userRepository.create();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await UserService.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === ErrorCodes.DUPLICATE_USERNAME) {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authcredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authcredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    async findOneBy({ username }): Promise<UserEntity> {
        return await this.userRepository.findOneBy({username})
    }
}
