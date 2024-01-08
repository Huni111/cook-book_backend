import express from "express";
const routerR = express.Router();
import * as control from "../controllers/recipeControllers.js";
import protect from "../midlewares/authMidleware.js";


routerR.get("/all", control.fetchAllRecipe)

routerR.get('/some/', control.findRecipe)

routerR.post('/new', protect,control.uploadRecipe)

routerR.put('/update_one/:id', protect,control.updateRecipe)

routerR.delete('/delete/:id', protect,control.deleteRecipe)




export default routerR