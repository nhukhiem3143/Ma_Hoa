function normalizeText(text) {
  return text.replace(/[^A-Z]/g, "");
}

function extendKey(text, key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, "");
  let res = "";
  for (let i = 0, j = 0; i < text.length; i++) {
    res += key[j];
    j = (j + 1) % key.length;
  }
  return res;
}

// Tạo bảng chữ cái và số thứ tự
function getAlphabetTable() {
  let html = "<table class='alphabet-table'><tr>";
  // Dòng 1: A=0 ... M=12
  for (let i = 0; i < 13; i++) {
    html += `<td>${String.fromCharCode(65 + i)}=${i}</td>`;
  }
  html += "</tr><tr>";
  // Dòng 2: N=13 ... Z=25
  for (let i = 13; i < 26; i++) {
    html += `<td>${String.fromCharCode(65 + i)}=${i}</td>`;
  }
  html += "</tr></table>";
  return html;
}

function mahoa() {
  const text = document.getElementById("text").value;
  const key = document.getElementById("key").value;
  document.getElementById("steps").style.display = "block";

  if (!text || !key) {
    document.getElementById("step1").innerHTML = "<div class='error'>Nhập văn bản và khóa!</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }

  const plain = normalizeText(text.toUpperCase());
  const keyNorm = key.toUpperCase().replace(/[^A-Z]/g, "");
  const fullKey = extendKey(plain, keyNorm);

  // B1: chuẩn hóa chi tiết + bảng chữ cái
  document.getElementById("step1").innerHTML =
    `<div class='step-title'>Bước 1: Chuẩn hóa văn bản & khóa</div>
    <div><strong>Văn bản chuẩn hóa:</strong> ${plain}</div>
    <div><strong>Khóa chuẩn hóa:</strong> ${keyNorm}</div>
    <div><strong>Khóa mở rộng:</strong> ${fullKey}</div>
    ${getAlphabetTable()}`;

  // B2: mã hóa từng ký tự
  let cipher = "";
  let detail = "";
  for (let i = 0; i < plain.length; i++) {
    const p = plain.charCodeAt(i) - 65;
    const k = fullKey.charCodeAt(i) - 65;
    const c = (p + k) % 26;
    cipher += String.fromCharCode(c + 65);
    detail += `${plain[i]} (${p}) + ${fullKey[i]} (${k}) = ${String.fromCharCode(c + 65)} (${c})<br>`;
  }
  document.getElementById("step2").innerHTML =
    `<div class='step-title'>Bước 2: Mã hóa từng ký tự</div>
    <div>${detail}</div>`;

  // B3: kết quả
  document.getElementById("step3").innerHTML =
    `<div class='step-title'>Bước 3: Kết quả</div>
    <div>${cipher}</div>`;
  document.getElementById("result").innerHTML =
    `<div class='result'>Văn bản mã hóa: <strong>${cipher}</strong></div>`;
}

function giaima() {
  const text = document.getElementById("text").value.toUpperCase();
  const key = document.getElementById("key").value.toUpperCase().replace(/[^A-Z]/g, "");
  document.getElementById("steps").style.display = "block";

  if (!text || !key) {
    document.getElementById("step1").innerHTML = "<div class='error'>Nhập văn bản và khóa!</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }

  const cipher = normalizeText(text);
  const fullKey = extendKey(cipher, key);

  // B1: chuẩn hóa
  document.getElementById("step1").innerHTML =
    `<div class='step-title'>Bước 1: Chuẩn hóa bản mã & khóa</div>
    <div>Bản mã: ${cipher}</div>
    <div>Khóa mở rộng: ${fullKey}</div>`;

  // B2: giải mã từng ký tự + bảng chữ cái
  let plain = "";
  let detail = getAlphabetTable();
  for (let i = 0; i < cipher.length; i++) {
    const c = cipher.charCodeAt(i) - 65;
    const k = fullKey.charCodeAt(i) - 65;
    const p = (c - k + 26) % 26;
    plain += String.fromCharCode(p + 65);
    detail += `${cipher[i]} (${c}) - ${fullKey[i]} (${k}) = ${String.fromCharCode(p + 65)} (${p})<br>`;
  }
  document.getElementById("step2").innerHTML =
    `<div class='step-title'>Bước 2: Giải mã từng ký tự</div>
    <div>${detail}</div>`;

  // B3: kết quả
  document.getElementById("step3").innerHTML =
    `<div class='step-title'>Bước 3: Kết quả</div>
    <div>${plain}</div>`;
  document.getElementById("result").innerHTML =
    `<div class='result'>Văn bản giải mã: <strong>${plain}</strong></div>`;
}