const search_btn = document.getElementById("search-btn")
const search_bar = document.getElementById("search-bar")
const rContainer = document.querySelector('.recipe-container')

// fetching API
let fetchRecipe = async (search_input) => {
    document.querySelector(".recipes").innerHTML = 'Loading.......'
    let data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=2de8c8799f6f4e5980e57debe89da659&query=${search_input}`);
    let response = await data.json();
    let result = response.results;
    document.querySelector(".recipes").innerHTML = "";
    if (result == 0) {
        document.querySelector(".recipes").innerHTML = 'Recipe Not Found'
    }
    else {
        result.forEach(item => {
            let recipe_card = document.createElement("div");
            recipe_card.classList.add("card");
            recipe_card.innerHTML = `
        <img src=${item.image} >
        <h6>${item.title}</h6> `
            const r_btn = document.createElement('button')
            r_btn.textContent = 'View Recipe'
            recipe_card.appendChild(r_btn)
            document.querySelector(".recipes").appendChild(recipe_card)

            // fetch details
            let fetchDetails = async () => {
                let detail = await fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=2de8c8799f6f4e5980e57debe89da659&includeNutrition=false`)
                let responseDetail = await detail.json()
                resultDetail = responseDetail.summary
                const recipe_detail = document.querySelector(".recipe-details")
                recipe_detail.innerHTML = `
                <button id = "close"><i class="fa-regular fa-circle-xmark fa-2xl"></i></button>
                <h6>Recipe:</h6>
                <p class ='recipe'>${resultDetail}</p> `
                let cBtn = document.getElementById('close')
                cBtn.addEventListener('click', () => {
                    recipe_detail.style.display = 'none'
                    recipe_detail.innerHTML = ""
                    document.querySelector('.recipes').style.opacity = '1'
                })
            }
            r_btn.addEventListener('click', (e) => {
                fetchDetails()
                document.querySelector('.recipe-details').style.display = "flex"
                document.querySelector('.recipes').style.opacity = '0.5'
            })
        })
    }
}

//  seacrh
search_btn.addEventListener('click', (e) => {
    if (search_bar.value === "") {
        rContainer.style.display = 'flex'
        document.querySelector(".recipes").innerHTML = 'Type a dish to find a recipe'
    }
    else {
        e.preventDefault();
        const search_input = search_bar.value
        rContainer.style.display = 'flex'
        search_input.trim()
        fetchRecipe(search_input)
    }
});

// On Enter
search_bar.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        if (search_bar.value === "") {
            rContainer.style.display = 'flex'
            document.querySelector(".recipes").innerHTML = 'Type a dish to find a recipe'
        }
        else {
            e.preventDefault();
            const search_input = search_bar.value
            rContainer.style.display = 'flex'
            search_input.trim()
            fetchRecipe(search_input)
            search_btn.style.animation = 'forwards'
        }
    }
    else if (e.key == 'Backspace') {
        rContainer.style.display = 'none'
    }
});