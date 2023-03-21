/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var C13 = new Array(2256290, 4625872, 3361244, 5786032, 4367536, 2796216, 5270096, 3847488, 2407236, 297654, 3446192, 2118514, 4606320, 3040505, 5526704, 4090448, 2714711, 5003968, 3582816, 145518, 4756192, 3197308, 5687648, 4248736, 2808488, 5158224, 3823264, 2403765, 4990416, 215342, 2020018, 4499792, 3069145, 5419680, 3978576, 2643799, 5131680, 3581360, 2250100, 296235, 3385660, 5663024, 4221600, 2796968, 5286736, 3820384, 2403044, 4892016, 3560048, 128294, 4384048, 3042490, 5527200, 3955536, 2706134, 5130976, 3712224, 2151636, 4641376, 200019, 5682464, 4109984, 2840233, 5264752, 3951056, 2466229, 4891824, 3451472, 2026065, 273234, 2930090, 5417824, 4101552, 2640758, 5130608, 3695792, 2274483, 4614736, 3173179, 353708, 4238176, 2829016, 5261792, 3843280, 2413749, 4764240, 3323168, 1897762, 4371872, 182622, 5412272, 4082096, 2663798, 5022896, 3582544, 2144852, 4615488, 3059052, 5548896, 4232048);
var C14 = new Array(2967992, 5261680, 3826864, 2387109, 4774480, 33e5, 1889985, 4368096, 3052283, 338222, 3983712, 2544983, 5035168, 3462480, 2184531, 4609696, 3188432, 1746385, 4231856, 174683, 5286224, 3715744, 2339493, 4762960, 3427744, 1887137, 4367728, 3035897, 5526128, 247443, 2517815, 5008032, 3582800, 2119507, 4606816, 3188348, 5677792, 4116832, 2681192, 322890, 3725984, 2252453, 4740816, 3427040, 2065874, 4367056, 2937210, 5417552, 3978528, 150900, 4894112, 3560912, 2249651, 4605360, 3187376, 1811121, 4237904, 2667865, 5139232, 232150, 2446181, 4756336, 3425648, 2008435, 4477616, 2910826, 5298512, 3955360, 2599623, 305774, 3560160, 2149091, 4629856, 3068603, 5558944, 4117840, 2775769, 5133984, 3712720, 148829, 4870832, 3320016, 1893714, 4371104, 2930026, 5287248, 3952032, 2533286, 5023088, 222491, 2204020, 4613424, 3238556, 5528224, 4107088, 2763737, 5253984, 3711856, 2380517, 4772192);
var C15 = new Array(3335344, 1864995, 4250272, 2972491, 5396176, 3943136, 2532311, 5022416, 3592528, 126357, 4502816, 3061404, 5549472, 4085200, 2827705, 5260720, 3842736, 2271925, 4761936, 207698, 1895073, 4238176, 2905532, 5393264, 4081008, 2511735, 5001904, 3565904, 2189652, 279978, 3058524, 5547744, 4213472, 2663912, 5154144, 3723936, 2288294, 4642128, 3298976, 121178, 4363728, 2902779, 5392816, 3974352, 2544343, 4895392, 3454288, 2121044, 4599200, 190811, 1774961, 4213168, 2794745, 5137584, 3697296, 2272934, 4746064, 3287904, 1878754, 272695, 3098987, 5294432, 3859664, 2517799, 4905632, 3431120, 2111187, 4597472, 3183328, 101677, 4114768, 2675929, 5158048, 3585680, 2315686, 4740528, 3417552, 1877426, 4362928, 182935, 5400912, 3830944, 2405800, 4893536, 3560368, 2108276, 4597104, 3166896, 1757873, 255637, 2648793, 5135008, 3713872, 2248405, 4737760, 3318640, 2049251, 4248224, 2873675, 5289296);
var C16 = new Array(3954336, 2398119, 4888016, 3558112, 2140596, 4498640, 3068496, 1682081, 4109648, 165229, 5123488, 3708336, 2378613, 4737392, 3318960, 1881268, 4352656, 2796892, 5266256, 246454, 2528744, 4887280, 3557744, 2124132, 4510880, 2943580, 5428880, 4085456, 2829146, 320110, 3707616, 2280150, 4770128, 3200160, 1766562, 4240784, 2905820, 5264816, 3941840, 158011, 5018288, 3451216, 2077013, 4484256, 3059024, 1649505, 4082608, 2762233, 5252464, 230699, 2271910, 4647248, 3304096, 1751715, 4238160, 2902907, 5393120, 3843440, 2511575, 306470, 3463504, 1989973, 4478624, 3053264, 1725906, 4082400, 2663674, 5154e3, 3723856, 134505, 4633936, 3290528, 1878946, 4232624, 2967996, 5392752, 3974320, 2405048, 4876880, 214740, 2075476, 4467616, 3052400, 3035890, 5523824, 3957993, 6345888, 4909648, 3619494, 370029, 4598624, 3245539, 5673696, 4114811, 6596944, 5166240, 3725992, 6075728, 4740784, 3419556);
var C17 = new Array(5809616, 4362960, 2937522, 5417296, 3978457, 6318752, 4894032, 3561302, 6048672, 281179, 3229043, 5657264, 4303179, 6482256, 5139104, 3714472, 6200144, 4737888, 3320548, 363087, 4477536, 2871906, 5297488, 4020890, 6444704, 4888272, 3623382, 6048224, 4629712, 191821, 5558864, 4117819, 66e5, 5027232, 3773864, 6198704, 4868528, 3320180, 5809328, 273061, 2943569, 5270848, 3845563, 6433632, 5018480, 3558134, 6048112, 4613296, 3175587, 339365, 4090715, 6575824, 5253856, 3707879, 6197984, 4770144, 3395925, 5690528, 4250192, 185173, 5396128, 3843834, 6432208, 5018320, 3582646, 5941584, 4502688, 3062436, 5549392, 259418, 6572960, 5154224, 3887736, 6181552, 4745520, 3306837, 5794464, 4238160, 2906962, 337078, 4040042, 6333680, 5001824, 3467878, 5952816, 4479648, 3061411, 5543632, 4213472, 167069, 5154e3, 3723992, 6206032, 4633888, 3265861, 5680544, 4363728, 2905522, 5392816, 3974393);
var C18 = new Array(6464688, 5024336, 3650647, 6056768, 4631968, 3169124, 5673840, 4344176, 2935153, 329291, 3828392, 6216272, 4872864, 3321541, 5809888, 4494064, 3166946, 5425504, 4052122, 404810, 5035344, 3562327, 6051488, 4630224, 3315156, 5673680, 4237660, 2806960, 5288608, 232282, 6204752, 4869536, 3451812, 5809520, 4477616, 3060339, 5531952, 3959483, 6449824, 314037, 3754839, 6048608, 4629872, 3298020, 5689696, 4122940, 6608160, 5167776, 3889961, 386413, 4868832, 3450325, 5939920, 4378960, 2943570, 5420320, 3987115, 6335904, 5002704, 230587, 6178224, 4629168, 3199668, 5679696, 4306220, 6581024, 5156192, 3823081, 6329200, 304215, 3450229, 5919408, 4483664, 2972242, 5397152, 4041547, 6465248, 5018336, 3589862, 379478, 4641952, 3074725, 5559632, 4216480, 2807201, 5154256, 3887833, 6312624, 4893008, 208213, 5812896, 4371792, 3042642, 5393824, 4040139, 6464880, 5132720, 3582327, 6055216, 4614800);
var C19 = new Array(3193507, 5679952, 4336544, 2927457, 5415792, 3953128, 6345056, 4908208, 3631398, 5823136, 4479824, 3217106, 5647072, 4104928, 2679506, 5163344, 3724630, 6075680, 4634256, 3300772, 5789136, 4335056, 2926003, 5415600, 4040887, 6334800, 4895904, 3519141, 5942608, 4478384, 3156852, 5645680, 4215545, 6574768, 5138768, 3698006, 6183584, 4631376, 3299028, 5786336, 4367728, 2966867, 5296800, 3926183, 6346064, 4872864, 3452325, 5936592, 4606688, 3058356, 5547216, 4117176, 6599312, 5027152, 3692375, 6172064, 4756944, 3296629, 5786032, 4367536, 2991283, 5270160, 3845528, 6318928, 4991840, 3511141, 5935984, 4606320, 3172708, 5432480, 3992170, 6478480, 5135056, 3746518, 6171360, 4756192, 3328725, 5687632, 4248736, 2872483, 5289616, 3823527, 6313392, 4990416, 3577269, 5935792, 4499792, 3070292, 5551264, 3978576, 2648914, 5133744, 3811190, 6169968, 4739760, 3320485, 5695824, 4221600, 2800291, 5286736);
var C20 = new Array(3951576, 6441696, 5023088, 3691733, 6083168, 4512080, 3233108, 5658272, 4233936, 2774482, 5262048, 3843510, 6333648, 4772432, 3396181, 5813568, 4380320, 2928034, 5412272, 4147575, 6572400, 5022896, 3585205, 6056528, 4615504, 3222356, 5647200, 4232560, 2904818, 5261680, 3827046, 6214816, 4778576, 3369621, 5790416, 4467552, 3114723, 5411552, 4049111, 6474064, 5035168, 3528870, 5944656, 4609696, 3253684, 5645776, 4231888, 2806450, 5286224, 3716439, 6188192, 4765008, 3494741, 5787040, 4367792, 3097971, 5526192, 3975592, 6351184, 5008032, 3583654, 5942096, 4606816, 3189476, 5678448, 4215392, 2683491, 5167424, 3726151, 6084256, 4757200, 3427797, 5917392, 4367568, 2938036, 5419600, 3986776, 6337856, 4896160, 3626406, 6067632, 4606384, 3189108, 5678256, 4237904, 2730578, 5139744, 3779911, 6204256, 4756336, 3427061, 5917040, 4482224, 2913443, 5302864, 4024920, 6444704, 4893392, 3577557, 6066912);
var C21 = new Array(4639072, 3070292, 5559456, 4119120, 2782546, 5133984, 3712935, 6202832, 4887216, 3320501, 5810512, 4371616, 2931364, 5287248, 3954137, 6441888, 5023152, 3625334, 6050416, 4614448, 3176756, 5532320, 4107600, 2775890, 5262176, 3712742, 6202592, 4772448, 3336805, 5690656, 4250272, 2971299, 5396176, 3951355, 6441424, 5022928, 3657910, 5943888, 4502816, 3071269, 5551520, 4085200, 2774450, 5261744, 3843447, 6202544, 4762192, 3387989, 5795104, 4238688, 2968419, 5395312, 4082152, 6343024, 5002416, 3631270, 5954128, 4479648, 3122852, 5548752, 4215520, 2675427, 5163344, 3724631, 6214816, 4643152, 3300693, 5789344, 4368080, 2905556, 5395120, 3975608, 6465840, 4895888, 3454630, 5942608, 4609440, 3058532, 5547376, 4215472, 2797939, 5138736, 3697463, 6187680, 4762960, 3353301, 5778272, 4367728, 3035876, 5296480, 3860824, 6346016, 4905616, 3496614, 5920464, 4598496, 3189204, 5546704, 4116816, 2681170);
var C22 = new Array(5158176, 3725095, 6204832, 4871600, 3550645, 5916080, 4498096, 3060404, 5548368, 3978585, 6449952, 5025104, 3692390, 6050672, 4736368, 3302772, 5788336, 4221264, 2783571, 5266080, 3910311, 6203088, 4868832, 3515109, 5940560, 4379296, 3007140, 5428560, 4086459, 6444704, 5019344, 3754422, 6179504, 4630736, 3200181, 5681808, 4240720, 2780498, 5262752, 3904871, 6329712, 4868528, 3451253, 5924016, 4483728, 2931348, 5401424, 4074336, 2665313, 5018992, 3689190, 6082912, 4646048, 3075365, 5560976, 4217680, 2897619, 5253856, 3838935, 6329040, 4901200, 3331414, 5813408, 4372112, 3038612, 5395888, 4072954, 6563248, 5149360, 3582646, 6056272, 4617376, 3256997, 5549392, 4216224, 2796403, 5383536, 3822455, 6312624, 4876624, 3435862, 5790368, 4369232, 3036884, 5524192, 3974512, 2647250, 5034592, 3599014, 5952848, 4610720, 3190181, 5674448, 4213456, 2795955, 5285072, 3855031, 6206032, 4764992, 3396950);
var CAN = new Array("Gi\xE1p", "\u1EA4t", "B\xEDnh", "\u0110inh", "M\u1EADu", "K\u1EF7", "Canh", "T\xE2n", "Nh\xE2m", "Qu\xFD");
var CHI = new Array("T\xFD", "S\u1EEDu", "D\u1EA7n", "M\xE3o", "Th\xECn", "T\u1EF5", "Ng\u1ECD", "M\xF9i", "Th\xE2n", "D\u1EADu", "Tu\u1EA5t", "H\u1EE3i");
new Array("Ch\u1EE7 nh\u1EADt", "Th\u1EE9 hai", "Th\u1EE9 ba", "Th\u1EE9 t\u01B0", "Th\u1EE9 n\u0103m", "Th\u1EE9 s\xE1u", "Th\u1EE9 b\u1EA3y");
new Array("110100101100", "001101001011", "110011010010", "101100110100", "001011001101", "010010110011");
new Array("Xu\xE2n ph\xE2n", "Thanh minh", "C\u1ED1c v\u0169", "L\u1EADp h\u1EA1", "Ti\u1EC3u m\xE3n", "Mang ch\u1EE7ng", "H\u1EA1 ch\xED", "Ti\u1EC3u th\u1EED", "\u0110\u1EA1i th\u1EED", "L\u1EADp thu", "X\u1EED th\u1EED", "B\u1EA1ch l\u1ED9", "Thu ph\xE2n", "H\xE0n l\u1ED9", "S\u01B0\u01A1ng gi\xE1ng", "L\u1EADp \u0111\xF4ng", "Ti\u1EC3u tuy\u1EBFt", "\u0110\u1EA1i tuy\u1EBFt", "\u0110\xF4ng ch\xED", "Ti\u1EC3u h\xE0n", "\u0110\u1EA1i h\xE0n", "L\u1EADp xu\xE2n", "V\u0169 Th\u1EE7y", "Kinh tr\u1EADp");

