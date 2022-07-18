import {Module} from '@nestjs/common';
import {UserEntity} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserService} from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    exports: [TypeOrmModule, UserService]
})
export class UserModule {}
