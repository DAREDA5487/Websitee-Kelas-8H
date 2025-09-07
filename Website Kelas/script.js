// Configuration - Easy to change admin credentials
const ADMIN_CONFIG = {
    username: 'admin',
    password: 'admin123'
};

// Data Storage Keys
const STORAGE_KEYS = {
    struktur: 'kelas8h_struktur',
    anggota: 'kelas8h_anggota',
    piket: 'kelas8h_piket',
    pelajaran: 'kelas8h_pelajaran',
    pengumuman: 'kelas8h_pengumuman'
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadAllData();
    initializeTheme();
    initializeScrollAnimations();
});

// Initialize application
function initializeApp() {
    // Initialize empty data if not exists
    Object.values(STORAGE_KEYS).forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    });
    
    // Add sample data if empty
    addSampleData();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-anggota');
    searchInput.addEventListener('input', filterAnggota);

    // Admin forms
    setupAdminForms();
}

// Setup admin forms
function setupAdminForms() {
    // Admin login form
    document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
    
    // Admin panel forms
    document.getElementById('struktur-form').addEventListener('submit', handleStrukturSubmit);
    document.getElementById('anggota-form').addEventListener('submit', handleAnggotaSubmit);
    document.getElementById('piket-form').addEventListener('submit', handlePiketSubmit);
    document.getElementById('pelajaran-form').addEventListener('submit', handlePelajaranSubmit);
    document.getElementById('pengumuman-form').addEventListener('submit', handlePengumumanSubmit);
}

// Load all data and display
function loadAllData() {
    displayStruktur();
    displayAnggota();
    displayPiket();
    displayPelajaran();
    displayPengumuman();
    updateStats();
    
    // Load admin lists if admin panel is visible
    if (document.getElementById('admin-panel').style.display === 'block') {
        loadAdminLists();
    }
}

// Display functions
function displayStruktur() {
    const struktur = JSON.parse(localStorage.getItem(STORAGE_KEYS.struktur) || '[]');
    const container = document.getElementById('struktur-grid');
    
    container.innerHTML = struktur.map(item => `
        <div class="card">
            ${item.foto ? `<img src="${item.foto}" alt="${item.nama}" class="card-image">` : ''}
            <h3>${item.jabatan}</h3>
            <p>${item.nama}</p>
        </div>
    `).join('');
}

function displayAnggota() {
    const anggota = JSON.parse(localStorage.getItem(STORAGE_KEYS.anggota) || '[]');
    const container = document.getElementById('anggota-grid');
    
    container.innerHTML = anggota.map(item => `
        <div class="card" data-nama="${item.nama.toLowerCase()}">
            ${item.foto ? `<img src="${item.foto}" alt="${item.nama}" class="card-image">` : ''}
            <h3>${item.nama}</h3>
            <p>NIS: ${item.nis}</p>
        </div>
    `).join('');
}

function displayPiket() {
    const piket = JSON.parse(localStorage.getItem(STORAGE_KEYS.piket) || '[]');
    const container = document.getElementById('piket-container');
    
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    container.innerHTML = days.map(hari => {
        const jadwal = piket.find(p => p.hari === hari);
        return `
            <div class="jadwal-item">
                <h4>${hari}</h4>
                <p>${jadwal ? jadwal.petugas : 'Belum ada jadwal'}</p>
            </div>
        `;
    }).join('');
}

function displayPelajaran() {
    const pelajaran = JSON.parse(localStorage.getItem(STORAGE_KEYS.pelajaran) || '[]');
    const container = document.getElementById('pelajaran-container');
    
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    container.innerHTML = days.map(hari => {
        const jadwalHari = pelajaran.filter(p => p.hari === hari);
        return `
            <div class="jadwal-item">
                <h4>${hari}</h4>
                ${jadwalHari.length > 0 ? 
                    jadwalHari.map(j => `
                        <p><strong>${j.jam}</strong> - ${j.mata} (${j.guru})</p>
                    `).join('') : 
                    '<p>Belum ada jadwal</p>'
                }
            </div>
        `;
    }).join('');
}

