/* eslint-disable operator-linebreak */
import RestaurantIdb from '../../data/retaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
      <section id="hero" class="hero">
        <h1>Find Your Favorite Restaurant</h1>
        <p>
          Best restaurant in your city, you can find it here. Just search your
          favorite restaurant and enjoy your meal.
        </p>
        <a href="#main-content" class="btn" >Find Restaurant</a>
      </section>
      <section id="restaurant" class="restaurant">
        <h2 class="content-heading">Your Favorite Restaurants</h2>
        <div id="restaurants" class="restaurant-list favorite-restaurants"></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');

    try {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML += `
            Restaurant not found
        `;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Like;
