(function() {
    // typing effect
    const words = ["Web Developer", "Photographer", "Web Designer", "Graphics Designer", "Problem Solver"];
    let i = 0;
    let j = 0;
    let isDeleting = false;
    let currentText = "";
    const typing = document.getElementById("typing");
    
    function typeEffect() {
        if (typing) {
            if (isDeleting) {
                currentText = words[i].substring(0, currentText.length - 1);
            } else {
                currentText = words[i].substring(0, currentText.length + 1);
            }
            
            typing.textContent = currentText;
            
            if (!isDeleting && currentText === words[i]) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            } else if (isDeleting && currentText === "") {
                isDeleting = false;
                i = (i + 1) % words.length;
                setTimeout(typeEffect, 500);
                return;
            }
            
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    typeEffect();

    // mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('navbar');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 995) {
                    nav.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target) && window.innerWidth <= 995) {
                nav.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // active nav highlight on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    
    function setActiveLink() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }
    
    window.addEventListener("scroll", setActiveLink);
    window.addEventListener("load", setActiveLink);

    // smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            if (!targetId) return;
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
                // close mobile menu if open
                if (window.innerWidth <= 995 && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // contact form demo
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent! Thank you for contacting me.');
            form.reset();
        });
    }
})();