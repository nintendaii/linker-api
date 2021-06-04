const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true, unique: true },
  links: [{ type: Schema.Types.ObjectId, ref: "Bookmark" }],
});

module.exports = model("Category", schema);
