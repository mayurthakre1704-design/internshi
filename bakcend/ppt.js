const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Online Examination Backend is Running");
});

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        res.json({
            success: true,
            message: "Login successful"
        });
    } else {
        res.json({
            success: false,
            message: "Invalid username or password"
        });
    }
});

// Get Exam Questions API
app.get("/exam", (req, res) => {
    res.json({
        examName: "SS Infotech Online Exam",
        duration: 30,
        questions: [
            {
                id: 1,
                question: "HTML stands for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyperlinks Text Mark Language",
                    "None"
                ],
                answer: 0
            },
            {
                id: 2,
                question: "CSS is used for?",
                options: [
                    "Structure",
                    "Styling",
                    "Logic",
                    "Database"
                ],
                answer: 1
            }
        ]
    });
});

// Submit Exam API
app.post("/submit", (req, res) => {
    const { answers } = req.body;
    let score = 0;

    const correctAnswers = [0, 1];

    answers.forEach((ans, index) => {
        if (ans === correctAnswers[index]) {
            score++;
        }
    });

    res.json({
        totalQuestions: correctAnswers.length,
        score: score
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
