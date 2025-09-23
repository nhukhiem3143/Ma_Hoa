// caesar.cpp
#include <bits/stdc++.h>
using namespace std;

string normalize(const string &s) {
    string out;
    for(char c: s) {
        if(isalpha((unsigned char)c)) out.push_back(toupper((unsigned char)c));
        else if(isspace((unsigned char)c)) out.push_back(' ');
    }
    return out;
}

string caesar_encode(const string &plain, int k) {
    string s = normalize(plain);
    string out;
    for(char c: s) {
        if(c == ' ') out.push_back(' ');
        else {
            out.push_back(char((c - 'A' + k + 26) % 26 + 'A'));
        }
    }
    return out;
}

string caesar_decode(const string &cipher, int k) {
    return caesar_encode(cipher, (26 - (k % 26)) % 26);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout << "Caesar mã hoá / giải mã\n";
    string line;
    cout << "Nhập bản rõ: ";
    getline(cin, line);
    int k; cout << "Khóa k: "; cin >> k;
    string enc = caesar_encode(line, k);
    cout << "Encode: " << enc << "\n";
    string dec = caesar_decode(enc, k);
    cout << "Decode: " << dec << "\n";
    return 0;
}
