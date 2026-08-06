const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');  
require("dotenv").config();
const { initDatabase } = require("./controllers/initDb");
const db = require('./models/connection.js');
const { authRoute } = require("./routes/authRoutes.js");
const { projectRoute } = require("./routes/projectRoutes");
const { taskRoute } = require("./routes/taskRoutes");
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initDatabase();
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Task_Sync API is running"
    });
});
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoute);
app.use("/api", taskRoute); 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
