import { Router } from 'express';
import associationController from '../controllers/association.controller';
import userController from '../controllers/user.controller';
import messageController from '../controllers/contactMessage.controller';
import checkAuth from '../middlewares/checkAuth';
import checkRequestFields from '../middlewares/checkRequestFields';
import { rateLimiterSpam } from '../middlewares/rateLimiter';

let router: Router = Router();

router.get('/api/associations', associationController.getAssociations);
router.post('/api/association/add', rateLimiterSpam, checkRequestFields("name", "description", "category", "continent", "country", "contactName", "contactEmail"), associationController.addAssociation);
router.delete('/api/association/delete', rateLimiterSpam, checkRequestFields("name"), associationController.deleteAssociation);
router.patch('/api/association/update', rateLimiterSpam, checkRequestFields(""), associationController.updateAssociation);
router.get('/api/user', rateLimiterSpam, checkRequestFields(""), userController.getUser);
router.post('/api/user/add', rateLimiterSpam, checkRequestFields(""), userController.register);
router.post('/api/user/login', rateLimiterSpam, checkRequestFields(""), userController.login);
router.delete('/api/user/delete', rateLimiterSpam, checkRequestFields(""), checkAuth, userController.deleteUser);
router.post('/api/message/add', rateLimiterSpam, checkRequestFields(""), messageController.sendMessage);

export = router;