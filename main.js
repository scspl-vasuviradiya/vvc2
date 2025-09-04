// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });

  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Navigation functionality
  initNavigation();
  
  // Collections functionality
  initCollections();
  
  // Gallery functionality
  initGallery();
  
  // Back to top button
  initBackToTop();
  
  // Smooth scrolling for navigation links
  initSmoothScrolling();
  
  // Navbar scroll effect
  initNavbarScroll();
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Collections functionality
function initCollections() {
  loadCollections();
  initCollectionFilters();
}

async function loadCollections() {
  try {
    const response = await fetch('collections.json');
    const collections = await response.json();
    renderCollections(collections);
  } catch (error) {
    console.error('Error loading collections:', error);
    showCollectionsError();
  }
}

function renderCollections(collections) {
  const grid = document.getElementById('collections-grid');
  grid.innerHTML = '';
  
  collections.forEach((item, index) => {
    const tags = item.tags.join(' ');
    const article = document.createElement('article');
    article.className = 'collection-item';
    article.setAttribute('data-tags', tags);
    article.setAttribute('data-aos', 'fade-up');
    article.setAttribute('data-aos-delay', (index * 100).toString());
    
    article.innerHTML = `
      <img src="${item.img}" alt="${item.alt}" class="collection-image" loading="lazy">
      <div class="collection-content">
        <h3 class="collection-title">${item.title}</h3>
        <p class="collection-description">${item.desc}</p>
        <div class="collection-price">${item.price}</div>
      </div>
    `;
    
    grid.appendChild(article);
  });
  
  // Refresh AOS for new elements
  AOS.refresh();
}

function showCollectionsError() {
  const grid = document.getElementById('collections-grid');
  grid.innerHTML = `
    <div class="loading">
      <p>Unable to load collections. Please try again later.</p>
    </div>
  `;
}

function initCollectionFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.collection-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter items
      items.forEach(item => {
        const tags = item.getAttribute('data-tags') || '';
        const tagArray = tags.split(' ');
        
        if (filter === 'all' || tagArray.includes(filter)) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Gallery functionality
function initGallery() {
  loadGallery();
  initGalleryControls();
}

let galleryImages = [];
let currentGalleryIndex = 0;
let maxImages = 0;

async function loadGalleryManifest() {
  try {
    const response = await fetch('gallery_manifest.json');
    const data = await response.json();
    const genderType = document.getElementById('gender-toggle').checked ? 'Female' : 'Male';
    maxImages = data[genderType] || 0;
    return maxImages;
  } catch (error) {
    console.error('Error loading gallery manifest:', error);
    return 0;
  }
}

async function loadGallery() {
  await loadGalleryManifest();
  
  const genderType = document.getElementById('gender-toggle').checked ? 'Female' : 'Male';
  galleryImages = [];
  
  for (let i = 1; i <= maxImages; i++) {
    galleryImages.push(`img/gallery/${genderType}/${i}.jpg`);
  }
  
  renderGallery();
}

function renderGallery() {
  const slider = document.getElementById('gallery-slider');
  slider.innerHTML = '';
  
  if (galleryImages.length === 0) {
    slider.innerHTML = '<div class="loading"><p>No images available</p></div>';
    return;
  }
  
  galleryImages.forEach((src, index) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';
    slide.innerHTML = `<img src="${src}" alt="Gallery image ${index + 1}" loading="lazy">`;
    slider.appendChild(slide);
  });
  
  updateGalleryPosition();
}

function initGalleryControls() {
  const genderToggle = document.getElementById('gender-toggle');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  
  genderToggle.addEventListener('change', function() {
    currentGalleryIndex = 0;
    loadGallery();
  });
  
  prevBtn.addEventListener('click', function() {
    currentGalleryIndex = currentGalleryIndex > 0 ? currentGalleryIndex - 1 : galleryImages.length - 1;
    updateGalleryPosition();
  });
  
  nextBtn.addEventListener('click', function() {
    currentGalleryIndex = currentGalleryIndex < galleryImages.length - 1 ? currentGalleryIndex + 1 : 0;
    updateGalleryPosition();
  });
  
  // Auto-advance gallery
  setInterval(() => {
    if (galleryImages.length > 1) {
      currentGalleryIndex = currentGalleryIndex < galleryImages.length - 1 ? currentGalleryIndex + 1 : 0;
      updateGalleryPosition();
    }
  }, 5000);
}

function updateGalleryPosition() {
  const slider = document.getElementById('gallery-slider');
  const translateX = -currentGalleryIndex * 100;
  slider.style.transform = `translateX(${translateX}%)`;
}

// Back to top functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Intersection Observer for animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(el => observer.observe(el));
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
  });
}