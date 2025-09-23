#include <iostream>
#include <string>
using namespace std;

string ma_hoa_caesar(const string &ban_ro, int k) {
    string ket_qua;
    for (char c : ban_ro) {
        if (isalpha((unsigned char)c)) {
            char base = isupper(c) ? 'A' : 'a';
            ket_qua.push_back(char((c - base + k + 26) % 26 + base));
        } else ket_qua.push_back(c);
    }
    return ket_qua;
}

string giai_ma_caesar(const string &ban_ma, int k) {
    return ma_hoa_caesar(ban_ma, -k);
}

int main() {
    string ban_ro, ban_ma;
    int k;

    cout << "=== THUẬT TOÁN CAESAR ===\n";

    cout << "\n--- MÃ HOÁ ---\n";
    cout << "Nhập bản rõ: ";
    getline(cin, ban_ro);
    cout << "Nhập khoá k: ";
    cin >> k;
    cin.ignore();

    ban_ma = ma_hoa_caesar(ban_ro, k);
    cout << "Bản mã: " << ban_ma << "\n";

    cout << "\n--- GIẢI MÃ ---\n";
    cout << "Nhập bản mã: ";
    getline(cin, ban_ma);
    cout << "Nhập khoá k: ";
    cin >> k;

    cout << "Giải mã: " << giai_ma_caesar(ban_ma, k) << "\n";
    return 0;
}
