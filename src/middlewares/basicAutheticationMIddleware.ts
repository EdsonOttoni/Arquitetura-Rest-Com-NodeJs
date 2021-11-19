import { Response, Request, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbiddenErrorModel";
import userRepository from "../repositories/userRepository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
  try {
    const authorizationHeader = req.headers['authorization']
  
    if(!authorizationHeader){
      throw new ForbiddenError('Credencias não informadas')
    }

    const [authenticationType, token] = authorizationHeader.split(' ')

    if (authenticationType !== 'Basic' || !token) {
      throw new ForbiddenError('Tipo de autenticação invalida')
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

    const [username, password] = tokenContent.split(':')

    if(!username || !password) {
      throw new ForbiddenError('credencias não preenchidas')
    }

    const user = await userRepository.findByUsernameAndPassword(username, password)

    if(!user) {
      throw new ForbiddenError('usuario não existe')
    }

    req.user = user
    next()
  }catch(error){
    next(error)
  }

}

export default basicAuthenticationMiddleware