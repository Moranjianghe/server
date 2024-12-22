import Router from 'koa-router';
import { registerUser, loginUser  } from '../controllers/user';

const router = new Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
