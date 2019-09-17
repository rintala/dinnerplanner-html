# Interaction Programing - Lab 3

=================================================

This branch contains new tests for lab 3. For more details on how to complete the assignment follow the instructions on the [course website](https://www.kth.se/social/course/DH2642).

Implement the GSC in `src/app.js` and make index.html contain all the views.

## Testing

Open `index.html` in the browser and tests should run automatically

## Config

The API calls requires an API key, which is placed in a `config.js` file. Therefore you need to create such a file and place it at the root. Then add the content below to your config file, and replace the dummy string with your API-key:

```js
const config = {
	SECRET_API_KEY: "your-api-key-goes-here"
};
```