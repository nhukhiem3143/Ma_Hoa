<img width="1448" height="431" alt="Screenshot 2025-09-23 143135" src="https://github.com/user-attachments/assets/ccc6df88-9976-4760-967c-2ae18f45369e" /># Nguyễn Như Khiêm - K225480106030
# BÀI TẬP 1: TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN 
1. Caesar
2. Affine
3. Hoán vị
4. Vigenère
5. Playfair  

## Với mỗi phương pháp, hãy tìm hiểu:  
1. Tên gọi
2. Thuật toán mã hoá, thuật toán giải mã
3. Không gian khóa
4. Cách phá mã (mà không cần khoá)
5. Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript 

# Bài làm :  
## 1. Mã hoá Caesar
**Tên gọi :** Mã Caesar (Shift cipher) 
**Thuật toán :**
+ Mã hóa(ký tự P → số p 0..25) : C = (P + k) mod  26
+ Giải mã: P = (C − k) mod  26

**Trong đó :**  
+ P: ký tự bản rõ (plaintext, dạng số 0–25)
+ C: ký tự bản mã (ciphertext)
+	k: khóa (số bước dịch chuyển).

**Không gian khóa :** k ∈ {0,1,…,25} → 26 khả năng.  

**Ví dụ :** Với k=3, "HELLO" → "KHOOR".  

**Cách phá mã (không cần khóa):**  
+ Brute-force: thử 26 giá trị k (rất rẻ).
+ Nếu biết ngôn ngữ: kiểm tra kết quả bằng dictionary / tần suất chữ (E, A, T …).
+ Kỹ thuật tần suất: khớp tần suất ký tự trong bản mã với tần suất ngôn ngữ.

## Dùng HTML,CSS,JS  
### Mã hoá 

<img width="1863" height="965" alt="Screenshot 2025-09-22 230551" src="https://github.com/user-attachments/assets/a3585525-eeea-4da7-9a8c-24cd87d0e966" />  

### Giải mã  

<img width="1861" height="945" alt="Screenshot 2025-09-22 230602" src="https://github.com/user-attachments/assets/cd049f01-23bd-4057-8fcd-cad895fffa91" />  

## Dùng C++  
<img width="1448" height="431" alt="Screenshot 2025-09-23 143135" src="https://github.com/user-attachments/assets/48c4658e-a574-4cfc-9afc-6ee6c2b8ba54" />

## 2. Mã hoá Affine  
**Tên gọi:** Mã Affine  

**Thuật toán :**
+ Mã hóa : C = (a.P + b) mod 26  
với điều kiện gcd(a,26) = 1 (để có nghịch đảo modulo 26)
+ Giải mã: P=a^(−1).(C − b) mod 26  
a^(−1) là nghịch đảo modulo 26 (số x sao cho a.x ≡ 1 mod 26 )

**Trong đó :**  
+	a,b là khóa. Điều kiện: gcd(a, 26) = 1 (để tồn tại nghịch đảo).
+	a^(-1): nghịch đảo modular của a.

**Ví dụ :** Với a=5, b=8: "AFFINE" → "IHHWVC".  

**Không gian khóa:** tập các cặp (a,b) với a ∈ {1..25, gcd(a,26)=1} (có φ(26)=12 giá trị a), b ∈ {0..25} → 12 * 26 = 312 khóa.

**Cách phá mã (không cần khóa):**  
+ Brute-force trên 312 khả năng — hoàn toàn khả thi.
+ Kết hợp tần suất chữ để chọn ra cặp a,b đúng nhất.  

## Dùng HTML,CSS,JS  
### Mã hoá  

<img width="1828" height="960" alt="Screenshot 2025-09-22 230719" src="https://github.com/user-attachments/assets/b46376fa-f9f2-4f97-ad87-7b30914541b3" />  

### Giải mã  

<img width="1828" height="961" alt="Screenshot 2025-09-22 230734" src="https://github.com/user-attachments/assets/7d92784b-2d0d-415d-ae34-ecc3a0e039a0" />  

## Dùng C++  
<img width="1371" height="388" alt="Screenshot 2025-09-23 143308" src="https://github.com/user-attachments/assets/e9807163-e1da-40a9-89e5-54d06810a381" />  

## 3. Mã hoá hoán vị
**Tên gọi :** Mã hoán vị (block permutation cipher / columnar-like simple) 

**Thuật toán :**
+ Chọn kích thước khối k và một hoán vị perm = [p0,p1,...,p(k-1)] (mỗi pi ∈ {0..k-1} duy nhất).
+ Chia bản rõ thành khối độ dài k (pad ký tự X nếu cần).
+ Mỗi khối block (length k): bản mã khối cblock[i] = block[perm[i]].

**Giải mã :** cần hoán vị nghịch inv sao cho inv[perm[i]] = i. Sau đó block[i] = cblock[inv[i]].  

**Không gian khóa :** số hoán vị của k phần tử: k! (k factorial). Nếu k nhỏ (ví dụ 4) thì 4! = 24; nếu k lớn, không gian lớn nhưng thường bị giới hạn vì k nhỏ trong triển khai học thuật.  

