import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description?: string | null | undefined;

  @Column({ type: "integer" })
  duration: number;

  @Column({ type: "integer" })
  price: number;
}

export { Movie };