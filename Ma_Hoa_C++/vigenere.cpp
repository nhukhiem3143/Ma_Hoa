#include <iostream>
#include <string>
using namespace std;

string ma_hoa_vigenere(const string &ban_ro, const string &khoa) {
    string kq;
    int n = khoa.size(), j = 0;
    for (char c : ban_ro) {
        if (isalpha((unsigned char)c)) {
            char base = isupper(c) ? 'A' : 'a';
            char baseK = isupper(khoa[j % n]) ? 'A' : 'a';
            kq.push_back(char((c - base + (khoa[j % n] - baseK)) % 26 + base));
            j++;
        } else kq.push_back(c);
    }
    return kq;
}

string giai_ma_vigenere(const string &ban_ma, const string &khoa) {
    string kq;
    int n = khoa.size(), j = 0;
    for (char c : ban_ma) {
        if (isalpha((unsigned char)c)) {
            char base = isupper(c) ? 'A' : 'a';
            char baseK = isupper(khoa[j % n]) ? 'A' : 'a';
            kq.push_back(char((c - base - (khoa[j % n] - baseK) + 26) % 26 + base));
            j++;
        } else kq.push_back(c);
    }
    return kq;
}

int main() {
    string ban_ro, ban_ma, khoa;

    cout << "=== THUẬT TOÁN VIGENÈRE ===\n";

    cout << "\n--- MÃ HOÁ ---\n";
    cout << "Nhập bản rõ: ";
    getline(cin, ban_ro);
    cout << "Nhập khoá (chuỗi chữ): ";
    getline(cin, khoa);

    ban_ma = ma_hoa_vigenere(ban_ro, khoa);
    cout << "Bản mã: " << ban_ma << "\n";

    cout << "\n--- GIẢI MÃ ---\n";
    cout << "Nhập bản mã: ";
    getline(cin, ban_ma);
    cout << "Nhập khoá: ";
    getline(cin, khoa);

    cout << "Giải mã: " << giai_ma_vigenere(ban_ma, khoa) << "\n";
    return 0;
}
