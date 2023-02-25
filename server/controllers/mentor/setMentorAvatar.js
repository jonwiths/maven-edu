const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../../client/', 'uploads'),
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const setMentorAvatar = (req, res) => {
  const profile = req.body.profile;

  const token =
    process.env.MY_SECRET_TOKEN ||
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
        'UPDATE ementor_db_1.mentor_education SET `profile` = ? WHERE `mentor_id` = ?;';

      db.query(q, [profile, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        else {
          res.status(200).json(data);
          // console.log(data);
        }
      });
    }
  });
};

module.exports = {
  setMentorAvatar
};
