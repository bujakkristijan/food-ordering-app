### Food ordering application 

Project is implemented using ReactJS (Hooks) library and Java Spring Boot framework (Hibernate, Spring Secuirty with JSON Web token, REST API) with some additional libraries (Bootstrap, AXIOS, Sweetalert, Redux and few more).

### Project specification

The main purpose of the application is to enable users to view restaurant menu, place food orders, then track the status of their orders, which can be updated by employees. The system consists of three user roles with specific capabilities:
- ADMIN
- EMPLOYEE
- USER

The application can also be accessed by unregistered users, who have the following abilities:
- Register an account
- Browse the menu, select a type of the meal, and view the complete offerings within that type
- Specify quantities and then add items to the cart
- Confirm the final order by inserting their address and phone number
- After successfully placing the final order, users will receive a message containing a link to track the status of their order

Registered users with the *USER* role can log into the system using their username and password. They have the following abilities:
- Update their personal information
- Order food similar to unregistered users, but without the need to enter their address and phone number since their data is already saved in the system.
- Receive a 10% discount on every order
- View their active orders (with *ORDERED* and *IN PREPARATION* status)
- View the history of their orders (with *IN DELIVERY* status)

Users with the *EMPLOYEE* role have the following abilities:
- Review all incoming orders and change their status to *IN PREPARATION* or *IN DELIVERY*, depending on whether the orders are being prepared or in the process of delivery.
- View the history of all orders.

Users with the *ADMIN* role have the following abilities:
- Create, delete, and update meal types in the database (including uploading images)
- Create, delete and update meals (including uploading images)
- Logically delete users (change their status, their data remains in the database)
- View the order history
- Create, delete, and update employee data (users with the *EMPLOYEE* role)

### Application UI preview:

Users first need to select the specific category, then they can see complete offers for that category.

![menu1](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/6c7d7f12-3c9c-4468-a852-4ab86007aad7)

After choosing category (meal type), available meals (offers) will be listed.

![meals-by-meal-type-2](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/f5a035ce-15e4-4d51-a7c3-9d46588ce03b)

Users can add items (meals) to the cart after they insert quantity.

![insertquantity-3](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/26266a2d-1bbd-434c-8c94-0e130f1b89da)

After inserting quantity and submiting, item is successfully added to the cart.

![succesitemtocart-4](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/1476eac9-5402-45b4-b779-682be40099fc)

Clicking on cart button or icon in navigation, users can see items from the cart

![cartneeeww99](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3499bcc3-2ae5-4832-b90d-067e42b9041a)

Users that are not logged-in, need to insert details such as address and phone number.

![insertdetails6](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/91d25217-7850-43ca-a456-65cbb633bc5d)

Without inserting details, not logged-in users can't confirm the final order 

![insertdetailserror-7](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/c1d2d890-bb07-4dbf-81be-8ce2c57015d1)

Validation if inserted phone number is a number or it has less than 5 digits

![insertdetailserror-8](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/c3cfa865-1695-4826-91b7-b8e59ff6f64b)

![inserterror-9](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/96519369-7deb-40e5-9702-bbcf5516373d)

After valid input, final order will be confirmed and not logged-in users can track its order status clicking on the link.

![insertdetailsvalid-10](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/157bdc03-eae4-43e0-a836-3de4c75e3b33)

![successorder11](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/d3835623-ab9d-4091-9914-30a888e7e699)

Clicking on "Show items" button, user can see all items from the (final) order that he ordered.

![finalorderbyid-12](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9bc7e1a5-8426-4ee4-988b-4683a9711abc)

![showitems-13](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e2d3a6d8-eaf5-4edb-8a64-0d67d9bb6811)

Logged-in users get 10% discount on the final price of their order. Also they don't need to insert details, such as address and phone number, because it's stored in data base after registration. Logged-in users also have more tabs and options.

![loggedinuser-14](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/1fa0e012-b078-4ff3-928c-520b5dd5dd9d)

After placing final order, the cart becomes empty

![emptycart15](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/742d65a0-a0fb-4c21-b290-24b5e317d956)

Logged-in users can track their active orders (IN PREPARATION and ORDERED status) clicking on My active orders tab. Final orders with IN DELIVERY status will be visible clicking on My order history tab.

![myactive-finalorders-16](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/4d2247db-f7c8-4dc0-9b0a-b927ed4ac006)

Clicking on "Show items" button, user can see his ordered items

![activefinalEXCEPTION-16](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/73833908-1718-4e60-b542-812b59e296fd)

Employee can see and change status of the final order depending on real status of the order, which user can track.

![activeemployee-17](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3c2e4956-7441-4e20-9e4d-ab833a6366bb)

Clicking on "Show items" button, employee can see all items from the (final) order.

![active-show-items-18](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/58a6b728-fb16-445e-b79d-a62fc5905827)

All orders with status *IN DELIVERY* are placed in order history, they aren't considered active anymore

![orderhistory-19](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/dfb17f00-06b3-4058-92ca-eebad5d7f466)

Login component shows when the app starts.

![signin-20](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3dffb74f-0746-478a-94c4-cbe22caf9d92)

Logged-in users can access their profile page where they edit profile or change password if necessary.

![profile-21](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/57ec5781-eb6a-4679-b972-94f3b3e8ee46)

Edit profile

![editprofile22](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/7da5d0b8-122a-4d8a-b6f1-cadc07736076)

When user wants to change password, he needs to insert old password as well.

![oldnewpass-22](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/5264f532-4233-4500-99df-9eb48b72bee0)

If inserted old password and password from the database don't match, he won't be allowed to save new password.

![pass-23](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/7e8d623d-362b-4e05-8410-40006e6e4899)

If they match, new password will be saved successfully (will be encripted and saved in database)

![changepass-24](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/81c3a174-bc1a-479c-ba7f-43e242342e73)

Registration 

![registration-25](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/2992abc6-f037-484f-905e-f2d6cb50a59a)

Validation and alert if username already exists in the database.

![username-26](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e0a08321-d4f5-42ab-a52c-35b0b427f83c)

Validation and alert if email already exists in the database

![emailexist-27](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3e6e7006-5e0f-41bc-b438-49fe9b5ce346)
