import { Router } from 'express';
import associationController from '../controllers/association.controller';
import userController from '../controllers/user.controller';
import messageController from '../controllers/contactMessage.controller';
import checkAuth from '../middleware/checkAuth';

let router: Router = Router();

router.get('/api/associations', associationController.getAssociations);
router.post('/api/association/add', associationController.addAssociation);
router.delete('/api/association/delete', associationController.deleteAssociation);
router.patch('/api/association/update', associationController.updateAssociation);
router.get('/api/user', userController.getUser);
router.post('/api/user/add', userController.register);
router.post('/api/user/login', userController.login);
router.delete('/api/user/delete', checkAuth, userController.deleteUser);
router.post('/api/message/add', messageController.sendMessage);

export = router;