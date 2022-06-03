const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        userName: String,
        password: String,
        email:String,
        phoneNumber:String,
        address:address,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);

UserSchema.virtual('authorId').get(function () { return this._id.toHexString(); });
UserSchema.set('toJSON', { virtuals: true, });