const express = require("express");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const UserPlatform = require("../models/platforms");

const router = express.Router();

// --- LeetCode and Codeforces fetchers (reuse your existing functions here) ---
const fetchLeetCodeStats = async (username) => { /* ... your current implementation ... */ };
const fetchLeetCodeRecentFromPublic = async (username) => { /* ... your current implementation ... */ };
const fetchCodeforcesStats = async (username) => { /* ... your current implementation ... */ };

// --- Unified route to save/update user platform and fetch stats ---
router.post("/platform", async (req, res) => {
  const { email, platform, username } = req.body;

  if (!email || !platform || !username) {
    return res.status(400).json({ error: "email, platform, and username are required" });
  }

  try {
    // Save or update user-platform combination in DB
    await UserPlatform.findOneAndUpdate(
      { email, platform },
      { username },
      { upsert: true, new: true }
    );

    let stats = null;
    let recent = [];

    if (platform === "leetcode") {
      stats = await fetchLeetCodeStats(username);
      recent = await fetchLeetCodeRecentFromPublic(username);
    } else if (platform === "codeforces") {
      stats = await fetchCodeforcesStats(username);
    } else if (platform === "hackerrank") {
      stats = await fetchHackerRankStats(username);
    }

    if (!stats) {
      return res.status(200).json({
        message: "Saved user details, but platform data not available yet.",
        email,
        platform,
        username,
      });
    }

    return res.json({
      ...stats,
      email,
      platform,
      username,
      recentSubmissions: recent || stats.recentSubmissions || [],
    });

  } catch (err) {
    console.error("Error in /platform route:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
