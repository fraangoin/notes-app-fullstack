import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column('text')
    content: string;
    
    @Column({ default: false })
    isArchived: boolean;
}