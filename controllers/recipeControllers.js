import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js"


//desc: Fetch all existing recipes!
//route: GET api/recipe/all
//access: public
const fetchAllRecipe = asyncHandler(async (req, res) => {



    const recipes = await Recipe.find({});

    if (recipes && recipes.length !== 0) {

        res.json(recipes)

    } else {
        res.status(404).json({ message: "No recipes found. Please check your query or add new recipes" });
    }
});

//desc: Fetch a specific recipe by ID
//route: GET api/recipe/:id
//access: public
const getRecipeById = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {

        res.json(recipe);

    } else {

        res.status(404).json({ message: "Recipe not found!" });
    }
});

//desc: Upload new recipe!
//route: POST api/recipe/new
//access: private
const uploadRecipe = asyncHandler(async (req, res) => {


    const { name, meal_time, category, ingredients, instructions, image_link, preparation_time, language } = req.body;
    const author = req.user._id
    const recipeExist = await Recipe.findOne({ name })
    const user = await User.findById(req.user._id)

    console.log(req.body)
    if (recipeExist) {

        res.status(404);
        throw new Error("Recipe already exist!")
    }
    if (!user) {

        res.status(404)
        throw new Error("Login required")

    } if (recipeExist) {

        res.status(404);
        throw new Error("Recipe already exist!")
    }
    if (!user) {

        res.status(404);
        throw new Error("Login required")

    }

    const recipe = await Recipe.create({
        name,
        meal_time,
        category,
        ingredients,
        instructions,
        image_link,
        preparation_time,
        author,
        language,
    })


    user.recipes.addToSet(recipe._id);
    await user.save();

    res.status(201).json({

        id: recipe._id,
        name: recipe.name,
        user_recipes: user.recipes
    })

})

//desc: Update existing recipe!
//route: PUT api/recipe/update_one
//access: private
const updateRecipe = asyncHandler(async (req, res) => {

    const { name, meal_time, category, ingredients, instructions, image_link, preparation_time, language, comments } = req.body;
    const author = req.user._id
    const recipe = await Recipe.findById(req.params.id);
    //check if provided keys are the same as in the  data if not declare them so
    if (!recipe) {
        res.status(404);
        throw new Error("Nincs ilyen recept!")
    } else {

        const fieldsToUpdate = {
            name,
            meal_time,
            category,
            ingredients,
            instructions,
            image_link,
            preparation_time,
            language,
            comments
        };
        Object.keys(fieldsToUpdate).forEach(key => {
            if (fieldsToUpdate[key] !== undefined) {
                recipe[key] = fieldsToUpdate[key] || recipe[key];
            }
        });
        await recipe.save();
        res.json(recipe);
    }





})

//desc: Fetch some recipes!
//route: GET api/recipe/some/:name
//access: public
const findRecipe = asyncHandler(async (req, res) => {

    let { name } = req.body;
    name = name.toLowerCase().trim().replace(/\s+/g, ' ');
    //fetch one recipe from Recipe
    const recipe = await Recipe.findOne({ name });


    if (!recipe) {
        res.status(404);
        throw new Error("There is no such recipe!!")
    } else {

        res.json(recipe)
    }

})

//desc: Delete one recipe!
//route: DELETE api/recipe/delete/req.params
//access: private
const deleteRecipe = asyncHandler(async (req, res) => {
    const deleted = req.params.id
    await Recipe.findByIdAndDelete(deleted)

    //delete recipe id from user's recipes array
    const user = await User.findById(req.user._id)
    user.recipes.pull(deleted)
    await user.save()
    res.status(201).send("Recipe deleted!")
})


//desc: Retrieve user's recipes
//route: GET api/recipe/my_recipes
//access: private
const myRecipes = asyncHandler(async (req, res) => {

    const loggedInUserId = req.params.uid;

    const user = await User.findById(loggedInUserId).populate({
        path: 'recipes',
        model: 'Recipe',
    });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // Access the user's recipes with full details
    const userRecipes = user.recipes;


    res.json(userRecipes);
})

export {
    fetchAllRecipe,
    uploadRecipe,
    updateRecipe,
    findRecipe,
    deleteRecipe,
    myRecipes,
    getRecipeById

}


