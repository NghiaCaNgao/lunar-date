import { LunarDate, SolarDate } from "../../dist/bundle.js";

const solarDate = new SolarDate(new Date());
const lunarDate = LunarDate.fromSolarDate(solarDate);
const solarDate_2 = lunarDate.toSolarDate();

console.log(solarDate.get());
console.log(lunarDate.get());
console.log(solarDate_2.get());
console.log(lunarDate.getYearInfo());

// Remove type: "modules" from package.json and module: "Common" in tsconfig.json