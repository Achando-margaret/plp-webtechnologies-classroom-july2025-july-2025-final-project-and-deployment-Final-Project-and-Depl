// js/browse.js
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter recipes
            filterRecipes();
        });
    });
    
    // Add event listener to search button
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            filterRecipes();
        });
    }
    
    // Add event listener for Enter key in search input
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterRecipes();
            }
        });
    }
    
    function filterRecipes() {
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        const recipesContainer = document.getElementById('all-recipes');
        recipesContainer.innerHTML = '';
        
        let filteredRecipes = recipes;
        
        // Filter by category
        if (activeCategory !== 'all') {
            filteredRecipes = filteredRecipes.filter(recipe => {
                // Check if recipe has categories array
                if (!recipe.categories) return false;
                
                if (activeCategory === 'vegetarian') {
                    return recipe.categories.includes('vegetarian');
                } else if (activeCategory === 'meat') {
                    // Only show meat recipes that are NOT desserts
                    return recipe.categories.includes('meat') && 
                           !recipe.categories.includes('dessert');
                } else if (activeCategory === 'dessert') {
                    return recipe.categories.includes('dessert');
                } else if (activeCategory === 'easy') {
                    return recipe.categories.includes('easy');
                }
                return false;
            });
        }
        
        // Filter by search term
        if (searchTerm) {
            filteredRecipes = filteredRecipes.filter(recipe => {
                return recipe.title.toLowerCase().includes(searchTerm) || 
                       recipe.description.toLowerCase().includes(searchTerm) ||
                       (recipe.ingredients && recipe.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchTerm)));
            });
        }
        
        // Display filtered recipes
        if (filteredRecipes.length === 0) {
            recipesContainer.innerHTML = '<p class="no-results">No recipes found. Try a different search or filter.</p>';
        } else {
            filteredRecipes.forEach(recipe => {
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
    
    // Initial load of all recipes
    if (document.getElementById('all-recipes')) {
        filterRecipes();
    }
});