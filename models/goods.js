const mongoose = require("mongoose");

const goodsSchema = mongoose.Schema({
    goodsId: {
        type:Number,
        required: true,
        unique: true,
    },
    name : {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl:{
        type: String,
    },
    category : {
        type: String,
    },
    Price: {
        type:Number,
    },
});

module.exports = mongoose.model("Goods", goodsSchema);

goodsSchema.virtual('goodsId').get(function () {
    return this._id.toHexString();
});
goodsSchema.set('toJSON', {
    virtuals: true,
});