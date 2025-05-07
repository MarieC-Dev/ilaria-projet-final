SOURCE database.sql;

CREATE TABLE TimeTable (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type ENUM('making', 'cooking', 'pause') NOT NULL,
    hours INT NOT NULL,
    minutes INT NOT NULL
);

CREATE TABLE RecipeTimeList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    makingTimeId INT NOT NULL,
    cookingTimeId INT,
    pauseTimeId INT,

    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (makingTimeId) REFERENCES TimeTable(id),
    FOREIGN KEY (cookingTimeId) REFERENCES TimeTable(id),
    FOREIGN KEY (pauseTimeId) REFERENCES TimeTable(id)
);