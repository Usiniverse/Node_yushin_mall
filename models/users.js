const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        userName: String,
        password: String,
        email:String,
        phoneNumber:String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);

UserSchema.virtual('goodsId').get(function () { return this._id.toHexString(); });
UserSchema.set('toJSON', { virtuals: true, });