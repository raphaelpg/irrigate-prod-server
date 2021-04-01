import { Router } from 'express';
import associationController from '../controllers/association.controller';
import userController from '../controllers/user.controller';
import messageController from '../controllers/contactMessage.controller';
import checkAuth from '../middlewares/checkAuth';
import checkRequestFields from '../middlewares/checkRequestFields';

let router: Router = Router();

router.get('/api/associations', associationController.getAssociations);
router.post('/api/association/add', checkRequestFields("name", "description", "category", "continent", "country", "contactName", "contactEmail"), associationController.addAssociation);
router.delete('/api/association/delete', checkRequestFields("name"), associationController.deleteAssociation);
router.patch('/api/association/update', checkRequestFields(""), associationController.updateAssociation);
router.get('/api/user', checkRequestFields(""), userController.getUser);
router.post('/api/user/add', checkRequestFields(""), userController.register);
router.post('/api/user/login', checkRequestFields(""), userController.login);
router.delete('/api/user/delete', checkRequestFields(""), checkAuth, userController.deleteUser);
router.post('/api/message/add', checkRequestFields(""), messageController.sendMessage);

export = router;