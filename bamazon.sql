DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,3) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Purina One Wet Cat Food', 'Pet Supplies', 18.49, 800),
('Downy Wrinkle Release Spray', 'Household Supplies', 13.94, 300),
('Essie Nail Polish, white', 'Beauty', 11.49, 500),
('Manic Panic Hair Bleach', 'Beauty', 10.98, 200),
('Black Diamond Momentum Harness', 'Sports & Outdoor Supplies', 52.88, 100),
('Wear24 Android Wear 2.0 Watch', 'Cell Phones & Accessories', 59.95, 100),
('Star Trek: The Next Generation Season 5', 'TV Shows and Movies', 21.95, 80),
('iRobot Roomba', 'Home and Kitchen', 248.00, 900),
('Tassel Earrings', 'Jewelry', 12.95, 350),
('Hankook Off-Road-Tire', 'Car & Automotive', 104.00, 45),
('Goodnight Moon', 'Books', 6.18, 500);