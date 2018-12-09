import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {

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