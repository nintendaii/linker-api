const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  links: [{ type: Schema.Types.ObjectId, ref: "Bookmark" }],
});

module.exports = model("Category", schema);
