async function loadPart(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Gọi hàm
loadPart("header", "html/header.html");
loadPart("footer", "html/FileFooter.html");
