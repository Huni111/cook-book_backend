import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meal_time: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    instructions: {
        type: String,
        required: true
    },
    image_link: {
        type: String,
        required: false
    },
    preparation_time: {
        type: Number,
        required: true
    },
     language: {
    	type: String,
    	required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    
})  

//Cut extra spaces and transform to lowercase the recipe name before saving the recipe
recipeSchema.pre('save', async function(next) {

    this.name = this.name.toLowerCase().trim().replace(/\s+/g, ' ');

    next()
})

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe
