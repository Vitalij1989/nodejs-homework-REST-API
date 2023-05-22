const { Contact } = require("../../models");
const { Conflict } = require("http-errors");

const add = async (req, res, next) => {
  const { _id } = req.user;
  const { name } = req.body;
  const existingContact = await Contact.findOne({ name, owner: _id });
  try {
    if (existingContact) {
      throw new Conflict(`Contact with name "${name}" already exists`);
    }

    const result = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
