import { Router } from 'express';
import api from './requests';

const app = Router();

app.use('/roulette', api);

export default app;
