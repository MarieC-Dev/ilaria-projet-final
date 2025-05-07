SOURCE cookingTypeTable.sql;
SOURCE recipeTimeTable.sql;
SOURCE ingredientTable.sql;
SOURCE stepTable.sql;
SOURCE noteCommentTable.sql;
SOURCE tagTable.sql;

CREATE DATABASE recipeSite;
USE recipeSite;

CREATE TABLE CuisineType (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE ServingNumber (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    number INT NOT NULL,
    servingType VARCHAR(100) NOT NULL
)

CREATE TABLE RecipeData (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description LONGTEXT,
    imageName VARCHAR(255),
    imageData LONGBLOB,
    cuisineTypeId INT NOT NULL, -- foreign key
    cookingTypeId INT NOT NULL, -- foreign key
    servingNumberId INT NOT NULL, -- foreign key
    difficulty INT NOT NULL,
    author VARCHAR(255) NOT NULL, -- USER
    recipeTimeId INT NOT NULL, -- foreign key
    ingredientsListId INT NOT NULL, -- foreign key
    stepsListId VARCHAR(255), -- foreign key

    noteCommentListId INT, -- foreign key
    tagListId INT, -- foreign key
    created DATETIME,

    FOREIGN KEY (cuisineTypeId) REFERENCES CuisineType(id),
    FOREIGN KEY (cookingTypeId) REFERENCES CookingTypesList(id),
    FOREIGN KEY (servingType) REFERENCES ServingNumber(id),
    FOREIGN KEY (recipeTimeId) REFERENCES RecipeTimeId(id),
    FOREIGN KEY (ingredientsListId) REFERENCES IngredientsList(id),
    FOREIGN KEY (stepsListId) REFERENCES StepsList(id),
    FOREIGN KEY (noteCommentListId) REFERENCES NoteCommentList(id),
    FOREIGN KEY (tagListId) REFERENCES TagList(id)
);
