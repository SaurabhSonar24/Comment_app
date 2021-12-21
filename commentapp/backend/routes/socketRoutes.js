const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "wewr32vsdfgswfwr2343ert";
const userData = require('../db/userData');
function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}

router.post("/register", (req, res) => {
    let name = req.body.name;
    let lname = req.body.lname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let ins = new userData({ name: name, lname: lname, username: username, email: email, password: password });
    ins.save((err) => {
        if (err) {
            res.json({ "err": "Please fill the form" })
        };
        res.json({ "msg": "Registered successfully" })
    })
})
router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    userData.findOne({ email: email, password: password, }, (err, data) => {
        if (err) {
            res.json({ "err": err })
        }
        if (data === null) {
            res.json({ "err": "Email or password wrong" })
        }
        else {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({ "err": 0, "msg": "Login Success", "token": token })
        }
    })
})

const formData = require('../db/userSchema')

router.post("/addPost", (req, res) => {

    let title = req.body.title;
    let des = req.body.des;

    let ins = new formData({ title: title, des: des });
    console.log(ins)
    ins.save((err) => {
        if (err) {
            res.json({ "err": "Please fill the form" })
        }
        else {
            res.json({ "msg": "Data added successfully" })

        }

    })

})

router.get("/products", autenticateToken, (req, res) => {
    formData.find({}, (err, products) => {
        if (err) {
            res.json({ "err": err })
        }
        else {
            res.json({ "products": products });
        }
    })

})

module.exports = router;