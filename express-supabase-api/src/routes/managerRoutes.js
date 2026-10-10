import express from "express";

import{
    createManager,
    getAllManagers,
    getManagerById,
    updateManager,
    deleteManager,
}from "../controllers/managerController.js";

import{authenticate} from "../middleware/authenticate.js";
import{authorize} from "../middleware/authorize.js";

const router =express.Router();

router.use(authenticate);

router.post("/",authorize("manager"),createManager);
router.get("/",authorize("manager"),getAllManagers);
router.get("/:id",authorize("manager"),getManagerById);
router.put("/:id",authorize("manager"),updateManager);
router.delete("/:id",authorize("manager"),deleteManager);

export default router;

