import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Coupon", couponSchema);