var INT = function(d) {
  return Math.floor(d);
};
var RootDate = function() {
  function RootDate2(date) {
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
    this.leap = date.leap;
    this.jd = date.jd || RootDate2.jdn(this.day, this.month, this.year);
  }
  RootDate2.jdn = function(day, month, year) {
    var a = INT((14 - month) / 12);
    var y = year + 4800 - a;
    var m = month + 12 * a - 3;
    var jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) {
      jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
  };
  RootDate2.prototype.get = function() {
    return {
      day: this.day,
      month: this.month,
      year: this.year,
      leap: this.leap,
      julian: this.jd
    };
  };
  return RootDate2;
}();

var SolarDate = function(_super) {
  __extends(SolarDate2, _super);
  function SolarDate2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _this = this;
    var date = args[0];
    if (date.toJSON) {
      var d = date;
      _this = _super.call(this, { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() }) || this;
    } else {
      _this = _super.call(this, date) || this;
    }
    _this.leap = SolarDate2.isLeapYear(_this.year);
    return _this;
  }
  SolarDate2.isLeapYear = function(year) {
    return year % 100 == 0 && year % 4 == 0 || year % 400 == 0;
  };
  SolarDate2.prototype.toJdn = function() {
    var _a = this, day = _a.day, month = _a.month, year = _a.year;
    return RootDate.jdn(day, month, year);
  };
  SolarDate2.fromJdn = function(jdn) {
    var A;
    var Z = jdn;
    if (Z < 2299161) {
      A = Z;
    } else {
      var alpha = INT((Z - 186721625e-2) / 36524.25);
      A = Z + 1 + alpha - INT(alpha / 4);
    }
    var B = A + 1524;
    var C = INT((B - 122.1) / 365.25);
    var D = INT(365.25 * C);
    var E = INT((B - D) / 30.6001);
    var day = INT(B - D - INT(30.6001 * E));
    var month = E < 14 ? E - 1 : E - 13;
    var year = month < 3 ? C - 4715 : C - 4716;
    return new SolarDate2({ day, month, year, jd: jdn });
  };
  return SolarDate2;
}(RootDate);

