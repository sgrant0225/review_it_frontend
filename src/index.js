


    
document.addEventListener("DOMContentLoaded", () => {
   console.log("Document loaded")
   getReviews();
   
   const getReviewForm = document.getElementById('create-review-form')
   getReviewForm.addEventListener("submit", (e) => 
   formEventHandler(e))

   const sortReviewButton = document.querySelector("#sort-btn")
   sortReviewButton.addEventListener("click", (e) => {
     sortReviews()
   })
   
})

function getReviews(){
  fetch("http://localhost:3000/api/v1/reviews")
    .then(response => response.json())
    .then(info => { 
      info.data.forEach(review => { 
        let newReview = new Review(review, review.attributes)
        document.getElementById("root").innerHTML += newReview.renderReviewCard();
       })

       const deleteEvent = document.querySelectorAll(".delete-button")
        .forEach((button) => button.addEventListener("click", deleteReview))
    })
  }

  

//this function is created to handle the events of the form 
//grabbing all the values for my form input
function formEventHandler(e){
    e.preventDefault();
    const firstNameInput = document.querySelector("#input-first-name").value
    const lastNameInput = document.querySelector('#input-last-name').value
    const productNameInput = document.querySelector('#input-name').value
    const imageInput = document.querySelector('#input-image').value
    const locationInput = document.querySelector('#input-location').value
    const feedbackInput = document.querySelector('#input-feedback').value
    const starRatingInput = document.querySelector('#star-rating').value
    //const starRating = document.querySelectorAll('.stars-container')
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetchReviews(firstNameInput, lastNameInput, productNameInput, imageInput, locationInput, feedbackInput, starRatingInput, categoryId)
    //getStarRatings();
    e.target.reset();
}


function postFetchReviews(first_name, last_name, product_name, image_url, location, feedback, stars, category_id){
    let formData = {first_name, last_name, product_name, image_url, location, feedback, stars, category_id}
    fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
          body: JSON.stringify({review: formData})
          })
            .then(response => response.json())
            .then(review => {
              const reviewData = review.data
              let newReview = new Review(reviewData, reviewData.attributes)
              document.getElementById("root").innerHTML += newReview.renderReviewCard();
              
              const deleteEvent = document.querySelectorAll(".delete-button")
              .forEach((button) => button.addEventListener("click", deleteReview))
          })

  }

  function deleteReview(e) {
     const id = e.target.dataset.id //targeting the delete button that has the id
    fetch(`http://localhost:3000/api/v1/reviews/${id}`, {
      method: "DELETE", 
     })
     .then(response => response.json())
     .then(deleteData => {
      Review.all = Review.all.filter(review => review.id != deleteData.id)
            
      document.getElementById('root').innerHTML = "";  //rewriting the HTML 
        Review.all.forEach(filteredReview => {
          document.getElementById('root').innerHTML += filteredReview.renderReviewCard();

          const deleteEvent = document.querySelectorAll(".delete-button")
         .forEach((button) => button.addEventListener("click", deleteReview))
        })
     })
  }

  function sortReviews() {
    Review.all = Review.all.sort((a, b) => {
      let nameA = a.product_name.toLowerCase();
      let nameB = b.product_name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB){
          return 1;
        }
        return 0;
   })
   document.getElementById('root').innerHTML = "";
    Review.all.forEach((r) => {
      document.getElementById('root').innerHTML += r.renderReviewCard();
    })
  }
    
    
   
        
        
        
        
      
      




//I want to run this function after the post request and convert the stars user inputs to stars
   function getStarRatings(){
    const starRating = document.querySelector('#star-rating').value
    //debugger
    const starsTotal = 5;
     //now that you have the starRating input value, I now can fill the stars with that rating
     const starPercentage = (starRating / starsTotal) * 100; 
       console.log(starPercentage)
     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
       console.log(starPercentageRounded)

       //set width of star-inner to percentage(how many starr will get filled)
       document.querySelector('.stars-inner').style.width = starPercentageRounded;       //document.querySelector('root').innerHTML += starPercentageRounded
     
   }
