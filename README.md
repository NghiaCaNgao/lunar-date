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

- [Features](#features)
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
    - [Lunar constructor](#lunar-constructor)
    - [SolarDate.fromSolarDate()](#solardatefromsolardate)
    - [lunar.init()](#lunarinit)
    - [lunar.get()](#lunarget)
    - [lunar.getYearName()](#lunargetyearname)
    - [lunar.getMonthName()](#lunargetmonthname)
    - [lunar.getDayName()](#lunargetdayname)
    - [lunar.getHourName()](#lunargethourname)
    - [lunar.getDayOfWeek()](#lunargetdayofweek)
    - [lunar.getSolarTerm()](#lunargetsolarterm)
    - [lunar.getLuckyHours()](#lunargetluckyhours)
    - [lunar.toSolarDate()](#lunartosolardate)
    - [lunar.setDate()](#lunarsetdate)
    - [lunar.setDate()](#lunarsetdate)

## Features

- Chuyển đổi lịch dương sang lịch âm (của Việt Nam) và ngược lại.
- Tính các thông tin của lịch âm như: giờ Hoàng Đạo, tên của giờ, tháng, năm theo can chi

## Installation

### Package manager

Cài đặt qua NPM

```bash
npm install @nghiavuive/lunar_date_vi
```

Xem demo cài đặt với các module types: **[LunarDate_Import](https://github.com/NghiaCaNgao/LunarDate_Import)**

```typescript
import { LunarDate, SolarDate } from "@nghiavuive/lunar_date_vi";
```

Nếu sử dụng Typescript, lưu ý cấu hình `tsconfig.json` như sau:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "node",
    "module": "ESNext" // Hoặc "CommonJS" nếu dùng CJS
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules"]
}
```

Nếu sử dụng `require`

```javascript
const calendar = require("@nghiavuive/lunar_date_vi");
```

### CDN

Sử dụng qua jsDelivr

```bash
<script src="https://cdn.jsdelivr.net/gh/NghiaCaNgao/lunarDate@latest/dist/index.umd.js"></script>
```

## Examples

Ví dụ sau sử dụng `ES Module` với Typescript. JavaScript tương tự.

> **Note** Nếu sử dụng `ts-node` thì cần chạy `npx ts-node --esm <filename>`. Hiện tại chưa tương thích với Node 20.x

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

**Ví dụ:**

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

#### Lunar constructor

Tạo thực thể [**`LunarDate`**](#lunardate) từ [**`ILunarDate`**](#ilunardate)

> **Note** Để nhập tháng nhuận, sử dụng thêm attr `leap_month = true`. Nếu sử dụng `leap_month = true` với tháng không thể nhuận, tư động chuyển về `leap_month = false`.

> **Note** Nếu nhập sai ngày tháng sẽ trả về lỗi [**`Invalid date`**](https://github.com/NghiaCaNgao/LunarDate/wiki/Error-message)

> **Note** Khi khởi tạo cần điền đầy đủ `day`, `month`, `year`. Nếu không điền các thông tin khác (`leap_year`, ...) thì mặc định là `undefined`. Sau khi khởi tạo có thể sử dụng hàm [**`lunar.init()`**](#lunarinit) để tự động điền các thông tin còn thiếu. Nếu các thông tin (`leap_year`, `jd`,...) là `undefined` thì sẽ không thể sử dụng được các hàm khác trong thực thể.

```ts
constructor(date: ILunarDate)
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const al = new LunarDate({ day: 1, month: 1, year: 2023 });
console.log(al);

// LunarDate {
//   day: 1,
//   month: 1,
//   year: 2023,
//   name: 'lunar_calendar',
//   jd: undefined,
//   leap_year: undefined,
//   leap_month: undefined
// }

const al = new LunarDate({ day: 1, month: 2, year: 2023, leap_month: true });
al.init();
console.log(al.toSolarDate());

// SolarDate {
//   day: 22,
//   month: 3,
//   year: 2023,
//   name: 'solar_calendar',
//   jd: 2460026,
//   leap_year: false
// }
```

#### `SolarDate.fromSolarDate()`

Chuyển từ [**`SolarDate`**](#solardate) sang [**`LunarDate`**](#lunardate).

```ts
static fromSolarDate(date: SolarDate): LunarDate
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const dl = new SolarDate(new Date());
console.log(LunarDate.fromSolarDate(dl));

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

#### `lunar.init()`

Khởi tạo giá trị cho thực thể. Nếu `force_change = false`, chỉ áp dụng thay đổi giá trị phụ (`leap-year`, `jd`, ...) của thực thể khi chúng khác `undefined`. Nếu `force_change = true`, luôn thay đổi giá trị phụ.

```ts
init(force_change: boolean = false)
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

let lunar = new LunarDate({ day: 2, month: 5, year: 2023 });
lunar.init();
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

#### `lunar.get()`

Lấy thông tin của thực thể [**`LunarDate`**](#lunardate).

```ts
get();
```

**Ví dụ:**

```ts
const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.get());

// {
//   name: 'lunar_calendar',
//   day: 2,
//   month: 5,
//   year: 2023,
//   leap_year: true,
//   julian: 2460115,
//   year_name: 'Quý Mão',
//   leap_month: false
// }
```

#### `lunar.getYearName()`

Lấy tên của năm theo can chi.

```ts
getYearName(): string
```

#### `lunar.getMonthName()`

Lấy tên của tháng theo can chi.

```ts
getMonthName(): string
```

#### `lunar.getDayName()`

Lấy tên của ngày theo can chi.

```ts
getDayName(): string
```

#### `lunar.getHourName()`

Lấy tên của giờ theo can chi.

```ts
getHourName(): string
```

#### `lunar.getDayOfWeek()`

Lấy tên thứ trong tuần.

```ts
getDayOfWeek(): string
```

#### `lunar.getSolarTerm()`

Lấy tên tiết khí

```ts
getTietKhi(): string
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

let lunar = new LunarDate({ day: 2, month: 5, year: 2023 });
lunar.init();

console.log(lunar.getYearName()); // Quý Mão
console.log(lunar.getMonthName()); // Mậu Ngọ
console.log(lunar.getDayName()); // Mậu Thân
console.log(lunar.getHourName()); // Nhâm Tý
console.log(lunar.getSolarTerm()); // Mang chủng
console.log(lunar.getDayOfWeek()); // Thứ hai
```

#### `lunar.getLuckyHours()`

Lấy giờ hoàng đạo.

```ts
getLuckyHours(): Array<ILuckyHour>
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const dl = new SolarDate(new Date());
const al = LunarDate.fromSolarDate(dl);
console.log(al.getZodiacHour());

// [
//   { name: 'Tý', time: [ 23, 1 ] },
//   { name: 'Sửu', time: [ 1, 3 ] },
//   { name: 'Thìn', time: [ 7, 9 ] },
//   { name: 'Tỵ', time: [ 9, 11 ] },
//   { name: 'Mùi', time: [ 13, 15 ] },
//   { name: 'Tuất', time: [ 19, 21 ] }
// ]
```

#### `lunar.toSolarDate()`

Chuyển từ [**`LunarDate`**](#lunardate) sang [**`SolarDate`**](#solardate).

```ts
toSolarDate(): SolarDate
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const al = new LunarDate({ day: 2, month: 5, year: 2023 });
al.init();

console.log(al.toSolarDate());

// SolarDate {
//   day: 19,
//   month: 6,
//   year: 2023,
//   name: 'solar_calendar',
//   jd: 2460115,
//   leap_year: false
// }
```

#### `lunar.setDate()`

Thay đổi thời gian của thực thể [**`LunarDate`**](#lunardate)

> **Note** Hàm này chưa chuẩn hóa dữ liệu vào

```ts
setDate(date: ILunarDate): void
```

**Ví dụ:**

```ts
import { SolarDate, LunarDate } from "@nghiavuive/lunar_date_vi";

const al = new LunarDate({ day: 2, month: 5, year: 2023 });
al.init();
al.setDate({ day: 2, month: 10, year: 2023 });

console.log(al.toSolarDate());

// SolarDate {
//   day: 14,
//   month: 11,
//   year: 2023,
//   name: 'solar_calendar',
//   jd: 2460263,
//   leap_year: false
// }
```
