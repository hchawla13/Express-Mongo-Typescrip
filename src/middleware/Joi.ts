import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IAuthor } from '../models/Author';
import { IRecruiter } from '../models/Recruiter';
import { ICreditCard } from '../models/CreditCard';
import { IBook } from '../models/Book';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required()
        })
    },
    recruiter: {
        create: Joi.object<IRecruiter>({
            full_name: Joi.string().required(),
            email1: Joi.string().required(),
            email2: Joi.string().optional().allow(''),
            email3: Joi.string().optional().allow(''),
            email4: Joi.string().optional().allow(''),
            current_position: Joi.string().optional().allow(''),
            company_name: Joi.string().required(),
            person_city: Joi.string().required(),
        }),
        update: Joi.object<IRecruiter>({
            full_name: Joi.string().required(),
            email1: Joi.string().required(),
            email2: Joi.string().optional().allow(''),
            email3: Joi.string().optional().allow(''),
            email4: Joi.string().optional().allow(''),
            current_position: Joi.string().optional().allow(''),
            company_name: Joi.string().required(),
            person_city: Joi.string().required(),
        })
    },
    creditCard: {
        create: Joi.object<ICreditCard>({
            full_name: Joi.string().required(),
            email1: Joi.string().required(),
            email2: Joi.string().optional().allow(''),
            email3: Joi.string().optional().allow(''),
            email4: Joi.string().optional().allow(''),
            current_position: Joi.string().optional().allow(''),
            company_name: Joi.string().required(),
            person_city: Joi.string().required(),
        }),
        update: Joi.object<ICreditCard>({
            full_name: Joi.string().required(),
            email1: Joi.string().required(),
            email2: Joi.string().optional().allow(''),
            email3: Joi.string().optional().allow(''),
            email4: Joi.string().optional().allow(''),
            current_position: Joi.string().optional().allow(''),
            company_name: Joi.string().required(),
            person_city: Joi.string().required(),
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};
