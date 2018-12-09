import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Login {

    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar")
    fullName?: string

    @Column("varchar")
    email?: string

    @Column("varchar")
    passwordHash?: string

    @Column("varchar")
    avatarUrl?: string

}