const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Cart", cartSchema);

cartSchema.virtual('goodsId').get(function () {
    return this._id.toHexString();
});
cartSchema.set('toJSON', {
    virtuals: true,
});