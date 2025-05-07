SOURCE database.sql;

CREATE TABLE CookingType (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('hot-plate', 'stove', 'air-fryer', 'barbecue', 'no-cooking') NOT NULL UNIQUE
);

CREATE TABLE CookingTypesList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    cookingTypeId INT NOT NULL,

    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (cookingTypeId) REFERENCES CookingType(id),
    -- UNIQUE (recipeId, cookingTypeId)
);

INSERT INTO CookingType (type) 
    VALUES ('hot-plate'), ('stove'), ('air-fryer'), ('barbecue'), ('no-cooking');