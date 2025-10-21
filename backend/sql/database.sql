create table Comments
(
    id          int auto_increment
        primary key,
    recipeId    int          not null,
    userId      int          not null,
    note        int          not null,
    commentText longtext     null,
    created     varchar(255) not null
);

create table FavoritesList
(
    id       int auto_increment
        primary key,
    recipeId int not null,
    userId   int not null
);

create table Ingredient
(
    id         int auto_increment
        primary key,
    quantity   int          not null,
    unit       varchar(100) not null,
    ingredient varchar(100) not null
);

create table IngredientsList
(
    id           int auto_increment
        primary key,
    recipeId     int not null,
    ingredientId int not null,
    constraint ingredientslist_ibfk_1
        foreign key (recipeId) references recipesite.RecipeData (id),
    constraint ingredientslist_ibfk_2
        foreign key (ingredientId) references recipesite.Ingredient (id)
);

create index ingredientId
    on IngredientsList (ingredientId);

create index recipeId
    on IngredientsList (recipeId);

create table RecipeData
(
    id              int auto_increment
        primary key,
    name            varchar(100) not null,
    description     longtext     null,
    imageName       varchar(255) null,
    cuisineType     varchar(100) not null,
    cookingType     varchar(100) not null,
    servingNumberId int          not null,
    difficulty      varchar(20)  not null,
    authorId        int          not null,
    created         varchar(255) null,
    constraint recipedata_ibfk_1
        foreign key (authorId) references recipesite.User (id),
    constraint recipedata_ibfk_2
        foreign key (servingNumberId) references recipesite.ServingNumber (id)
);

create index authorId
    on RecipeData (authorId);

create index servingNumberId
    on RecipeData (servingNumberId);

create table Roles
(
    id   int auto_increment
        primary key,
    type enum ('admin', 'moderator', 'user') not null,
    constraint type
        unique (type)
);

create table ServingNumber
(
    id          int auto_increment
        primary key,
    number      int          not null,
    servingType varchar(100) not null
);

create table Session
(
    session_id varchar(128) not null
        primary key,
    expires    int          not null,
    data       text         not null
);

create table Step
(
    id       int auto_increment
        primary key,
    stepName longtext not null
);

create table StepsList
(
    id       int auto_increment
        primary key,
    recipeId int not null,
    stepId   int not null,
    constraint stepslist_ibfk_1
        foreign key (recipeId) references recipesite.RecipeData (id),
    constraint stepslist_ibfk_2
        foreign key (stepId) references recipesite.Step (id)
);

create index recipeId
    on StepsList (recipeId);

create index stepId
    on StepsList (stepId);

create table TagList
(
    id       int auto_increment
        primary key,
    tag      varchar(255) not null,
    recipeId int          not null,
    constraint taglist_ibfk_1
        foreign key (recipeId) references recipesite.RecipeData (id)
);

create table TimeTable
(
    id       int auto_increment
        primary key,
    type     enum ('making', 'cooking', 'pause') not null,
    hours    int                                 not null,
    minutes  int                                 not null,
    recipeId int                                 not null
);

create table User
(
    id        int auto_increment
        primary key,
    imageName varchar(255)  null,
    username  varchar(100)  not null,
    email     varchar(100)  not null,
    password  varchar(100)  null,
    roleId    int default 3 not null,
    created   varchar(255)  not null,
    constraint email
        unique (email),
    constraint username
        unique (username),
    constraint user_ibfk_1
        foreign key (roleId) references recipesite.Roles (id)
);

create index roleId
    on User (roleId);

create table sessions
(
    session_id varchar(128) collate utf8mb4_bin not null
        primary key,
    expires    int unsigned                     not null,
    data       mediumtext collate utf8mb4_bin   null
);

