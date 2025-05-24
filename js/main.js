// Main JavaScript for OIADB Documentation Website

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeSwitch = document.getElementById('checkbox');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const copyButtons = document.querySelectorAll('.copy-btn');

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger animation
        const hamburger = menuToggle.querySelector('.hamburger');
        hamburger.classList.toggle('active');
        
        if (hamburger.classList.contains('active')) {
            hamburger.style.transform = 'rotate(45deg)';
            hamburger.style.backgroundColor = 'transparent';
            hamburger.style.transition = 'var(--transition)';
            
            hamburger.style.before = {
                transform: 'rotate(90deg)',
                top: '0'
            };
            
            hamburger.style.after = {
                transform: 'rotate(90deg)',
                bottom: '0'
            };
        } else {
            hamburger.style.transform = 'rotate(0)';
            hamburger.style.backgroundColor = 'var(--text-color)';
        }
    });
}

// Theme Switcher
if (themeSwitch) {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Search Functionality
if (searchInput && searchButton) {
    // Mock search data (in a real implementation, this would be generated from all pages)
    const searchData = [
        { title: 'Trang chủ', url: 'index.html', content: 'OIADB Thư viện Python wrapper cho Android Debug Bridge' },
        { title: 'Bắt đầu - Cài đặt', url: 'getting-started.html#installation', content: 'Hướng dẫn cài đặt OIADB trên các nền tảng khác nhau' },
        { title: 'Tính năng - Nhận diện hình ảnh', url: 'features.html#image-recognition', content: 'Chức năng nhận diện hình ảnh trong OIADB' },
        { title: 'Tính năng - XML Dump', url: 'features.html#xml-dump', content: 'Tính năng XML Dump và Trợ Năng trong OIADB' },
        { title: 'API Reference - MyADB', url: 'api-reference.html#myadb', content: 'Tài liệu API cho lớp MyADB' },
        { title: 'Hướng dẫn - Nhận diện hình ảnh', url: 'guides.html#image-recognition', content: 'Hướng dẫn sử dụng chức năng nhận diện hình ảnh' },
        { title: 'Ví dụ - Cơ bản', url: 'examples.html#basic', content: 'Các ví dụ cơ bản về cách sử dụng OIADB' },
        { title: 'Tài nguyên - GitHub', url: 'resources.html#github', content: 'Liên kết đến GitHub repository của OIADB' }
    ];
    
    // Search function
    function performSearch(query) {
        // Clear previous results
        searchResults.innerHTML = '';
        
        if (!query.trim()) {
            searchResults.classList.remove('active');
            return;
        }
        
        // Filter search data
        const results = searchData.filter(item => {
            return (
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase())
            );
        });
        
        // Display results
        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.innerHTML = `<h4>${result.title}</h4><p>${result.content.substring(0, 100)}...</p>`;
                resultItem.addEventListener('click', () => {
                    window.location.href = result.url;
                });
                searchResults.appendChild(resultItem);
            });
            searchResults.classList.add('active');
        } else {
            const noResults = document.createElement('div');
            noResults.classList.add('search-result-item');
            noResults.textContent = 'Không tìm thấy kết quả';
            searchResults.appendChild(noResults);
            searchResults.classList.add('active');
        }
    }
    
    // Search input event
    searchInput.addEventListener('input', () => {
        performSearch(searchInput.value);
    });
    
    // Search button click
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchButton.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// Tab Functionality
if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Copy to Clipboard Functionality
if (copyButtons.length > 0) {
    // Initialize clipboard.js
    const clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', (e) => {
        // Change icon temporarily to indicate success
        const icon = e.trigger.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'fas fa-check';
        
        // Reset icon after a short delay
        setTimeout(() => {
            icon.className = originalClass;
        }, 2000);
        
        e.clearSelection();
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .platform-card, .section-title, .architecture-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Responsive Header
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});
