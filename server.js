const express = require("express");
const app = express();

const fs = require("fs");

const PORT = 8080;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  fs.readFile("./data/recipes.json", "utf8", (err, data) => {
    if (err) {
      res.json({ message: "error read file" });
    } else {
      const onlyRecipe7 = JSON.parse(data).results.filter((recipe) => {
        // console.log(recipe.id[0] === '7');
        // console.log(String(recipe.id)[0]);
        return String(recipe.id)[0] === "7";
      });
      // console.log()
      const newArr = onlyRecipe7.map((recipe) => {
        const {
          id,
          name,
          thumbnail_url,
          video_url,
          sections,
          cook_time_minutes,
          instructions,
          num_servings,
          prep_time_minutes,
          credits,
        } = recipe;
        const newSec = sections.map((section) => {
          if (section.name) {
          } else {
            section.components.map((component) => {
              const { raw_text, measurements, ingredient } = component;
              return {
                raw_text,
                impMeasurements: `${measurements[0].quantity} ${measurements[0].unit.name}`,
                // metricMeasurements: measurements[1]
                //   ? String(measurements[1].quantity) + measurements[1].unit.name
                //   : "",
                ingredient: ingredient.name,
              };
              // return measurements;
            });
          }
        });
        const creditName = credits[0].name;
        return {
          id,
          name,
          thumbnail_url,
          video_url,
          newSec,
          cook_time_minutes,
          instructions,
          num_servings,
          prep_time_minutes,
          creditName,
        };
      });
      res.json(newArr);
      // res.json(onlyRecipe7);
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Listening server OR port 8080");
});

// https://shrouded-peak-10650.herokuapp.com/images/cooking.jpg
