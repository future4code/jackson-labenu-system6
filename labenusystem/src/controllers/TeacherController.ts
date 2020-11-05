import { Request, Response } from 'express'
import knex from '../database/connection'

import { existsOrError, notExistsOrError } from '../util/Validations'

class TeacherController {
  static async index(req: Request, res: Response) {
    try {
      const teacher = await knex('teacher').select('*')

      return res.status(200).json(teacher)
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

      const teacherFromDB = await knex('teacher').where({ email }).first()
      notExistsOrError(teacherFromDB, 'email already registered')


    } catch (error) {
      return res.status(400).send({ message: error })
    }

    try {
      const [teacherID] = await knex('teacher').insert({ name, email, birthdate })

      return res.status(201).json({
        id: teacherID,
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
      const teacher = await knex('teacher').where({ id }).first()
      existsOrError(teacher, "teacher not found")
      
      return res.status(200).json({ id: teacher.id, birthdate: teacher.birthdate })
    } catch (error) {
      if (error === "teacher not found") 
        return res.status(404).json({ message: error })

      return res.status(500).send(error)
    }
  }
}

export default TeacherController