function displayPengumuman() {
    const pengumuman = JSON.parse(localStorage.getItem(STORAGE_KEYS.pengumuman) || '[]');
    const container = document.getElementById('pengumuman-container');
    
    container.innerHTML = pengumuman.length > 0 ? 
        pengumuman.map(item => `
            <div class="pengumuman-item">
                <h4>${item.judul}</h4>
                <p>${item.isi}</p>
                <p class="pengumuman-date">${formatDate(item.tanggal)}</p>
            </div>
        `).join('') : 
        '<p style="text-align: center; color: #7f8c8d;">Belum ada pengumuman</p>';
}

// Filter anggota function
function filterAnggota() {
    const searchTerm = document.getElementById('search-anggota').value.toLowerCase();
    const cards = document.querySelectorAll('#anggota-grid .card');
    
    cards.forEach(card => {
        const nama = card.getAttribute('data-nama');
        if (nama.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Update statistics
function updateStats() {
    const anggota = JSON.parse(localStorage.getItem(STORAGE_KEYS.anggota) || '[]');
    const pengumuman = JSON.parse(localStorage.getItem(STORAGE_KEYS.pengumuman) || '[]');
    
    document.getElementById('total-siswa').textContent = anggota.length;
    document.getElementById('total-pengumuman').textContent = pengumuman.length;
}

// Admin functions
function showAdminLogin() {
    document.getElementById('admin-modal').style.display = 'block';
}

function closeAdminLogin() {
    document.getElementById('admin-modal').style.display = 'none';
}

function handleAdminLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
        closeAdminLogin();
        showAdminPanel();
        loadAdminLists();
    } else {
        alert('Username atau password salah!');
    }
}

function showAdminPanel() {
    document.getElementById('admin-panel').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function logout() {
    document.getElementById('admin-panel').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Clear forms
    document.querySelectorAll('.admin-form').forEach(form => form.reset());
}

// Tab functionality
function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Admin form handlers
function handleStrukturSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = document.getElementById('struktur-id').value;
    
    const item = {
        id: id || Date.now().toString(),
        jabatan: formData.get('struktur-jabatan') || document.getElementById('struktur-jabatan').value,
        nama: formData.get('struktur-nama') || document.getElementById('struktur-nama').value,
        foto: null
    };
    
    // Handle photo upload
    const photoFile = document.getElementById('struktur-foto').files[0];
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            item.foto = e.target.result;
            saveStruktur(item, !id);
        };
        reader.readAsDataURL(photoFile);
    } else {
        saveStruktur(item, !id);
    }
}

function saveStruktur(item, isNew) {
    let struktur = JSON.parse(localStorage.getItem(STORAGE_KEYS.struktur) || '[]');
    
    if (isNew) {
        struktur.push(item);
    } else {
        const index = struktur.findIndex(s => s.id === item.id);
        if (index !== -1) {
            struktur[index] = { ...struktur[index], ...item };
        }
    }
    
    localStorage.setItem(STORAGE_KEYS.struktur, JSON.stringify(struktur));
    document.getElementById('struktur-form').reset();
    document.getElementById('struktur-id').value = '';
    displayStruktur();
    loadAdminStrukturList();
}

// Similar handlers for other forms...
function handleAnggotaSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('anggota-id').value;
    
    const item = {
        id: id || Date.now().toString(),
        nama: document.getElementById('anggota-nama').value,
        nis: document.getElementById('anggota-nis').value,
        foto: null
    };
    
    const photoFile = document.getElementById('anggota-foto').files[0];
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            item.foto = e.target.result;
            saveAnggota(item, !id);
        };
        reader.readAsDataURL(photoFile);
    } else {
        saveAnggota(item, !id);
    }
}

function saveAnggota(item, isNew) {
    let anggota = JSON.parse(localStorage.getItem(STORAGE_KEYS.anggota) || '[]');
    
    if (isNew) {
        anggota.push(item);
    } else {
        const index = anggota.findIndex(a => a.id === item.id);
        if (index !== -1) {
            anggota[index] = { ...anggota[index], ...item };
        }
    }
    
    localStorage.setItem(STORAGE_KEYS.anggota, JSON.stringify(anggota));
    document.getElementById('anggota-form').reset();
    document.getElementById('anggota-id').value = '';
    displayAnggota();
    updateStats();
    loadAdminAnggotaList();
}

function handlePiketSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('piket-id').value;
    
    const item = {
        id: id || Date.now().toString(),
        hari: document.getElementById('piket-hari').value,
        petugas: document.getElementById('piket-petugas').value
    };
    
    let piket = JSON.parse(localStorage.getItem(STORAGE_KEYS.piket) || '[]');
    
    if (id) {
        const index = piket.findIndex(p => p.id === id);
        if (index !== -1) {
            piket[index] = item;
        }
    } else {
        // Check if day already exists
        const existingIndex = piket.findIndex(p => p.hari === item.hari);
        if (existingIndex !== -1) {
            piket[existingIndex] = item;
        } else {
            piket.push(item);
        }
    }
    
    localStorage.setItem(STORAGE_KEYS.piket, JSON.stringify(piket));
    document.getElementById('piket-form').reset();
    document.getElementById('piket-id').value = '';
    displayPiket();
    loadAdminPiketList();
}

function handlePelajaranSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('pelajaran-id').value;
    
    const item = {
        id: id || Date.now().toString(),
        hari: document.getElementById('pelajaran-hari').value,
        jam: document.getElementById('pelajaran-jam').value,
        mata: document.getElementById('pelajaran-mata').value,
        guru: document.getElementById('pelajaran-guru').value
    };
    
    let pelajaran = JSON.parse(localStorage.getItem(STORAGE_KEYS.pelajaran) || '[]');
    
    if (id) {
        const index = pelajaran.findIndex(p => p.id === id);
        if (index !== -1) {
            pelajaran[index] = item;
        }
    } else {
        pelajaran.push(item);
    }
    
    localStorage.setItem(STORAGE_KEYS.pelajaran, JSON.stringify(pelajaran));
    document.getElementById('pelajaran-form').reset();
    document.getElementById('pelajaran-id').value = '';
    displayPelajaran();
    loadAdminPelajaranList();
}

function handlePengumumanSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('pengumuman-id').value;
    
    const item = {
        id: id || Date.now().toString(),
        judul: document.getElementById('pengumuman-judul').value,
        isi: document.getElementById('pengumuman-isi').value,
        tanggal: document.getElementById('pengumuman-tanggal').value
    };
    
    let pengumuman = JSON.parse(localStorage.getItem(STORAGE_KEYS.pengumuman) || '[]');
    
    if (id) {
        const index = pengumuman.findIndex(p => p.id === id);
        if (index !== -1) {
            pengumuman[index] = item;
        }
    } else {
        pengumuman.push(item);
    }
    
    // Sort by date (newest first)
    pengumuman.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    
    localStorage.setItem(STORAGE_KEYS.pengumuman, JSON.stringify(pengumuman));
    document.getElementById('pengumuman-form').reset();
    document.getElementById('pengumuman-id').value = '';
    displayPengumuman();
    updateStats();
    loadAdminPengumumanList();
}

// Delete functions
function deleteStruktur(id) {
    if (confirm('Yakin ingin menghapus struktur ini?')) {
        let struktur = JSON.parse(localStorage.getItem(STORAGE_KEYS.struktur) || '[]');
        struktur = struktur.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEYS.struktur, JSON.stringify(struktur));
        displayStruktur();
        loadAdminStrukturList();
    }
}

function deleteAnggota(id) {
    if (confirm('Yakin ingin menghapus anggota ini?')) {
        let anggota = JSON.parse(localStorage.getItem(STORAGE_KEYS.anggota) || '[]');
        anggota = anggota.filter(a => a.id !== id);
        localStorage.setItem(STORAGE_KEYS.anggota, JSON.stringify(anggota));
        displayAnggota();
        updateStats();
        loadAdminAnggotaList();
    }
}

