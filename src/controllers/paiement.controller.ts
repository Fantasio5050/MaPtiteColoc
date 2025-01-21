import { Request, Response } from 'express';
import { PaiementService } from '../services/paiement.service';

export class PaiementController {
    private paiementService: PaiementService;

    constructor() {
        this.paiementService = new PaiementService();
    }

    public async createPaiement(req: Request, res: Response): Promise<void> {
        try {
            const paiement = await this.paiementService.createPaiement(req.body);
            res.status(201).json(paiement);
        } catch (error) {
            res.status(500).json({ message: 'Error creating paiement', error });
        }
    }

    public async getPaiement(req: Request, res: Response): Promise<void> {
        try {
            const paiement = await this.paiementService.getPaiement(req.params.id);
            if (paiement) {
                res.status(200).json(paiement);
            } else {
                res.status(404).json({ message: 'Paiement not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching paiement', error });
        }
    }

    public async updatePaiement(req: Request, res: Response): Promise<void> {
        try {
            const updatedPaiement = await this.paiementService.updatePaiement(req.params.id, req.body);
            if (updatedPaiement) {
                res.status(200).json(updatedPaiement);
            } else {
                res.status(404).json({ message: 'Paiement not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating paiement', error });
        }
    }

    public async deletePaiement(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await this.paiementService.deletePaiement(req.params.id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Paiement not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting paiement', error });
        }
    }
}