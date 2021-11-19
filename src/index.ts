import 'dotenv/config'
import express from 'express';
import errorHandler from './middlewares/errorHandlerMiddleware';
import authorizationRoute from './routes/authorization';
import statusRoute from './routes/statusRouts';
import usersRoute from './routes/usersRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoute);
app.use(usersRoute);
app.use(authorizationRoute);

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000!');
});