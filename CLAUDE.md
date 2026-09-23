# ล่าหมา หมาล่า — ระบบสั่งอาหารร้านหมาล่า

Next.js (App Router, **JavaScript ไม่ใช่ TypeScript**) deploy บน Vercel และใช้ Supabase เป็นฐานข้อมูล
ห้ามสร้างไฟล์ `.ts` / `.tsx` ในโปรเจกต์นี้

## กฎสำคัญ: Next.js เวอร์ชันล่าสุด — `params` ของ Dynamic Route เป็น Promise

โปรเจกต์นี้ใช้ Next.js เวอร์ชันล่าสุด (16.x) ซึ่ง `params` (และ `searchParams`) ของ Dynamic Route เป็น **Promise**
ห้ามอ่านค่าตรง ๆ เช่น `params.tableId` ต้อง unwrap ด้วย `use()` จาก React ทุกครั้ง

```js
// app/order/[sessionId]/page.js
'use client';

import { use } from 'react';

export default function OrderPage({ params }) {
  const { sessionId } = use(params); // ✅ ถูกต้อง
  // const { sessionId } = params;   // ❌ ผิด — params เป็น Promise

  return <div>Session: {sessionId}</div>;
}
```

- หน้าที่ใช้ `use(params)` ให้เป็น Client Component (`'use client'`) ตามตัวอย่างด้านบน
- `use` import จาก `'react'` เท่านั้น

## Supabase

- ใช้ client จาก `lib/supabaseClient.js` เสมอ (`import { supabase } from '@/lib/supabaseClient'`) ห้ามสร้าง client ใหม่ในแต่ละหน้า
- Environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- เครื่องตัวเอง: ใส่ใน `.env.local` (ห้าม commit) — Vercel: ตั้งที่ Project Settings → Environment Variables

## โครงสร้างตารางฐานข้อมูล (มีอยู่แล้วใน Supabase — ห้ามสร้าง/แก้ schema เอง)

ใช้ชื่อตารางและคอลัมน์ตามนี้เท่านั้นเมื่ออ้างอิงในโค้ดทุกส่วน

### `sessions`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `table_number` | |
| `adult_count` | จำนวนผู้ใหญ่ |
| `child_count` | จำนวนเด็ก |
| `status` | |
| `created_at` | |

### `menu_categories`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `name` | |
| `sort_order` | ใช้เรียงลำดับหมวด |

### `menu_items`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `category_id` | อ้างอิง `menu_categories.id` |
| `name` | |

### `orders`
| คอลัมน์ | หมายเหตุ |
|---|---|
| `id` | |
| `session_id` | อ้างอิง `sessions.id` |
| `table_number` | |
| `items` | **jsonb** |
| `status` | |
| `created_at` | |

> ค่าที่เป็นไปได้ของ `status` และรูปแบบข้อมูลใน `orders.items` ยังไม่ได้กำหนดในเอกสารนี้ — ให้ตรวจสอบจากฐานข้อมูลจริงหรือถามก่อน อย่าเดา

## หน้าที่วางแผนไว้

- `/` — หน้าแรก (มีแล้ว ใช้ทดสอบ deploy)
- `/generate-qr` — สร้าง QR Code ประจำโต๊ะ
- `/kitchen` — หน้าจอครัว
- หน้าสั่งอาหารของลูกค้า (Dynamic Route) — ขั้นตอนถัดไป

## คำสั่ง

```bash
npm install
npm run dev     # พัฒนา
npm run build   # build production
npm run start   # รัน production
```
