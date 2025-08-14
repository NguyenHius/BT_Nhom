(function () {
  const BREAKPOINT = 992; // khớp với @media ở trên

  function isTouchDevice() {
    return window.matchMedia('(hover: none)').matches;
  }

  function applyNavMode() {
    const touch = isTouchDevice() || window.innerWidth < BREAKPOINT;
    document.querySelectorAll('.nav-item.dropdown > a.dropdown-toggle').forEach(a => {
      if (touch) {
        // Mobile/touch: bật cơ chế dropdown của Bootstrap
        a.setAttribute('data-bs-toggle', 'dropdown');
        a.addEventListener('click', preventNavigateOnTouch);
      } else {
        // Desktop: tắt cơ chế dropdown để click đi link, dùng hover để mở menu
        a.removeAttribute('data-bs-toggle');
        a.removeEventListener('click', preventNavigateOnTouch);
      }
    });
  }

  function preventNavigateOnTouch(e) {
    // Khi đang ở chế độ touch (có data-bs-toggle), chặn điều hướng để mở dropdown
    if (this.getAttribute('data-bs-toggle') === 'dropdown') {
      e.preventDefault();
    }
  }

  // Áp dụng khi load trang và khi đổi kích thước
  applyNavMode();
  window.addEventListener('resize', applyNavMode);
})();

