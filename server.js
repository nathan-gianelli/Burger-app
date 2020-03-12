const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql")

const app = express();
const PORT = 8080
// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultlayout: "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "347*98Ng", 
    database: "krustykrab_db"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("we connected");
})


app.get("/", (req, res) => {
    connection.query("SELECT * FROM burger", function(err, data) {
        if (err) {
             return res.status(500).end();
        }
        const devouredBurgers = data.filter(burger => burger.devoured === 1);
        const burgers = data.filter(burger => burger.devoured === 0);

        res.render("index", {burgers: burgers, devouredBurgers: devouredBurgers});
    })
})
const test = {

    alive: "yes"
}
app.get('/api/patty/test', (req, res) => res.send(test))

app.post('/api/patty/add', (req, res) => {
    connection.query(`INSERT INTO burger (burger_name, devoured) VALUES ('${req.body.name}', '0')`, function(err, data) {
        if (err) {
             return res.status(500).end();
        }
        console.log(req.body)
        res.send({
            success: "true"
        });
    })
});

app.post('/api/patty/update', (req, res) => {
    console.log(req.body)
    connection.query(`UPDATE burger SET devoured = '1' WHERE id = '${req.body.id}'`, function(err, data) {
        if (err) {
             return res.status(500).end();
        }
        console.log(req.body)
        res.send({
            success: "true"
        });
    })
});

// init listening
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))