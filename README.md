# BTVN - Mã Hóa Cổ Điển (caesar, Affine, Hoán Vị, Vigenrre, Playfair)
# Nguyễn Như Khiêm - K225480106030

## 1. Mã hoá Caesar
**Ý tưởng:** Dịch chuyển toàn bộ chữ cái trong bản rõ một số bước cố định trong bảng chữ cái.  
Công thức:
+ Mã hóa : C = (P + k) mod  26
+ Giải mã: P = (C − k) mod  26  

Trong đó:  
+ P: ký tự bản rõ (plaintext, dạng số 0–25)
+ C: ký tự bản mã (ciphertext)
+	k: khóa (số bước dịch chuyển).
 
Ví dụ: Với k=3, "HELLO" → "KHOOR".

<img width="1857" height="999" alt="Screenshot 2025-09-21 225510" src="https://github.com/user-attachments/assets/549bd228-1876-4664-aacf-7f348578e089" />

## 2. Mã hoá Affine  
Ý tưởng: Là sự kết hợp phép nhân tuyến tính và phép cộng trong modulo 26.  
Công thức:
+ Mã hóa : C = (a.P + b) mod 26 
+ Giải mã: P=a^(−1).(C − b) mod 26

Trong đó:  
+	a,b là khóa. Điều kiện: gcd(a, 26) = 1 (để tồn tại nghịch đảo).
+	a^(-1): nghịch đảo modular của a.

Ví dụ: Với a=5, b=8: "AFFINE" → "IHHWVC".

<img width="1848" height="948" alt="Screenshot 2025-09-21 225117" src="https://github.com/user-attachments/assets/e8349eb9-0777-48f8-8466-a8a8e66db0c8" />


## 3. Mã hoá hoán vị
Ý tưởng: Chia bản rõ thành các khối ký tự, sau đó hoán đổi vị trí theo một hoán vị cố định.  
Quy tắc:  
+	Chọn kích thước khối k.
+	Định nghĩa một hoán vị perm (ví dụ [2,0,3,1]).
+	Mỗi khối ký tự được sắp xếp lại theo thứ tự mới. Nếu thiếu ký tự, thêm padding (ví dụ X).  

Ví dụ: Với khối 4 ký tự, "HELLO" → "LHEXO".  

<img width="1859" height="939" alt="Screenshot 2025-09-21 225241" src="https://github.com/user-attachments/assets/c574e7e2-5b22-4e75-b05f-2ca0f8714a73" />

## 4. Mã hoá Vigenere  
Ý tưởng: Dùng một chuỗi khóa (key) lặp lại để dịch từng ký tự trong bản rõ theo giá trị chữ cái của ký.  
Công thức:  
+	Mã hóa : Ci = (Pi + Ki) mod  26
+	Giải mã: Pi = (Ci − Ki) mod  26

Trong đó:  
+ Ki: ký tự khóa, ánh xạ thành số 0–25.  

Ví dụ: Khóa "LEMON", bản rõ "ATTACKATDAWN" → "LXFOPVEFRNHR".  

<img width="1858" height="1020" alt="Screenshot 2025-09-21 225412" src="https://github.com/user-attachments/assets/62613ccd-5e71-4dde-a374-a62b9aaca14b" />

## 5. Mã hoá Playfair    
**Ý tưởng:** Mã hóa theo cặp ký tự (digraph) dựa trên ma trận 5×5 sinh từ khóa.  
**Quy tắc:**  
1. Tạo bảng 5×5 từ khóa (ghép I/J thành 1 ô).    
2. Chia bản rõ thành cặp ký tự, thêm "X" nếu trùng hoặc thiếu.   
3. Áp dụng quy tắc mã hóa:
   + Nếu cùng hàng → thay bằng ký tự bên phải.
   + Nếu cùng cột → thay bằng ký tự bên dưới.
   + Nếu khác hàng/cột → thay bằng ký tự cùng hàng, cột của ký tự kia (tạo hình chữ nhật).  

**Ví dụ:** Với khóa "PLAYFAIR EXAMPLE", "HIDE THE GOLD" → "BMODZBXDNABEK...".  

<img width="1865" height="1012" alt="Screenshot 2025-09-21 225434" src="https://github.com/user-attachments/assets/1ebbda15-9e82-43ae-9ac6-f0707d43f321" />

# The End

