import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; 

    @Column()
  description: string; 

    @Column()
  status: string; 

  @OneToMany(() => User, user => user.role)
  users: User[];

  @CreateDateColumn()
  created_datetime: Date;

   @CreateDateColumn()
  modified_datetime: Date;
}
