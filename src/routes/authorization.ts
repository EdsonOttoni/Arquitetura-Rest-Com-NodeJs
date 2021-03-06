import { Router, Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbiddenErrorModel";
import userRepository from "../repositories/userRepository";
import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basicAutheticationMIddleware";

const authorizationRoute = Router()

authorizationRoute.post('/token', basicAuthenticationMiddleware ,async (req: Request, res: Response, next: NextFunction) => {
  try{

    const user = req.user

    if(!user) {
      throw new ForbiddenError('Usuario não informado')
    }

    const jwtPayload = { username: user.username }
    const secretKey = 'my_secret_key'
    const jwtOptions = { subject: user?.uuid }

    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)

    res.status(StatusCodes.OK).json({ token: jwt })


  }catch(error){
    next(error)
  }
})

export default authorizationRoute