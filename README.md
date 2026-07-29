# CodeGym

เว็บแอปฝึกทักษะ logic programming ในรูปแบบชุดข้อสอบจับเวลา ผู้ใช้เลือกระดับความยาก
ระบบสุ่มโจทย์ 60 ข้อผสมกันจาก 6 ประเภท ทำข้อไหนก่อนก็ได้ภายในเวลาที่กำหนด
แล้วสรุปคะแนนพร้อมเฉลยและคำอธิบายทันทีเมื่อกดส่งหรือหมดเวลา

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

คำสั่งอื่น: `npm run build` (production build), `npm run lint`, `npx tsc --noEmit`

## โครงสร้าง

```
app/
  layout.tsx        ฟอนต์ Prompt, provider, สคริปต์ตั้งธีมก่อน paint
  page.tsx          หน้าเลือกระดับ + ประวัติ + ทำต่อจากชุดที่ค้าง
  exam/page.tsx     หน้าทำข้อสอบ (timer + navigator)
  result/page.tsx   ผลครั้งล่าสุด
  globals.css       design token ทั้งหมด (light / dark)
components/         UI: question card, code block, data table, result view
lib/
  types.ts          union type ของโจทย์ทั้ง 6 ประเภท
  config.ts         เวลาต่อระดับ, จำนวนข้อต่อชุด
  exam.ts           สุ่มโจทย์แบบกระจายตามหมวด, ตรวจคำตอบ, จับเวลา
  i18n.ts           ข้อความ UI ไทย / อังกฤษ
  questions/        คลังโจทย์ แยกไฟล์ตามประเภท
```

## ประเภทโจทย์

| ประเภท | รูปแบบ |
| --- | --- |
| `code-trace` | อ่านโค้ด JavaScript / Python / Java แล้วตอบผลลัพธ์ |
| `pseudo-code` | อ่าน pseudo code ตอบผลลัพธ์หรือหน้าที่ของอัลกอริทึม |
| `number-sequence` | หาเลขที่หายไปในลำดับ |
| `table-debug` | หาช่องที่ค่าผิดในตาราง trace แล้วกรอกค่าที่ถูก |
| `sql-logic` | อ่าน schema กับ query แล้วตอบผลลัพธ์ |
| `brain-teaser` | ปริศนาเชาว์และตรรกะสาย programmer |

## การตั้งค่า

แก้ `lib/config.ts`

- `TIME_LIMIT_MINUTES` เวลาต่อระดับ (ง่าย 45, ปานกลาง 60, ยาก 90 นาที)
- `QUESTIONS_PER_EXAM` จำนวนข้อต่อชุด (60 ข้อ กระจาย 10 ข้อต่อประเภท)

## เพิ่มโจทย์

แก้ไฟล์ใน `lib/questions/` ตามประเภท โดยยึด type ใน `lib/types.ts`
ปัจจุบันมี 216 ข้อ (12 ข้อต่อประเภทต่อระดับ) ข้อความ `prompt` และ `explanation`
ใส่ทั้งไทยและอังกฤษ ส่วนโค้ด pseudo code และ SQL เป็นภาษาอังกฤษเสมอ

## ข้อจำกัดของเวอร์ชันนี้

ไม่มีระบบ login, ไม่มี backend database, ไม่มี leaderboard ออนไลน์ และไม่มี admin panel
ความคืบหน้า ธีม ภาษา และประวัติคะแนนเก็บใน localStorage ของเบราว์เซอร์
