# BTVN - Mã Hóa Cổ Điển (caesar, Affine, Hoán Vị, Vigenrre, Playfair)
# Nguyễn Như Khiêm - K225480106030

## 1. Mã hoá Caesar
Ý tưởng: Dịch chuyển toàn bộ chữ cái trong bản rõ một số bước cố định trong bảng chữ cái.  
Công thức:
+ Mã hóa:  C = (P+k) mod  26
+ Giải mã: P = (C−k) mod  26  

Trong đó:  
+ P: ký tự bản rõ (plaintext, dạng số 0–25)
+ C: ký tự bản mã (ciphertext)
+	k: khóa (số bước dịch chuyển).
Ví dụ: Với k=3, "HELLO" → "KHOOR".
<img width="1837" height="842" alt="Screenshot 2025-09-21 220727" src="https://github.com/user-attachments/assets/aaf39df4-3ca7-4a84-9b9c-cd424e616577" />  

## 2. Mã hoá Affine  
•	Ý tưởng: Là sự kết hợp phép nhân tuyến tính và phép cộng trong modulo 26.
•	Công thức:
o	Mã hóa: C=(a⋅P+b)mod  
o	Giải mã: P=a−1⋅(C−b)mod   
Trong đó:
o	a,ba, ba,b là khóa. Điều kiện: gcd(a, 26) = 1 (để tồn tại nghịch đảo).
o	a−1a^{-1}a−1: nghịch đảo modular của a.
•	Ví dụ: Với a=5, b=8: "AFFINE" → "IHHWVC".

## 3. Mã hoá hoán vị
•	Ý tưởng: Chia bản rõ thành các khối ký tự, sau đó hoán đổi vị trí theo một hoán vị cố định.
•	Quy tắc:
o	Chọn kích thước khối k.
o	Định nghĩa một hoán vị perm (ví dụ [2,0,3,1]).
o	Mỗi khối ký tự được sắp xếp lại theo thứ tự mới. Nếu thiếu ký tự, thêm padding (ví dụ X).
•	Ví dụ: Với khối 4 ký tự, "HELLO" → "LHEXO".  

## 4. Mã hoá Vigenere  
•	Ý tưởng: Dùng một chuỗi khóa (key) lặp lại để dịch từng ký tự trong bản rõ theo giá trị chữ cái của ký.
•	Công thức:
o	Mã hóa: Ci=(Pi+Ki)mod  26C_i = (P_i + K_i) \mod 26Ci=(Pi+Ki)mod26
o	Giải mã: Pi=(Ci−Ki)mod  26P_i = (C_i - K_i) \mod 26Pi=(Ci−Ki)mod26
Trong đó:
o	KiK_iKi: ký tự khóa, ánh xạ thành số 0–25.
•	Ví dụ: Khóa "LEMON", bản rõ "ATTACKATDAWN" → "LXFOPVEFRNHR".

## 5. Mã hoá Playfair  
•	Ý tưởng: Mã hóa theo cặp ký tự (digraph) dựa trên ma trận 5×5 sinh từ khóa.
•	Quy tắc:
1.	Tạo bảng 5×5 từ khóa (ghép I/J thành 1 ô).
2.	Chia bản rõ thành cặp ký tự, thêm "X" nếu trùng hoặc thiếu.
3.	Áp dụng quy tắc mã hóa:

