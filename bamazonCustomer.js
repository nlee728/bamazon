//Required dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//Database Connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

// Connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // Run the display function to show all available products in the database
    displayProducts();
});
  
//Display the entire list of products from the database
function displayProducts() {
  connection.query("select * from products", function(error, res){
  if (error) throw error;
  // console.log(res);
  //Loop through the table to show each item
  console.log("Current Inventory");
  for (var i = 0; i < res.length; i++) {
      console.log( + res[i].item_id + "|" + res[i].product_name  + "|" + res[i].department_name  + "|" + res[i].price + "|" + res[i].stock_quantity);     
  }
  console.log("__________________________________________\n");
  });
  promptCustomer();
}
  
//Function to prompt the customer to make a purchase
function promptCustomer() {
  // Run inquirer to ask a series of questions
    inquirer
    .prompt([{
      name: "item_id",
      type: "input",
      message: "What is the product ID of the item you would like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "units",
      type: "input",
      message: "How many units would you like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }])
    .then(function(answer) {
        var id = answer.item_id;
        var units = answer.units;
        // checkNum(id, units);
        console.log(answer);
    });
}
  

//Check the quantity of items available for purchase
function checkNum(id, units) {
    connection.query("select stock_quantity from products where product_id=?",
    [id], function(error, res){
    if (error) throw error;
    var currentNum = res.stock_number;
    var newNum = currentNum - units;
        //If there are not enough items in stock, cancel the purchase
        if (newNum < 0) {
            console.log("Insufficient quantity!")
            // connection.end();
            displayProducts();
        } else {
            //If there are sufficient items available, process the purchase
            console.log("Processing your purchase...\n");
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [{
                    quantity: newNum
                }],
                function(error, res) {
                if (error) throw error;
                //Display purchased products and total price for order
                console.log(res.affectedRows + " products updated!\n");
                var totalPrice = units*res.price;
                console.log("The total for your purchase is " + totalPrice + " .\n");
                }
            );
            // connection.end();
            displayProducts();
        }
    });
}
