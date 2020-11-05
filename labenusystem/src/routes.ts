import { Router } from 'express'

import StudentController from './controllers/StudentController'
import TeacherController from './controllers/TeacherController'

const routes = Router()

routes.get('/student', StudentController.index)
routes.get('/student/:id', StudentController.show)
routes.put('/student', StudentController.create)

routes.get('/teacher', TeacherController.index)
routes.get('/teacher/:id', TeacherController.show)
routes.put('/teacher', TeacherController.create)

export default routes