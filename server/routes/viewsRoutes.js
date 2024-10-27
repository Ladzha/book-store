import express from "express";

const bookRouter = express.Router();

bookRouter.get('/views', (req, res) => {
    res.sendFile("../views/books.html")
})

export default bookRouter;