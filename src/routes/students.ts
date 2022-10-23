import { guard } from '../middlewares/guards';
import { Router } from 'express';
import { createStudent, deleteStudent, getAllStudents, getStudentById, loginStudent, updateStudent } from '../controllers/students';

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', createStudent)
studentRouter.delete('/', deleteStudent)
studentRouter.put('/', guard, updateStudent)
studentRouter.get('/:id', getStudentById)
studentRouter.post('/login', loginStudent);

export default studentRouter;
