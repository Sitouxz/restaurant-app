/* eslint-disable comma-dangle */
/* eslint-disable indent */
import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
<div class="restaurant-item">
  <a href="#/restaurant/${restaurant.id}">
    <div class="restaurant-header">
      <img
        src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
        alt="${restaurant.name}"
        class="restaurant-poster lazyload"
      />
      <div class="restaurant-rating">
        <p>${restaurant.rating}</p>
      </div>
    </div>
    <div class="restaurant-content">
      <h3 class="restaurant-item-title">${restaurant.name}<span>${
  restaurant.city
}</span></h3>
      <p class="restaurant-description">
        ${restaurant.description}
      </p>
    </div>
  </a>
</div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
<div class="restaurant-detail">
  <a href="/">< back</a>
  <img
  class="restaurant-poster lazyload"
  alt="${restaurant.name}"
  src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
  />
  <div class="restaurant-content">
    <h2 class="restaurant-title">${restaurant.name}</h2>
    <p class="restaurant-desc">${restaurant.description}</p>
    <div class="restaurant-info">
      <h3>Information</h3>
      <h4>City</h4>
      <p>${restaurant.city}</p>
      <h4>Address</h4>
      <p>${restaurant.address}</p>
      <h4>Categories</h4>
      <p>${restaurant.categories
        .map((category) => category.name)
        .join(', ')}</p>
      <h4>Menus</h4>
      <p>Food: ${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
      <p>Drink: ${restaurant.menus.drinks
        .map((drink) => drink.name)
        .join(', ')}</p>
        </div>
        <div class="restaurant-review">
      <h4>Customer Reviews</h4>
      <div id="review-container">
      ${restaurant.customerReviews
        .map(
          (review) => `
        <div class="review-item">
        <div class="review-header">
          <p>${review.name}</p>
          <p>${review.date}</p>
        </div>
          <p>${review.review}</p>
        </div>
      `
        )
        .join('')}
        </div>
        </div>
        
  </div>
</div>
`;

const createReviewTemplate = (review) => `
<div class="review">
<div class="review-header">
  <p>${review.name}</p>
  <p>${review.date}</p>
</div>
  <p>${review.review}</p>
</div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
  <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
  <i class="fa-solid fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLoadingTemplate = () => `
  <div class="loading">
    loading...
    <img src="images/loading.gif" alt="loading" class="lazyload"/>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createLikedRestaurantButtonTemplate,
  createLoadingTemplate,
  createReviewTemplate,
};
