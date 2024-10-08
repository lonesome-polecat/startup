# Startup Project - Arizonuts
Looking for a tasty dessert? Perhaps a thoughtful gift for a friend? Welcome to **Arizonuts**, the latest and tastiest innovation in Provo! 
These fluffy filled pastries are made to order, not to sit and stale-ify on the counter. You can order these handcrafted delicacies online through our website and have them ready for pickup within minutes! 

Order a box of fresh Arizonuts today!

## Website Features

Our website includes the following features:
- State-of-the-art login service for a personalized experience and secure transactions
- A tasty display of the Arizonuts menu (updated weekly!)
- Ability to order Arizonuts from the weekly menu and be assigned a pickup time
- Transactional history of all orders with the option to cancel pending pickup orders
- Contact info of business owner for questions or feedback
- Appealing designs and colors, intuitive UI, and tasty donuts!

## Website Technologies

- **Authentication:** Each user must create a login and verify their identity before accessing data. Their name will be displayed after login
- **Database data:** Every order submitted will be stored in a MongoDB database. These orders can then be accessed and displayed for the user in the **Orders** tab
- **WebSocket data:** Every time a user orders a donut (or several) the order count for those donuts updates for every user in real-time, thus accurately showing the most popular donut choices each week

## Example Layout and Design

### Login

![Login Page](src/img/arizonuts_login.jpg)


### Home

![Home Page design image](src/img/arizonuts_home.jpg)


### Menu

![Menu Page](src/img/arizonuts_menu.jpg)


### Order Confirmation Dialog

![Order Confirmation dialog window](src/img/arizonuts_order_dialog.jpg)


### Past Orders

![Orders page](src/img/arizonuts_orders.jpg)


### Contact Page

![Contact Page](src/img/arizonuts_contact.jpg)


## Current Progress

### HTML

I recently added the following features to the page
- "Welcome" index page with **Login** placeholder and link to **GitHub repo**
- "Menu" page with images of donuts and placeholders for order counts (**WebSocket data**), button placeholder for ordering
- "Orders" page which displays a table as a **Database data placeholder**, showing pending and past orders
- "Contact" page with **third-party app data** placeholder (loads pictures of Arizona) and another link to GitHub repo
- Each page contains a **navigation bar** with links to each page, above which the website title and username are displayed

### CSS

I recently added the following stylistic features to the page
- All text in font Merriweather Sans (Except page title which is in Merriweather)
- Background and fonts colors
- Spacing in all areas
- button:hover animation
- Footers

## Javascript

### Login

- Added link in top-right corner to Login page
- After user is logged in the `Login` link is replaced with the `username` in the top-right corner
- Hovering over `username` will display button to `Logout` of account
- Pages load dynamic content based on if user is logged in or not

### Menu

- All content is now dynamically loaded to make it easier to modify menu
- Order Count is updated, stored and retrieved from localStorage
- An order form appears when user clicks `Make Order` button
- The order form is dynamically loaded from current menu
- the order form contains a `total_cost` display that updates in real-time when user changes quantity of order
- When user clicks `Confirm` on the order form, the following results take place:
- - The total order counts are updated
- - The order gets saved into localStorage
- - The order is uploaded into `Orders` tab in the orders table with relevant data

### Orders

- All content is now dynamically loaded
- If user is not logged in, page displays a "you must log in to see orders" message
- If user is logged in but has no orders, page displays a "you have no orders" message
- If user has previous orders, all orders are loaded from localStorage and displayed in a table
- Each order comes with an option button to cancel the order
- When canceled, the order is removed from localStorage and the window is reloaded

## Service Deliverable

### Menu

***Endpoints***

- GET /api/menu - returns menu options for the week
- GET /api/order/count - returns total order count for each menu item
- GET /api/times - returns available days and times for order pickup
- POST /api/order - submits an order to the server for processing

***Other Changes***

- User can choose specific pickup date and time, added to order data
- Order count is handled on server
- Menu is loaded from server, dynamically generated using JSON file
- Available times loaded from server, dynamically generated using JSON file

### Orders

***Endpoints***

- GET /api/orders/:username - returns orders specific to the user's username
- DELETE /api/order/:id - deletes specific order from database

***Other Changes***

- Order data updated to include pickup date and time for each order

### Contact

- Image obtained through Pexels API


## Login Deliverable

### New features
* Live MongoDB to store user accounts and order data
* Persistent user accounts (ability to create account, login, and logout)
* Authentication checks for protected transactions

***New Endpoints***

- POST /auth/new - creates new user account in DB
- POST /auth/login - verifies credentials, creates and store cookie for session
- DELETE /auth/logout - ends session, deletes cookie

***Protected Endpoints (needs auth)***

- POST /api/order - make a new order
- GET /api/orders - load history of user orders
- DELETE /api/orders/:id - cancel/delete a previous order

## WebSocket Deliverable

### Menu Page - available pickup times live update

***Feature*** - User is able to select a time to pickup their order
***WebSocket*** - When a user submits an order with a selected pickup time, that option is removed for all other users in real-time

## React Deliverable

***New developments***
- Bundled using Vite
- Created functional navbar with a React router
- Login is a functional component (but create user no longer works)
- Logout is functional (but you have to have a login already because ^^^)
- The Menu page is loaded dynamically using a custom hook (images no longer load in production)
- The order dialog on the Menu page is a functional component that loads data from the websocket (which no longer works)
- Orders page is empty
- Contact page is empty

