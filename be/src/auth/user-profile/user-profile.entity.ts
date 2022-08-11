import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

/**
 * Used to store profile data, i.e.: user preferences, latest activity, status updates, etc.
 */
@Entity()
export class UserProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    photo: string;

    @Column({ nullable: true })
    organisation: string;
}
