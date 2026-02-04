const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

// Register/Signup Admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ email }] });
        if (existingAdmin) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new admin
        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: "Admin registered successfully",
            token,
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role
            }
        });
    } catch (error) {
        console.error("Admin Registration error:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find admin by email and include password field
        const admin = await Admin.findOne({ email }).select('+password');
        
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcryptjs.compare(password, admin.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Admin Login error:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports = { registerAdmin, loginAdmin };
