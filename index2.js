import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let blogPosts = [];

// Route to render the home page
app.get("/", (req, res) => {
    res.render("partials/index.ejs");
});

// About page route
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

// Contact page route
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

// Write post page route
app.get("/writepost", (req, res) => {
    res.render("writepost.ejs");
});

// Route to render the delete post page with posts data
app.get("/deletepost", (req, res) => {
    res.render("deletepost.ejs", { posts: blogPosts });
});

// Route to handle blog post submission
app.post('/submit-blog', (req, res) => {
    const { title, content } = req.body;

    // Add new post with unique id to blogPosts array
    blogPosts.push({ id: uuidv4(), title, content });
    console.log("Current blogPosts array:", blogPosts);

    // Redirect to /post to view the submitted post
    res.redirect('/post');
});

// Route to display the latest post
app.get('/post', (req, res) => {
    if (blogPosts.length > 0) {
        const posts = [...blogPosts].reverse(); // Creates a copy of blogPosts in reverse order
        res.render('post.ejs', { posts });
    } else {
        res.render('post.ejs', { posts: { title: "No posts available", content: "Please submit a new blog post." } });
    }
});

// Route to delete a specific post
app.post('/delete-post', (req, res) => {
    const postId = req.body.postId;

    // Filter out the post with the specified ID
    blogPosts = blogPosts.filter(post => post.id !== postId);

    console.log("Updated blogPosts array:", blogPosts);

    // Redirect back to the post page to show updated list
    res.redirect('/post');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}.`);
});
