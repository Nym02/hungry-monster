
// document.getElementById('meal').addEventListener('click', ()=>{
   
//     popup.style.transform = 'translateX(0rem)';
//     popup.style.opacity = '1';
// });

// document.getElementById('close-btn').addEventListener('click', (e)=>{
//     popup.style.transform = 'translateX(-193rem)';
//     popup.style.opacity = '0';
// });

function popup(isPopup) {
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

    console.log(inputValue);
});

function fetchApi(query) {

    if(query == ''){
        // setTimeout(()=>{
            document.querySelector('#content-row').innerHTML = `<span class='alert alert-danger error-msg'>Please enter a food name.</span>`
        // },5000);
        
    } else {
        let url = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

        url
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayMeal(data.meals);
        });
    }
   

    // console.log(url);
}


function displayMeal(data) {
    let temp = '';
    data.map(r => {
        temp += `
        <div class="col-md-3 my-2">
        <div class="meal">
          <a href="javascript:void(0)" class="meal-details">
            <img
              id="meal"
              onclick="popup(true)"
              src="${r.strMealThumb}"
              alt=""
              class="img-fluid meal-img"
            />
          </a>

          <div class="meal-info">
            <a href="" class="meal-details">
              <h3 class="meal-name">${r.strMeal}</h3>
            </a>
          </div>
        </div>
      </div>
        
        
        `
    });

    document.querySelector('#content-row').innerHTML = temp;
}