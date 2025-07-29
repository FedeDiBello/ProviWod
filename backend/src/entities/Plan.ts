import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  type!: 'semana' | 'mes' | 'trimestre';

  @Column({ type: 'jsonb' })
  content: any;

  @Column()
  imageUrl!: string;

  @ManyToOne(() => User, (user) => user.plans)
  coach!: User;

  @CreateDateColumn()
  createdAt!: Date;
}