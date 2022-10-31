/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
import RestaurantSource from '../../data/restaurant-source';
import {
  createRestaurantDetailTemplate,
  createLoadingTemplate,
  createReviewTemplate,
} from '../templates/template-creator';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { sendDataToWebsocket } from '../../utils/websocket-initiator';

const Detail = {
  async render() {
    return `
    <div id="loading"></div>
    <div id="restaurant" class="restaurant">
      <div id="restaurant-detail" class="restaurant">
      </div>
      <div class="review-form" id="review-form">
      <h2>Review Form</h2>
      <form>
      <div class="form-input">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Your name..">
      </div>
      <div class="form-input">
      <label for="review">Review</label>
      <textarea id="review" name="review" placeholder="Write something.." style="height:200px"></textarea>
      </div>
      <input id="reviewButton" class="form-submit" type="submit" value="Submit">
      </form>
      </div>
      <div class="like" id="likeButtonContainer"></div>
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantAll = document.querySelector('#restaurant');
    const restaurantContainer = document.querySelector('#restaurant-detail');
    const loading = document.querySelector('#loading');

    restaurantAll.style.display = 'block';
    loading.innerHTML = createLoadingTemplate();

    try {
      const data = await RestaurantSource.detail(url.id);

      restaurantContainer.innerHTML += createRestaurantDetailTemplate(
        data.restaurant
      );

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        data,
      });

      restaurantContainer.style.display = 'block';
      loading.style.display = 'none';

      const form = document.querySelector('form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const review = document.querySelector('#review').value;
        const formData = {
          id: url.id,
          name,
          review,
        };
        await RestaurantSource.postReview(formData);
        sendDataToWebsocket(formData);

        // form.reset();

        const reviewContainer = document.querySelector('#review-container');
        reviewContainer.innerHTML += createReviewTemplate(formData);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default Detail;
