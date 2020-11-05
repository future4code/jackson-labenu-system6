import { Request, Response } from 'express'
import knex from '../database/connection'

import { existsOrError, notExistsOrError } from '../util/Validations'

class StudentController {
  static async index(req: Request, res: Response) {
    try {
      const student = await knex('student').select('*')
      return res.status(200).json(student)
      
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  static async create(req: Request, res: Response) {
    const { name, email, birthdate } = req.body

    try {
      existsOrError(name, 'name is missing')
      existsOrError(email, 'email is missing')
      existsOrError(birthdate, 'birthdate is missing')

      const studentFromDB = await knex('student').where({ email }).first()
      notExistsOrError(studentFromDB, 'email already registered')


    } catch (error) {
      return res.status(400).send({ message: error })
    }

    try {
      const [studentID] = await knex('student').insert({ name, email, birthdate })

      return res.status(201).json({
        id: studentID,
        name,
        email,
        birthdate
      })
    } catch (error) {

      return res.status(500).send(error)

    }
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params
    
    try {
      const student = await knex('student').where({ id }).first()
      existsOrError(student, "student not found")
      
      return res.status(200).json({ id: student.id, birthdate: student.birthdate })
    } catch (error) {
      if (error === "student not found") 
        return res.status(404).json({ message: error })

      return res.status(500).send(error)
    }
  }
}

export default StudentController