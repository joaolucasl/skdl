import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Login from "./Login";

@Entity()
export default class Provider {
    @PrimaryGeneratedColumn()
    id!: String

    @OneToOne(type => Login)
    @JoinColumn()
    login!: Login


}