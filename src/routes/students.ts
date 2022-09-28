import { Router } from 'express';
import { createStudent, deleteStudent, getAllStudents } from '../controllers/students';

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', createStudent)
studentRouter.delete('/', deleteStudent)

export default studentRouter;
