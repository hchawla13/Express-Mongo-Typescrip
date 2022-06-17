import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Recruiter from '../models/Recruiter';
import Logging from '../library/Logging';
import xlsx from 'xlsx';
import multer from 'multer';

// mutter
const storage  = multer.diskStorage ({
    destination : function (req,file,cb) {
        cb ( null , './public/uploads')
    },
    filename : function ( req , file , cb ) {
        cb ( null,file.originalname)
    }
})
var upload = multer({storage} )



const createRecruiter = (req: Request, res: Response, next: NextFunction) => {
    const { 
        full_name,
        email1,
        email2,
        email3,
        email4,
        current_position,
        company_name,
        person_city
    } = req.body;

    const recruiter = new Recruiter({
        _id: new mongoose.Types.ObjectId(),
        full_name,
        email1,
        email2,
        email3,
        email4,
        current_position,
        company_name,
        person_city
    });

    return recruiter
        .save()
        .then((recruiter) => res.status(201).json({ recruiter }))
        .catch((error) => res.status(500).json({ error }));
};

const addBulkList = (req: Request, res: Response, next: NextFunction) => {
    Logging.info('---entering here----')
    const workbook = xlsx.readFile('./static/recruiter_list.json');
    let obj = {},arr=[];
    let workSheet = workbook.Sheets[workbook.SheetNames[0]];
    for(let index = 0; index < 7;index++){
        const id = workSheet[`A${index}`].v;
        const name = workSheet[`B${index}`].v;
        obj = {
            id,
            name
        }
    arr.push(obj)
    }
    Logging.info(`data---->${arr}`);

};

const readRecruiter = (req: Request, res: Response, next: NextFunction) => {
    const recruiterId = req.params.recruiterId;

    return Recruiter.findById(recruiterId)
        .then((recruiter) => (recruiter ? res.status(200).json({ recruiter }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Recruiter.find()
        .then((recruiters) => res.status(200).json({ recruiters }))
        .catch((error) => res.status(500).json({ error }));
};

const updateRecruiter = (req: Request, res: Response, next: NextFunction) => {
    const recruiterId = req.params.recruiterId;

    return Recruiter.findById(recruiterId)
        .then((recruiter) => {
            if (recruiter) {
                recruiter.set(req.body);

                return recruiter
                    .save()
                    .then((recruiter) => res.status(201).json({ recruiter }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteRecruiter = (req: Request, res: Response, next: NextFunction) => {
    const recruiterId = req.params.recruiterId;

    return Recruiter.findByIdAndDelete(recruiterId)
        .then((recruiter) => (recruiter ? res.status(201).json({ recruiter, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createRecruiter, readRecruiter, readAll, updateRecruiter, deleteRecruiter, addBulkList };