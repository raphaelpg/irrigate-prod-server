import { Router } from 'express';
import { getAssociations, addAssociation } from '../controllers/association.controller';
import { sendMessage } from '../controllers/contactMessage.controller';
import { signUp, getUser } from '../controllers/user.controller';

let router: Router = Router();

router.get('/api/associations', getAssociations);
router.post('/api/add_association', addAssociation);
router.post('/message', sendMessage);
router.post('/signup', signUp);
router.post('/user', getUser);
router.get('/auth', (err, res, req) => {
  res.status(200).json({ status: 200, msg: 'User created' });
});

export = router;