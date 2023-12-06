// index.js

const express = require("express");
const cors = require("cors");
const { mongoose, ObjectId } = require("mongoose");
const ipCollectorMiddleware = require("./IpCollector"); // Import the middleware

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://Has_San:C5trb94tViTTqL@cluster0.kr5y2fx.mongodb.net/ShopTalkDigest",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  // Access the existing Recipes collection directly
  const Recipes = mongoose.connection.db.collection("recipes");

  // Define a route to get the list of recipes
  // app.get("/api/recipes", async (req, res) => {
  //   const page = parseInt(req.query.page) || 1;
  //   const pageSize = parseInt(req.query.pageSize) || 12;
  //   const skip = (page - 1) * pageSize;

  //   try {
  //     const findRecipes = Recipes.find().skip(skip).limit(pageSize);
  //     const recipes = await findRecipes.toArray();
  //     res.json(recipes);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  app.get("/api/recipes", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;
    const skip = (page - 1) * pageSize;

    const searchTerm = req.query.searchTerm || "";

    try {
      const query = Recipes.find({
        title: { $regex: new RegExp(searchTerm, "i") }, // Case-insensitive search
      });

      const totalRecipes = await Recipes.countDocuments({
        title: { $regex: new RegExp(searchTerm, "i") }, // Case-insensitive search
      });
      const pageCount = Math.ceil(totalRecipes / pageSize);

      const findRecipes = await Recipes.find({
        title: { $regex: new RegExp(searchTerm, "i") },
      })
        .skip(skip)
        .limit(pageSize);

      const recipes = await findRecipes.toArray();
      res.json({
        recipes,
        pageCount,
        totalRecipes,
        currentPage: page,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  });

  // In your server-side code
  app.get("/api/getRecipesById", async (req, res) => {
    const { id } = req.query;
    console.log("findRecipes", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    try {
      // Fetch the recipe by ID
      const findRecipes = await Recipes.findOne({
        _id: id,
      });

      if (!findRecipes) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      // Send the recipe as JSON
      const recipe = await findRecipes.toArray();
      res.json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.use(express.static("public"));

  // Include the IpCollector middleware
  app.use(ipCollectorMiddleware);

  // Start the Express server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
