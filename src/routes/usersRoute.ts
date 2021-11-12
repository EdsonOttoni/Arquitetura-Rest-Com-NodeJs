import { Router, Request, Response, NextFunction } from "express";
import {StatusCodes} from 'http-status-codes'

const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response ) => {
  const users = {users: [
    {
      id: 1,
      name: 'Edson Ottoni',
    }
  ]}
  res.status(StatusCodes.OK).json(users)
})

usersRoute.get('/users/:uuid', (req: Request<{ uuid:String }>, res: Response ) => {
  const user = req.params.uuid
  res.status(StatusCodes.OK).send({user})
})

usersRoute.post('/users', (req: Request, res: Response) => {
  const newUser = req.body
  res.status(StatusCodes.CREATED).send({newUser})
})

export default usersRoute