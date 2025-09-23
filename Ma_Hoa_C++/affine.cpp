#include <iostream>
#include <string>
using namespace std;

int ucln(int a, int b) {
    return b == 0 ? a : ucln(b, a % b);
}

int nghich_dao(int a, int m) {
    a %= m;
    for (int x = 1; x < m; x++) if ((a * x) % m == 1) return x;
    return -1;
}

string ma_hoa_affine(const string &ban_ro, int a, int b) {
    string kq;
    for (char c : ban_ro) {
        if (isalpha((unsigned char)c)) {
            char base = isupper(c) ? 'A' : 'a';
            kq.push_back(char(((a * (c - base) + b) % 26) + base));
        } else kq.push_back(c);
    }
    return kq;
}

string giai_ma_affine(const string &ban_ma, int a, int b) {
    string kq;
    int inv = nghich_dao(a, 26);
    for (char c : ban_ma) {
        if (isalpha((unsigned char)c)) {
            char base = isupper(c) ? 'A' : 'a';
            kq.push_back(char(((inv * ((c - base) - b + 26)) % 26) + base));
        } else kq.push_back(c);
    }
    return kq;
}

int main() {
    string ban_ro, ban_ma;
    int a, b;

    cout << "=== THUẬT TOÁN AFFINE ===\n";

    cout << "\n--- MÃ HOÁ ---\n";
    cout << "Nhập bản rõ: ";
    getline(cin, ban_ro);
    cout << "Nhập a (nguyên tố cùng nhau với 26): ";
    cin >> a;
    cout << "Nhập b: ";
    cin >> b;
    cin.ignore();

    if (ucln(a, 26) != 1) {
        cout << "Lỗi: a không hợp lệ!\n";
        return 0;
    }

    ban_ma = ma_hoa_affine(ban_ro, a, b);
    cout << "Bản mã: " << ban_ma << "\n";

    cout << "\n--- GIẢI MÃ ---\n";
    cout << "Nhập bản mã: ";
    getline(cin, ban_ma);
    cout << "Nhập a: ";
    cin >> a;
    cout << "Nhập b: ";
    cin >> b;

    cout << "Giải mã: " << giai_ma_affine(ban_ma, a, b) << "\n";
    return 0;
}
