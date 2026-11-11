# Secondhand

A small buy-and-sell used-products app built with HTML, CSS, and JavaScript.

## Pages

- `index.html` — browse, search, filter, and sort available listings, plus a Recently sold section
- `product.html` — product details, save action, and buy-now checkout
- `sell.html` — publish a listing
- `saved.html` — saved products
- `messages.html` — buyer/seller messages
- `profile.html` — manage your listings and see your purchases

## Run

Open `index.html` in a browser.

Listings, saved products, purchases, and messages are stored in browser local storage.

## Buying

On a product page, **Buy now** opens a short checkout (name, phone, payment method, pickup note). Confirming marks the item as sold: it leaves the browse grid, appears under **Recently sold** on the homepage, and is listed under **Your purchases** on your profile. Payment is arranged with the seller on pickup; no money is processed by the app.
