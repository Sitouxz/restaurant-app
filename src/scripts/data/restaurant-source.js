import API_ENDPOINT from '../globals/api-endpoint';

const RestaurantSource = {
  async home() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  },

  async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  },

  async postReview(data) {
    console.log(data);
    fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};

export default RestaurantSource;
