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
    recipeListId INT NOT NULL,
    created DATETIME NOT NULL,

    FOREIGN KEY (roleId) REFERENCES Roles(id)
);

INSERT INTO Roles (type) VALUES ('admin'), ('moderator'), ('user');

/*
    Un utilisateur a plusieurs :
    - recettes
    - notes (il peut commenter plusieurs fois plrs recettes)

    Un utilisateur a 1 ROLE

    ROLES (par défaut user) :
    - Admin (1)
        - CRUD users (infos et rôle)
        - CRUD recipes
        - CRUD contact
        - Update ses infos
    - Moderateur 
        - CRUD ALL recettes et commentaires 
        - CRUD et répondre aux form de contact (msg envoyé via Contact)
        - Update ses infos
    - User
        - CRUD ses recettes
        - Update ses infos

*/