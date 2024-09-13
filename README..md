
---

# SMSHub Telegram Bot

Bot Telegram ini memungkinkan Anda untuk berinteraksi dengan layanan SMSHub melalui berbagai perintah. Anda dapat memeriksa saldo, memesan nomor, membatalkan aksi, dan banyak lagi.

## Fitur

- **/start**: Memulai interaksi dengan bot.
- **/setapi**: Mengatur API key untuk SMSHub.
- **/service**: Mencari ID layanan.
- **/country**: Mencari kode negara.
- **/balance**: Memeriksa saldo SMSHub.
- **/order**: Memesan nomor berdasarkan layanan dan negara.
- **/status**: Memeriksa status dari pesanan.
- **/cancel**: Membatalkan aksi yang sedang berjalan.

## Struktur Proyek

```
src/
  ├── commands/
  │   ├── balance.js
  │   ├── cancel.js
  │   ├── country.js
  │   ├── order.js
  │   ├── service.js
  │   ├── setapi.js
  │   ├── start.js
  │   ├── status.js
  │   └── text.js
  ├── utils/
  │   ├── smshub.js
  │   └── mongo.js
  ├── bot.js
  └── index.js
```

## Instalasi

1. Clone repositori ini:
    ```
    git clone https://github.com/username/repository.git
    ```
2. Masuk ke direktori proyek:
    ```
    cd repository
    ```
3. Install dependensi:
    ```
    npm install
    ```
4. Buat file `.env` di direktori root dan tambahkan variabel lingkungan Anda:
    ```
    TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    MONGODB_URI=YOUR_MONGODB_URI
    ```

## Penggunaan

1. Jalankan bot:
    ```
    node src/index.js
    ```
2. Bot akan aktif dan mulai mendengarkan perintah di Telegram.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan kirim pull request dengan perubahan Anda. Jangan ragu untuk melaporkan masalah atau memberikan saran.

## Lisensi

Distribusi dan penggunaan proyek ini diatur oleh lisensi yang berlaku. Untuk detail lebih lanjut, periksa file `LICENSE` di repositori.

---

Terima kasih telah menggunakan bot ini!

---