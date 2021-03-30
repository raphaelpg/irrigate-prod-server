import { Router } from 'express';
import { getAssociations, addAssociation, deleteAssociation, updateAssociation } from '../controllers/association.controller';
import usercontroller from '../controllers/user.controller';
import { sendMessage } from '../controllers/contactMessage.controller';
import checkAuth from '../middleware/checkAuth';

let router: Router = Router();

router.get('/api/associations', getAssociations);
router.post('/api/association/add', addAssociation);
router.delete('/api/association/delete', deleteAssociation);
router.patch('/api/association/update', updateAssociation);
router.get('/api/user', usercontroller.getUser);
router.post('/api/user/add', usercontroller.register);
router.post('/api/user/login', usercontroller.login);
router.delete('/api/user/delete', checkAuth, usercontroller.deleteUser);
router.post('/api/message/add', sendMessage);

export = router;