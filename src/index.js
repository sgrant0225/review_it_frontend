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
    //const categoryInput = document.querySelector('#categories').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetchReviews(firstNameInput, lastNameInput, productNameInput, imageInput, locationInput, feedbackInput, starRatingInput, categoryId)
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
              console.log(review)
              const reviewData = review.data
              document.getElementById("root").innerHTML += reviewData.renderReviewCard();
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


  