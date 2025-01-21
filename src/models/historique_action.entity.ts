import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Utilisateur } from './user.entity';
  import { Colocation } from './colocation.entity';
  
  @Entity('historique_action')
  export class HistoriqueAction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    libelle: string;
  
    @Column({ nullable: true })
    description: string;
  
    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.historiques)
    utilisateur: Utilisateur;
  
    @ManyToOne(() => Colocation, (colocation) => colocation.historiques)
    colocation: Colocation;
  }
  