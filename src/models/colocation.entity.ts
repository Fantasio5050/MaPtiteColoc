import { Entity, PrimaryGeneratedColumn, Column, OneToMany,} from 'typeorm';
  import { UtilisateurColocation } from './utilisateur_colocation.entity';
  import { HistoriqueAction } from './historique_action.entity';
  
  @Entity('colocation')
  export class Colocation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    lieu: string;
  
    @Column()
    surface: number;
  
    @Column()
    nombreChambres: number;
  
    @Column({ nullable: true })
    agence: string;
  
    @OneToMany(() => UtilisateurColocation, (utilisateurColocation) => utilisateurColocation.colocation)
    utilisateurColocations: UtilisateurColocation[];
  
    @OneToMany(() => HistoriqueAction, (historique) => historique.colocation)
    historiques: HistoriqueAction[];
  }
  