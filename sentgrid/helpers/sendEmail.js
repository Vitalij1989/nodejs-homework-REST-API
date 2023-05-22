require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SG_KEY } = process.env;

sgMail.setApiKey(SG_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "ivo1989@ukr.net" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
