const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

function getID() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the ID of the product?',
            name: 'prodID'
        }
    ]).then((answers)=>{
        //console.log(answers.prodID);
        if (isNaN(answers.prodID) === false){
            let id = answers.prodID;
            connection.connect((err, data)=>{
                if (err) throw err;
                //console.log('CONNECTED');
                
                //? is placeholder for id variable, pass id as 2nd param
                let sqlVar = "SELECT * FROM products WHERE id = ?";
                connection.query(sqlVar, [id], (err, data) => {
                    if(err) throw err;
                    data.forEach((elem)=>{
                        let sqlID = elem.id;
                        let name = elem.product_name;
                        let price = elem.price;
                        let quantity = elem.stock_quantity;
                        console.log(`${name} in stock at a price of:$${price}. Quantity: ${quantity}.`);
                        userNeeds();
                    });
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

function userNeeds () {
    inquirer.prompt([
        {
        type: 'input',
        message: 'How many would you like?',
        name: 'userQuantity'
        }
    ]).then((answers)=>{
        if (isNaN(answers.userQuantity) === false){

        }
        else{
            console.log(`Please enter in a valid desired quantity.`)
            userNeeds();
        }
    })
}




// .then((answers) => {
//     console.log(answers.artist)
//     let sql = "SELECT * FROM top5000 WHERE ?";
//     connection.query(sql, {artist: answers.artist}, (err, result) => {
//         if (err) throw err;
//         for(key in result){
//             console.log(result[key].title);
//         }
//     })
// })