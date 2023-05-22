const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../sendgrid/helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("Missing required field email");
  }
  if (user.verify) {
    throw new BadRequest(`Verification has already been passed`);
  }
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Please verify your email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification successful",
  });
};

module.exports = resendVerifyEmail;
