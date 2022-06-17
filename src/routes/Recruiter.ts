import express from 'express';
import controller from '../controllers/Recruiter';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.recruiter.create), controller.createRecruiter);
router.post('/bulkAddExcel',  controller.addBulkList);
router.get('/get/:recruiterId', controller.readRecruiter);
router.get('/get', controller.readAll);
router.patch('/update/:recruiterId', ValidateJoi(Schemas.recruiter.update), controller.updateRecruiter);
router.delete('/delete/:recruiterId', controller.deleteRecruiter);

export = router;
