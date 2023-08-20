const express = require("express");
const app = express();
const db = require("./models");
const port = 5000;
const boardRouter = require("./routes/boardRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/board", boardRouter);

db.sequelize
    .sync()
    .then(() => {
        console.log("db connect");
    })
    .catch(console.error);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
