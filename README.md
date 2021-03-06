# Bamazon

> An interactive shopping node app where MySQL and Node.JS are used to allow users to purchase items as a customer. Users can also view, track and update the product inventory as a manager.

## Getting Started



### Bamazon Customer
The Bamazon Customer Portal allows users to view the current items available for purchase. The user will be prompted to enter the Item ID and the number of units they wish to purchase. If the item is in stock, the order will be completed and the user will see the total amount of their purchase.


### Bamazon Manager
The Bamazon Manager Portal allows users to view and edit the inventory of the store. The user will be prompted to choose from the following options:

* View Products For Sale
* View Low Inventory
* Add To Inventory
* Add New Product

*View Products For Sale* allows the user to see the list of products that are currently for sale, what department the item belongs to, the price of the product and how much stock is left for that product.

*View Low Inventory* allows the user to see a list of all inventory items that have less than 5 items in stock. If no products meet this criteria, the user will see an empty table.

*Add To Inventory* allows the user to update the inventory for a specific product. A prompt asks what the ID is for the product the user wants to update. A second prompt asks what the new quantity should be updated to.

*Add New Product* allows the user to add a new product to the inventory. Prompts ask the user for the product ID, product name, the department name, the price and the stock quantity.

## Built With
Javascript
Node.js
MySQL

####npm packages:
mysql
inquirer

## Authors

* **Nutishia Lee** - [nlee728](https://github.com/nlee728)