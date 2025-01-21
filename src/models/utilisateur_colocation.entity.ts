import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Utilisateur } from './user.entity';
  import { Colocation } from './colocation.entity';
  
  @Entity('utilisateur_colocation')
  export class UtilisateurColocation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    statut: string; // Ex. "propriétaire" ou "colocataire"
  
    @Column({ type: 'date' })
    dateEntree: Date;
  
    @Column({ type: 'date', nullable: true })
    dateSortie: Date;
  
    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.utilisateurColocations)
    utilisateur: Utilisateur;
  
    @ManyToOne(() => Colocation, (colocation) => colocation.utilisateurColocations)
    colocation: Colocation;
  }
  