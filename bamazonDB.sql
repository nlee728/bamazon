create database bamazon;

create table products (
	item_id integer auto_increment not null,
    product_name varchar(30),
    department_name varchar(30),
    price integer,
    stock_quantity integer,
    product_sales integer,
    primary key (item_id)
);

use bamazon;

insert into products (product_name, department_name, price, stock_quantity) values ("Google Chromecast", "Electronics", 36, 3);

insert into products (product_name, department_name, price, stock_quantity) values ("Shopkins Set of 2", "Toys", 8, 9);

insert into products (product_name, department_name, price, stock_quantity) values ("Febreeze Spray", "Cleaning", 3, 120);

insert into products (product_name, department_name, price, stock_quantity) values ("Large Swingset", "Outdoor", 68, 10);

insert into products (product_name, department_name, price, stock_quantity) values ("Girl's Sandals", "Shoes", 36, 120);

insert into products (product_name, department_name, price, stock_quantity) values ("Hue Color Bulb", "Lighting", 59, 20);

insert into products (product_name, department_name, price, stock_quantity) values ("Samsung 40in. TV", "Electronics", 225, 30);

insert into products (product_name, department_name, price, stock_quantity) values ("Google Nexus Tablet", "Electronics", 75, 18);

insert into products (product_name, department_name, price, stock_quantity) values ("Avengers Wall Decals", "Home & Decor", 5, 75);

insert into products (product_name, department_name, price, stock_quantity) values ("18in Boys Bicycle", "Toys", 104, 5);

insert into products (product_name, department_name, price, stock_quantity) values ("Queen Comforter Set", "Bedding", 45, 10);


create table departments (
	department_id integer auto_increment not null,
    department_name varchar(30),
    over_head_costs integer,
    primary key (department_id)
);

