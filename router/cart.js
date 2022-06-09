const express = require("express");
const Cart = require("../schemas/carts")
const router = express.Router();

router.get("/carts", (req, res) => {
    const { Cart } = req.body;

    
})

// module.exports = router