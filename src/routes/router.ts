import { Router } from 'express'
import { sendMessage } from '../controllers/contactMessage.controller';
import { signUp } from '../controllers/user.controller';
import { getAssociations, addAssociation } from '../controllers/association.controller';
let router: Router = Router();

router.get('/api/associations', getAssociations)
router.post('/api/add_association', addAssociation);
router.post('/message', sendMessage);
router.post('/signup', signUp)

export = router;