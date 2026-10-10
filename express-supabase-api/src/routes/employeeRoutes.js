import express from 'express';
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from '../controllers/employeeController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();
router.use(authenticate);

router.post("/", authorize("employee"), createEmployee);
router.get("/", authorize("employee"), getAllEmployees);
router.get("/:id", authorize("employee"), getEmployeeById);
router.put("/:id", authorize("employee"), updateEmployee);
router.delete("/:id", authorize("employee"), deleteEmployee);

export default router;