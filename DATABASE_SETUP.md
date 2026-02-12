# Hướng dẫn Setup Database

## 1. Khởi động MySQL
- Nếu dùng **XAMPP**: Mở XAMPP Control Panel → Start MySQL
- Nếu dùng **WAMP**: Start WAMP → MySQL service
- Nếu dùng **Docker**: `docker run -d -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql`

## 2. Tạo Database
Mở phpMyAdmin hoặc MySQL CLI và chạy:
```sql
CREATE DATABASE IF NOT EXISTS freelancerKhoaHoc;
```

## 3. Chạy Prisma Commands
Mở terminal trong thư mục project và chạy:

```bash
# Generate Prisma Client
npx prisma generate

# Đẩy schema lên database (tạo tables)
npx prisma db push

# (Tùy chọn) Xem database trong Prisma Studio
npx prisma studio
```

## 4. Kiểm tra Connection
Nếu có lỗi connection, kiểm tra file `.env`:
```
DATABASE_URL="mysql://root@localhost:3306/freelancerKhoaHoc"
```

Nếu MySQL có password:
```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/freelancerKhoaHoc"
```

## 5. Khởi động lại Dev Server
```bash
npm run dev
```

## Troubleshooting

### Lỗi "Can't reach database server"
- MySQL chưa chạy
- Port 3306 bị block
- Sai username/password

### Lỗi "Unknown database"
- Chạy: `CREATE DATABASE freelancerKhoaHoc;`

### Lỗi "Table doesn't exist"
- Chạy: `npx prisma db push`
