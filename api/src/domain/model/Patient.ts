import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import Login from "./Login";

@Entity()
export default class Patient {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(type => Login)
    @JoinColumn()
    login!: Login

    @Column({ type: 'char', length: 11 })
    phone!: string

    @Column({ type: 'char', length: 11 })
    cpf!: string
}