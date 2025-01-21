import { Router } from 'express';
import { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } from '../controllers/paiement.controller';

// src/routes/paiement.routes.ts:
const router = Router();

router.post('/paiement', createPayment);
router.get('/paiements', getPayments);
router.get('/paiement/:id', getPaymentById);
router.put('/paiement/:id', updatePayment);
router.delete('/paiement/:id', deletePayment);

export default router;