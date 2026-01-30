import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Log from "./models/Log.js";

dotenv.config(); // LOAD .env

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB ATLAS
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err.message);
    process.exit(1);
  });

app.post("/log", async (req, res) => {
  try {
    const { website, timeSpent, category } = req.body;

    if (!website || !timeSpent || !category) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const log = new Log({
      website,
      timeSpent: Number(timeSpent),
      category,
      date: new Date()
    });

    await log.save();
    res.json({ message: "Saved to Atlas" });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/analytics", async (req, res) => {
  const data = await Log.find();
  res.json(data);
});

app.get("/weekly-report", async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const logs = await Log.find({
      date: { $gte: oneWeekAgo }
    });

    const report = {};

    logs.forEach((log) => {
      const day = log.date.toISOString().split("T")[0];

      if (!report[day]) {
        report[day] = {
          productive: 0,
          unproductive: 0
        };
      }

      if (log.category === "Productive") {
        report[day].productive += log.timeSpent;
      } else {
        report[day].unproductive += log.timeSpent;
      }
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on port 5000");
});
