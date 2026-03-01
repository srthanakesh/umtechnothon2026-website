const express = require("express");
const cors = require("cors");

const participantRoutes = require("./routes/participantRoutes");
const teamRoutes = require("./routes/teamRoutes");
const taskRoutes = require("./routes/taskRoutes");
const rubricRoutes = require("./routes/rubricRoutes");
const criteriaRoutes = require("./routes/criteriaRoutes");
const deliverableRoutes = require("./routes/deliverableRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const auth = require("./middlewares/auth");

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://technothon-2026.vercel.app",
        "https://umtechnothon.com",
        "https://www.umtechnothon.com",
        "http://localhost:3000",
        process.env.FRONTEND_URL,
      ].filter(Boolean); // Filter out undefined values

      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/participants", participantRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/rubrics", rubricRoutes);
app.use("/api/criteria", criteriaRoutes);
app.use("/api/deliverables", deliverableRoutes);
app.use("/api/scores", scoreRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
