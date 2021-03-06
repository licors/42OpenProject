drop table if exists FOOD CASCADE;
drop table if exists MEMBER CASCADE;
drop table if exists SELECTED_FOOD CASCADE;

CREATE TABLE FOOD
(
    ID   integer PRIMARY KEY,
    NAME varchar(100) NOT NULL,
    CATEGORY varchar(100) NOT NULL,
    TASTE varchar(200) NOT NULL,
    INGREDIENT varchar(200) NOT NULL,
    IMG_URL varchar(200) NOT NULL
);

CREATE TABLE MEMBER
(
    ID   integer PRIMARY KEY,
    Nick_name varchar (100) NOT NULL,
    EMAIL varchar(100) NOT NULL,
    PASSWORD varchar(100) NOT NULL,
    PICKED_FOOD varchar(200),
    HATE_FOOD varchar(200)
);

CREATE TABLE SELECTED_FOOD
(
    SELECTED_FOOD_ID integer PRIMARY KEY,
    MEMBER_ID integer NOT NULL,
    constraint fk_selected_food_member_id FOREIGN KEY(MEMBER_ID)
        references MEMBER(ID) on delete cascade,
    FOOD_ID integer NOT NULL,
    constraint fk_selected_food_food_id FOREIGN KEY(FOOD_ID)
        references FOOD(ID) on delete cascade
);