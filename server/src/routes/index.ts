import { Router } from 'express';
import {auth} from './auth';
import {user} from "./user";

export const index = Router();

index.use('/api/auth', auth);
index.use('/api/user', user);