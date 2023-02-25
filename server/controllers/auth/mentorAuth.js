const { db } = require('../../connection/connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 6;
  let recoveryCode = '';

  for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    recoveryCode += chars.substring(randomNumber, randomNumber + 1);
  }

  console.log('recoveryCode: ', recoveryCode);

  const f_name = req.body.m_fname;
  const l_name = req.body.m_lname;
  const email = req.body.m_email;
  const phone = req.body.m_phone;
  const password = req.body.m_password;
  const m_cpassword = req.body.m_cpassword;
  const subject = req.body.subject;
  const price = req.body.price;
  const fb_link = req.body.fb_link;
  const linked_in_link = req.body.linked_in_link;
  const status = 'Created';

  const currentDate = new Date().toLocaleString();

  const q =
    'SELECT * FROM `ementor_db_1`.`mentors` WHERE `email` = ? OR `phone_number` = ?;';

  db.query(q, [email, phone], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res.status(409).json('Email or Phone number already exists!');

    const q = 'SELECT COUNT(*) AS total_mentors FROM `ementor_db_1`.`mentors`;';

    db.query(q, (err, data) => {
      if (err) console.log(err);
      else {
        console.log(data[0].total_mentors + 1);
        const total_mentors = data[0].total_mentors + 1;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const insertQ =
          'INSERT INTO `ementor_db_1`.`mentors`(`id`,`f_name`,`l_name`,`email`,`password`,`phone_number`,`date_created`,`subject`, `price`, `fb_link`, `linked_in_link`, `token`,`status`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';

        db.query(
          insertQ,
          [
            `MAVEN-MENT-100${total_mentors}`,
            f_name,
            l_name,
            email,
            hashedPassword,
            phone,
            currentDate,
            subject,
            price,
            fb_link,
            linked_in_link,
            recoveryCode,
            status
          ],
          (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('Account creation successful!');
          }
        );
      }
    });
  });
};

const login = (req, res) => {
  q = 'SELECT * FROM `ementor_db_1`.`mentors` WHERE `email` = ?';

  db.query(q, [req.body.m_email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    const checkPassword = bcrypt.compareSync(
      req.body.m_password,
      data[0].password
    );

    if (!checkPassword) {
      return res.status(400).json('Wrong username or password!');
    } else {
      const id = data[0].id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
      });

      const { password, ...others } = data[0];

      console.log({ auth: true, token: token, result: others });

      res.cookie('mentor', token, {
        httpOnly: true
      });
      // console.log(req.cookies.mentor);
      res.status(200).json({ auth: true, token: token, result: others });
    }
  });
};

const logout = (req, res) => {
  res.clearCookie('mentor');
  res.status(200).json('User has been logged out');
};

module.exports = { register, login, logout };
