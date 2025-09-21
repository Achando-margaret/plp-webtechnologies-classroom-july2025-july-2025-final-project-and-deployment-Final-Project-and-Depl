// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.documentElement.setAttribute('data-theme', 
                document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            );
            themeToggle.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? 'Light Mode' : 'Dark Mode';
        });
    }
    
    // Load featured recipes on homepage
    const featuredRecipesContainer = document.getElementById('featured-recipes');
    if (featuredRecipesContainer) {
        loadFeaturedRecipes();
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our weekly recipes.`);
            this.reset();
        });
    }
    
    function loadFeaturedRecipes() {
        // Display first 3 recipes as featured
        const featuredRecipes = recipes.slice(0, 3);
        
        featuredRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-meta">
                        <span>${recipe.cookTime}</span>
                        <span>${recipe.servings} servings</span>
                        <span>${recipe.difficulty}</span>
                    </div>
                    <p class="recipe-description">${recipe.description}</p>
                    <a href="recipe-detail.html?id=${recipe.id}" class="recipe-btn">View Recipe</a>
                </div>
            `;
            featuredRecipesContainer.appendChild(recipeCard);
        });
    }
    
    // Load specific recipe on detail page
    if (window.location.pathname.includes('recipe-detail.html')) {
        loadRecipeDetail();
    }
    
    // Load all recipes on browse page
    if (window.location.pathname.includes('browse.html')) {
        loadAllRecipes();
    }
    
    function loadRecipeDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = parseInt(urlParams.get('id'));
        const recipe = recipes.find(r => r.id === recipeId);
        
        if (!recipe) {
            document.querySelector('main').innerHTML = `
                <div class="container">
                    <h2>Recipe not found</h2>
                    <p>Sorry, the recipe you're looking for doesn't exist.</p>
                    <a href="browse.html" class="recipe-btn">Browse all recipes</a>
                </div>
            `;
            return;
        }
        
        document.title = `${recipe.title} - TastyGenerators`;
        
        const recipeDetail = document.getElementById('recipe-detail');
        if (recipeDetail) {
            recipeDetail.innerHTML = `
                <div class="recipe-hero">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="recipe-hero-content">
                        <h1>${recipe.title}</h1>
                        <div class="recipe-meta-large">
                            <div class="meta-item">
                                <span class="meta-label">Prep Time</span>
                                <span class="meta-value">${recipe.cookTime}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Servings</span>
                                <span class="meta-value">${recipe.servings}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Difficulty</span>
                                <span class="meta-value">${recipe.difficulty}</span>
                            </div>
                        </div>
                        <p class="recipe-description-large">${recipe.description}</p>
                    </div>
                </div>
                <div class="recipe-details">
                    <div class="ingredients">
                        <h2>Ingredients</h2>
                        <ul>
                            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="instructions">
                        <h2>Instructions</h2>
                        <ol>
                            ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            `;
        }
    }
    
    function loadAllRecipes() {
        const recipesContainer = document.getElementById('all-recipes');
        if (recipesContainer) {
            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
                    <div class="recipe-content">
                        <h3 class="recipe-title">${recipe.title}</h3>
                        <div class="recipe-meta">
                            <span>${recipe.cookTime}</span>
                            <span>${recipe.servings} servings</span>
                            <span>${recipe.difficulty}</span>
                        </div>
                        <p class="recipe-description">${recipe.description}</p>
                        <a href="recipe-detail.html?id=${recipe.id}" class="recipe-btn">View Recipe</a>
                    </div>
                `;
                recipesContainer.appendChild(recipeCard);
            });
        }
    }
});