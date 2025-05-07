SOURCE database.sql;

CREATE TABLE CookingType (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE CookingTypesList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    cookingTypeId INT NOT NULL,

    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (cookingTypeId) REFERENCES CookingType(id),
    UNIQUE (recipeId, cookingTypeId)
);