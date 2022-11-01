/* eslint-disable comma-dangle */
import RestaurantIdb from '../src/scripts/data/retaurant-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unlike A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await RestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await RestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector("[aria-label='unlike this restaurant']")
    ).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector("[aria-label='like this restaurant']")
    ).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await RestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await RestaurantIdb.deleteRestaurant(1);

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await RestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
