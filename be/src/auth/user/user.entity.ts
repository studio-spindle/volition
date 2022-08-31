import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {TaskEntity} from "../../tasks/task.entity";
import {UserProfileEntity} from '../../user-profile/user-profile.entity';

/**
 * Used to store identity data, i.e.: username, password hash, e-mail address, etc.
 */
@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => TaskEntity, task => task.user, { eager:true })
  tasks: TaskEntity[];

  @OneToOne(() => UserProfileEntity, { eager: true, cascade: true })
  @JoinColumn()
  userProfile: UserProfileEntity

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
