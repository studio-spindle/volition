import {Module} from '@nestjs/common';
import {UserEntity} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserService} from './user.service';
import {UserProfileEntity} from '../../user-profile/user-profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
    providers: [UserService],
    exports: [TypeOrmModule, UserService]
})
export class UserModule {}
