const getReviewForm = document.getElementById('create-review-form')



document.addEventListener("DOMContentLoaded", () => {
   console.log("Document loaded")
   getReviews();
   getReviewForm.addEventListener("submit", (e) => 
   formEventHandler(e))
})

function getReviews(){
    fetch("http://[::1]:3000/api/v1/reviews")
    .then(response => response.json())
    .then(info => {
       info.data.forEach(review => {
           const reviewMarkup = `
              <div data-id=${review.id}>
              <br><h3>${review.attributes.first_name}</h3> <h3>${review.attributes.last_name}</h3></br>
              <br> <h2>Name: ${review.attributes.name}</h2> </br>
              <br> <img src=${review.attributes.image_url} height="200" width="250"</p> </br>
              <br> <h3> Location: ${review.attributes.location}</h3> </br>
              <section> <span> Feedback: ${review.attributes.feedback} </feedback> 
              <br> <h4> Star Rating: ${review.attributes.stars}</h4>
             <button data-id=${review.id} type="button" class="delete-button">Delete</button>
             </div>   
           `
           document.getElementById("root").innerHTML += reviewMarkup
       })
    })
    
}

//this function is created to handle the events of the form 
//grabbing all the values for my form input
function formEventHandler(e){
    e.preventDefault();
    const firstNameInput = document.querySelector("#input-first-name").value
    const lastNameInput = document.querySelector('#input-last-name').value
    const nameInput = document.querySelector('#input-name').value
    const imageInput = document.querySelector('#input-image').value
    const locationInput = document.querySelector('#input-location').value
    const feedbackInput = document.querySelector('#input-feedback').value
    const starRatingInput = document.querySelector('#star-rating').value
    const 
}


function postReviews(){
  

}



