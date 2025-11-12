// ===== script.js (to‘g‘rilangan) =====
document.addEventListener("DOMContentLoaded", () => {
    // ELEMENTLAR
    const searchBtn = document.getElementById("searchBtn");
    const heroSection = document.getElementById("heroSection");
    const trendingSection = document.getElementById("trendingSection");
    const coursesSection = document.getElementById("coursesSection");
    const upcomingSection = document.getElementById("upcomingSection");
    const getSection = document.getElementById("getSection");
    const courseTop = document.getElementById("courseTop");
    const filterSidebar = document.getElementById("filter-sidebar");
    const rightCard = document.getElementById("rightCard");

    // Boshlang‘ich holat (filter yashirin)
    if (filterSidebar) filterSidebar.style.display = "none";
    if (rightCard) rightCard.className = "col-lg-12";

    // === QIDIRUV BOSILGANDA ===
    if (searchBtn) {
        searchBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Yashirish
            if (heroSection) heroSection.style.display = "none";
            if (trendingSection) trendingSection.style.display = "none";
            if (upcomingSection) upcomingSection.style.display = "none";
            if (getSection) getSection.style.display = "none";
            if (courseTop) courseTop.style.display = "none";

            // Ko‘rsatish
            if (coursesSection) coursesSection.style.display = "block";
            if (filterSidebar) filterSidebar.style.display = "block";
            if (rightCard) rightCard.className = "col-lg-9";

            // Footer pastda tursin
            const footer = document.querySelector("footer");
            if (footer) {
                footer.style.position = "relative";
                footer.style.bottom = "0";
            }
        });
    }

    // === NAVBAR LOGIN LOGIC ===

    const authSection = document.getElementById('authSection');
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    function updateNavbar() {
        if (!authSection) return;
        if (isLoggedIn) {
            authSection.innerHTML = `
            <a href="#" class="text-dark text-decoration-none d-none d-md-block">Become Instructor</a>
            <a href="#" class="position-relative text-dark">
              <i class="bi bi-cart fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
            </a>
            <a href="#" class="position-relative text-dark">
              <i class="bi bi-bell fs-5"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">5</span>
            </a>
            <div class="dropdown">
              <a class="dropdown-toggle d-flex align-items-center text-decoration-none" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle fs-3" ></i>
                </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li class="px-3 pb-2 border-bottom">
                  <strong>Jonathan Doe</strong><br>
                  <small class="text-muted">doe@email.com</small>
                </li>
                <li><a class="dropdown-item" href="#">My Courses</a></li>
                <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
              </ul>
            </div>
          `;
            document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('isLoggedIn', 'false');
                isLoggedIn = false;
                updateNavbar();
            });
        } else {
            authSection.innerHTML = `
            <i class="bi bi-cart fs-4"></i>
            <button class="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
            <button class="btn btn-success">Sign Up</button>
          `;
        }
    }

    // === LOGIN FORM VALIDATSIYA ===
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    if (loginForm && emailInput && emailError) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailValue = emailInput.value.trim();
            const passwordValue = document.getElementById("password").value.trim();
            let valid = true;

            if (emailValue === "") {
                emailError.textContent = "Email bo'sh bo'lishi mumkin emas";
                valid = false;
            } else if (!validateEmail(emailValue)) {
                emailError.textContent = "Iltimos, to'g'ri email kiriting";
                valid = false;
            } else {
                emailError.textContent = "";
            }

            if (passwordValue === "") {
                alert("Parol bo'sh bo'lishi mumkin emas");
                valid = false;
            }

            if (valid) {
                alert("Login muvaffaqiyatli!");
                localStorage.setItem('isLoggedIn', 'true'); // Haqiqiy login
                isLoggedIn = true;
                updateNavbar(); // Navbar yangilansin
                loginForm.reset();
                const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
                if (loginModal) loginModal.hide();
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Modal yopilganda tozalash
    const loginModalEl = document.getElementById("loginModal");
    if (loginModalEl) {
        loginModalEl.addEventListener("hidden.bs.modal", () => {
            if (loginForm) loginForm.reset();
            if (emailError) emailError.textContent = "";
        });
    }
    updateNavbar()
});


const coursesContainer = document.getElementById('coursesContainer');
const searchInput = document.querySelector('.search-bar input');
const clearFiltersBtn = document.getElementById('clearFilters');

const ratingRadios = document.querySelectorAll('input[name="rating"]');
const categoryCheckboxes = document.querySelectorAll('input[id^="cat"]');

