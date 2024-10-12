const mongoose = require("mongoose");

const legsSchema = new mongoose.Schema({
  segment: {
    type: String,
    required: true,
    default: "Options",
  },
  
  Expiry: {
    type: String,
    required: function() { return this.segment !== "future"; }, // Expiry is required only if segment is not future
    // default: "Weekly"
  },
  lots: {
    type: Number,
    default: 1,
    required: true
  },
  Position: {
    type: String,
    required: true,
  },
  optionType: {
    type: String,
    required: function() { return this.segment !== "future"; }, // optionType is required only if segment is not future
  },
  strikeCriteria: {
    type: String,
    required: function() { return this.segment !== "future"; }, // strikeCriteria is required only if segment is not future
  },
  strikeType: {
    type: String,
    required: function() { return this.segment !== "future"; }, // strikeType is required only if segment is not future
  },
  targetProfit: {
    enabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: true
    },
    unit: {
      type: String,
      default: "PTS"
    }
  },
  stopLoss: {
    enabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: true
    },
    unit: {
      type: String,
      default: "PTS"
    }
  },
  trailStopLoss: {
    enabled: {
      type: Boolean,
      default: false
    },
    valueX: {
      type: Number,
      default: true
    },
    valueY: {
      type: Number,
      default: true
    },
    unit: {
      type: String,
      default: "PTS"
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const SimpleLegs = mongoose.model("simpleLegs", legsSchema);
module.exports = SimpleLegs;
