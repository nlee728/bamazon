//Required dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//Database Connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
//Your username
  user: "",
//Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(error) {
  if (error) throw error;
  // console.log("connected as id " + connection.threadId);
});

//Call the promptManager function to begin the program
promptManager();

//Function to prompt the manager to select an option
function promptManager() {
  //Prmpt the user to make choice for the action to take
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
    })
    .then(function(answer) {
      // Based on their answer, call the corresponding function
      if (answer.action.toUpperCase() === "VIEW PRODUCTS FOR SALE") {
        displayProducts();
      } else if (answer.action.toUpperCase() === "VIEW LOW INVENTORY") {
        displayLow();
      } else if (answer.action.toUpperCase() === "ADD TO INVENTORY") {
        addInventory();
      } else if (answer.action.toUpperCase() === "ADD NEW PRODUCT") {
        addProduct();
      } else  if (answer.action.toUpperCase() === "QUIT"){
        connection.end();
      }
    });
}

//Display the entire list of products from the database
function displayProducts() {
    connection.query("select * from products", function(error, res){
    if (error) throw error;
    //Loop through the table to show each item
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + "|" + res[i].product_name  + "|" + res[i].department_name  + "|" + res[i].price + "|" + res[i].stock_quantity);     
    }
    console.log("__________________________________________\n");
    promptManager();
  });
}

//Function to display low inventory
function displayLow() {
    connection.query("select * from products where stock_quantity < 5", function(error, res){
    if (error) throw error;
     //Loop through the table to show each item
     for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + "|" + res[i].product_name  + "|" + res[i].department_name  + "|" + res[i].price + "|" + res[i].stock_quantity);     
  }
  console.log("__________________________________________\n");
  promptManager();
});
}

function addInventory() {
        inquirer
        .prompt([
        {
          name: "item_id",
          type: "input",
          message: "What is the product ID of the item you would like to add inventory to?"
        },
        {
          name: "units",
          type: "input",
          message: "What is the new total product units?"
        }
      ])
    .then(function(answer) {
      console.log(answer);
      // Store answers into variables
      var id = answer.item_id;
      var quantity = answer.units;
      console.log("Processing your update...\n");
                        //Update product quantity in the sql database
                        connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: quantity
                          },
                          {
                            item_id: id
                          }
                        ],
                            function(error, res) {
                            if (error) throw error;
                            //Display updated items
                            console.log(res.affectedRows + " products updated!\n");
                            promptManager(); 
                            }) 
                });
      }



function addProduct() {
    inquirer
    .prompt([
    {
      name: "product_name",
      type: "input",
      message: "What is the name of the item you would like to add to the inventory?"
    },
    {
        name: "department_name",
        type: "input",
        message: "What is the name of the department the item belongs in?"
    },
    {
        name: "price",
        type: "input",
        message: "What is the price of the item?"
    },
    {
      name: "stock_quantity",
      type: "input",
      message: "How many units would you like to add?"
    }
  ])
    .then(function(answer) {
        console.log("Creating a new product...\n");
    connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: answer.product_name,
      department_name: answer.department_name,
      price: answer.price,
      stock_quantity: answer.stock_quantity
    },
    function(error, res) {
      if (error) throw error;
      console.log(res.affectedRows + " product added!\n");
      promptManager();
      }
    );
  });
}