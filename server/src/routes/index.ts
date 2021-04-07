import { Router } from 'express';
import {auth} from './security/auth';
import {user} from "./users/user";

export const index = Router();

index.use('/api/auth', auth);
index.use('/api/user', user);