const express = require("express");

const {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const { joiSchema, joiSchemaFavorite } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(joiSchemaFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
