import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Login from "./Login";

@Entity()
export default class Provider {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(type => Login)
    @JoinColumn()
    login!: Login
}