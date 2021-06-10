const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  favicon: [{ type: String, required: true }],
  link: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = model("Bookmark", schema);
