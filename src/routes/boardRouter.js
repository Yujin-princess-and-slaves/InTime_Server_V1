const express = require("express");
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require("sequelize");
const models = require("../models");

router.use(express.json());

router.get("/:boardId", async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const post = await models.board.findOne({ where: { boardId: boardId } });

    if (!post) {
      res
        .status(404)
        .json({ success: false, message: "게시물을 찾을 수 없습니다" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "서버 오류" });
  }
});

router.get("/", async (req, res) => {
  try {
    const postList = await models.board.findAll({
      order: [
        ["title", "ASC"],
        ["content", "ASC"],
        ["date", "ASC"],
      ],
    });

    // postList.forEach((post) => {
    //   post.content = post.content.substring(0, 150);
    // });

    res.send(postList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "서버 오류" });
  }
});

router.put("/:boardId", async (req, res) => {
  const id = req.params.boardId;
  const { title, content } = req.body;

  try {
    const board = await models.board.findOne({
      where: { boardId: id },
    });

    if (!board) {
      return res
        .status(404)
        .json({ success: false, error: "게시판을 찾을 수 없습니다" });
    }

    board.title = title;
    board.content = content;
    board.dataTypes = Sequelize.literal(`now()`);

    await board.save();

    res.status(200).json({
      success: true,
      message: "게시판 업데이트 성공",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "서버 에러" });
  }
});

router.delete("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const board = await models.board.findOne({
      where: { boardId: boardId },
    });
    if (!board) {
      return res
        .status(404)
        .json({ success: false, error: "게시판을 찾을 수 없습니다" });
    }

    await board.destroy();

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "서버 에러" });
  }
});

module.exports = router;
