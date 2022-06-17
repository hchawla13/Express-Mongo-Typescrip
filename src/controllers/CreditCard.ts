import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import CreditCard from '../models/CreditCard';
import Logging from '../library/Logging';

const createCreditCard = (req: Request, res: Response, next: NextFunction) => {
    Logging.warning(`************* Coming inside credit card controller **********`);
    const { name,
        amount,
        by,
        description,
        date } = req.body;

    const creditCard = new CreditCard({
        _id: new mongoose.Types.ObjectId(),
        name,
        amount,
        by,
        description,
        date
    });

    return creditCard
        .save()
        .then((creditCard) => res.status(201).json({ creditCard }))
        .catch((error) => res.status(500).json({ error }));
};

const readCreditCard = (req: Request, res: Response, next: NextFunction) => {
    const creditCardId = req.params.creditCardId;

    return CreditCard.findById(creditCardId)
        .then((creditCard) => (creditCard ? res.status(200).json({ creditCard }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return CreditCard.find()
        .then((creditCards) => res.status(200).json({ creditCards }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCreditCard = (req: Request, res: Response, next: NextFunction) => {
    const creditCardId = req.params.creditCardId;

    return CreditCard.findById(creditCardId)
        .then((creditCard) => {
            if (creditCard) {
                creditCard.set(req.body);

                return creditCard
                    .save()
                    .then((creditCard) => res.status(201).json({ creditCard }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCreditCard = (req: Request, res: Response, next: NextFunction) => {
    const creditCardId = req.params.creditCardId;

    return CreditCard.findByIdAndDelete(creditCardId)
        .then((creditCard) => (creditCard ? res.status(201).json({ creditCard, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCreditCard, readCreditCard, readAll, updateCreditCard, deleteCreditCard };
