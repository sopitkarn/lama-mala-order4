# ล่าหมา หมาล่า

ระบบสั่งอาหารร้านหมาล่า — Next.js (App Router, JavaScript) + Supabase, deploy บน Vercel

รายละเอียดโครงสร้างตารางฐานข้อมูลและกฎการเขียนโค้ด (เช่น `params` เป็น Promise ต้องใช้ `use()`) ดูใน [`CLAUDE.md`](./CLAUDE.md)

## เริ่มใช้งาน

```bash
npm install
cp .env.example .env.local   # แล้วใส่ค่าจาก Supabase
npm run dev
```

เปิด http://localhost:3000

## Deploy บน Vercel

1. push โค้ดขึ้น GitHub แล้ว Import โปรเจกต์ใน Vercel
2. ตั้ง Environment Variables ทั้ง 2 ตัว: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy — Vercel ตรวจจับ Next.js ให้อัตโนมัติ
