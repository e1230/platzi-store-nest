import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  image: string;
}
