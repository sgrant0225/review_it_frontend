document.addEventListener("DOMContentLoaded", () => {
   console.log("Document loaded")
   getReviews();
})

function getReviews(){
    fetch("http://[::1]:3000/api/v1/reviews")
    .then(response => response.json())
    .then(info => {
       info.data.forEach(review => {
           const reviewMarkup = `
              <div data-id=${review.id}>
              <br> <h2>Name: ${review.name}</h2> </br>
              <br> <img src=${review.image_url} height="200" width="250"</p> </br>
              <br> <h3> Location: ${review.location}</h3> </br>
              <br> <p> Feedback: ${review.feedback} </p> <br>
              <br> <h4> Star Rating: </h4>
             <button data-id=${review.id} type="button" class="delete-button">Delete</button>
            </div>   `
           
       })
    })
    
}
