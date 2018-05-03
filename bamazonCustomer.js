const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect((err, data)=>{
    if (err) throw err;
    console.log('CONNECTED');
    let sqlVar = "SELECT * FROM products";
    connection.query(sqlVar, (err, data) =>{
        if(err) throw err;
        console.log(data);
    })
})