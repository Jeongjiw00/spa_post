const express = require("express");
const router = express.Router();

//
const Post = require("../schemas/post.js");
const Boards = require("../schemas/boards.js");

// 상품목록조회
router.get("/boards", (req, res) => {
  res.status(200).json({ boards: boards });
});

// 상품상세조회
router.get("/boards/:postId", (req, res) => {
  const { postId } = req.params;

  const [detail] = boards.filter((boards) => boards.postId === Number(postId));
  res.status(200).json({ detail });
});

// 장바구니에 상품추가 api
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당 상품이 존재합니다.",
    });
  }

  await Cart.create({ goodsId, quantity });

  res.json({ result: "sucess" });
});

//장바구니 상품 수량 수정 api(없는 상품이여도 오류는 안남)
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });

  if (existsCarts.length) {
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }
    );
  }
  res.status(200).json({ success: true });
});

// 장바구니 상품을 제거하는 api
router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });

  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});

//상품추가api
const Goods = require("../schemas/goods.js");
router.post("/goods/", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });

  if (goods.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 GoodsId입니다.",
    });
  }
  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createdGoods });
});

module.exports = router;
