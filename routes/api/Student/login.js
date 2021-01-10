const Route = require('express').Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const Students = require('../../models/students');
const jwt = require('jsonwebtoken');

Route.post(
    '/',
    [
        check('student_id', 'student id should exist').isNumeric().exists(),
        check('password', 'password should exist').isString().exists()
    ],
    async function (req, res) {
        try {
            const { student_id, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            await Students.findOne({ student_id: student_id }).then(users => {
                if (!users) {
                    return res.status(500).send('user was not found');
                } else {
                    if (bcrypt.compareSync(password, users.password) === true) {
                        /*    req.session.user_id = users.student_id;
                        console.log(req.session.id); */
                        const user = { name: users.username };
                        const access_token = jwt.sign(
                            user,
                            process.env.ACCESS_TOKEN
                        );
                        res.status(200).json({
                            access_token: access_token,
                            username: users.username
                        });
                    } else {
                        res.status(401).send('invalid username or password');
                    }
                }
            });
        } catch (err) {
            return res.status(400).send('Internal Server Error');
        }
    }
);

module.exports = Route;
