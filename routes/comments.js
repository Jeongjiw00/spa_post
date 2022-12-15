const express = require("express");
const router = express.Router();

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const Posts = require("../schemas/post.js");
const Comments = require("../schemas/comment.js");


module.exports = router;
