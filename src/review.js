class Review {
     //initializing an object
    constructor(review, reviewAttributes) {
    this.id = review.id
    this.first_name = reviewAttributes.first_name
    this.last_name = reviewAttributes.last_name 
    this.product_name = reviewAttributes.product_name 
    this.image_url = reviewAttributes.image_url 
    this.location = reviewAttributes.location 
    this.feedback = reviewAttributes.feedback 
    this.stars = reviewAttributes.stars 
    this.category = reviewAttributes.category
    Review.all.push(this)
  
  }

   renderReviewCard(){
     return `
     <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">       
      <div class="col">
       <div class="card shadow-sm">
          <img src="${this.image_url}" class="card-img-top" alt="...">
         
         <div class="card-body" data-id=${this.id}>
           <h5 class="card-title">${this.product_name}</h5>
           <h6 class="card-title"> ${this.location}</h6>
           <p class="card-text">${this.feedback}</p>
           <p class="card-text"><small class="text-muted">Star Rating: ${this.stars} </small></p>
           <p class="card-text"><small class="text-muted">Created by: ${this.first_name} ${this.last_name} </small></p>
           <p class="card-text"><small class="text-muted">${this.category.name}</small></p>
           <div class="d-flex justify-content-between align-items-center">
             <div class="btn-group">
               <button data-id=${this.id} type="button" class="delete-button">Delete</button>
             </div>
             
           </div>
         </div>
       </div>
     </div>

   </div>
     
     `
    

    // return `<div data-id=${this.id}>
    //     <br><h3>${this.first_name} ${this.last_name}</h3></br>
    //     <br> <h2> ${this.product_name}</h2> </br>
    //     <br> <img src=${this.image_url} height="200" width="250"</p> </br>
    //     <br> <h3> Location: ${this.location}</h3> </br>
    //     <br> <section> <span> Feedback: ${this.feedback} </feedback> <br>
    //     <div class="stars-outer">
    //     <div class="stars-inner"></div>
    //     </div> 
    //     <br> <p> Star Rating: ${this.stars} <p></br>
    //      <p> Category: ${this.category.name} </p> </br>
    //     <button data-id=${this.id} type="button" class="delete-button">Delete</button>
    //   </div>  
    //   `
   }
}


  Review.all = [];


  