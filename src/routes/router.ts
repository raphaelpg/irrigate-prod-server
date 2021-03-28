import { Router } from 'express';
import { getAssociations, addAssociation, deleteAssociation, updateAssociation } from '../controllers/association.controller';
import { signUp, getUser, deleteUser } from '../controllers/user.controller';
import { sendMessage } from '../controllers/contactMessage.controller';

let router: Router = Router();

router.get('/api/associations', getAssociations);
router.post('/api/add_association', addAssociation);
router.post('/api/delete_association', deleteAssociation);
router.post('/api/update_association', updateAssociation);
router.post('/user', getUser);
router.post('/signup', signUp);
router.post('/signout', deleteUser);
router.post('/message', sendMessage);

export = router;