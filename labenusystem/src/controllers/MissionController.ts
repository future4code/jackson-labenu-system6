import { Request, Response } from 'express'
import knex from '../database/connection'

import { existsOrError, notExistsOrError } from '../util/Validations'


class MissionController {
  static async index(req: Request, res: Response) {
    try {
      
      const mission = await knex('mission').select('*')

      return res.status(200).json(mission)
      
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  static async create(req: Request, res: Response) {
    const { name, start_date, end_date, module } = req.body

    try {
      existsOrError(name, 'name is missing')
      existsOrError(start_date, 'start_date is missing')
      existsOrError(end_date, 'end_date is missing')
      existsOrError(module, 'module is missing')

      const missionFromDB = await knex('mission').where({ name }).first()
      notExistsOrError(missionFromDB, 'name already registered')

    } catch (error) {
      return res.status(400).send({ message: error })
    }

    try {
      const [missionID] = await knex('mission').insert({ name, start_date, end_date, module })

      return res.status(201).json({
        id: missionID,
        name,
        start_date,
        end_date,
        module
      })
    } catch (error) {

      return res.status(500).send(error)
    }
  }
}

export default MissionController