// Faqat Design va Programming
const courseData = [
    {
        title: "Adobe Illustrator Scratch Course",
        instructor: "Kitani Studio",
        rating: 4.5,
        reviews: 1240,
        price: 24.92,
        originalPrice: 32.90,
        category: "design",
        bestseller: true,
        discount: true,
        image: "./assets/card1.png"
    },
    {
        title: "Figma UI/UX Design Advanced",
        instructor: "Design Pro",
        rating: 4.8,
        reviews: 890,
        price: 29.99,
        originalPrice: 49.99,
        category: "design",
        bestseller: false,
        discount: true,
        image: "./assets/card2.png"
    },
    {
        title: "JavaScript Mastery Course",
        instructor: "CodeMaster",
        rating: 4.9,
        reviews: 3200,
        price: 39.99,
        originalPrice: 79.99,
        category: "programming",
        bestseller: true,
        discount: false,
        image: "./assets/card3.png"
    },
    {
        title: "Python for Beginners",
        instructor: "Tech Academy",
        rating: 4.3,
        reviews: 560,
        price: 19.99,
        originalPrice: 39.99,
        category: "programming",
        bestseller: false,
        discount: true,
        image: "./assets/card4.png"
    },
    {
        title: "Digital Marketing 101",
        instructor: "Marketing Guru",
        rating: 4.6,
        reviews: 2100,
        price: 34.99,
        originalPrice: 69.99,
        category: "programming", // ← Programmingga o‘zgartirdim (faqat 2 ta bo‘lsin)
        bestseller: true,
        discount: true,
        image: "./assets/card5.png"
    },
    {
        title: "Business Strategy Masterclass",
        instructor: "Biz Pro",
        rating: 4.7,
        reviews: 1800,
        price: 49.99,
        originalPrice: 99.99,
        category: "design", // ← Designga o‘zgartirdim
        bestseller: false,
        discount: true,
        image: "./assets/card6.png"
    },
    {
        title: "Photography Masterclass",
        instructor: "Photo Pro",
        rating: 4.7,
        reviews: 1500,
        price: 44.99,
        originalPrice: 89.99,
        category: "design", // ← Designga o‘zgartirdim
        bestseller: false,
        discount: false,
        image: "./assets/card7.png"
    }
];

// Karta yaratish
function createCourseCard(course) {
    const fullStars = Math.floor(course.rating);
    const halfStar = course.rating % 1 >= 0.5 ? 'half-star' : '';
    const ratingStars = '★'.repeat(fullStars) + (halfStar ? 'half-star' : '');

    const badgeHTML = `
        ${course.bestseller ? '<span class="badge best-seller-badge">Best Seller</span>' : ''}
        ${course.discount ? '<span class="badge discount-badge">20% OFF</span>' : ''}
    `;

    return `
        <div class="col-md-3 course-item">
            <div class="card course-card shadow-sm position-relative overflow-hidden">
                <div class="badge-wrapper position-absolute top-0 start-0 m-2 d-flex gap-1">
                    ${badgeHTML}
                </div>
                <img src="${course.image}" class="card-img-top" alt="${course.title}"
                     onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="card-body">
                    <h6 class="mt-2 fw-bold">${course.title}</h6>
                    <p class="small mb-1 text-success d-flex align-items-center gap-1">
                        <i class="bi bi-person-fill fs-5 text-muted"></i> ${course.instructor}
                    </p>
                    <p class="text-muted small">
                        <span class="text-warning">${ratingStars}</span> (${course.reviews.toLocaleString()})
                    </p>
                    <p class="fw-bold">$${course.price} 
                        <span class="text-decoration-line-through text-muted">$${course.originalPrice}</span>
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderCourses(courses) {
    coursesContainer.innerHTML = courses.map(createCourseCard).join('');
}

// Filtrlash — faqat Design va Programming
function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    const minRating = selectedRating ? parseFloat(selectedRating.value) : 0;

    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => {
            if (cb.id === 'catDesign') return 'design';
            if (cb.id === 'catProgramming') return 'programming';
            return null;
        }).filter(Boolean);

    const filtered = courseData.filter(course => {
        const matchesSearch = !searchTerm ||
            course.title.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm);

        const matchesRating = minRating === 0 || course.rating >= minRating;

        const matchesCategory = selectedCategories.length === 0 ||
            selectedCategories.includes(course.category);

        return matchesSearch && matchesRating && matchesCategory;
    });

    renderCourses(filtered);
}

// Event listenerlar
searchInput.addEventListener('input', filterCourses);
ratingRadios.forEach(r => r.addEventListener('change', filterCourses));
categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterCourses));

// Clear Filters — hech qaysi checked emas
clearFiltersBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.value = '';
    document.querySelectorAll('input[name="rating"]:checked, input[id^="cat"]:checked')
        .forEach(i => i.checked = false);
    filterCourses(); // Barcha 7 ta karta
});

// Dastlabki yuklash
renderCourses(courseData);
filterCourses(); // Hech qanday filter yo‘q → 7 ta karta