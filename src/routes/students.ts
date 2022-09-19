import { Router } from 'express';
import { createStudent, getAllStudents } from '../controllers/students';

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', createStudent)

export default studentRouter;
