import { LunarDate, SolarDate } from "../../bin/dist/index.mjs";

const dl = new SolarDate(new Date());
console.log(dl);
console.log(dl.get());
console.log(dl.toDate());
console.log(dl.toLunarDate());

const al = new LunarDate({day:3, month:5, year:2023})
al.init();

console.log(al);
console.log(al.get());
console.log(al.toSolarDate());

al.setDate({day:3, month:6, year:2023})
console.log(al.toSolarDate());
console.log(al.getYearName());

