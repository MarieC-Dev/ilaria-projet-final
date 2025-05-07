SOURCE database.sql;

CREATE TABLE Ingredient (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity INT NOT NULL,
    unit VARCHAR(100) NOT NULL,
    ingredient VARCHAR(100) NOT NULL
);

CREATE TABLE IngredientsList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    ingredientId INT NOT NULL,

    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (ingredientId) REFERENCES Ingredient(id)
);