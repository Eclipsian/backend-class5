import { Router } from 'express';
import { getAllStudents } from '../controllers/students';

const studentRouter = Router();

studentRouter.get('/', getAllStudents);

export default studentRouter