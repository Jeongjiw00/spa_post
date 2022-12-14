const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// localhsot:3000/api/carts GET Method
router.get("/carts", async (req, res) => {
  const carts = await Cart.find({});
  // carts = [{goodsId, quantity},{goodsId, quantity}...]
  const goodsIds = carts.map((cart) => {
    return cart.goodsId; //[2, 11, 6] 이런 식으로 결과가 나옴
  });
  // goodsIds 변수안에 존재하는 값일 때만 Goods에 해당하는 모든 정보를 조회함.
  const goods = await Goods.find({ goodsId: goodsIds });
  //cart = {goodsId, quantity}
  const results = carts.map((cart) => {
    return {
      quantity: cart.quantity,
      goods: goods.find((item) => item.goodsId === cart.goodsId),
    };
  });

  res.json({
    carts: results,
  });
});

module.exports = router;