function deleteAllMembers() {
    if (confirm('Yakin ingin menghapus SEMUA anggota kelas? Tindakan ini tidak dapat dibatalkan!')) {
        localStorage.setItem(STORAGE_KEYS.anggota, JSON.stringify([]));
        displayAnggota();
        updateStats();
        loadAdminAnggotaList();
    }
}

function deletePiket(id) {
    if (confirm('Yakin ingin menghapus jadwal piket ini?')) {
        let piket = JSON.parse(localStorage.getItem(STORAGE_KEYS.piket) || '[]');
        piket = piket.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.piket, JSON.stringify(piket));
        displayPiket();
        loadAdminPiketList();
    }
}

function deletePelajaran(id) {
    if (confirm('Yakin ingin menghapus jadwal pelajaran ini?')) {
        let pelajaran = JSON.parse(localStorage.getItem(STORAGE_KEYS.pelajaran) || '[]');
        pelajaran = pelajaran.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.pelajaran, JSON.stringify(pelajaran));
        displayPelajaran();
        loadAdminPelajaranList();
    }
}

function deletePengumuman(id) {
    if (confirm('Yakin ingin menghapus pengumuman ini?')) {
        let pengumuman = JSON.parse(localStorage.getItem(STORAGE_KEYS.pengumuman) || '[]');
        pengumuman = pengumuman.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.pengumuman, JSON.stringify(pengumuman));
        displayPengumuman();
        updateStats();
        loadAdminPengumumanList();
    }
}

// Edit functions
function editStruktur(id) {
    const struktur = JSON.parse(localStorage.getItem(STORAGE_KEYS.struktur) || '[]');
    const item = struktur.find(s => s.id === id);
    if (item) {
        document.getElementById('struktur-id').value = item.id;
        document.getElementById('struktur-jabatan').value = item.jabatan;
        document.getElementById('struktur-nama').value = item.nama;
        showTab('struktur-tab');
    }
}

function editAnggota(id) {
    const anggota = JSON.parse(localStorage.getItem(STORAGE_KEYS.anggota) || '[]');
    const item = anggota.find(a => a.id === id);
    if (item) {
        document.getElementById('anggota-id').value = item.id;
        document.getElementById('anggota-nama').value = item.nama;
        document.getElementById('anggota-nis').value = item.nis;
        showTab('anggota-tab');
    }
}

function editPiket(id) {
    const piket = JSON.parse(localStorage.getItem(STORAGE_KEYS.piket) || '[]');
    const item = piket.find(p => p.id === id);
    if (item) {
        document.getElementById('piket-id').value = item.id;
        document.getElementById('piket-hari').value = item.hari;
        document.getElementById('piket-petugas').value = item.petugas;
        showTab('piket-tab');
    }
}

function editPelajaran(id) {
    const pelajaran = JSON.parse(localStorage.getItem(STORAGE_KEYS.pelajaran) || '[]');
    const item = pelajaran.find(p => p.id === id);
    if (item) {
        document.getElementById('pelajaran-id').value = item.id;
        document.getElementById('pelajaran-hari').value = item.hari;
        document.getElementById('pelajaran-jam').value = item.jam;
        document.getElementById('pelajaran-mata').value = item.mata;
        document.getElementById('pelajaran-guru').value = item.guru;
        showTab('pelajaran-tab');
    }
}

function editPengumuman(id) {
    const pengumuman = JSON.parse(localStorage.getItem(STORAGE_KEYS.pengumuman) || '[]');
    const item = pengumuman.find(p => p.id === id);
    if (item) {
        document.getElementById('pengumuman-id').value = item.id;
        document.getElementById('pengumuman-judul').value = item.judul;
        document.getElementById('pengumuman-isi').value = item.isi;
        document.getElementById('pengumuman-tanggal').value = item.tanggal;
        showTab('pengumuman-tab');
    }
}

// Load admin lists
function loadAdminLists() {
    loadAdminStrukturList();
    loadAdminAnggotaList();
    loadAdminPiketList();
    loadAdminPelajaranList();
    loadAdminPengumumanList();
}

