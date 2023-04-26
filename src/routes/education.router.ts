import { Router } from 'express'
import { mainConnection } from '../databaseConnection'
import { StudentRepo } from '../repositories/students.repo'
import { GroupsRepo } from '../repositories/groups.repo'
import { DepartmentRepo } from '../repositories/department.repo'
import { EducationMainService } from '../services/education.service'
import { EducationController } from '../controllers/student.controllers'


const studentRepo = new StudentRepo(mainConnection)
const groupsRepo = new GroupsRepo(mainConnection)
const departamentRepo = new DepartmentRepo(mainConnection)

const educationMainService = new EducationMainService(studentRepo,groupsRepo,departamentRepo)

const educationController = new EducationController(educationMainService)

export const educationRouter = Router()

educationRouter.get('/info', educationController.getAllInfo.bind(educationController))
educationRouter.get('/', educationController.getAllStudents.bind(educationController))
educationRouter.post('/', educationController.insertStudents.bind(educationController))
