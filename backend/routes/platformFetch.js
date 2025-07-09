const express = require("express");
const fetch = require("node-fetch"); // use v2
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

// ---------------------- LeetCode Stats via GraphQL ----------------------
const fetchLeetCodeStats = async (username) => {
  const query = `
    {
      matchedUser(username: "${username}") {
        profile {
          realName
          ranking
          userAvatar
          countryName
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  const user = data.data?.matchedUser;

  if (!user) return null;

  return {
    username,
    platform: "leetcode",
    totalSolved: user.submitStats.acSubmissionNum[0].count,
    easySolved: user.submitStats.acSubmissionNum[1].count,
    mediumSolved: user.submitStats.acSubmissionNum[2].count,
    hardSolved: user.submitStats.acSubmissionNum[3].count,
    rank: user.profile.ranking,
    country: user.profile.countryName,
  };
};

// ---------------------- LeetCode Recent Submissions Scraper ----------------------
const fetchLeetCodeRecentFromPublic = async (username) => {
  const query = `
    query recentSubmissions($username: String!) {
      recentAcSubmissionList(username: $username) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  const variables = { username };

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    const submissions = json.data.recentAcSubmissionList || [];

    // Format the data as needed
    return submissions.slice(0, 20).map((item) => ({
      title: item.title,
      slug: item.titleSlug,
      link: `https://leetcode.com/problems/${item.titleSlug}/`,
      timestamp: new Date(item.timestamp * 1000).toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
    }));
  } catch (err) {
    console.error("Error fetching LeetCode submissions:", err);
    return [];
  }
};



// ---------------------- Codeforces API ----------------------
const fetchCodeforcesStats = async (username) => {
  // Fetch user info (rating, rank, etc.)
  const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
  const infoData = await infoRes.json();

  if (!infoData.result || infoData.result.length === 0) return null;
  const userInfo = infoData.result[0];

  // Fetch submission history
  const subRes = await fetch(`https://codeforces.com/api/user.status?handle=${username}&count=1000`);
  const subData = await subRes.json();

  if (!subData.result) return null;

  // Filter accepted problems
  const acceptedProblems = subData.result.filter(sub => sub.verdict === "OK");

  // Use a Set to avoid duplicate problems
  const uniqueSolved = new Map();

  acceptedProblems.forEach(sub => {
    const key = `${sub.problem.contestId}-${sub.problem.index}`;
    if (!uniqueSolved.has(key)) {
      uniqueSolved.set(key, sub);
    }
  });

  const totalSolved = uniqueSolved.size;

  // Count difficulty-wise (approximate based on problem rating)
  let easy = 0, medium = 0, hard = 0;
  uniqueSolved.forEach(sub => {
    const rating = sub.problem.rating;
    if (!rating) return; // Skip if no rating
    if (rating <= 1200) easy++;
    else if (rating <= 1800) medium++;
    else hard++;
  });

  // Get last 20 unique accepted submissions
  const recentAccepted = Array.from(uniqueSolved.values())
    .slice(0, 20)
    .map(sub => ({
      title: sub.problem.name,
      contestId: sub.contestId,
      index: sub.problem.index,
      link: `https://codeforces.com/contest/${sub.contestId}/problem/${sub.problem.index}`,
      rating: sub.problem.rating || "N/A",
      timestamp: new Date(sub.creationTimeSeconds * 1000).toLocaleString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })

    }));

  return {
    username,
    platform: "codeforces",
    totalSolved,
    easySolved: easy,
    mediumSolved: medium,
    hardSolved: hard,
    rank: userInfo.rank || "Unrated",
    maxRank: userInfo.maxRank || "N/A",
    rating: userInfo.rating || "Unrated",
    maxRating: userInfo.maxRating || "N/A",
    recentSolved: recentAccepted
  };
};




// ---------------------- POST /platform ----------------------
router.post("/platform", async (req, res) => {
  const { platform, username } = req.body;

  try {
    let stats = null;

    if (platform === "leetcode") {
      stats = await fetchLeetCodeStats(username);
      const recent = await fetchLeetCodeRecentFromPublic(username);
      if (!stats) return res.status(404).json({ error: "User not found" });

      return res.json({ ...stats, recentSubmissions: recent });
    } else if (platform === "codeforces") {
      stats = await fetchCodeforcesStats(username);
      if (!stats) return res.status(404).json({ error: "User not found" });

      return res.json(stats);
    } else {
      return res.status(400).json({ error: "Unsupported platform" });
    }
  } catch (err) {
    console.error("Error fetching platform data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
