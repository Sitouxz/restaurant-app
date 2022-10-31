const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#restaurants');
  I.see('Restaurant not found', '.restaurant');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Restaurant not found', '.restaurant');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item a', 5);

  I.seeElement('.restaurant-item a');

  const firstRestaurant = locate('.restaurant-item-title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item-title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Restaurant not found', '.restaurant');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item a', 5);

  I.seeElement('.restaurant-item a');

  const firstRestaurant = locate('.restaurant-item a').first();
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const firstRestaurantTitle = await I.grabTextFrom('.restaurant-item-title');
  I.click(firstRestaurantTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Restaurant not found', '.restaurant');
});

Scenario('reviewing one restaurant', async ({ I }) => {
  const review = 'This is a review';

  I.see('Restaurant not found', '.restaurant');

  I.amOnPage('/');
  I.waitForElement('.restaurant-item a', 5);
  I.seeElement('.restaurant-item a');

  const firstRestaurant = locate('.restaurant-item a').first();
  I.click(firstRestaurant);

  I.seeElement('form');
  I.fillField('name', 'John Doe');
  I.fillField('review', review);
  I.click('#reviewButton');

  I.seeElement('.review-item');
  const lastReview = locate('.review-item').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert(lastReviewText, review);
});
