const express = require("express");
const TaskRouter = require("./router/TaskRouter.js");
const UserRouter = require("./router/UserRouter.js");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerSpec = require("./swagger.js");
const swaggerUi = require("swagger-ui-express");
const { default: mongoose } = require("mongoose");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODBURL)
.then(console.log("Database Connected!"))
.catch((err) => {
    console.log(err.message);
})

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/task", TaskRouter);
app.use("/api/user", UserRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
