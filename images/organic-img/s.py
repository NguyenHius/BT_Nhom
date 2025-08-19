import os

# Lấy thư mục hiện tại (nơi đặt script)
folder = os.getcwd()

# Duyệt tất cả các file trong thư mục
for filename in os.listdir(folder):
    if filename.lower().endswith(".jpg"):  # chỉ xử lý file .jpg
        new_name = filename.lower()  # chuyển toàn bộ tên thành chữ thường
        old_path = os.path.join(folder, filename)
        new_path = os.path.join(folder, new_name)

        # Đổi tên nếu khác nhau
        if old_path != new_path:
            os.rename(old_path, new_path)
            print(f"Đổi: {filename} -> {new_name}")

print("Hoàn tất!")
