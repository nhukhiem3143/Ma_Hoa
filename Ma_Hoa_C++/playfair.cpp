#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

string chuan_hoa(const string &s) {
    string kq;
    for (char c : s) {
        if (isalpha((unsigned char)c)) {
            c = toupper(c);
            if (c == 'J') c = 'I';
            kq.push_back(c);
        }
    }
    return kq;
}

vector<vector<char>> tao_bang(const string &khoa) {
    string k = chuan_hoa(khoa);
    string bang = "";
    for (char c : k) if (bang.find(c) == string::npos) bang += c;
    for (char c = 'A'; c <= 'Z'; c++) {
        if (c == 'J') continue;
        if (bang.find(c) == string::npos) bang += c;
    }
    vector<vector<char>> mat(5, vector<char>(5));
    int idx = 0;
    for (int i = 0; i < 5; i++)
        for (int j = 0; j < 5; j++)
            mat[i][j] = bang[idx++];
    return mat;
}

pair<int,int> tim_vi_tri(const vector<vector<char>> &mat, char c) {
    for (int i = 0; i < 5; i++)
        for (int j = 0; j < 5; j++)
            if (mat[i][j] == c) return {i,j};
    return {-1,-1};
}

string chuan_hoa_cap(const string &s) {
    string t = chuan_hoa(s);
    string kq;
    for (size_t i = 0; i < t.size(); i++) {
        kq.push_back(t[i]);
        if (i+1 < t.size() && t[i] == t[i+1]) {
            kq.push_back('X');
        }
    }
    if (kq.size() % 2) kq.push_back('X');
    return kq;
}

string ma_hoa_playfair(const string &ban_ro, const string &khoa) {
    auto mat = tao_bang(khoa);
    string t = chuan_hoa_cap(ban_ro);
    string kq;
    for (size_t i = 0; i < t.size(); i+=2) {
        auto [r1,c1] = tim_vi_tri(mat, t[i]);
        auto [r2,c2] = tim_vi_tri(mat, t[i+1]);
        if (r1 == r2) {
            kq.push_back(mat[r1][(c1+1)%5]);
            kq.push_back(mat[r2][(c2+1)%5]);
        } else if (c1 == c2) {
            kq.push_back(mat[(r1+1)%5][c1]);
            kq.push_back(mat[(r2+1)%5][c2]);
        } else {
            kq.push_back(mat[r1][c2]);
            kq.push_back(mat[r2][c1]);
        }
    }
    return kq;
}

string giai_ma_playfair(const string &ban_ma, const string &khoa) {
    auto mat = tao_bang(khoa);
    string t = chuan_hoa(ban_ma);
    string kq;
    for (size_t i = 0; i < t.size(); i+=2) {
        auto [r1,c1] = tim_vi_tri(mat, t[i]);
        auto [r2,c2] = tim_vi_tri(mat, t[i+1]);
        if (r1 == r2) {
            kq.push_back(mat[r1][(c1+4)%5]);
            kq.push_back(mat[r2][(c2+4)%5]);
        } else if (c1 == c2) {
            kq.push_back(mat[(r1+4)%5][c1]);
            kq.push_back(mat[(r2+4)%5][c2]);
        } else {
            kq.push_back(mat[r1][c2]);
            kq.push_back(mat[r2][c1]);
        }
    }
    return kq;
}

int main() {
    string ban_ro, ban_ma, khoa;

    cout << "=== THUẬT TOÁN PLAYFAIR ===\n";

    cout << "\n--- MÃ HOÁ ---\n";
    cout << "Nhập bản rõ: ";
    getline(cin, ban_ro);
    cout << "Nhập khoá (chuỗi chữ): ";
    getline(cin, khoa);

    ban_ma = ma_hoa_playfair(ban_ro, khoa);
    cout << "Bản mã: " << ban_ma << "\n";

    cout << "\n--- GIẢI MÃ ---\n";
    cout << "Nhập bản mã: ";
    getline(cin, ban_ma);
    cout << "Nhập khoá: ";
    getline(cin, khoa);

    cout << "Giải mã: " << giai_ma_playfair(ban_ma, khoa) << "\n";
    return 0;
}
