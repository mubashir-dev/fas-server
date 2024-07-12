const express = require("express");
const app = express();
require("dotenv").config();
const { ExceptionHandler } = require("./src/middlewares/exception.middleware");
const { auth } = require("./src/middlewares/auth.middleware");
const { connectDatabase } = require("./src/config/db.config");
const { AuthRoutes, BookingRoutes } = require("./src/routes/index.routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

//global middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Routing
app.get("/ping", (req, res, next) => {
  res.status(200).send({ message: "Server is Up & Running" });
});

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routing
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/booking", [auth], BookingRoutes);

//404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//global error/exception handler
app.use(ExceptionHandler);

//database
connectDatabase()
  .then((connect) => {
    console.log("✔ Database is connected");
    app.listen(process.env.PORT, () =>
      console.log(`✔ APP is running on ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error(err);
  });
