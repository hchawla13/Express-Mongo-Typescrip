import controller from '../controllers/CreditCard';
import express from 'express';
import { Schemas, ValidateJoi } from '../middleware/Joi';
const router = express.Router();

router.post('/create', ValidateJoi(Schemas.creditCard.create), controller.createCreditCard);
router.get('/get/:creditCardId', controller.readCreditCard);

router.get('/get', controller.readAll);
router.patch('/update/:creditCardId', ValidateJoi(Schemas.creditCard.update), controller.updateCreditCard);
router.delete('/delete/:creditCardId', controller.deleteCreditCard);
export = router;