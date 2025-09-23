#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <set>
using namespace std;

// Mã hoá: hoán vị theo key
string ma_hoa_hoanvi(const string &ban_ro, const vector<int> &key) {
    string ket_qua;
    int n = key.size();
    for (int i = 0; i < (int)ban_ro.size(); i += n) {
        string block = ban_ro.substr(i, n);
        while ((int)block.size() < n) block.push_back('X'); // padding
        string tmp(n, ' ');
        for (int j = 0; j < n; j++) {
            tmp[j] = block[key[j]];
        }
        ket_qua += tmp;
    }
    return ket_qua;
}

// Giải mã: dùng key đảo ngược
string giai_ma_hoanvi(const string &ban_ma, const vector<int> &key) {
    string ket_qua;
    int n = key.size();
    for (int i = 0; i < (int)ban_ma.size(); i += n) {
        string block = ban_ma.substr(i, n);
        string tmp(n, ' ');
        for (int j = 0; j < n; j++) {
            tmp[key[j]] = block[j];
        }
        ket_qua += tmp;
    }
    return ket_qua;
}

// Hàm đọc và kiểm tra khoá
vector<int> nhap_khoa() {
    cout << "Nhập khoá hoán vị (vd: 2 3 1 0): ";
    string line;
    getline(cin, line);
    stringstream ss(line);
    vector<int> key;
    int x;
    while (ss >> x) key.push_back(x);

    int n = key.size();
    set<int> check(key.begin(), key.end());
    if ((int)check.size() != n) {
        cerr << "Lỗi: Khoá có phần tử trùng!\n";
        exit(1);
    }
    for (int i = 0; i < n; i++) {
        if (check.find(i) == check.end()) {
            cerr << "Lỗi: Khoá phải chứa đủ các số từ 0 đến " << n - 1 << "\n";
            exit(1);
        }
    }
    return key;
}

int main() {
    string ban_ro, ban_ma;

    cout << "=== THUẬT TOÁN HOÁN VỊ ===\n";

    // --- Mã hoá ---
    cout << "\n--- MÃ HOÁ ---\n";
    cout << "Nhập bản rõ: ";
    getline(cin, ban_ro);
    vector<int> key = nhap_khoa();

    ban_ma = ma_hoa_hoanvi(ban_ro, key);
    cout << "Bản mã: " << ban_ma << "\n";

    // --- Giải mã ---
    cout << "\n--- GIẢI MÃ ---\n";
    cout << "Nhập bản mã: ";
    getline(cin, ban_ma);
    key = nhap_khoa();

    cout << "Giải mã: " << giai_ma_hoanvi(ban_ma, key) << "\n";

    return 0;
}
