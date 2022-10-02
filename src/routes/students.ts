import { Router } from 'express';
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from '../controllers/students';

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', createStudent)
studentRouter.delete('/', deleteStudent)
studentRouter.put('/', updateStudent)
studentRouter.get('/:id', getStudentById)

export default studentRouter;
