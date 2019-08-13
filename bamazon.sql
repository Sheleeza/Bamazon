
DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(10) DEFAULT NULL,
  `department_name` varchar(10) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`)


INSERT INTO `products` VALUES 
(1,'Tomatoes','Produce',2.59,30),
(2,'Potatoes','Produce',2.80,20),
(3,'Onions','Produce',1.50,30),
(4,'Eggs','Dairy',5.99,50),
(5,'Milk','Dairy',4.99,60),
(6,'Cheese','Dairy',6.99,30),
(7,'Bread','Bakery',3.99,50),
(8,'Cake','Bakery',15.99,20),
(9,'Turkey','Meat',8.99,20),
(10,'Lamb','Meat',12.99,20);