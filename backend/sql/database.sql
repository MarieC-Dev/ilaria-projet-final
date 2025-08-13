-- 1. Tables de base
CREATE TABLE Comments (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId    INT NOT NULL,
    userId INT NOT NULL,
    note INT NOT NULL,
    commentText LONGTEXT,
    created VARCHAR(255) NOT NULL
);

CREATE TABLE Roles (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('admin', 'moderator', 'user') NOT NULL UNIQUE
);

CREATE TABLE User (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    imageName VARCHAR(255),
    imageData LONGBLOB,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100),
    roleId INT NOT NULL DEFAULT 3,
    created DATETIME NOT NULL,
    FOREIGN KEY (roleId) REFERENCES Roles(id)
);

CREATE TABLE Ingredient (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity INT NOT NULL,
    unit VARCHAR(100) NOT NULL,
    ingredient VARCHAR(100) NOT NULL
);

CREATE TABLE TimeTable (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('making', 'cooking', 'pause') NOT NULL,
    hours INT NOT NULL,
    minutes INT NOT NULL
);

CREATE TABLE ServingNumber (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    number INT NOT NULL,
    servingType VARCHAR(100) NOT NULL
);

CREATE TABLE Step (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description LONGTEXT NOT NULL
);

CREATE TABLE Tag (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tag VARCHAR(100) NOT NULL
);

-- 2. Table principale : RecipeData
CREATE TABLE RecipeData (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description LONGTEXT,
    imageName VARCHAR(255),
    imageData LONGBLOB,
    cuisineType VARCHAR(100) NOT NULL,
    cookingType VARCHAR(100) NOT NULL,
    servingNumberId INT NOT NULL,
    difficulty INT NOT NULL,
    authorId INT NOT NULL,
    recipeTimeId INT NOT NULL,
    created DATETIME,

    FOREIGN KEY (authorId) REFERENCES User(id),
    FOREIGN KEY (servingNumberId) REFERENCES ServingNumber(id),
    FOREIGN KEY (recipeTimeId) REFERENCES TimeTable(id)
);

-- 3. Tables de liaison
CREATE TABLE IngredientsList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    ingredientId INT NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (ingredientId) REFERENCES Ingredient(id)
);

CREATE TABLE StepsList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    stepId INT NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (stepId) REFERENCES Step(id)
);

CREATE TABLE TagList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    tagId INT NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (tagId) REFERENCES Tag(id)
);