const mysql = require('mysql');
const inquirer = require('inquirer');
const clc = require('cli-color');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

// const items = {
//     '1' : 'Purina One Wet Cat Food',
//     '2' : 'Downy Wrinkle Release Spray',
//     '3' : 'Essie Nail Polish, white',
//     '4' : 'Manic Panic Hair Bleach',
//     '5' : 'Black Diamond Momentum Harness',
//     '6' : 'Wear24 Android Wear 2.0 Watch',
//     '7' : 'Star Trek: The Next Generation Season 5',
//     '8' : 'iRobot Roomba',
//     '9' : 'Tassel Earrings',
//     '10' : 'Hankook Off-Road-Tire',
//     '11' : 'Goodnight Moon'
// }

//prompt user to do another transaction
function buyMore () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to purchase another item?',
            choices: ['yes', 'no'],
            name: 'start_over'

        }
    ]).then((answers) => {
        //console.log(answers);
        if (answers.start_over === 'yes'){
            getID();
        }
        else{
            console.log(`Thanks for shopping with us!`)
            //end connection
            connection.end();
        }
    })
};

//display data from mySQL for item
function displayData (data) {
    data.forEach((elem)=>{
        let sqlID = elem.id;
        let name = elem.product_name;
        let price = elem.price;
        let quantity = elem.stock_quantity;
        console.log(clc.cyan(`${name} in stock at a price of:$${price}. Quantity: ${quantity}.`));
        userNeeds(quantity,price,sqlID);
    })
};

//first, show products then:
//prompt user - get ID for product
function getID() {
    inquirer.prompt([{
        type: 'input',
        message: 'What is the ID of the product you wish to purchase?',
        name: 'prodID'
    }]).then((answers)=>{
        //console.log(answers.prodID);
        if (isNaN(answers.prodID) === false){
            let id = answers.prodID;

            //? is placeholder for id variable, pass id as 2nd param
            let sqlVar = "SELECT * FROM products WHERE id = ?";
            connection.query(sqlVar, [id], (err, data) => {
                if(err) throw err;
                displayData(data);
            })
        }
        else{
            console.log(clc.red.bold('Please enter in a valid product ID (number 1-11)'));
            getID();
        }
    });
};

getID();

function userNeeds (quantity,price,id) {
    inquirer.prompt([
        {
        type: 'input',
        message: 'How many would you like?',
        name: 'userQuantity'
        }
    ]).then((answers)=>{
        //console.log(id);
        if (isNaN(answers.userQuantity) === false){
            let userQuantity = answers.userQuantity;
            if (userQuantity < quantity && userQuantity > 0){
                //update db to quantity - userQuantity
                let newQuant = quantity - userQuantity;
                // console.log(newQuant)

                //update db to subtract what user "bought"
                let sqlUpdate = "UPDATE products SET stock_quantity = ? WHERE id = ?"
                connection.query(sqlUpdate, [newQuant,id], (err, data) => {
                    if(err) throw err;
                    //console.log(`1 item updated`);
                })
                //multiple userQuantity * price to display total
                let total = (userQuantity * price).toFixed(2);
                console.log(`Great! Your total is $${total}.`)
                buyMore();
                
            }
            else if (userQuantity == 0) {
                console.log(clc.red.bold(`Please enter in a valid desired quantity.`))
                userNeeds(quantity,price,id);
            }
            else{
                console.log(clc.red.bold('Sorry, we do not have that many in stock.'));
                userNeeds(quantity,price,id);
            }
        }
        else{
            console.log(clc.red.bold(`Please enter in a valid desired quantity.`))
            userNeeds(quantity,price,id);
        }
    })
}

