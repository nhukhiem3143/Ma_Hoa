const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function modInverse(a, m) {
  a = (a % m + m) % m;
  for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
  return null;
}

/* ---------------- Encode/Decode core ---------------- */
function encodeAffine(text, a, b) {
  return text.split("").map(ch => {
    if (ch === " ") return " ";
    let p = alphabet.indexOf(ch);
    return alphabet[(a * p + b) % 26];
  }).join("");
}

function decodeAffineString(text, a, b) {
  const inv = modInverse(a, 26);
  if (inv === null) return null;
  return text.split("").map(ch => {
    if (ch === " ") return " ";
    let c = alphabet.indexOf(ch);
    return alphabet[(inv * (c - b + 26)) % 26];
  }).join("");
}

/* ---------------- Helpers for step display ---------------- */
function makeAlphabetTableHTML() {
  let html = "<table class='alphabet-table'><tr>";
  for (let i = 0; i < 13; i++) html += `<td>${alphabet[i]}=${i}</td>`;
  html += "</tr><tr>";
  for (let i = 13; i < 26; i++) html += `<td>${alphabet[i]}=${i}</td>`;
  html += "</tr></table>";
  return html;
}

function textToNums(text) {
  return text.split("").map(ch => ch === " " ? " " : alphabet.indexOf(ch));
}

