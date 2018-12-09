import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import Provider from "./Provider";

@Entity()
export default class TimeSlot {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(type => Provider)
    @JoinColumn()
    provider!: Provider

    @Column({ type: 'timestamp with time zone' })
    startsAt!: Date

    @Column({ type: 'timestamp with time zone' })
    endsAt!: Date
}