var LunarDate = function(_super) {
  __extends(LunarDate2, _super);
  function LunarDate2(date) {
    return _super.call(this, date) || this;
  }
  LunarDate2.findLunarDate = function(julian_date, month_info) {
    if (julian_date > LunarDate2.LAST_DAY || julian_date < LunarDate2.FIRST_DAY || month_info[0].jd > julian_date) {
      throw new Error("Out of calculations");
    }
    var index = month_info.length - 1;
    while (julian_date < month_info[index].jd) {
      index--;
    }
    var off = julian_date - month_info[index].jd;
    return new LunarDate2({
      day: month_info[index].day + off,
      month: month_info[index].month,
      year: month_info[index].year,
      leap: month_info[index].leap,
      jd: julian_date
    });
  };
  LunarDate2.decodeLunarYear = function(year, yearCode) {
    var monthInfo = new Array();
    var monthLengths = new Array(29, 30);
    var regularMonths = new Array(12);
    var offsetOfTet = yearCode >> 17;
    var leapMonth = yearCode & 15;
    var leapMonthLength = monthLengths[yearCode >> 16 & 1];
    var currentJD = RootDate.jdn(1, 1, year) + offsetOfTet;
    var j = yearCode >> 4;
    for (var i = 0; i < 12; i++) {
      regularMonths[12 - i - 1] = monthLengths[j & 1];
      j >>= 1;
    }
    for (var month = 1; month <= 12; month++) {
      if (leapMonth == month) {
        monthInfo.push(new LunarDate2({
          day: 1,
          month: leapMonth,
          year,
          leap: true,
          jd: currentJD
        }));
        currentJD += leapMonthLength;
      } else {
        monthInfo.push(new LunarDate2({
          day: 1,
          month,
          year,
          leap: false,
          jd: currentJD
        }));
        currentJD += regularMonths[month - 1];
      }
    }
    return monthInfo;
  };
  LunarDate2.getYearInfo = function(year) {
    var yearCode;
    if (year < 1300) {
      yearCode = C13[year - 1200];
    } else if (year < 1400) {
      yearCode = C14[year - 1300];
    } else if (year < 1500) {
      yearCode = C15[year - 1400];
    } else if (year < 1600) {
      yearCode = C16[year - 1500];
    } else if (year < 1700) {
      yearCode = C17[year - 1600];
    } else if (year < 1800) {
      yearCode = C18[year - 1700];
    } else if (year < 1900) {
      yearCode = C19[year - 1800];
    } else if (year < 2e3) {
      yearCode = C20[year - 1900];
    } else if (year < 2100) {
      yearCode = C21[year - 2e3];
    } else {
      yearCode = C22[year - 2100];
    }
    return this.decodeLunarYear(year, yearCode);
  };
  LunarDate2.prototype.getYearInfo = function() {
    return LunarDate2.getYearInfo(this.year);
  };
  LunarDate2.prototype.getYearCanChi = function() {
    return CAN[(this.year + 6) % 10] + " " + CHI[(this.year + 8) % 12];
  };
  LunarDate2.prototype.toSolarDate = function() {
    var _a = this, day = _a.day, month = _a.month, year = _a.year;
    if (year < 1200 || year > 2199) {
      return new SolarDate({ day: 0, month: 0, year: 0 });
    }
    var monthInfo = this.getYearInfo();
    var currentMonthInfo = monthInfo[month - 1];
    if (currentMonthInfo.month != month) {
      currentMonthInfo = monthInfo[month];
    }
    var ld = currentMonthInfo.jd + day - 1;
    return SolarDate.fromJdn(ld);
  };
  LunarDate2.fromSolarDate = function(date) {
    var _a = date.get(), day = _a.day, month = _a.month, year = _a.year;
    if (year < 1200 || year > 2199) {
      return new LunarDate2({ day: 0, month: 0, year: 0 });
    }
    var monthInfo = LunarDate2.getYearInfo(year);
    var jd = RootDate.jdn(day, month, year);
    if (jd < monthInfo[0].jd) {
      monthInfo = LunarDate2.getYearInfo(year - 1);
    }
    return LunarDate2.findLunarDate(jd, monthInfo);
  };
  LunarDate2.prototype.get = function() {
    return __assign(__assign({}, _super.prototype.get.call(this)), { name: this.getYearCanChi() });
  };
  LunarDate2.FIRST_DAY = LunarDate2.jdn(31, 1, 1200);
  LunarDate2.LAST_DAY = LunarDate2.jdn(31, 12, 2199);
  return LunarDate2;
}(RootDate);

export { LunarDate, SolarDate };
//# sourceMappingURL=bundle.js.map
