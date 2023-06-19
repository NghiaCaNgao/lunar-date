<h1 align="center">Lunar Date</h1> <br>
<p align="center">Thư viện Javascript chuyển đổi âm lịch - dương lịch</p>
<p align="center">
Remake từ <b><a href="https://www.informatik.uni-leipzig.de/~duc/amlich/calrules.html">Thuật toán Âm Lịch</a></b> của Hồ Ngọc Đức viết năm 2004
</p>
<div align="center">

![npm](https://img.shields.io/npm/v/%40nghiavuive%2Flunar_date_vi)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40nghiavuive%2Flunar_date_vi)
![npm downloads](https://img.shields.io/npm/dy/@nghiavuive/lunar_date_vi)

</div>

## Table of Contents

- [Feature](#features)
- [Installation](#installation)
  - [Package manager](#package-manager)
  - [CDN](#cdn)
- [Examples](#examples)
- [API](#api)
  - [SolarDate](#solardate)
  - [LunarDate](#lunardate)

## Features

- Chuyển đổi lịch dương sang lịch âm (của Việt Nam) và ngược lại.
- Tính các thông tin của lịch âm như: giờ Hoàng Đạo, tên của giờ, tháng, năm theo can chi

## Installation

### Package manager

Cài đặt qua NPM

```bash
npm install @nghiavuive/lunar_date_vi
```

Khi cài đặt xong, ta có thể import bằng `import` hoặc `require`. Trước khi bắt đầu, đảm bảo rằng `package.json` có `"type": "module"`.

```typescript
import { LunarDate, SolarDate } from "@nghiavuive/lunar_date_vi";
```

Nếu sử dụng Typescript, lưu ý cấu hình `tsconfig.json` như sau:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "node",
    "module": "ESNext"
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules"]
}
```

Nếu sử dụng `require`

```javascript
const calendar = require("@nghiavuive/lunar_date_vi/dist/index.cjs");
```

### CDN

Sử dụng qua jsDelivr

<!-- FIXME: Sửa lại theo tag -->

```bash
<script src="https://cdn.jsdelivr.net/gh/NghiaCaNgao/lunarDate@1a7fb3b/dist/index.umd.js"></script>
```

## Examples

Sử dụng `ES Module` với Typescript. JavaScript tương tự.

> **Note** Nếu sử dụng `ts-node` thì cần chạy `npx ts-node --esm <filename>`

```typescript
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const solar_date = new SolarDate(new Date());
console.log(solar_date);
console.log(solar_date.toLunarDate());

const lunar_date = new LunarDate({ day: 10, month: 5, year: 2023 });
lunar_date.init(); // initialize lunar_date before using 
console.log(lunar_date.toSolarDate());

// SolarDate {
//   day: 19,
//   month: 6,
//   year: 2023,
//   name: 'solar_calendar',
//   jd: 2460115,
//   leap_year: false
// }

// LunarDate {
//   day: 2,
//   month: 5,
//   year: 2023,
//   name: 'lunar_calendar',
//   jd: 2460115,
//   leap_year: true,
//   leap_month: false
// }

// SolarDate {
//   day: 27,
//   month: 6,
//   year: 2023,
//   name: 'solar_calendar',
//   jd: 2460123,
//   leap_year: false
// }
```

Nếu sử dụng `CommonJs`

```javascript
const _calendar = require("@nghiavuive/lunar_date_vi/dist/index.cjs");

var solar_date = new _calendar.SolarDate(new Date());
var lunar_date = solar_date.toLunarDate();

console.log(lunar_date.getMonthName()); // Mậu Ngọ
```

Nếu sử dụng `UMD`

```html
<script src="https://cdn.jsdelivr.net/gh/NghiaCaNgao/lunarDate@1a7fb3b/dist/index.umd.js"></script>
<script>
  var lunar_date = new window.calendar.LunarDate({
    day: 1,
    month: 1,
    year: 2020,
  });
  lunar_date.init();
  console.log(lunar_date);
</script>

<!-- SolarDate {
  day: 1,
  month: 1,
  year: 2020,
  name: 'lunar_calendar',
  jd: 2458874,
  leap_year: false,
  leap_month: false,
} -->
```

## API

### SolarDate

## Chuyển đổi từ dương sang âm

```javascript
import { LunarDate, SolarDate } from "../../dist/bundle.js";

const solarDate = new SolarDate(new Date());
const lunarDate = LunarDate.fromSolarDate(solarDate);

console.log(solarDate.get());
console.log(lunarDate.get());

// { day: 21, month: 3, year: 2023, leap: false, julian: 2460025 }
// {day: 1, month: 3, year: 2023, leap: false, julian: 2460025, name: 'Quý Mão'}
```

## Chuyển từ lịch âm sang dương

```javascript
import { LunarDate, SolarDate } from "../../dist/bundle.js";

const al = new LunarDate({ day: 10, month: 3, year: 2023 });
const dl = al.toSolarDate().get();

// { day: 30, month: 3, year: 2023, leap: false, julian: 2460034 }
```

# API

## Interface

### ICalendarDate

Input option của Calendar Object

```ts
export interface ICalendar {
  day: number;
  month: number;
  year: number;
}
```

### ISolarDate

Input option cho Solar Object. Kế thừa từ [ICalendar](###ICalendar)

```ts
interface ISolarDate extends ICalendar
```

### ILunarDate

Input option cho LunarDate. Kế thừa từ [ICalendar](###ICalendar)

```ts
interface ILunarDate extends ICalendar {
  leap?: boolean;
  jd?: number;
}
```

### IZodiacHour

Cung hoàng đạo

```ts
interface IZodiacHour {
  name: string;
  time: number[];
}
```

## Solar Class

### Solar constructor 1

Tạo thực thể Solar Calendar từ [`ISolarDate`](###ISolarDate). Lưu ý: Nếu nhập sai ngày tháng thì đối thì sẽ báo lỗi `Invalid date`. Chi tiết về ngày hợp lệ xem [tại đây](https://github.com/NghiaCaNgao/lunarDate/wiki/Valid-dae)

```ts
public constructor(date: ISolarDate);
```

**Ví dụ:**

```ts
new SolarDate({ day: 1, month: 1, year: 2023 });
```

### Solar constructor 2

Tạo thực thể Solar Calendar từ Date object. Lưu ý: Nếu nhập sai ngày tháng thì đối tượng Date sẽ tự sửa lại. Nếu ngày nhập vào nằm trong khoảng từ **05-14/10/1582** thì sẽ báo lỗi `Invalid date`. Chi tiết về ngày hợp lệ xem [tại đây](https://github.com/NghiaCaNgao/lunarDate/wiki/Valid-dae)

```ts
public constructor(date: Date);
```

**Ví dụ:**

```ts
new SolarDate(new Date());
```

### SolarDate.fromJd()

Trả về một thực thể Solar Calendar từ ngày Julian.

```ts
static fromJd(jd: number): SolarDate
```

**Ví dụ:**

```ts
console.log(SolarDate.fromJd(2460035));

// SolarDate { day: 31, month: 3, year: 2023, jd: 2460035, leap: false }
```

### solar.toDate()

Chuyển thực thể Solar Calendar về dạng Date

```ts
toDate(): Date
```

**Ví dụ:**

```ts
const solar = new SolarDate(new Date());
console.log(solar.toDate());

// 2023-03-30T17:00:00.000Z
```

### solar.get()

Lấy thông tin của đối tượng solar

```ts
get(): ISolarDate;
```

```ts
const dl = new SolarDate(new Date());
console.log(dl.get());

// { day: 31, month: 3, year: 2023, leap_year: false, julian: 2460035 }
```

## Lunar class

### Constructor 1

```ts
constructor(date: ILunarDate)
```

- Ví dụ:

```ts
const al = new LunarDate({ day: 1, month: 1, year: 2023 });
```

### SolarDate.fromSolarDate()

Chuyển từ dương lịch sang âm lịch

```ts
static fromSolarDate(date: SolarDate): LunarDate
```

**Ví dụ:**

```ts
const dl = new SolarDate(new Date());
console.log(LunarDate.fromSolarDate(dl));

// LunarDate2 { day: 10, month: 2, year: 2023, leap: true, jd: 2460035 }
```

### init()

Khởi tạo giá trị cho thực thể

```ts
init();
```

**Ví dụ:**

```ts
let lunar1 = new LunarDate({ day: 2, month: 5, year: 2023 });
lunar1.init();
console.log(lunar1);

// {"name": "lunar_calendar", "day": 2, "month": 5, "year": 2023, "jd": 2460115, "leap_month": false, "leap_year": true}
```

### lunar.get()

- Lấy thông tin của đối tượng lunar

```ts
get();
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.get());

// {
//   day: 10,
//   month: 2,
//   year: 2023,
//   leap: true,
//   julian: 2460035,
//   name: 'Quý Mão'
// }
```

### lunar.getYearCanChi()

- Lấy can chi của năm

```ts
getYearCanChi(): string
```

- Ví dụ:

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getYearCanChi());

// Quý Mão
```

### lunar.getMonthCanChi()

- Lấy Can của tháng

```ts
getMonthCanChi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getMonthCanChi());

// Ất Mão (nhuận)
```

### lunar.getDayCanChi()

- Lấy Can của ngày

```ts
getDayCanChi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getDayCanChi());

// Mậu Tý
```

### lunar.getGioCanChi()

- Lấy Can của giơ

```ts
getGioCanChi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getGioCanChi());

// Nhâm Tý
```

### lunar.getDayOfWeek()

- Thứ trong tuần

```ts
getDayOfWeek(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getDayOfWeek());

// Thứ sáu
```

### lunar.getTietKhi()

- Thứ trong tuần

```ts
getTietKhi(): string
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getTietKhi());

// Xuân phân
```

### lunar.getZodiacHour()

- Lấy giờ hoàng đạo

```ts
getZodiacHour(): Array
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getZodiacHour());

// [
//   { name: 'Tý', time: [ 23, 1 ] },
//   { name: 'Sửu', time: [ 1, 3 ] },
//   { name: 'Mão', time: [ 5, 7 ] },
//   { name: 'Ngọ', time: [ 11, 13 ] },
//   { name: 'Thân', time: [ 15, 17 ] },
//   { name: 'Dậu', time: [ 17, 19 ] }
// ]
```

### lunar.toSolarDate()

- Lấy giờ hoàng đạo

```ts
toSolarDate(): SolarDate
```

- Ví dụ

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.toSolarDate());
```
