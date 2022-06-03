const express = require("express");
const Goods = require("../models/goods")
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is root page");
});



// 상품 목록 조회 API
router.get("/goods", async (req, res) => {
    const { category } = req.query;
    const goods = await Goods.find({ category });

    res.json({ 
        goods, 
    });
});



// 상품 상세 조회 API
router.get("/goods/:goodsId", async (req, res) => {
    const { goodsId } = req.params;
    //상세 조회                        // 파라미터를 항상 문자열로 받기 때문에 Number를 붙여줌
    const [detail] = await Goods.find({ goodsId: Number(goodsId)})

    res.json({
        detail,
    });
}); 




// 상품 생성 API
router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;
    // status 400은 bad message
    const goods = await Goods.find({ goodsId });
    if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }
    // 제품 생성
    const createdGoods = await Goods.create({ 
        goodsId, 
        name, 
        thumbnailUrl, 
        category, 
        price 
    });
    // 생성된 제품 데이터를 json형식으로 받는다.
    res.json({ goods: createdGoods });
});

module.exports = router;