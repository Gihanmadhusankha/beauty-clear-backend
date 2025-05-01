import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Save user
export function saveUser(req, res) {
    // Only allow admin creation if the current user is admin
    if (req.body.role === "admin") {
        if (!req.user) {
            return res.status(403).json({
                message: "Please login as admin before creating an admin account"
            });
        }
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to create an admin account"
            });
        }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role,
    });

    user.save()
        .then(() => {
            res.json({ message: "User saved successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "User not saved" });
        });
}

// Login user
export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid password" });
            }

            const userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phone: user.phone,
                isDisabled: user.isDisabled,
                isEmailVerified: user.isEmailVerified
            };

            const token = jwt.sign(userData, "random456", { expiresIn: "1h" });

            res.json({
                message: "Login successful",
                token: token,
                user: userData
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Login failed" });
        });
}
