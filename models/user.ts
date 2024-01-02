import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Emial already exists"],
    required: [true, "Emial is required"]
  },
  name: {
    type: String
  },
  image: {
    type: String
  }
});

export default models.User || model("User", userSchema);