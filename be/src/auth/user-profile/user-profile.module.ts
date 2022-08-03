import {Module} from '@nestjs/common';
import {UserProfileController} from './user-profile.controller';
import {UserProfileEntity} from './user-profile.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileEntity])],
    controllers: [UserProfileController],
})
export class UserProfileModule {}
