const express = require("express");
const app = express();
const db = require("./models");
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
    .sync()
    .then(() => {
        console.log("db connect");
    })
    .catch(console.error);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
