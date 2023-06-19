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
  - [Interfaces](#interfaces)
    - [ICalendarDate](#icalendardate)
    - [ISolarDate](#isolardate)
    - [ILunarDate](#ilunardate)
    - [ILuckyHour](#iluckyhour)
  - [SolarDate](#solardate)
    - [Solar constructor 1](#solar-constructor-1)
    - [Solar constructor 2](#solar-constructor-2)
    - [SolarDate.FIRST_DAY](#solardatefirst_day)
    - [SolarDate.LAST_DAY](#solardatelast_day)
    - [SolarDate.fromJd()](#solardatefromjd)
    - [SolarDate.jdn()](#solardatejdn)
    - [solar.toDate()](#solartodate)
    - [solar.toLunarDate()](#solartolunardate)
    - [solar.setDate()](#solarsetdate)
    - [solar.get()](#solarget)
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

Đoạn lệnh sau chuyển từ lịch dương sang lịch âm (trên) và âm sang dương (dưới).

> **Note** Khi khởi tạo instance LunarDate thì luôn phải gọi hàm `init()`

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
  var lunar_date = new window._calendar.LunarDate({
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

### Interfaces

#### `ICalendarDate`

Input của **`Calendar`** (abstract class [**`LunarDate`**](#lunardate) và [**`SolarDate`**](#solardate))

```ts
export interface ICalendar {
  day: number;
  month: number;
  year: number;
}
```

#### `ISolarDate`

Input của [**`SolarDate`**](#solardate). Kế thừa từ [**`ICalendarDate`**](#icalendardate)

```ts
interface ISolarDate extends ICalendar {}
```

#### `ILunarDate`

Input của [**`LunarDate`**](#lunardate). Kế thừa từ [**`ICalendarDate`**](#icalendardate)

```ts
interface ILunarDate extends ICalendarDate {
  jd?: number;
  leap_month?: boolean;
  leap_year?: boolean;
}
```

#### `ILuckyHour`

Cung hoàng đạo

```ts
interface ILuckyHour {
  name: string;
  time: number[];
}
```

### SolarDate

#### Solar constructor 1

Tạo thực thể [**`SolarDate`**](#solardate) từ [**`ISolarDate`**](#isolardate).

> **Note** Nếu nhập sai ngày tháng thì sẽ báo lỗi `Invalid date`. Chi tiết về ngày hợp lệ xem [tại đây](https://github.com/NghiaCaNgao/lunarDate/wiki/Valid-dae)

```ts
public constructor(date: ISolarDate);
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

new SolarDate({ day: 1, month: 1, year: 2023 });
```

#### Solar constructor 2

Tạo thực thể [**`SolarDate`**](#solardate) từ `Date` object.

> **Note** Nếu nhập sai ngày tháng thì đối tượng `Date` sẽ tự sửa lại. Nếu ngày nhập vào nằm trong khoảng từ **05-14/10/1582** thì sẽ báo lỗi `Invalid date`. Chi tiết về ngày hợp lệ xem [tại đây](https://github.com/NghiaCaNgao/lunarDate/wiki/Valid-dae)

```ts
public constructor(date: Date);
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

new SolarDate(new Date());
```

#### `SolarDate.FIRST_DAY`

Ngày Julian tương ứng ngày đầu tiên trong giới hạn tính toán `1200-1-31`

```ts
public static readonly FIRST_DAY: number = SolarDate.jdn(new Date(1200, 0, 31)); //1200-1-31
```

#### `SolarDate.LAST_DAY`

Ngày Julian tương ứng ngày cuối cùng trong giới hạn tính toán `2199-12-31`

```ts
public static readonly LAST_DAY: number = SolarDate.jdn(new Date(2199, 11, 31)); //2199-12-31
```

#### `SolarDate.fromJd()`

Trả về một thực thể [**`SolarDate`**](#solardate) từ ngày Julian.

```ts
static fromJd(jd: number): SolarDate
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

console.log(SolarDate.fromJd(2460035));

// SolarDate { day: 31, month: 3, year: 2023, jd: 2460035, leap: false }
```

#### `SolarDate.jdn()`

Trả về ngày Julian date tương ứng với [**`ICalendarDate`**](#icalendardate) hoặc `Date`
Ref: https://ssd.jpl.nasa.gov/tools/jdc/#/jd

```ts
static jdn(date: ICalendarDate | Date): number
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

console.log(SolarDate.jdn(new Date())); // 2460115
console.log(SolarDate.jdn({ day: 19, month: 6, year: 2023 })); // 2460115
```

#### `solar.toDate()`

Chuyển thực thể [**`SolarDate`**](#solardate) về dạng **`Date`**

```ts
toDate(): Date
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const solar = new SolarDate(new Date());
console.log(solar.toDate());

// 2023-06-18T17:00:00.000Z
```

#### `solar.toLunarDate()`

Chuyển từ thực thể [**`SolarDate`**](#solardate) sang thực thể [**`LunarDate`**](#lunardate)

```ts
toLunarDate(): LunarDate
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

var solar = new SolarDate(new Date());
var lunar = solar.toLunarDate();

console.log(lunar);

// LunarDate {
//   day: 2,
//   month: 5,
//   year: 2023,
//   name: 'lunar_calendar',
//   jd: 2460115,
//   leap_year: true,
//   leap_month: false
// }
```

#### `solar.setDate()`

Thay đổi thời gian của thực thể [**`SolarDate`**](#solardate)

```ts
setDate(date: ICalendarDate | Date): void
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

var solar = new SolarDate(new Date()); // 2023-06-19

solar.setDate(new Date(2023, 1, 1));
console.log(solar);

// SolarDate {
//     day: 1,
//     month: 2,
//     year: 2023,
//     name: 'solar_calendar',
//     jd: 2459977,
//     leap_year: false
// }

solar.setDate({ day: 5, month: 5, year: 2015 });
console.log(solar);

// SolarDate {
//     day: 5,
//     month: 5,
//     year: 2015,
//     name: 'solar_calendar',
//     jd: 2457148,
//     leap_year: false
// }
```

#### `solar.get()`

Lấy thông tin của thực thể [**`SolarDate`**](#solardate)

```ts
get();
```

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const dl = new SolarDate(new Date());
console.log(dl.get());

// {
//   name: 'solar_calendar',
//   day: 19,
//   month: 6,
//   year: 2023,
//   leap_year: false,
//   julian: 2460115
// }
```

### LunarDate

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
