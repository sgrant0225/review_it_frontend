
const starWrapper = document.querySelector(".stars-container")
const stars = document.querySelectorAll(".stars-container a");
// const data = {
//   starRating: 0,
//   ratings: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
// };

    stars.forEach((star, clickedIndex) => {
        star.addEventListener("click", () => {
            starWrapper.classList.add("disabled");

            stars.forEach((otherStar, otherIndex) => {
              if (otherIndex <= clickedIndex) {
                  otherStar.classList.add("active");
              }
            }); 
            console.log(`star of index ${clickedIndex + 1} was clicked`)

            //post to backend the star rating 
            
        })
     });