/* ---------------- Encode (mahoa) ---------------- */
function mahoa() {
  const raw = document.getElementById("text").value.toUpperCase().trim();
  const a = parseInt(document.getElementById("a").value);
  const b = parseInt(document.getElementById("b").value);
  document.getElementById("steps").style.display = "block";

  // Validate
  if (!raw || isNaN(a) || isNaN(b)) {
    document.getElementById("step1").innerHTML = "<div class='error'>Vui lòng nhập văn bản, a và b hợp lệ!</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }
  if (gcd(a, 26) !== 1) {
    document.getElementById("step1").innerHTML = "<div class='error'>Giá trị a phải nguyên tố cùng nhau với 26 (ví dụ: 1,3,5,7,9,11,15,17,19,21,23,25).</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }
  if (!/^[A-Z\s]*$/.test(raw)) {
    document.getElementById("step1").innerHTML = "<div class='error'>Văn bản chỉ được chứa chữ hoa A-Z và khoảng trắng!</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }

  // STEP 1: Bảng chữ cái + số hóa bản rõ
  const nums = textToNums(raw); // e.g. [7,4,11,11,14] for HELLO
  let step1 = "<div class='step-title'>Bước 1: Bảng chữ cái & chuyển bản rõ sang số</div>";
  step1 += makeAlphabetTableHTML();
  step1 += `<div>Bản nhập: <strong>${raw}</strong></div>`;
  step1 += `<div>Dạng số (A=0..Z=25): <strong>[${nums.join(", ")}]</strong></div>`;
  document.getElementById("step1").innerHTML = step1;

  // STEP 2: Áp dụng công thức C = (a * P + b) mod 26 (với từng ký tự)
  let encNums = [];
  let exprs = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === " ") {
      encNums.push(" ");
      exprs.push(" ");
    } else {
      const p = nums[i];
      const y = (a * p + b) % 26;
      encNums.push(y);
      exprs.push(`${a}*${p} + ${b} ≡ ${a * p + b} → ${y} (mod 26)`);
    }
  }
  let step2 = "<div class='step-title'>Bước 2: Áp dụng C = (a·P + b) mod 26 cho từng ký tự</div>";
  step2 += `<div>Kết quả số: <strong>[${encNums.join(", ")}]</strong></div>`;
  step2 += `<div style="margin-top:8px;"><em>Chi tiết từng ký tự:</em><ul>`;
  exprs.forEach((e, idx) => {
    if (e === " ") step2 += `<li>ký tự ${idx}: (khoảng trắng)</li>`; else step2 += `<li>ký tự ${idx}: ${e}</li>`;
  });
  step2 += "</ul></div>";
  document.getElementById("step2").innerHTML = step2;

  // STEP 3: Đổi số sang chữ
  let result = encNums.map(n => n === " " ? " " : alphabet[n]).join("");
  let step3 = "<div class='step-title'>Bước 3: Chuyển các số thành chữ (A-Z)</div>";
  step3 += `<div>Kết quả ký tự: <strong>${result}</strong></div>`;
  document.getElementById("step3").innerHTML = step3;

  document.getElementById("result").innerHTML = `<div style="background:#e8f5e8;padding:10px;border-radius:5px;"><strong>Văn bản mã hóa:</strong> ${result}</div>`;
}

/* ---------------- Decode (giaima) ---------------- */
function giaima() {
  const raw = document.getElementById("text").value.toUpperCase().trim();
  const a = parseInt(document.getElementById("a").value);
  const b = parseInt(document.getElementById("b").value);
  document.getElementById("steps").style.display = "block";

  // Validate
  if (!raw || isNaN(a) || isNaN(b)) {
    document.getElementById("step1").innerHTML = "<div class='error'>Vui lòng nhập văn bản mã, a và b hợp lệ!</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }
  if (gcd(a, 26) !== 1) {
    document.getElementById("step1").innerHTML = "<div class='error'>Giá trị a phải nguyên tố cùng nhau với 26 (không có nghịch đảo nếu không thỏa).</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }
  if (!/^[A-Z\s]*$/.test(raw)) {
    document.getElementById("step1").innerHTML = "<div class='error'>Văn bản chỉ được chứa chữ hoa A-Z và khoảng trắng!</div>";
    document.getElementById("step2").innerHTML = "";
    document.getElementById("step3").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    return;
  }

  // compute modular inverse
  const inv = modInverse(a, 26);

  // STEP 1: Bảng chữ cái + số hóa bản mã
  const cNums = textToNums(raw);
  let step1 = "<div class='step-title'>Bước 1: Bảng chữ cái & chuyển bản mã sang số</div>";
  step1 += makeAlphabetTableHTML();
  step1 += `<div>Bản mã nhập: <strong>${raw}</strong></div>`;
  step1 += `<div>Dạng số (A=0..Z=25): <strong>[${cNums.join(", ")}]</strong></div>`;
  step1 += `<div style="margin-top:6px;">Nghịch đảo a mod 26 (a⁻¹) = <strong>${inv}</strong></div>`;
  document.getElementById("step1").innerHTML = step1;

  // STEP 2: Áp dụng P = a⁻¹*(C - b) mod 26
  let decNums = [];
  let exprs = [];
  for (let i = 0; i < cNums.length; i++) {
    if (cNums[i] === " ") {
      decNums.push(" ");
      exprs.push(" ");
    } else {
      const cVal = cNums[i];
      const rawSub = (cVal - b + 26) % 26;
      const p = (inv * rawSub) % 26;
      decNums.push(p);
      exprs.push(`${inv} * (${cVal} - ${b}) ≡ ${inv * rawSub} → ${p} (mod 26)`);
    }
  }
  let step2 = "<div class='step-title'>Bước 2: Tính P = a⁻¹ * (C - b) mod 26 cho từng ký tự</div>";
  step2 += `<div>Kết quả số (P): <strong>[${decNums.join(", ")}]</strong></div>`;
  step2 += `<div style="margin-top:8px;"><em>Chi tiết từng ký tự:</em><ul>`;
  exprs.forEach((e, idx) => {
    if (e === " ") step2 += `<li>ký tự ${idx}: (khoảng trắng)</li>`; else step2 += `<li>ký tự ${idx}: ${e}</li>`;
  });
  step2 += "</ul></div>";
  document.getElementById("step2").innerHTML = step2;

  // STEP 3: Đổi số sang chữ
  let result = decNums.map(n => n === " " ? " " : alphabet[n]).join("");
  let step3 = "<div class='step-title'>Bước 3: Chuyển các số P thành chữ (A-Z)</div>";
  step3 += `<div>Kết quả ký tự: <strong>${result}</strong></div>`;
  document.getElementById("step3").innerHTML = step3;

  document.getElementById("result").innerHTML = `<div style="background:#e8f5e8;padding:10px;border-radius:5px;"><strong>Văn bản giải mã:</strong> ${result}</div>`;
}
