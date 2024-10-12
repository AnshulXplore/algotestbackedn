const mongoose = require("mongoose");

const simpleStrategySchema = new mongoose.Schema({
  strategyName: {
    type: String,
    required: true,
    default: "new Strategy",
  },
  index: {
    type: String,
    required: true,
  },
  legs: [
    {
      segment: {
        type: String,
        required: true,
        default: "Options",
      },
      Id:{
        type:String,
      },

      Expiry: {
        type: String,
        required: function () {
          return this.segment !== "future";
        }, // Expiry is required only if segment is not future
        // default: "Weekly"
      },
      lots: {
        type: Number,
        default: 1,
        required: true,
      },
      Position: {
        type: String,
        required: true,
      },
      optionType: {
        type: String,
        required: function () {
          return this.segment !== "future";
        }, // optionType is required only if segment is not future
      },
      strikeCriteria: {
        type: String,
        required: function () {
          return this.segment !== "future";
        }, // strikeCriteria is required only if segment is not future
      },
      strikeType: {
        type: String,
        required: function () {
          return this.segment !== "future";
        }, // strikeType is required only if segment is not future
      },
      targetProfit: {
        enabled: {
          type: Boolean,
          default: false,
        },
        value: {
          type: Number,
          default: true,
        },
        unit: {
          type: String,
          default: "PTS",
        },
      },
      stopLoss: {
        enabled: {
          type: Boolean,
          default: false,
        },
        value: {
          type: Number,
          default: true,
        },
        unit: {
          type: String,
          default: "PTS",
        },
      },
      trailStopLoss: {
        enabled: {
          type: Boolean,
          default: false,
        },
        valueX: {
          type: Number,
          default: true,
        },
        valueY: {
          type: Number,
          default: true,
        },
        unit: {
          type: String,
          default: "PTS",
        },
        
      },
      
    },
  ],
  entryTime: {
    type: String,
    required: true,
  },
  exitTime: {
    type: String,
    require: true,
  },
  overAllStopLoss: {
    type: Number,
  },
  overAllTarget: {
    type: Number,
  },
  lockProfit: {
    profitReaches: {
      type: Number,
    },
    lockProfit: {
      type: Number,
    },
  },
  trailStopLoss: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Simplestrategy = mongoose.model(
  "simplestrategyBuilder",
  simpleStrategySchema
);
module.exports = Simplestrategy;
