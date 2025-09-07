// Configuration file for easy customization
// Developers can easily change these settings

const CONFIG = {
    // Admin credentials - Change these to your desired username and password
    admin: {
        username: 'admin',
        password: 'admin123'
    },
    
    // Website settings
    website: {
        className: '8H',
        schoolName: 'SMP Negeri 1', // Optional: Add school name
        maxPhotoSize: 5 * 1024 * 1024, // 5MB max photo size
        allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    },
    
    // Color scheme (if you want to customize colors)
    colors: {
        primary: '#2c3e50',
        secondary: '#3498db',
        accent: '#e74c3c',
        success: '#27ae60',
        warning: '#f39c12',
        light: '#ecf0f1',
        dark: '#34495e'
    }
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
