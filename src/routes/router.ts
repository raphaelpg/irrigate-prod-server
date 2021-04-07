import { Router } from 'express';
import associationController from '../controllers/association.controller';
import userController from '../controllers/user.controller';
import messageController from '../controllers/contactMessage.controller';
import checkAuth from '../middlewares/checkAuth';
import checkRequestFields from '../middlewares/checkRequestFields';
import { apiLimiter, restrictiveLimiter } from '../middlewares/rateLimiter';

let router: Router = Router();

router.get('/api/associations', apiLimiter, associationController.getAssociations);
router.post('/api/association/add', restrictiveLimiter, checkRequestFields("name", "description", "category", "continent", "country", "contactName", "contactEmail"), associationController.addAssociation);
router.delete('/api/association/delete', restrictiveLimiter, checkRequestFields("name"), associationController.deleteAssociation);
router.patch('/api/association/update', restrictiveLimiter, checkRequestFields(""), associationController.updateAssociation);
router.get('/api/user', restrictiveLimiter, checkRequestFields(""), userController.getUser);
router.post('/api/user/add', restrictiveLimiter, checkRequestFields(""), userController.register);
router.post('/api/user/login', restrictiveLimiter, checkRequestFields(""), userController.login);
router.delete('/api/user/delete', restrictiveLimiter, checkRequestFields(""), checkAuth, userController.deleteUser);
router.post('/api/message/add', restrictiveLimiter, checkRequestFields(""), messageController.sendMessage);

export = router;