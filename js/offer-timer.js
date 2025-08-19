
  // Đệm 2 chữ số
  const pad = n => String(n).padStart(2, "0");

  // Hàm khởi động đếm ngược tới mốc thời gian (millisecond)
  function startCountdown(endTimeMs) {
    const $days = document.getElementById("days");
    const $hours = document.getElementById("hours");
    const $minutes = document.getElementById("minutes");
    const $seconds = document.getElementById("seconds");

    function update() {
      const now = Date.now();
      let diff = endTimeMs - now;

      if (diff <= 0) {
        $days.textContent = "00";
        $hours.textContent = "00";
        $minutes.textContent = "00";
        $seconds.textContent = "00";
        clearInterval(timerId);
        return;
      }

      const dayMs = 24 * 60 * 60 * 1000;
      const hourMs = 60 * 60 * 1000;
      const minuteMs = 60 * 1000;

      const d = Math.floor(diff / dayMs);
      diff %= dayMs;
      const h = Math.floor(diff / hourMs);
      diff %= hourMs;
      const m = Math.floor(diff / minuteMs);
      diff %= minuteMs;
      const s = Math.floor(diff / 1000);

      $days.textContent = pad(d);
      $hours.textContent = pad(h);
      $minutes.textContent = pad(m);
      $seconds.textContent = pad(s);
    }

    update(); // cập nhật ngay lập tức
    const timerId = setInterval(update, 1000);
    return () => clearInterval(timerId); // có thể gọi để dừng nếu cần
  }

  // ===== CÁCH DÙNG =====

  // 1) Đếm ngược theo số ngày/giờ/phút kể từ bây giờ 
  const end = Date.now() + (3*24*60*60 + 12*60*60) * 1000;
  startCountdown(end);

  // 2) Đếm ngược tới một mốc cố định 
//   const end = new Date("2025-12-31T23:59:59+07:00").getTime();
//   startCountdown(end);

