import { Schema, model } from "mongoose";

const OneTimeSecretSchema = new Schema(
  {
    secret: {
      type: Schema.Types.ObjectId,
      ref: "Secret",
      required: true,
    },
    state: {
      type: String,
      enum: ["new", "viewed", "expired"],
      default: "new",
    },
    

  

  },
  { timestamps: true }
);

export default model("OneTimeSecret", OneTimeSecretSchema);
