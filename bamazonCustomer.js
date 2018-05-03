const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect((err, data)=>{
    if (err) throw err;
    //console.log('CONNECTED');
    let sqlVar = "SELECT * FROM products";
    connection.query(sqlVar, (err, data) =>{
        if(err) throw err;
        data.forEach((elem)=>{
            let id = elem.id;
            let name = elem.product_name;
            let price = elem.price;
            let quantity = elem.stock_quantity;
            console.log(`${id}.) ${name}, $${price}`);
            console.log(quantity)
        })
    })
    //end connection
    connection.end();
})