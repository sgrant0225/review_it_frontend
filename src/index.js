const getReviewForm = document.getElementById('create-review-form')


    
document.addEventListener("DOMContentLoaded", () => {
   console.log("Document loaded")
   getReviews();
   getReviewForm.addEventListener("submit", (e) => 
   formEventHandler(e))
   
  
})

function getReviews(){
  fetch("http://localhost:3000/api/v1/reviews")
    .then(response => response.json())
    .then(info => { 
      
       info.data.forEach(review => {
        //debugger  
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
    getStarRatings();
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
    })
  }

  function deleteReview(e) {
     const id = e.target.dataset.id //target the delete button id
    fetch(`http://localhost:3000/api/v1/reviews/${id}`, {
      method: "DELETE", 
     })
     .then(response => response.json())
     .then(deleteData => {
      Review.all = Review.all.filter(review => review.id != deleteData.id)
            
      document.getElementById('root').innerHTML = "";
        Review.all.forEach(filteredReview => {
          document.getElementById('root').innerHTML += filteredReview.renderReviewCard();
        })
     })
  }

//I want to run this function after the post request and convert the stars user inputs to stars
   function getStarRatings(){
    const starRating = document.querySelector('#star-rating').value
    const starsTotal = 5;
     console.log(starRating)
     //now that you have the starRating input value, I now can fill the stars with that rating
     const starPercentage = (starRating / starsTotal) * 100; 
       console.log(starPercentage)
     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
       console.log(starPercentageRounded)

       //set width of star-inner to percentage(how many starr will get filled)
       document.querySelector('.stars-inner').style.width = starPercentageRounded
       //document.querySelector('root').innerHTML += starPercentageRounded
     
   }
