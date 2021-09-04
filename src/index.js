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
           const reviewMarkup = `
              <div data-id=${review.id}>
              <br><h3>${review.attributes.first_name}</h3> <h3>${review.attributes.last_name}</h3></br>
              <br> <h2>Name: ${review.attributes.name}</h2> </br>
              <br> <img src=${review.attributes.image_url} height="200" width="250"</p> </br>
              <br> <h3> Location: ${review.attributes.location}</h3> </br>
              <section> <span> Feedback: ${review.attributes.feedback} </feedback> 
              <br> <h4> Star Rating: ${review.attributes.stars}</h4> </br>
              <br> <p> Category: </p> </br>
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
    //const categoryInput = document.querySelector('#categories').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetchReviews(firstNameInput, lastNameInput, nameInput, imageInput, locationInput, feedbackInput, starRatingInput, categoryId)
}


function postFetchReviews(first_name, last_name, name, image_url, location, feedback, stars, category_id){
    
  let formData = {first_name, last_name, name, image_url, location, feedback, stars, category_id}
    
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
              const reviewMarkup = `
              <div data-id=${review.id}>
              <br><h3>${reviewData.attributes.first_name}</h3> <h3>${reviewData.attributes.last_name}</h3></br>
              <br> <h2>Name: ${reviewData.attributes.name}</h2> </br>
              <br> <img src=${reviewData.attributes.image_url} height="200" width="250"</p> </br>
              <br> <h3> Location: ${reviewData.attributes.location}</h3> </br>
              <section> <span> Feedback: ${reviewData.attributes.feedback} </feedback> 
              <br> <h4> Star Rating: ${reviewData.attributes.stars}</h4> </br>
              <br> <p> Category: </p> </br>
             <button data-id=${reviewData.id} type="button" class="delete-button">Delete</button>
             </div> 
              `
              document.getElementById("root").innerHTML += reviewMarkup
    })

}



