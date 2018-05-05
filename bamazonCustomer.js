const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

//display data from mySQL for item
function displayData (data) {
    data.forEach((elem)=>{
        let sqlID = elem.id;
        let name = elem.product_name;
        let price = elem.price;
        let quantity = elem.stock_quantity;
        console.log(`${name} in stock at a price of:$${price}. Quantity: ${quantity}.`);
        userNeeds(quantity,price);

    })
};

//prompt user - get ID for product
function getID() {
    inquirer.prompt([{
        type: 'input',
        message: 'What is the ID of the product?',
        name: 'prodID'
    }]).then((answers)=>{
        //console.log(answers.prodID);
        if (isNaN(answers.prodID) === false){
            let id = answers.prodID;
            connection.connect((err, data)=> {
                if (err) throw err;
                //console.log('CONNECTED');
                
                //? is placeholder for id variable, pass id as 2nd param
                let sqlVar = "SELECT * FROM products WHERE id = ?";
                connection.query(sqlVar, [id], (err, data) => {
                    if(err) throw err;
                    displayData(data);
                })
                //end connection
                connection.end();
            })
        }
        else{
            console.log('Please enter in a valid product ID (number 1-11)');
            getID();
        }
    });
};

getID();

function userNeeds (quantity,price) {
    inquirer.prompt([
        {
        type: 'input',
        message: 'How many would you like?',
        name: 'userQuantity'
        }
    ]).then((answers)=>{
        if (isNaN(answers.userQuantity) === false){
            let userQuantity = answers.userQuantity;
            if (userQuantity < quantity && userQuantity > 0){
                //update db to quantity - userQuantity
                //multiple userQuantity * price to display total
                let total = (userQuantity * price).toFixed(2);
                console.log(`Your total is ${total}.`)
                console.log('this is okay');
            }
            else if (userQuantity == 0) {
                console.log(`Please enter in a valid desired quantity.`)
                userNeeds(quantity,price);
            }
            else{
                console.log('sorry we do not have that many');
                userNeeds(quantity,price);
            }
        }
        else{
            console.log(`Please enter in a valid desired quantity.`)
            userNeeds(quantity,price);
        }
    })
}