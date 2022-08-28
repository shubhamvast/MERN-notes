const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const config = require("config");

function sendMail(to, subject, message) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.guser,
      pass: config.gpass,
    },
  });

  message = {
    from: "shubham@valueaddsofttech.com",
    to: to,
    subject: subject,
    text: message,
  };
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

module.exports = { sendMail };
