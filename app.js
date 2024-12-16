require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "register.html"));
});

module.exports = app;

const userRouter = require("./api/users/user.router");
app.use("/api/users", userRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server up and running on PORT :", port);
});
