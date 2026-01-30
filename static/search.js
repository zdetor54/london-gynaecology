// Site search index - add all your pages here
const searchIndex = [
    // One Stop Clinics
    {
        title: "Bleeding After Intercourse",
        url: "/html/one_stop_clinics/bleeding-after-intercourse.html",
        keywords: ["bleeding", "intercourse", "post coital", "sex", "blood", "clinic"]
    },
    {
        title: "Intermenstrual Bleeding",
        url: "/html/one_stop_clinics/intermenstrual-bleeding.html",
        keywords: ["bleeding", "periods", "irregular", "spotting", "between periods", "clinic"]
    },
    {
        title: "Post Menopausal Bleeding",
        url: "/html/one_stop_clinics/post-menopausal-bleeding.html",
        keywords: ["bleeding", "menopause", "postmenopausal", "after menopause", "clinic"]
    },
    {
        title: "Colposcopy",
        url: "/html/one_stop_clinics/colposcopy.html",
        keywords: ["colposcopy", "cervical", "screening", "smear", "abnormal", "clinic"]
    },
    // Index subpages
    {
        title: "Cancer Services",
        url: "/html/index_subpages/cancer-services.html",
        keywords: ["cancer", "oncology", "treatment", "cervical", "ovarian", "uterine", "endometrial"]
    },
    {
        title: "Contraception",
        url: "/html/index_subpages/contraception.html",
        keywords: ["contraception", "birth control", "coil", "IUD", "pill", "implant"]
    },
    {
        title: "Heavy Periods",
        url: "/html/index_subpages/heavy-periods.html",
        keywords: ["heavy periods", "menorrhagia", "bleeding", "periods", "heavy flow"]
    },
    {
        title: "Hysterectomy",
        url: "/html/index_subpages/hysterectomy.html",
        keywords: ["hysterectomy", "surgery", "uterus", "removal", "operation"]
    },
    {
        title: "Menopause Care",
        url: "/html/index_subpages/menopause-care.html",
        keywords: ["menopause", "HRT", "hormone", "hot flashes", "symptoms"]
    },
    {
        title: "Menstrual Disorders",
        url: "/html/index_subpages/menstrual-disorders.html",
        keywords: ["menstrual", "periods", "disorder", "irregular", "PCOS", "endometriosis"]
    },
    {
        title: "One Stop Clinic",
        url: "/html/index_subpages/one-stop-clinic.html",
        keywords: ["one stop", "clinic", "appointment", "diagnosis", "treatment"]
    },
    {
        title: "Ovarian Cysts",
        url: "/html/index_subpages/ovarian-cysts.html",
        keywords: ["ovarian", "cyst", "ovary", "PCOS", "polycystic"]
    },
    // Main pages
    {
        title: "About Me",
        url: "/html/about-me.html",
        keywords: ["about", "consultant", "biography", "experience", "qualifications"]
    },
    {
        title: "Contact Us",
        url: "/html/contact-us.html",
        keywords: ["contact", "appointment", "booking", "phone", "email", "address"]
    },
    {
        title: "Fees",
        url: "/html/fees.html",
        keywords: ["fees", "prices", "cost", "payment", "insurance"]
    },
    {
        title: "Patient Information Leaflets",
        url: "/html/patient-information-leaflets.html",
        keywords: ["information", "leaflet", "guide", "patient", "resources"]
    },
    {
        title: "Why Go Private?",
        url: "/html/why-go-private.html",
        keywords: ["private", "NHS", "benefits", "care", "treatment"]
    },
    {
        title: "Second Opinions",
        url: "/html/second-opinions.html",
        keywords: ["second opinion", "consultation", "advice", "diagnosis"]
    },
    {
        title: "Home",
        url: "/",
        keywords: ["home", "gynaecology", "consultant", "london", "farshad tahmasebi"]
    }
];

// Initialize search functionality
function initializeSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchClose');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('siteSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Toggle search container
    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchContainer.classList.add('active');
            searchInput.focus();
        });
    }
    
    // Close search container
    if (searchClose) {
        searchClose.addEventListener('click', function(e) {
            e.stopPropagation();
            searchContainer.classList.remove('active');
            searchResults.style.display = 'none';
            searchInput.value = '';
        });
    }
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (searchContainer && !searchContainer.contains(e.target) && !searchToggle?.contains(e.target)) {
            searchContainer.classList.remove('active');
            searchResults.style.display = 'none';
        }
    });
    
    // Search function
    function performSearch(query) {
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        const normalizedQuery = query.toLowerCase().trim();
        const results = [];
        
        // Search through the index
        searchIndex.forEach(item => {
            let score = 0;
            
            // Check title match (highest priority)
            if (item.title.toLowerCase().includes(normalizedQuery)) {
                score += 10;
            }
            
            // Check keyword matches
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(normalizedQuery)) {
                    score += 5;
                }
            });
            
            // Check for exact word matches
            const queryWords = normalizedQuery.split(' ');
            queryWords.forEach(word => {
                if (word.length >= 2) {
                    if (item.title.toLowerCase().includes(word)) {
                        score += 3;
                    }
                    item.keywords.forEach(keyword => {
                        if (keyword.toLowerCase() === word) {
                            score += 7;
                        }
                    });
                }
            });
            
            if (score > 0) {
                results.push({ ...item, score });
            }
        });
        
        // Sort by score (highest first)
        results.sort((a, b) => b.score - a.score);
        
        // Display results
        if (results.length > 0) {
            const maxResults = 6;
            const topResults = results.slice(0, maxResults);
            
            searchResults.innerHTML = topResults.map(item => 
                `<a href="${item.url}" class="search-result-item">${item.title}</a>`
            ).join('');
            
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item no-results">No results found</div>';
            searchResults.style.display = 'block';
        }
    }
    
    // Handle input
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300); // Debounce for 300ms
    });
    
    // Handle focus
    searchInput.addEventListener('focus', function() {
        if (this.value.length >= 2) {
            performSearch(this.value);
        }
    });
    
    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        const items = searchResults.querySelectorAll('.search-result-item');
        if (items.length === 0) return;
        
        const currentFocus = Array.from(items).indexOf(document.activeElement);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = currentFocus < items.length - 1 ? currentFocus + 1 : 0;
            items[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentFocus > 0 ? currentFocus - 1 : items.length - 1;
            items[prevIndex].focus();
        } else if (e.key === 'Escape') {
            searchResults.style.display = 'none';
            searchInput.blur();
        }
    });
}

// Try to initialize immediately
initializeSearch();

// Also try after DOM loads
document.addEventListener('DOMContentLoaded', initializeSearch);

// For dynamically loaded navs - expose globally so pages can call it
window.initializeSearch = initializeSearch;
