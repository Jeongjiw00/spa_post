const express = require("express");
const router = express.Router();

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const Posts = require("../schemas/post.js");
const Comments = require("../schemas/comment.js");

// 게시글 작성 API
router.post("/", async (req, res) => {
  try {
    const { title, name, password, content } = req.body;
    await Posts.create({ title, name, password, content });
    res.json({ result: "post success" });
  } catch (err) {
    res.status(400).json({ result: "post failed" });
  }
});

//전체 게시글 목록 조회 API
router.get("/", async (req, res) => {
  const posts = await Posts.find(
    {},
    {
      __v: false,
      updatedAt: false,
      _id: false,
      content: false,
      password: false,
    }
  ).sort({ createdAt: -1 });

  const postList = posts.map((post) => {
    return {
      _id: post._id,
      title: post.title,
      name: post.name,
      createdAt: moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  res.json({ postList });
});

//게시글 조회 API
router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const post = await Posts.findOne(
      { _id },
      { __v: false, updatedAt: false, password: false }
    );

    const postDetail = {
      _id: post._id,
      title: post.title,
      name: post.name,
      content: post.content,
      createdAt: moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    };

    res.json({ postDetail });
  } catch (err) {
    res.status(400).json({ result: "존재하지 않는 게시글" });
  }
});

//게시글 수정 API
router.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, password, content } = req.body;
    const find = await Posts.findOne({ _id });

    if (
      title === undefined ||
      password === undefined ||
      content === undefined
    ) {
      return res.json({ result: "수정실패! 제대로 값을 입력해주세요." });
    }

    if (find.password === password) {
      await Posts.updateOne(
        { _id: _id },
        { $set: { title: title, content: content } }
      );
      res.json({ result: "수정성공!" });
    } else {
      res.status(403).json({ result: "비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    res.status(404).json({ result: "게시글이 존재하지 않습니다." });
  }
});

//게시글 삭제 API
router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { password } = req.body;
    const deletes = await Posts.findOne({ _id });

    if (password === undefined) {
      return res.json({ result: "비밀번호를 작성해주세요" });
    }

    if (deletes.password === password) {
      await Posts.deleteOne({ _id });
      res.json({ result: "삭제성공!" });
    } else {
      res.status(403).json({ result: "비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    res.status(404).json({ result: "게시글이 존재하지 않습니다." });
  }
});

// 댓글 작성
router.post("/:_id/comment", async (req, res) => {
  try {
    const { _id: postId } = req.params;
    const { name, password, content } = req.body;

    if (name == undefined || password == undefined || content == undefined) {
      res.status(400).json({ result: "내용을 입력해주세요" });
    }

    await Comments.create({ name, password, content, postId });

    res.json({ result: "comment success" });
  } catch (err) {
    res.status(400).json({ result: "comment failed" });
  }
});

// 댓글 목록 조회
router.get("/:_id/comment", async (req, res) => {
  const comments = await Comments.find(
    {},
    {
      __v: false,
      updatedAt: false,
      _id: false,
      password: false,
      postId: false,
    }
  ).sort({ createdAt: -1 });

  const commentList = comments.map((comment) => {
    return {
      name: comment.name,
      content: comment.content,
      createdAt: moment(comment.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  res.json({ commentList });
});

//댓글 수정
router.put("/:_id/comment/:_commentId", async (req, res) => {
  try {
    const { _commentId: _id } = req.params;
    const { password, content } = req.body;
    const find = await Comments.findOne({ _id });

    if (password === undefined || content === undefined) {
      return res.json({ result: "수정실패! 제대로 값을 입력해주세요." });
    }

    if (find.password === password) {
      await Comments.updateOne({ _id: _id }, { $set: { content: content } });
      res.json({ result: "수정성공!" });
    } else {
      res.status(403).json({ result: "비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    res.status(404).json({ result: "게시글이 존재하지 않습니다." });
  }
});

//댓글 삭제
router.delete("/:_id/comment/:_commentId", async (req, res) => {
  try {
    const { _commentId: _id } = req.params;
    const { password } = req.body;
    const deletes = await Comments.findOne({ _id });

    if (password === undefined) {
      return res.json({ result: "비밀번호를 작성해주세요" });
    }

    if (deletes.password === password) {
      await Comments.deleteOne({ _id });
      res.json({ result: "삭제성공!" });
    } else {
      res.status(403).json({ result: "비밀번호가 틀렸습니다." });
    }
  } catch (err) {
    res.status(404).json({ result: "게시글이 존재하지 않습니다." });
  }
});

module.exports = router;
