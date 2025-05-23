SOURCE database.sql;

CREATE TABLE Tag (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tag VARCHAR(100) NOT NULL
);

CREATE TABLE TagList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    tagId INT NOT NULL,

    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (tagId) REFERENCES Tag(id)
);