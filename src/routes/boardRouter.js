const express = require("express");
const router = express.Router();
const { Sequelize, sequelize, DataTypes } = require("sequelize");
const models = require("../models");

router.use(express.json());

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
