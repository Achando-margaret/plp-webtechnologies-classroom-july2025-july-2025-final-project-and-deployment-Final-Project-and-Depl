// js/recipe-detail.js
document.addEventListener('DOMContentLoaded', function() {
    // Load recipe details (this is already in main.js)
    // This file is for additional functionality on the recipe detail page
    
    const recipeDetail = document.getElementById('recipe-detail');
    const relatedRecipes = document.getElementById('related-recipes');
    
    // If we're on the recipe detail page
    if (recipeDetail && relatedRecipes) {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = parseInt(urlParams.get('id'));
        
        // Load related recipes (excluding the current one)
        loadRelatedRecipes(recipeId);
        
        // Add print functionality
        addPrintButton();
    }
    
    function loadRelatedRecipes(currentRecipeId) {
        // Filter out the current recipe and get 3 random recipes
        const related = recipes
            .filter(recipe => recipe.id !== currentRecipeId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        
        if (related.length > 0) {
            related.forEach(recipe => {
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
                relatedRecipes.appendChild(recipeCard);
            });
        } else {
            relatedRecipes.innerHTML = '<p>No related recipes found.</p>';
        }
    }
    
    function addPrintButton() {
        const recipeHeroContent = document.querySelector('.recipe-hero-content');
        if (recipeHeroContent) {
            const printBtn = document.createElement('button');
            printBtn.className = 'recipe-btn';
            printBtn.textContent = 'Print Recipe';
            printBtn.addEventListener('click', function() {
                window.print();
            });
            recipeHeroContent.appendChild(printBtn);
        }
    }
});