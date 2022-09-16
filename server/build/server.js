import express from "express";
const app = express();
app.get("/ads", (req, res) => {
    console.log("acessou ads");
    return res.send("Hello world, Welcome to ads");
});
app.listen(1212, () => {
    console.log("server started on localhost:1212");
});
