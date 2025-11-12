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