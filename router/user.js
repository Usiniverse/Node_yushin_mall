const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/auth-middleware");
const router = express.Router();


// *** 회원가입 API.
router.post('/signup', async (req, res) => {
    const { authorName, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send({ errorMessage: '비밀번호와 비밀번호 확인의 내용이 일치하지 않습니다.', });
        return;
    }

    const existUsers = await User.find({ authorName })
    if (existUsers.length) {
        return res.status(400).send({ errorMessage: '중복된 닉네임입니다.', });
    }

    const user = new User({ authorName, password })
    await user.save();

    res.status(201).send({ message:"회원 가입에 성공했습니다!" });
});


// *** 로그인 API
router.post('/login', async (req, res) => {
    const { authorName, password } = req.body;

        const user = await User.findOne({ authorName, password }).exec();
        if (!user) {
            res.status(400).send({
                errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
            });
            return;
        }

        // const id = user.authorId;
        const token = jwt.sign({ authorId: user.authorId }, process.env.SECRET_KEY); 
        res.status(200).send({ message: "로그인에 성공했습니다", token });
        console.log(token);
    });


// *** 내 정보 조회 API
router.get('/users/me', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user: {
            authorId: user.authorId,
            authorName: user.authorName,
        },
    });
});

module.exports = router;