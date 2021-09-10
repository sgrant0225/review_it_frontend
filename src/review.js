class Review {
  
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
    //debugger
  }

   renderReviewCard(){
    return `<div data-id=${this.id}>
        <br><h3>${this.first_name} ${this.last_name}</h3></br>
        <br> <h2> ${this.product_name}</h2> </br>
        <br> <img src=${this.image_url} height="200" width="250"</p> </br>
        <br> <h3> Location: ${this.location}</h3> </br>
        <br> <section> <span> Feedback: ${this.feedback} </feedback> <br>
        <div class="stars-outer"> </div>
         <div class="stars-inner"></div>
        <br> <p> Star Rating: ${this.stars} <p></br>
         <p> Category: ${this.category.name} </p> </br>
        <button data-id=${this.id} type="button" class="delete-button">Delete</button>
      </div>  
      `
   }
}


  Review.all = [];
