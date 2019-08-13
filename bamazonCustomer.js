var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "12345678",
    database: "bamazon_DB",
});

connection.connect(function(err) {
    if (err) throw err;
    displayItems();
  });

  function displayItems() {
      connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        console.log( `~ Retrieved ${res.length} products, looping and displaying them... ` );
        for (var i=0; i < res.length; i++){
            console.log(res[i].item_id+"|" + res[i].product_name +"|" + res[i].price);
        }
      })
    }


    inquirer
      .prompt([
          {
        name: "product_id",
        type: "input",
        message: "Please enter ID of the product you would like to buy?",
          },
          {
        name: "amount",
        type: "input",
        message: "how many units of the product you would like to buy?",
          }])
          .then(function(answer){
              var query = "SELECT stock_quantity FROM products WHERE?"
              connection.query(query, { item_id : answer.product_id }, function(err, res) {
                if (err) throw err;
                console.log(res);

                var total = Number(res[0].stock_quantity) - Number(answer.amount) ;
                console.log( ` retreived stock_quantity (${res[0].stock_quantity}) - ${answer.amount}  = ${total}`, res);
                if(res[0].stock_quantity >= answer.amount){
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                      {
                       stock_quantity : total
                      },
                       {
                           item_id : answer.product_id
                       }
                    ]
                    , function(err, data){
                        total = parseInt(res[0].stock_quantity) - parseInt(answer.amount);
                       if (err) throw err;
                       
                       var query = "SELECT price FROM products WHERE?";

                       connection.query(query, {item_id : answer.product_id  }, function(err, res){
                           if(err) throw err;
                           console.log(res);

                         
                            var receipt = Number(answer.amount) * Number(res[0].price);
                            console.log( `  Your total is $${receipt} ` );

                       });
                    })
                    
                 } else{
                    console.log("not enough inventory!");
                 }

              })
           
          })

        