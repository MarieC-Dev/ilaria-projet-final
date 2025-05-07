SOURCE cuisineTypeTable.sql;
SOURCE cookingTypeTable.sql;
SOURCE servingNumberTable.sql;
SOURCE recipeTimeTable.sql;
SOURCE ingredientTable.sql;
SOURCE stepTable.sql;
SOURCE noteCommentTable.sql;
SOURCE tagTable.sql;
SOURCE userTable.sql;

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
    authorId INT NOT NULL, -- foreign key
    recipeTimeId INT NOT NULL, -- foreign key
    ingredientsListId INT NOT NULL, -- foreign key
    stepsListId VARCHAR(255), -- foreign key

    noteCommentListId INT, -- foreign key
    tagListId INT, -- foreign key
    created DATETIME,

    FOREIGN KEY (cuisineTypeId) REFERENCES CuisineType(id),
    FOREIGN KEY (cookingTypeId) REFERENCES CookingTypesList(id),
    FOREIGN KEY (authorId) REFERENCES User(id),
    FOREIGN KEY (servingNumberId) REFERENCES ServingNumber(id),
    FOREIGN KEY (recipeTimeId) REFERENCES RecipeTimeId(id),
    FOREIGN KEY (ingredientsListId) REFERENCES IngredientsList(id),
    FOREIGN KEY (stepsListId) REFERENCES StepsList(id),
    FOREIGN KEY (noteCommentListId) REFERENCES NoteCommentList(id),
    FOREIGN KEY (tagListId) REFERENCES TagList(id)
);
