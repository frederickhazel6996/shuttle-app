const Route = require('express').Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const Students = require('../../models/students');
const moment = require('moment');
const spawn = require('spawn-password');
const jwt = require('jsonwebtoken');

Route.post(
    '/',
    [
        check('username', 'username should not be empty')
            .not()
            .isEmpty()
            .isString(),
        check(
            'student_id',
            'Student ID should not be empty and should be a number'
        )
            .not()
            .isEmpty()
            .isNumeric(),
        check('hall', 'Hall should not be empty').not().isEmpty().isString(),
        check('password', 'Password should  not be empty')
            .not()
            .isEmpty()
            .isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { username, password, hall, student_id } = req.body;
            let temp_id = `STU${spawn
                .spawnAlphaNumericLength(7)
                .toUpperCase()}`;

            const student = new Students({
                username,
                hall,
                student_id,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
                id: temp_id,
                date_created: moment().format('MMM Do YYYY')
            });
            const user = { name: username };
            const access_token = jwt.sign(user, process.env.ACCESS_TOKEN);
            await Students.findOne({
                student_id: student_id
            }).then(students => {
                if (!students) {
                    student.save().then(students => {
                        /*   req.session.user_id = students.student_id; */
                        res.status(200).json({
                            name: username,
                            access_token: access_token
                        });
                    });
                } else {
                    res.status(400).send(
                        'Student with credentials already exists'
                    );
                }
            });
        } catch (error) {
            res.status(422).status('Internal Server error');
        }
    }
);

module.exports = Route;