function loadAdminStrukturList() {
    const struktur = JSON.parse(localStorage.getItem(STORAGE_KEYS.struktur) || '[]');
    const container = document.getElementById('admin-struktur-list');
    
    container.innerHTML = struktur.map(item => `
        <div class="admin-item">
            <div class="admin-item-info">
                <strong>${item.jabatan}</strong> - ${item.nama}
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editStruktur('${item.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteStruktur('${item.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}

function loadAdminAnggotaList() {
    const anggota = JSON.parse(localStorage.getItem(STORAGE_KEYS.anggota) || '[]');
    const container = document.getElementById('admin-anggota-list');
    
    container.innerHTML = anggota.map(item => `
        <div class="admin-item">
            <div class="admin-item-info">
                <strong>${item.nama}</strong> - NIS: ${item.nis}
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editAnggota('${item.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteAnggota('${item.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}

function loadAdminPiketList() {
    const piket = JSON.parse(localStorage.getItem(STORAGE_KEYS.piket) || '[]');
    const container = document.getElementById('admin-piket-list');
    
    container.innerHTML = piket.map(item => `
        <div class="admin-item">
            <div class="admin-item-info">
                <strong>${item.hari}</strong> - ${item.petugas}
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editPiket('${item.id}')">Edit</button>
                <button class="delete-btn" onclick="deletePiket('${item.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}

function loadAdminPelajaranList() {
    const pelajaran = JSON.parse(localStorage.getItem(STORAGE_KEYS.pelajaran) || '[]');
    const container = document.getElementById('admin-pelajaran-list');
    
    container.innerHTML = pelajaran.map(item => `
        <div class="admin-item">
            <div class="admin-item-info">
                <strong>${item.hari}</strong> ${item.jam} - ${item.mata} (${item.guru})
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editPelajaran('${item.id}')">Edit</button>
                <button class="delete-btn" onclick="deletePelajaran('${item.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}

function loadAdminPengumumanList() {
    const pengumuman = JSON.parse(localStorage.getItem(STORAGE_KEYS.pengumuman) || '[]');
    const container = document.getElementById('admin-pengumuman-list');
    
    container.innerHTML = pengumuman.map(item => `
        <div class="admin-item">
            <div class="admin-item-info">
                <strong>${item.judul}</strong> - ${formatDate(item.tanggal)}
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editPengumuman('${item.id}')">Edit</button>
                <button class="delete-btn" onclick="deletePengumuman('${item.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to the main section
                entry.target.classList.add('in-view');
                
                // Animate child elements with staggered delays
                const animateElements = entry.target.querySelectorAll('.animate-fade-up, .animate-scale');
                animateElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('in-view');
                    }, index * 150);
                });
            } else {
                // Remove animation class when element goes out of view (optional - for re-triggering)
                entry.target.classList.remove('in-view');
                const animateElements = entry.target.querySelectorAll('.animate-fade-up, .animate-scale');
                animateElements.forEach(el => {
                    el.classList.remove('in-view');
                });
            }
        });
    }, observerOptions);

    // Observe all sections with scroll animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Also observe individual elements that might not be in sections
    document.querySelectorAll('.animate-fade-up:not(.animate-on-scroll .animate-fade-up), .animate-scale:not(.animate-on-scroll .animate-scale)').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced card animations
function addCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-up');
    });
}

// Add sample data
function addSampleData() {
    // Add sample announcements if empty
    const pengumuman = JSON.parse(localStorage.getItem(STORAGE_KEYS.pengumuman) || '[]');
    if (pengumuman.length === 0) {
        const samplePengumuman = [
            {
                id: '1',
                judul: 'Selamat Datang di Website Kelas 8H',
                isi: 'Website ini dibuat untuk memudahkan komunikasi dan informasi antar siswa kelas 8H. Silakan gunakan fitur-fitur yang tersedia.',
                tanggal: new Date().toISOString().split('T')[0]
            }
        ];
        localStorage.setItem(STORAGE_KEYS.pengumuman, JSON.stringify(samplePengumuman));
    }
}
