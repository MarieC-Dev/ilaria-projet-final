SOURCE database.sql;
SOURCE userTable.sql;

CREATE TABLE NoteComment (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    note INT NOT NULL,
    comment LONGTEXT,

    FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE NoteCommentList (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    recipeId INT NOT NULL,
    noteCommentId INT NOT NULL,

    FOREIGN KEY (recipeId) REFERENCES RecipeData(id),
    FOREIGN KEY (noteCommentId) REFERENCES NoteComment(id)
);