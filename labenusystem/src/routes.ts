import { Router } from 'express'
import MissionController from './controllers/MissionController'

import StudentController from './controllers/StudentController'
import TeacherController from './controllers/TeacherController'

const routes = Router()

routes.get('/student', StudentController.index)
routes.get('/student/:id', StudentController.show)
routes.put('/student', StudentController.create)

routes.get('/teacher', TeacherController.index)
routes.get('/teacher/:id', TeacherController.show)
routes.put('/teacher', TeacherController.create)

routes.put('/mission', MissionController.create)
routes.get('/mission', MissionController.index)

export default routes