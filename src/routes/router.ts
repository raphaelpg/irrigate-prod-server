import { Router } from 'express';
import { getAssociations, addAssociation, deleteAssociation, updateAssociation } from '../controllers/association.controller';
import { signUp, getUser, deleteUser } from '../controllers/user.controller';
import { sendMessage } from '../controllers/contactMessage.controller';

let router: Router = Router();

router.get('/api/associations', getAssociations);
router.post('/api/association/add', addAssociation);
router.delete('/api/association/delete', deleteAssociation);
router.patch('/api/association/update', updateAssociation);
router.get('/api/user', getUser);
router.post('/api/user/add', signUp);
router.delete('/api/user/delete', deleteUser);
router.post('/api/message/add', sendMessage);

export = router;