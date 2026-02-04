const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { name }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email and include password field
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Return user data without password
        const userWithoutPassword = await User.findOne({ email });
        
        res.status(200).json({
            message: "Login successful",
            user: {
                id: userWithoutPassword._id,
                name: userWithoutPassword.name,
                email: userWithoutPassword.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports = { registerUser, loginUser };