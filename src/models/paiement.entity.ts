import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Utilisateur } from './user.entity';
  import { Charge } from './charge.entity';
  
  @Entity('paiement')
  export class Paiement {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    montant: number;
  
    @Column({ type: 'date' })
    datePaiement: Date;
  
    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.paiements)
    utilisateur: Utilisateur;
  
    @ManyToOne(() => Charge, (charge) => charge.paiements)
    charge: Charge;
  }
  