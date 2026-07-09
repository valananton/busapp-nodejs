const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Welcome to DevOps Learning with Jenkins, Docker and Kubernetes!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});