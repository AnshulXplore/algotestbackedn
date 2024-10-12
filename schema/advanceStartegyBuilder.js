const mongoose = require("mongoose");

// const delayedlegSchema = new mongoose.Schema({
//   delayedLegslots: {
//     type: Number,
//     required: true,
//   },
//   delayedLegsposition: {
//     type: String,
//     required: true,
//   },
//   delayedLegspositionType: {
//     type: String,
//     required: true,
//   },
//   delayedLegsExpiry: {
//     type: String,
//     required: true,
//   },
//   delayedLegsStrikeCriteria: {
//     delayedLegsStrikeCriteriaType: {
//       type: String,
//       required: true,
//     },
//     delayedLegsStrikeCriteriaValue: {
//       type: Number,
//       required: function () {
//         return this.delayedLegsStrikeCriteriaType === "StrikeType" || this.delayedLegsStrikeCriteriaType === "Syntheticfuture";
//       },
//     },
//     delayedLegspremiumvalue: {
//       type: Number,
//       required: function () {
//         return this.delayedLegsStrikeCriteriaType === "Premium" || this.delayedLegsStrikeCriteriaType === "closest premium";
//       },
//     },
//     delayedLegspremiumrange: {
//       delayedLegsvalueX: {
//         type: Number,
//       },
//       delayedLegsvalueY: {
//         type: Number,
//       },
    
//     },
//     delayedLegsstraddleWidth: {
//       delayedLegsAtmStrike: {
//         type: Number,
//       },
//       delayedLegsvalue: {
//         type: Number,
//       },
    
//     },
//     delayedLegsatmStraddlepremium:{
//       delayedLegsvalue:{
//         type:Number,
//       },
//       delayedLegsunit:{
//         type:String
//       }
//     }
//   },
//   delayedLegstargetProfit: {
//     delayedLegsenabled: {
//       type: Boolean,
//       default: false,
//     },
//     delayedLegsvalue: {
//       type: Number,
//       default: true,
//     },
//     delayedLegsunit: {
//       type: String,
//       default: "PTS",
//     },
//   },
//   delayedLegsstopLoss: {
//     delayedLegsenabled: {
//       type: Boolean,
//       default: false,
//     },
//     delayedLegsvalue: {
//       type: Number,
//       default: true,
//     },
//     delayedLegsunit: {
//       type: String,
//       default: "PTS",
//     },
//   },
//   delayedLegstrailStopLoss: {
//     delayedLegsenabled: {
//       type: Boolean,
//       default: false,
//     },
//     delayedLegsvalueX: {
//       type: Number,
//       default: true,
//     },
//     delayedLegsvalueY: {
//       type: Number,
//       default: true,
//     },
//     delayedLegsunit: {
//       type: String,
//       default: "PTS",
//     },
//   },
//   delayedLegsreEntryOntarget: {
//     delayedLegsenabled: {
//       type: Boolean,
//       default: false,
//     },
//     delayedLegstype: {
//       type: String,
//       default: "RE ASAP",
//     },
//     delayedLegsvalue: {
//       type: Number,
//       default: 1,
//     },
//     delayedLegslazyLeg: {
//       type: String,
//       required: function () {
//         return this.delayedLegstype === "lazy leg";
//       },
//     },
//   },
//   delayedLegsreEntryOnSL: {
//     delayedLegsenabled: {
//       type: Boolean,
//       default: false,
//     },
//     delayedLegstype: {
//       type: String,
//       default: "RE ASAP",
//     },
//     delayedLegsvalue: {
//       type: Number,
//       default: 1,
//     },
//     delayedLegslazyLeg: {
//       type: String,
//       required: function () {
//         return this.delayedLegstype === "lazy leg";
//       },
//     },
//   },
//   delayedLegssimpleMomentum: {
//     delayedLegsenabled: {
//       type: Boolean,
//       default: false,
//     },
//     delayedLegsunit: {
//       type: String,
//     },
//     delayedLegsvalue: {
//       type: Number,
//     },
//   },
//   delayedLegsrangebreakOut: {
//     delayedLegsenabled: {
//       type: Boolean,
//     },
//     delayedLegsstart: {
//       type: String,
//       default: "09:35",
//     },
//     delayedLegsend: {
//       type: String,
//       default: "09:45",
//     },
//     delayedLegsentryOn: {
//       type: String,
//       default: "low",
//     },
//     delayedLegsmethod: {
//       type: String,
//       default: "instrument",
//     },
//   },
// });

