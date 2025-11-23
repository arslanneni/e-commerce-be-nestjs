import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: true })
  lastName: string | null;

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string | null;

  @ManyToOne(() => Role, role => role.users, { nullable: true })
  role: Role;

  @Column({ type: 'varchar', length: 30, default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_datetime', type: 'timestamp' })
  createdDatetime: Date;

  @UpdateDateColumn({ name: 'modified_datetime', type: 'timestamp' })
  modifiedDatetime: Date;

//   // ========== RELATIONS ==========

//   @OneToMany(() => UserEmail, email => email.user)
//   emails: UserEmail[];

//   @OneToMany(() => Address, address => address.user)
//   addresses: Address[];
}
