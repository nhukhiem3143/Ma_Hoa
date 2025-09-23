// Bảng chữ cái A-Z tương ứng với số 0-25
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

// Thêm event listener cho phím Enter
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text');
    const keyInput = document.getElementById('k');
    
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            mahoa();
        }
    });
    
    keyInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            mahoa();
        }
    });
});

// ====== MÃ HÓA ======
function mahoa() {
    const text = document.getElementById("text").value.toUpperCase();
    const k = parseInt(document.getElementById("k").value);

    document.getElementById("steps").style.display = "block";

    if (!text || isNaN(k)) {
        document.getElementById("step1").innerHTML = "<div class='error'>Vui lòng nhập văn bản và khóa hợp lệ!</div>";
        return;
    }
    if (!/^[A-Z\s]*$/.test(text)) {
        document.getElementById("step1").innerHTML = "<div class='error'>Văn bản chỉ được chứa chữ cái A-Z!</div>";
        return;
    }

    // B1: số hóa
    let step1Text = "<div class='step-title'>Bước 1: Dịch chữ sang số</div>";
    step1Text += "<div>Văn bản gốc: <strong>" + text + "</strong></div>";
    step1Text += makeAlphabetTable();
    let numbers = text.split("").map(ch => ch === " " ? " " : alphabet.indexOf(ch));
    step1Text += "<div>Kết quả: <strong>[" + numbers.join(", ") + "]</strong></div>";
    document.getElementById("step1").innerHTML = step1Text;

    // B2: cộng k
    let shifted = numbers.map(n => n === " " ? " " : (n + k) % 26);
    document.getElementById("step2").innerHTML =
        "<div class='step-title'>Bước 2: C = (P + k) mod 26</div><div>[" + shifted + "]</div>";

    // B3: số sang chữ
    let result = shifted.map(n => n === " " ? " " : alphabet[n]).join("");
    document.getElementById("step3").innerHTML =
        "<div class='step-title'>Bước 3: Đổi số sang chữ</div><div>" + result + "</div>";

    document.getElementById("result").innerHTML =
        "<div class='result'>Văn bản mã hóa: <strong>" + result + "</strong></div>";
}

// ====== GIẢI MÃ ======
function giaima() {
    const text = document.getElementById("text").value.toUpperCase();
    const k = parseInt(document.getElementById("k").value);

    document.getElementById("steps").style.display = "block";

    if (!text || isNaN(k)) {
        document.getElementById("step1").innerHTML = "<div class='error'>Vui lòng nhập văn bản và khóa hợp lệ!</div>";
        return;
    }
    if (!/^[A-Z\s]*$/.test(text)) {
        document.getElementById("step1").innerHTML = "<div class='error'>Văn bản chỉ được chứa chữ cái A-Z!</div>";
        return;
    }

    // B1: số hóa
    let step1Text = "<div class='step-title'>Bước 1: Dịch chữ sang số</div>";
    step1Text += "<div>Văn bản mã: <strong>" + text + "</strong></div>";
    step1Text += makeAlphabetTable();
    let numbers = text.split("").map(ch => ch === " " ? " " : alphabet.indexOf(ch));
    step1Text += "<div>Kết quả: <strong>[" + numbers.join(", ") + "]</strong></div>";
    document.getElementById("step1").innerHTML = step1Text;

    // B2: trừ k
    let shifted = numbers.map(n => n === " " ? " " : (n - k + 26) % 26);
    document.getElementById("step2").innerHTML =
        "<div class='step-title'>Bước 2: P = (C - k) mod 26</div><div>[" + shifted + "]</div>";

    // B3: số sang chữ
    let result = shifted.map(n => n === " " ? " " : alphabet[n]).join("");
    document.getElementById("step3").innerHTML =
        "<div class='step-title'>Bước 3: Đổi số sang chữ</div><div>" + result + "</div>";

    document.getElementById("result").innerHTML =
        "<div class='result'>Văn bản giải mã: <strong>" + result + "</strong></div>";
}

// ====== helper: in bảng chữ cái ======
function makeAlphabetTable() {
    let html = "<table class='alphabet-table'><tr>";
    for (let i = 0; i < 13; i++) html += `<td>${alphabet[i]} = ${i}</td>`;
    html += "</tr><tr>";
    for (let i = 13; i < 26; i++) html += `<td>${alphabet[i]} = ${i}</td>`;
    html += "</tr></table>";
    return html;
}
