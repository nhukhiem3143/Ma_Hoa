# BTVN - Mã Hóa Cổ Điển (caesar, Affine, Hoán Vị, Vigenrre, Playfair)
# Nguyễn Như Khiêm - K225480106030

## 1. Mã hoá Caesar
**Ý tưởng :** Dịch chuyển toàn bộ chữ cái trong bản rõ một số bước cố định trong bảng chữ cái.  
**Công thức :**
+ Mã hóa : C = (P + k) mod  26
+ Giải mã: P = (C − k) mod  26  

**Trong đó :**  
+ P: ký tự bản rõ (plaintext, dạng số 0–25)
+ C: ký tự bản mã (ciphertext)
+	k: khóa (số bước dịch chuyển).
 
**Ví dụ :** Với k=3, "HELLO" → "KHOOR".

### Mã hoá  

<img width="1863" height="965" alt="Screenshot 2025-09-22 230551" src="https://github.com/user-attachments/assets/a3585525-eeea-4da7-9a8c-24cd87d0e966" />  

### Giải mã  

<img width="1861" height="945" alt="Screenshot 2025-09-22 230602" src="https://github.com/user-attachments/assets/cd049f01-23bd-4057-8fcd-cad895fffa91" />  

## 2. Mã hoá Affine  
**Ý tưởng :** Là sự kết hợp phép nhân tuyến tính và phép cộng trong modulo 26.  
**Công thức :**
+ Mã hóa : C = (a.P + b) mod 26 
+ Giải mã: P=a^(−1).(C − b) mod 26

**Trong đó :**  
+	a,b là khóa. Điều kiện: gcd(a, 26) = 1 (để tồn tại nghịch đảo).
+	a^(-1): nghịch đảo modular của a.

**Ví dụ :** Với a=5, b=8: "AFFINE" → "IHHWVC".

### Mã hoá  

<img width="1828" height="960" alt="Screenshot 2025-09-22 230719" src="https://github.com/user-attachments/assets/b46376fa-f9f2-4f97-ad87-7b30914541b3" />  

### Giải mã  

<img width="1828" height="961" alt="Screenshot 2025-09-22 230734" src="https://github.com/user-attachments/assets/7d92784b-2d0d-415d-ae34-ecc3a0e039a0" />  

## 3. Mã hoá hoán vị
**Ý tưởng :** Chia bản rõ thành các khối ký tự, sau đó hoán đổi vị trí theo một hoán vị cố định.  
**Quy tắc :**  
+	Chọn kích thước khối k.
+	Định nghĩa một hoán vị perm (ví dụ [2,0,3,1]).
+	Mỗi khối ký tự được sắp xếp lại theo thứ tự mới. Nếu thiếu ký tự, thêm padding (ví dụ X).  

**Ví dụ :** Với khối 4 ký tự, "HELLO" → "LHEXO".  

### Mã hoá  

<img width="1863" height="955" alt="Screenshot 2025-09-22 230857" src="https://github.com/user-attachments/assets/ae3ad68d-6849-48c2-a0a6-842344e896d9" />  

### Giải mã  

<img width="1863" height="949" alt="Screenshot 2025-09-22 230907" src="https://github.com/user-attachments/assets/cb79ae39-ba9e-400a-8a55-1769e121e27b" />  

## 4. Mã hoá Vigenere  
**Ý tưởng :** Dùng một chuỗi khóa (key) lặp lại để dịch từng ký tự trong bản rõ theo giá trị chữ cái của ký.  
**Công thức :**  
+	Mã hóa : Ci = (Pi + Ki) mod  26
+	Giải mã: Pi = (Ci − Ki) mod  26

**Trong đó:**  
+ Ki : ký tự khóa, ánh xạ thành số 0–25.  

**Ví dụ :** Khóa "LEMON", bản rõ "ATTACKATDAWN" → "LXFOPVEFRNHR".  

### Mã hoá  

<img width="1835" height="954" alt="Screenshot 2025-09-22 233143" src="https://github.com/user-attachments/assets/1a326dbc-acc3-4a88-aa31-554384dc6875" />  

### Giải mã  

<img width="1857" height="960" alt="Screenshot 2025-09-22 233211" src="https://github.com/user-attachments/assets/ae1574b8-3ee3-4692-adbc-808218a807bc" />  

## 5. Mã hoá Playfair    
**Ý tưởng :** Mã hóa theo cặp ký tự (digraph) dựa trên ma trận 5×5 sinh từ khóa.  
**Quy tắc :**  
1. Tạo bảng 5×5 từ khóa (ghép I/J thành 1 ô).    
2. Chia bản rõ thành cặp ký tự, thêm "X" nếu trùng hoặc thiếu.   
3. Áp dụng quy tắc mã hóa:
   + Nếu cùng hàng → thay bằng ký tự bên phải.
   + Nếu cùng cột → thay bằng ký tự bên dưới.
   + Nếu khác hàng/cột → thay bằng ký tự cùng hàng, cột của ký tự kia (tạo hình chữ nhật).  

**Ví dụ :** Với khóa "PLAYFAIR EXAMPLE", "HIDE THE GOLD" → "BMODZBXDNABEK...".  

### Mã hoá  

<img width="1868" height="961" alt="Screenshot 2025-09-22 230951" src="https://github.com/user-attachments/assets/a761ce43-6cc0-46f0-9552-40f92f24df18" />  

### Giải mã  

<img width="1836" height="946" alt="Screenshot 2025-09-22 231003" src="https://github.com/user-attachments/assets/859a47ce-2225-4717-945f-e369fe3422bb" />  

# The End
