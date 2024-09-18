import express from 'express';
import {CreateRole, UpdateRole, getAllRoles, deleteRoles } from '../controllers/role.controller.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new roles in DB
router.post('/create', verifyAdmin ,CreateRole);

//Update roles in DB
router.put('/update/:id',verifyAdmin ,UpdateRole);

//Get ALl the roles from DB

router.get('/', getAllRoles);

//delete the role from DB

router.delete('/deleteRole/:id', deleteRoles);

export default router;