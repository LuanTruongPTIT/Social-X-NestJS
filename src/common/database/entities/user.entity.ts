import { ENUM_USER_SIGN_UP_FROM } from '~@modules/user/constants/user.enum.constant';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { DatabaseTypeormBaseEntityAbstract } from '~@common/database/base/database.typeorm.base.entity';
import { BadRequestException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { TweetEntity } from './tweet.entity';

@Entity({ name: 'UserEntity' })
export class UserEntity extends DatabaseTypeormBaseEntityAbstract {
  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  mobileNumber?: string;

  @Column({ nullable: false })
  email: string;

  @Column({})
  password: string;

  @Column({ nullable: true })
  passwordExpired: Date;

  @Column({ nullable: true })
  passwordCreated: Date;

  @Column({ nullable: true })
  passwordAttempt: number;

  @Column({ nullable: true })
  signUpDate: Date;

  @Column({ nullable: true })
  signUpFrom: ENUM_USER_SIGN_UP_FROM;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  isActive: boolean;

  @Column({ nullable: true })
  inactivePermanent: boolean;

  @Column({ nullable: true })
  inactiveDate?: Date;

  @Column({ nullable: true })
  blocked: boolean;

  @Column({ nullable: true })
  blockedDate?: Date;

  @Column({ nullable: true })
  follower_count: number;

  @Column({ nullable: true })
  following_count: number;

  @OneToMany(() => TweetEntity, (tweet) => tweet.user)
  tweet: TweetEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      throw new BadRequestException({
        message: 'Password is not empty',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
  }
}
