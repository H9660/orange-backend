const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", require("./middleware/googleMiddleware"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/stats", require("./routes/userStatsRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use(errorHandler);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server started on port ${port}`));
