import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static('public'));

// Step 1: Render the home page "/" index.ejs
app.get("/",(req, res)=>{
        res.render("partials/index.ejs");
});
app.get("/about",(req, res)=>{
        res.render("about.ejs");
});
app.get("/post",(req, res)=>{
        res.render("post.ejs");
});
app.get("/contact",(req, res)=>{
        res.render("contact.ejs");
});

app.listen(port,()=>{
        console.log(`Listening at ${port}.`);
})