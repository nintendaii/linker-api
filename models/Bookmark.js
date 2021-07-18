const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  favicon: [{ type: String, required: true }],
  link: { type: String, required: true },
  date: { type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

module.exports = model("Bookmark", schema);
