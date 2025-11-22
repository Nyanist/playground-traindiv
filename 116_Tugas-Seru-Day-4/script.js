// ===================================
// 5. Menampilkan Alert Selamat Datang Saat Halaman Dimuat
// ===================================

// Fungsi ini akan dijalankan segera setelah browser membaca script.js.
function showWelcomeAlert() {
    // Mengambil nama pengguna dari browser (jika ada) atau menggunakan default.
    // Fitur ini menunjukkan eksplorasi penggunaan fungsi native JavaScript.
    const userName = prompt("Halo! Kami senang Anda datang. Siapa nama Anda?") || "Pengamat Bintang";
    
    // Menampilkan kotak dialog (alert) kepada pengguna.
    alert(`Selamat datang di Orion.co, ${userName}! Mari jelajahi bintang-bintang hari ini.`);
}

// Panggil fungsi secara langsung (tanpa perlu event listener karena akan dijalankan segera)
showWelcomeAlert();

// Opsional: Jika Anda ingin alert muncul setelah semua elemen HTML selesai dimuat, 
// Anda bisa menggunakan kode berikut sebagai ganti pemanggilan langsung di atas:
/* document.addEventListener('DOMContentLoaded', showWelcomeAlert);
*/

// ===================================
// 1. Mengganti Teks Tombol (Event Listener)
// ===================================
// Mendapatkan tombol "Call to action" di bagian Orion
const ctaButton = document.querySelector('.constellation-row:first-child .constellation-text button');

// Menambahkan event listener untuk mendeteksi klik
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        // Mengubah teks tombol saat diklik
        this.textContent = 'Info telah diakses!';
        
        // Opsional: Menambahkan sedikit efek visual
        this.style.backgroundColor = '#28a745'; // Warna hijau
        this.style.color = 'white';
        this.disabled = true; // Nonaktifkan tombol setelah diklik
        
        console.log('Tombol Call to action telah diklik!');
    });
}


// ===================================
// 2. Menampilkan Waktu dan Tanggal Saat Ini
// ===================================

// Fungsi untuk mendapatkan waktu saat ini dan memformatnya
function updateTime() {
    const now = new Date();
    // Contoh format: Sabtu, 22 November 2025 | 12:29:00 WIB
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedTime = now.toLocaleDateString('id-ID', options);

    // Membuat elemen baru untuk menampilkan waktu
    let timeDisplay = document.getElementById('current-time-display');
    
    // Cek apakah elemen sudah ada di DOM
    if (!timeDisplay) {
        // Jika belum ada, buat elemen baru (span)
        timeDisplay = document.createElement('span');
        timeDisplay.id = 'current-time-display';
        timeDisplay.style.marginLeft = '50px'; // Spasi dari link navigasi
        timeDisplay.style.fontSize = '14px';
        timeDisplay.style.color = '#28345e'; // Sesuaikan dengan warna logo
        
        // Masukkan elemen baru ke dalam header, di samping nav-links
        const header = document.querySelector('.header');
        if (header) {
             // Cari div .nav-links
            const navLinks = document.querySelector('.header .nav-links');
            // Sisipkan waktu di depan navLinks
            header.insertBefore(timeDisplay, navLinks);
        }
    }
    
    // Perbarui konten teks
    timeDisplay.textContent = `Waktu Lokal: ${formattedTime}`;
}

// Panggil fungsi segera dan atur agar diperbarui setiap 1 detik
updateTime();
setInterval(updateTime, 1000);


// ===================================
// 3. Interaksi Hover dengan Tombol (Hero Section)
// ===================================

// Mendapatkan tombol-tombol di hero section
const heroButtons = document.querySelectorAll('.hero-section .button-group button');

heroButtons.forEach(button => {
    // Efek saat mouse masuk (hover)
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    });

    // Efek saat mouse keluar (unhover)
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// ===================================
// 4. Mengubah Konten Acara Saat Tombol Class Diklik
// ===================================

// Dapatkan elemen-elemen yang diperlukan
const classButton = document.querySelector('.hero-section .button-group button:nth-child(1)');
const eventDescription = document.getElementById('eventDescription');
const eventDate = document.getElementById('eventDate');

// Data alternatif untuk acara (Kelas Observasi)
const classDetails = {
    description: "Join our beginner class: 'Introduction to Telescopes'. Learn how to set up, operate, and maintain your telescope to start your journey into deep space observation!",
    date: "Class scheduled for December 5th, 7:00 PM (Online via Zoom). Limited seats available. Register Now!",
    isClassActive: false // Status untuk melacak konten saat ini
};

if (classButton && eventDescription && eventDate) {
    classButton.addEventListener('click', function() {
        if (!classDetails.isClassActive) {
            // Ubah konten acara menjadi info kelas
            eventDescription.textContent = classDetails.description;
            eventDate.textContent = classDetails.date;
            
            // Perbarui gaya tombol untuk menunjukkan status aktif
            this.style.backgroundColor = '#007bff';
            this.style.color = 'white';
            this.textContent = 'Back to Events';

            classDetails.isClassActive = true;
        } else {
            // Kembalikan ke konten acara default (seperti di HTML)
            eventDescription.textContent = "Observe the waning gibbous Moon in conjunction with Jupiter, which is visible in the evening sky. Jupiter is expected to rise in the late evening and remain visible until the morning.";
            eventDate.textContent = "Jupiter will rise around 10:24 PM and will be visible until the morning of November 11.";
            
            // Kembalikan gaya tombol
            this.style.backgroundColor = 'transparent';
            this.style.color = 'white';
            this.textContent = 'Class'; // Kembali ke teks asli

            classDetails.isClassActive = false;
        }

        console.log('Konten acara diubah oleh tombol Class.');
    });
}