// Create a parent schema for holding legs
const advanceStrategySchema = new mongoose.Schema({
  strategyName: { // 1st point strategyName
    type: String,
    required: true,
    default: "new Strategy",
  },  // end
  instrumentSetting: { // 2nd point instrument setting
    Ticker: {
      type: String,
      default: "NIFTY",
    },
    // Underlyingfrom: {
    //   type: String,
    //   default:"CASH",
    // },
  }, // end
  entrySetting: { // 3rd point entry setting
    strategyType: {
      type: String,
      required: true,
      default: "intraDay",
    },
    entryTime: {
      type: String,
      required: true,
    },
    exitTime: {
      type: String,
      required: true,
    },
    restrictReEntry: {
      enabled: {
        type: Boolean,
        default: false,
        required: function () {
          return this.strategyType === "Intraday";
        },
      },
      value: {
        type: String,
        required: function () {
          return this.enabled===true;
        },
      },
    },
    expiryPosition: {
      type: String,
      default: "weekly",
      required: function () {
        return this.strategyType === "Positional";
      },
    },
    entry: {
      type: Number,
    },
    exit: {
      type: Number,
    }
  }, // end
  legWiseSetting: { // 4th point leg wise setting
    squareOff: {
      type: String,
      required: true,
    },
    adjustSLToBreakEven: {
      enabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
      },
    },
  }, // end

  // delayedLegs: {
  //   type: Map,
  //   of: delayedlegSchema,
  // },
  legs: [ // 5th point legs
    {
      lots: {
        type: Number,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      positionType: {
        type: String,
        required: true,
      },
      Expiry: {
        type: String,
        required: true,
      },
      StrikeCriteria: {
        StrikeCriteriaType: {
          type: String,
          required: true,
        },
        StrikeCriteriaValue: {
          type: String,
        },
        premiumvalue: {
          type: Number,
          
        },
        premiumrange: {
          valueX: {
            type: Number,
          },
          valueY: {
            type: Number,
          },
        },
        straddleWidth: {
          AtmStrike: {
            type: String,
          },
          value: {
            type: Number,
          },
        
        },
        atmStraddlepremium:{
          value:{
            type:Number,
          },
          unit:{
            type:String
          }
        }
        
      },
      targetProfit: {
        enabled: {
          type: Boolean,
          default: false,
        },
        value: {
          type: Number, 
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
          type: Number
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
        
        },
        valueY: {
          type: Number,
          
        },
        unit: {
          type: String,
          
        },
      },
      reEntryOntarget: {
        enabled: {
          type: Boolean,
          default: false,
        },
        // type: {
        //   type: String,
        //   default: "RE ASAP",
        // },
        // value: {
        //   type: Number,
        //   default: 1,
        // },
        // lazyLeg: {
        //   type: String,
        // },
      },
      reEntryOnSL: {
        enabled: {
          type: Boolean,
          default: false,
        },
        // type: {
        //   type: String,
        //   default: "RE ASAP",
        // },
        // value: {
        //   type: Number,
        //   default: 1,
        // },
        // lazyLeg: {
        //   type: String,
        // },
      },
      simpleMomentum: {
        enabled: {
          type: Boolean,
          default: false,
        },
        unit: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
      rangebreakOut: {
        enabled: {
          type: Boolean,
        },
        start: {
          type: String,
          default: "09:35",
        },
        end: {
          type: String,
          default: "09:45",
        },
        entryOn: {
          type: String,
          default: "low",
        },
        method: {
          type: String,
          default: "instrument",
        },
      },
    },
  ], // end
  overAllStrategySetting:{
    overallSL:{
      enabled:{
        type:Boolean,
        default:false
      },
      SLtype:{
        type:String,
        default:"Max Profit"
      },
      value:{
        type:Number,
      }
    },
    overallTarget:{
      enabled:{
        type:Boolean,
        default:false
      },
      targetType:{
        type:String,
        default:"Max Profit"
      },
      value:{
        type:Number,
      }
    },
    overallReEntrySL:{
      enabled:{
        type:Boolean,
        default:false
      },
      SLtype:{
        type:String,
        default:"Re momentum"
      },
      value:{
        type:Number,
        default:1
      }
    },
    overallReEntryTarget:{
      enabled:{
        type:Boolean,
        default:false
      },
      SLtype:{
        type:String,
        default:"Re momentum"
      },
      value:{
        type:Number,
        default:1
      }
    },
    trailingOption:{
      enabled:{
        type:Boolean,
        default:false
      },
      Lock:{
        profitAcheive:{
          type:Number
        },
        lockProfit:{
          type:Number
        }
      },
      lockAndTrail:{
        profitAcheive:{
          type:Number
        },
        lockProfit:{
          type:Number
        },
        profitIncrease:{
          type:Number
        },
        trailProfitBy:{
          type:Number
        }
      },
      overAllTrailSl:{
        unit:{
          type:String
        },
        value1:{
          type:Number
        },
        value2:{
          type:Number
        }
      }
    }
  },// end
  date:{
    startdate:{
      type:String,
      default:"10-10-23"
    },
    endDate:{
      type:String,
      default:"10-10-24"
    }
  }
});
// yeh hai entry or exit ki deafault value ki liye jab positional ho
advanceStrategySchema.pre("save", function (next) {
  if (this.entrySetting.strategyType === "Positional") {
    this.entrySetting.entry = this.entrySetting.entry || 0; 
    this.entrySetting.exit = this.entrySetting.exit || 0;  
  } else {
    this.entrySetting.entry = undefined;
    this.entrySetting.exit = undefined;
  }
  next();
});
// yeh expiryposition ke liye hai jab positional ho stetgytype
advanceStrategySchema.pre("save", function (next) {
  if (this.entrySetting.strategyType === "Positional") {
    this.entrySetting.expiryPosition = this.entrySetting.expiryPosition || "weekly"; 
  } else {
    this.entrySetting.expiryPosition = undefined;
  }
  next();
});
// yeh hai legwise main adjisutevenbroken ke liye value rkhni hai ki nahi 
advanceStrategySchema.pre("save", function (next) {
  if (this.legWiseSetting.adjustSLToBreakEven.enabled === true) {
    this.legWiseSetting.adjustSLToBreakEven.value = this.legWiseSetting.adjustSLToBreakEven.value || "All Legs"; 
  } else {
    this.legWiseSetting.adjustSLToBreakEven.value = undefined;
  }
  next();
});

advanceStrategySchema.pre("save", function (next) {
  this.legs.map((e)=>{
    if(e.reEntryOntarget.enabled===true && e.reEntryOntarget.type==="lazy leg"){
      e.reEntryOntarget.value=undefined;
    }
    else{
      e.reEntryOntarget.lazyLeg=undefined;
      
    }
  })
  next()
});

advanceStrategySchema.pre("save", function (next) {
  this.legs.map((e)=>{
    if(e.reEntryOnSL.enabled===true && e.reEntryOnSL.type==="lazy leg"){
      e.reEntryOnSL.value=undefined;
      next();
    }
    else{
      e.reEntryOnSL.lazyLeg=undefined;
      next()
    }
  })
});
advanceStrategySchema.pre("save", function (next) {
  if(this.overAllStrategySetting.trailingOption.enabled===false){
    this.overAllStrategySetting.trailingOption.Lock=undefined;
    this.overAllStrategySetting.trailingOption.lockAndTrail=undefined;
    this.overAllStrategySetting.trailingOption.overAllTrailSl=undefined;
  }
  next()
});

const AdvanceStrategy = mongoose.model("AdvanceStrategy", advanceStrategySchema);
module.exports = AdvanceStrategy;
