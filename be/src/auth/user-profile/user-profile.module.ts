import {Module} from '@nestjs/common';
import {UserProfileController} from './user-profile.controller';
import {UserProfileEntity} from './user-profile.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserProfileService} from './user-profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileEntity])],
    controllers: [UserProfileController],
    providers: [UserProfileService],
    exports: [UserProfileService]
})
export class UserProfileModule {}
