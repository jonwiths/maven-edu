const { db } = require('../../connection/connect');
const jwt = require('jsonwebtoken');

const getReviews = (req, res) => {
  const token =
    req.body.mentor ||
    req.query.mentor ||
    req.headers['x-access-token'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'] ||
    req.cookies.mentor;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(500).json(err);
    else {
      // console.log(userInfo.id);
      const q =
        'SELECT R.*, S.id AS s_id, S.f_name AS s_fname, S.l_name AS s_lname FROM ementor_db_1.reviews AS R JOIN ementor_db_1.mentors AS M ON R.mentor_id = M.id JOIN ementor_db_1.students AS S ON R.student_id = S.id WHERE mentor_id = ?;';

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          res.status(200).json(data);
          // console.log(data);
        }
      });
    }
  });
};

module.exports = { getReviews };
