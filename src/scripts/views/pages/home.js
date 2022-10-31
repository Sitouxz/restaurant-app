import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section id="hero" class="hero">
        <h1>Find Your Favorite Restaurant</h1>
        <p>
          Best restaurant in your city, you can find it here. Just search your
          favorite restaurant and enjoy your meal.
        </p>
        <a href="#restaurant" class="btn">Find Restaurant</a>
      </section>
      <section id="restaurant" class="restaurant">
        <h2>Find Restaurant</h2>
        <p>
          You can find your favorite restaurant here. Just search your favorite
          restaurant and enjoy your meal.
        </p>
        <div class="restaurant-list"></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.home();
    const restaurantList = document.querySelector('.restaurant-list');
    restaurants.forEach((restaurant) => {
      restaurantList.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
