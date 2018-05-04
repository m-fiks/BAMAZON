const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

inquirer.prompt([
    {
        type: 'input',
        message: 'What is the ID of the product?',
        name: 'prodID'
    }
]).then((answers)=>{
    console.log(answers.prodID);
    let id = answers.prodID;

    connection.connect((err, data)=>{
        if (err) throw err;
        //console.log('CONNECTED');
        //? is placeholder for id variable
        let sqlVar = "SELECT * FROM products WHERE id = ?";
        connection.query(sqlVar, [id], (err, data) => {
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
});




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