// Import required modules
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const app = express();

// Connect to the database
require("./db/conn");

// Import the Register model
const Register = require("./models/register");
const Contact = require("./models/contact"); // Contact model import karein

// Set the port number
const port = process.env.PORT || 3000;

// Set the static path
const static_path = path.join(__dirname, "../public");

// Use middleware
app.use(express.static(static_path));
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Setup session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Set view engine
app.set("view engine", "html");

// Define routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new Register instance
        const newRegistration = new Register({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashedPassword, // Store hashed password
            confirm_password: hashedPassword // Optional: Ensure passwords match
        });

        // Save the new registration to the database
        await newRegistration.save();

    } catch (error) {
        console.error(error);
        res.status(400).send("Error occurred during registration");
    }
});

app.post("/login", async (req, res) => {
    try {
        // Extract login details from the request
        const { username, password } = req.body;

        // Find the user by email
        const user = await Register.findOne({ email: username });

        // Check if user exists and password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            // Login successful
            req.session.user = user; // Save user to session
            res.redirect("/dashboard"); // Redirect to dashboard
        } else {
            // Login failed
            res.status(400).send("Invalid credentials");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred during login");
    }
});

app.post("/contact", async (req, res) => {
    try {
        const contactData = new Contact({
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            description: req.body.description
        });

        await contactData.save();
        res.status(201).redirect("/"); // Index page par redirect karenge submit hone ke baad
    } catch (error) {
        console.error(error);
        res.status(400).send("Error occurred while submitting the contact form");
    }
});

// Route for dashboard (ensure this page exists)
app.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(static_path, "dashboard/dashboard.html"));
    } else {
        res.redirect("/"); // Redirect to home if not logged in
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
