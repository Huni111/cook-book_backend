import express from "express";
const router = express.Router();
import {authUser,
    regUser,
    logoutUser,
    getUser,
    updateUser} from '../controllers/userControler.js'
import protect from "../midlewares/authMidleware.js";


router.post('/', regUser)

router.post('/auth', authUser);

router.post('/logout', logoutUser);

router.route('/profile').get(protect,getUser).put(protect,updateUser)







export default router;