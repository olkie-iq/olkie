/**
 * Configuration
 * Global settings and constants
 */

const CONFIG = {
    // Animation timings
    ANIMATION: {
        WELCOME_HIDE: 900,
        CARD_TOGGLE: 300,
        SKILL_FILL: 1300,
        TYPING_SPEED: 100
    },
    
    // Typing text variations
    TYPING_TEXTS: {
        en: [
            'Game Developer',
            'Programmer',
            'Content Creator',
            'Godot Enthusiast'
        ],
        ar: [
            'مطور ألعاب',
            'مبرمج',
            'منشئ محتوى',
            'عاشق Godot'
        ]
    },
    
    // API endpoints
    API: {
        FORMSPREE: 'https://formspree.io/f/YOUR_FORM_ID'
    },
    
    // Storage keys
    STORAGE: {
        THEME: 'olkie_theme',
        LANGUAGE: 'olkie_language',
        VISITS: 'olkie_visits'
    },
    
    // Default values
    DEFAULTS: {
        THEME: 'dark',
        LANGUAGE: 'en'
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
