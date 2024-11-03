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
    res.render("partials/index.ejs",{posts: blogPosts });
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
    res.render("writepost.ejs", { post: null });
});


// // Delete post page route
// app.get("/deletepost", (req, res) => {
//     res.render("deletepost.ejs",{posts: blogPosts });
// });

// Route to handle blog post submission
app.post('/submit-blog', (req, res) => {
    const { title, content } = req.body;

    // Add new post to blogPosts array
    // blogPosts.push({ title, content });
    // console.log("Current blogPosts array:", blogPosts);

     // Add new post with unique id to blogPosts array
     blogPosts.push({ id: uuidv4(),title,content });
     console.log("Current blogPosts array:", blogPosts);
 

    // Redirect to /post to view the submitted post
    res.redirect('/post');
});

// Route to display the latest post
app.get('/post', (req, res) => {
    if (blogPosts.length > 0) {
        // Pass the latest post to the view
        // const latestPost = blogPosts[blogPosts.length - 1];
        // res.render('post.ejs', { post: latestPost });

        const posts = [...blogPosts].reverse(); // Creates a copy of blogPosts in reverse order
        res.render('post.ejs', { posts });
    } else {
        // Render placeholder content if no posts are available
        res.render('post.ejs', { posts: { title: "No posts available", content: "Please submit a new blog post." } });
    }
});


// Route to delete a specific post
app.post('/deletepost', (req, res) => {
    const postId = req.body.postId;
    // Add a console.log(req.body) inside the delete route to verify that the form data (especially postId) is correctly received.
    // console.log(req.body);

    // Filter out the post with the specified ID
    blogPosts = blogPosts.filter(post => post.id !== postId);

    console.log("Updated blogPosts array:", blogPosts);

    // Redirect back to the post page to show updated list
    res.redirect('/post');
});

app.get('/edit-post/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts.find(post => post.id === postId);

    if (post) {
        // Render writepost.ejs with the current post data
        res.render('writepost.ejs', { post });
    } else {
        res.status(404).send('Post not found');
    }
});


app.post('/updatepost/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    const postIndex = blogPosts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        // Update the post in blogPosts array
        blogPosts[postIndex] = { id: postId, title, content };
        
        // Redirect to the post view to see updated content
        res.redirect('/post');
    } else {
        res.status(404).send('Post not found');
    }
});





app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}.`);
});
