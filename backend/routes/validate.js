const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// backend/routes/auth.js or routes/validate.js
router.get("/token", authMiddleware, (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
  })

module.exports = router;