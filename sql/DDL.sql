drop table if exists book;
drop table if exists user;
drop table if exists orders;
drop table if exists order_item;

create table book(
    book_id int,
    title varchar(20),
    author varchar(20),
    isbn varchar(20),
    remaining int,
    price numeric(4,2),
    introduction varchar(1000),
    primary key(book_id)
);

create table user(
    user_id int,
    name varchar(20),
    password varchar(20),
    status varchar(5),
    ban datetime,
    email varchar(30),
    primary key(user_id)
);

create table orders(
    order_id int,
    user_name varchar(20),
    order_time datetime,
    total int,
    primary key(order_id)
);

create table order_item(
    order_id int,
    book_id int,
    amount int,
    primary key(order_id,book_id)
);