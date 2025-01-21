import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UtilisateurColocation } from './utilisateur_colocation.entity';
import { Paiement } from './paiement.entity';
import { HistoriqueAction } from './historique_action.entity';

@Entity('utilisateur')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true, length: 191 }) // Réduire la longueur à 191 caractères
  email: string;

  @Column()
  mot_de_passe: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => UtilisateurColocation, (utilisateurColocation) => utilisateurColocation.utilisateur)
  utilisateurColocations: UtilisateurColocation[];

  @OneToMany(() => Paiement, (paiement) => paiement.utilisateur)
  paiements: Paiement[];

  @OneToMany(() => HistoriqueAction, (historique) => historique.utilisateur)
  historiques: HistoriqueAction[];
}