**Cách phá mã (không cần khóa):**  
+ Brute-force trên k! khả năng (hiệu quả nếu k nhỏ).
+ Nếu biết cấu trúc ngôn ngữ, kiểm tra từng candidate bằng thống kê / dictionary.
+ Nếu attacker có bản rõ một phần (known-plaintext) thì dễ tìm hoán vị.

## Dùng HTML,CSS,JS  
### Mã hoá  

<img width="1863" height="955" alt="Screenshot 2025-09-22 230857" src="https://github.com/user-attachments/assets/ae3ad68d-6849-48c2-a0a6-842344e896d9" />  

### Giải mã  

<img width="1863" height="949" alt="Screenshot 2025-09-22 230907" src="https://github.com/user-attachments/assets/cb79ae39-ba9e-400a-8a55-1769e121e27b" />  

## Dùng C++  
<img width="1456" height="422" alt="Screenshot 2025-09-23 143153" src="https://github.com/user-attachments/assets/3d5daa04-6eeb-435d-b237-306592d8dd9c" />  


## 4. Mã hoá Vigenère  
**Tên gọi :** Mã Vigenère (polyalphabetic substitution cipher)  

**Thuật toán :**  
+ Key: chuỗi K (key) lặp lại.
+	Mã hóa : Ci = (Pi + Ki) mod  26
+	Giải mã: Pi = (Ci − Ki) mod  26

**Trong đó:**  
+ Với mỗi ký tự i (P_i ∈ 0..25), K_i ∈ 0..25

**Ví dụ :** Khóa "LEMON", bản rõ "ATTACKATDAWN" → "LXFOPVEFRNHR".  

**Không gian khóa :** mọi chuỗi ký tự. Nếu giới hạn độ dài key ≤ m và alphabet 26, thì số khóa ≈ 26^m (rất lớn khi m lớn).  

**Cách phá mã (không cần khóa):**
+ Kasiski examination: tìm khoảng cách giữa các xuất hiện lặp lại của cùng một đoạn để suy ra độ dài khóa.
+ Friedman test (Index of Coincidence) để ước lượng độ dài khóa.
+ Sau khi biết độ dài L, tách ciphertext thành L chuỗi đơn ký tự, mỗi chuỗi có thể bị tấn công bằng frequency analysis (giống Caesar).  

## Dùng HTML,CSS,JS  
### Mã hoá  

<img width="1835" height="954" alt="Screenshot 2025-09-22 233143" src="https://github.com/user-attachments/assets/1a326dbc-acc3-4a88-aa31-554384dc6875" />  

### Giải mã  

<img width="1857" height="960" alt="Screenshot 2025-09-22 233211" src="https://github.com/user-attachments/assets/ae1574b8-3ee3-4692-adbc-808218a807bc" />  

## Dùng C++   
<img width="1310" height="307" alt="Screenshot 2025-09-23 143650" src="https://github.com/user-attachments/assets/04207e54-d5fb-4dcb-b881-efad73245087" />  


## 5. Mã hoá Playfair    
**Tên gọi:** Mã Playfair (digraph substitution cipher)  

**Thuật toán :**  
1. Tạo bảng 5×5 từ khóa (ghép I/J hoặc loại J).  
2. Tiền xử lý bản rõ: gộp chữ hoa, thay J→I, bỏ ký tự không phải chữ, tách thành cặp (digraph), nếu hai ký tự trong cặp giống nhau → chèn 'X' giữa; nếu cuối cùng lẻ → thêm 'X'.
3. Mã hóa từng cặp (A,B): tìm (r1,c1) và (r2,c2) trong bảng:
   + Nếu cùng hàng → thay bằng ký tự bên phải (vòng).
   + Nếu cùng cột → thay bằng ký tự bên dưới (vòng).
   + Nếu khác hàng & cột → thay mỗi ký tự bằng ký tự cùng hàng nhưng cột của ký tự kia (hình chữ nhật).  

**Giải mã:** tương tự nhưng di chuyển sang trái / lên thay vì phải / xuống.  

**Ví dụ :** Với khóa "PLAYFAIR EXAMPLE", "HIDE THE GOLD" → "BMODZBXDNABEK...". 

**Không gian khóa:** 25!/(25-kword?) — thực tế là rất lớn vì khóa là mọi chuỗi chữ, nhưng cấu trúc 5×5 giới hạn.  

**Cách phá mã (không cần khóa):**
+ Tấn công phân tích digraph frequency (phân tích tần suất cặp ký tự).
+ Known-plaintext: có thể phục hồi bảng khóa bằng phân tích các cặp.  

## Dùng HTML,CSS,JS  
### Mã hoá  

<img width="1868" height="961" alt="Screenshot 2025-09-22 230951" src="https://github.com/user-attachments/assets/a761ce43-6cc0-46f0-9552-40f92f24df18" />  

### Giải mã  

<img width="1836" height="946" alt="Screenshot 2025-09-22 231003" src="https://github.com/user-attachments/assets/859a47ce-2225-4717-945f-e369fe3422bb" />  

## Dùng C++  
<img width="1284" height="311" alt="Screenshot 2025-09-23 143802" src="https://github.com/user-attachments/assets/57c2f20a-c3f3-4fdd-9b82-4eb6b71defda" />  

# The End
