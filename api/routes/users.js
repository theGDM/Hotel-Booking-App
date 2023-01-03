import express from 'express';
import { verifyAdmin, verifyUser } from '../utills/verifyToken.js';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

// Authorisation Examples
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in!");
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete your account");
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can delete all the accounts");
// })

//UPDATE
router.put("/:id", verifyUser, updateUser); //so the owner or admin can update the user

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getAllUsers); //only admin can get all the data, not every user

export default router;