import { model, Schema } from "mongoose";

const SecretSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    secret_ttl: {
      type: Number,
      required: true,
    },
    lifespan: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: false,
    },
    is_burned: {
      type: Boolean,
      default: false,
    },
    is_expired: {
      type: Boolean,
      default: false,
    },
    is_viewed: {
      type: Boolean,
      default: false,
    },
    has_password: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export default model("Secret", SecretSchema);
