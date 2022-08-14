import {Injectable} from '@nestjs/common';
import {UserProfileEntity} from './user-profile.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfileEntity)
        private userProfileRepostory: Repository<UserProfileEntity>
    ) {}

    async getUserProfileById(id: number): Promise<UserProfileEntity> {
        return await this.userProfileRepostory.findOneBy({id});
    }

    async saveUserProfilePhotoLocation(id: number, photoUrlLocation: string): Promise<UserProfileEntity> {
        const result = await this.userProfileRepostory.createQueryBuilder()
            .update(UserProfileEntity)
            .set({
                photo: photoUrlLocation
            })
            .where({id})
            .returning('*')
            .execute();

        return result.raw;
    }
}
