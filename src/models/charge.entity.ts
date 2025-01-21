import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Paiement } from "./paiement.entity";
import e from "express";
import { enumStatus } from "../types/enumStatus";

@Entity("charge")
export class Charge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Ex. "loyer", "frais fixes", "courses"

  @Column("decimal", { precision: 10, scale: 2 })
  montant: number;

  @Column({ type: "date" })
  dateCharge: Date;

  @Column({ nullable: true })
  description: string;

  // Enum status
  @Column({
    type: "enum",
    enum: ["TO PAY", "PARTIALLY_PAID", "FULLY_PAID"],
    default: "TO PAY",
  })
  status: enumStatus;

  @OneToMany(() => Paiement, (paiement) => paiement.charge)
  paiements: Paiement[];
}
