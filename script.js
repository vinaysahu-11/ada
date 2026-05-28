document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.add('hidden');
        }
    });

    // Fetch and display Google Reviews
    async function fetchReviews() {
        const reviewsContainer = document.getElementById('reviews-container');
        try {
            const response = await fetch('/api/reviews');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data.reviews && data.reviews.length > 0) {
                reviewsContainer.innerHTML = ''; // Clear loading text
                data.reviews.slice(0, 3).forEach(review => {
                    const reviewCard = `
                        <div class="bg-white border border-gray-200/80 p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <div class="flex items-center mb-4">
                                <img src="${review.profile_photo_url}" alt="${review.author_name}" class="w-12 h-12 rounded-full mr-4">
                                <div>
                                    <p class="font-bold text-gray-800">${review.author_name}</p>
                                    <p class="text-sm text-gray-500">${review.relative_time_description}</p>
                                </div>
                            </div>
                            <div class="flex items-center mb-4 text-yellow-400">
                                ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                                ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                                <span class="ml-2 font-bold text-gray-700">${review.rating}/5</span>
                            </div>
                            <p class="text-gray-600">${review.text}</p>
                        </div>
                    `;
                    reviewsContainer.innerHTML += reviewCard;
                });
            } else {
                reviewsContainer.innerHTML = '<p class="text-center col-span-full">Could not load reviews at this time.</p>';
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            reviewsContainer.innerHTML = '<p class="text-center col-span-full">Could not load reviews at this time.</p>';
        }
    }

    fetchReviews();

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
});