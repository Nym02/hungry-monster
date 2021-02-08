const popup = isPopup => {
    let popup = document.querySelector('.section-popup');
    if(isPopup == true){
        // popup.style.transform = 'translateX(0rem)';
        popup.style.opacity = '1';
        document.querySelector('.recipe-section').style.zIndex = '-1';
        popup.style.zIndex = '100';
    } else if(isPopup == false){
        // popup.style.transform = 'translateX(-193rem)';
        popup.style.opacity = '0';
        document.querySelector('.recipe-section').style.zIndex = '100';
        popup.style.zIndex = '-1';
    }
}

const form = document.querySelector('.form');
const formInput = document.querySelector('#form-input');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let inputValue = formInput.value;

    fetchApi(inputValue);

    // console.log(inputValue);
});

const fetchApi = query => {

    if(query == ''){
            document.querySelector('#content-row').innerHTML = `<span class='alert alert-danger error-msg'>Please enter a food name.</span>`;
        
    } else {
        let url = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

        url
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            displayMeal(data.meals);
        });
    }
   

    // console.log(url);
}


const displayMeal = data => {
    
    let temp = '';
    if(data != null){
       
        data.map(r => {
            temp += `
            <div class="col-md-3 my-4">
            <div class="meal">
              <a href="javascript:void(0)" class="meal-details">
                <img
                  id="meal"
                  onclick="twoFun(true, ${r.idMeal})"
                  src="${r.strMealThumb}"
                  alt=""
                  class="img-fluid meal-img"
                />
              </a>
    
              <div class="meal-info">
                <a href="javascript:void(0)" class="meal-details">
                  <h3 class="meal-name" onclick="twoFun(true, ${r.idMeal})">${r.strMeal}</h3>
                </a>
              </div>
            </div>
          </div>
            
            
            `
        });
    } else if(data == null) {
        // console.log(data);
        temp = `<span class='alert alert-danger error-msg'>No recipes available.</span>`;
    }
    

    document.querySelector('#content-row').innerHTML = temp;
}

const twoFun = (isPopup, id) => {
    popup(isPopup);
    displayRecipe(id);
}
const displayRecipe = mealID => {
    fetchMealInfo(mealID);
}

const fetchMealInfo = meal=> {
    let mealUrl = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);

    mealUrl
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        showRecipe(data.meals);
    })
}

const showRecipe = recipe => {
    let popupTemp = '';
    let arr = [];
    let a = [];

    

    recipe.map(res => {
        a = arr.push(res);
        popupTemp += 
        `
        <div class="col-md-5 offset-md-3">
              <div class="recipe-details">
                <img
                  src="${res.strMealThumb}"
                  alt=""
                  class="img-fluid recipe-img"
                />

                <div class="recipe-info">
                  <h3 class="recipe-header">${res.strMeal}</h3>
                  <h4 class="recipe-secondary-header">Ingredients</h4>

                  <ul class="recipe-list">
                  
                        
                       
                        
                  </ul>
                </div>
              </div>
            </div>
        `;
     

        document.getElementById('pop-row').innerHTML = popupTemp;
        
    });
    
    displayIng(arr);

}

const displayIng = array => {
    console.log(array[0]);
    let obj = array[0];
    let itemIngredients = '';

    for(let i=1; i<=10; i++){
        let e = obj[`strIngredient${i}`];

        if(e != null && e != ""){
            itemIngredients += `
            <li class="recipe-item">
                        <input
                            type="checkbox"
                            checked
                            class="recipe-ingredients" />
                            <label for="" class="recipe-ingredients-text"
                            >${e}</label>
            </li>
            `;
            console.log(`str${i} => `, e);
        } else {
            console.log('empty');
            itemIngredients += `
            `
        }

        document.querySelector('.recipe-list').innerHTML = itemIngredients;
    }

}









