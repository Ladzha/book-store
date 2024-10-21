import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import sequelize from './db/databaseConnection.js'
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/booksRoutes.js";
import genreRouter from "./routes/genreRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json())

sequelize.sync(
    // {force: true} //принудительное пересоздание таблиц
)
.then(()=>console.log("Database connected"))

app.use('/users', userRouter)
app.use('/books', bookRouter)
app.use('/genres', genreRouter)
app.use('/orders', orderRouter)
app.use('/wishlists', wishlistRouter)


app.get("/", ((req, res) => {
    res.send("Let's start")
}))

app.listen(PORT || 3001, ((error) => {
    error ? console.log(`Server error ${error}`) : console.log(`Server is running on port ${PORT}`);
}))