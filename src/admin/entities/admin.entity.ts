import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryColumn()
    @Generated("uuid")
    uuid: string;

    @Column()
    name: string;

    @Column()
    passwd: string;

    @Column()
    salt: string;
}
