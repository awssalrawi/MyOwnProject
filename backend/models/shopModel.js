const mongoose = require('mongoose');
const slugify = require('slugify');
const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Your Shop Must have name!'],
    },
    slug: {
      type: String,
      unique: [true, 'This name already used. Please choose a different name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    shopImage: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // orders: [
    //   {
    //     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    //     payedPrice: { type: String, required: true },
    //     purchasedQty: { type: Number, required: true },
    //     payedCurrency: { type: String, required: true },
    //     specific: String,
    //     payedPiceInDollar: Number,
    //     notification: String,
    //     itemStatus: {
    //       type: String,
    //       default: 'pending',
    //       enum: ['pending', 'Delivered to Ltreda', 'Cancelled', 'Refund'],
    //     },
    //   },
    // ],
    location: String,
  },
  { timestamps: true }
);
ShopSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
module.exports = mongoose.model('Shop', ShopSchema);
