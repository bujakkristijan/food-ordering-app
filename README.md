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
- Update his personal information
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

Every user can see meals after choosing the meal type first.

![menu](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/4e8e1083-c715-4ab2-b662-172c41da275b)

After choosing meal type, available meals will be listed.

![meals-by-meal-type-with-category](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/f1cbf613-ee86-4474-9c0f-69157f8a6434)

Users can add items (meals) to the cart after they insert quantity.

![menu-step-3](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/5c581145-229e-4acb-b9ad-59c4108d1631)

After inserting quantity and submiting, item is successfully added to the cart.

![added-to-cart](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/0b96b709-91a5-4a77-9020-150881ac6dcf)

Clicking on cart button or icon in navigation, users can see items from the cart

![itemsfromcartwithtypeadded](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/07576463-cc41-4bcb-96b8-3df3e8088d02)

Users that are not logged-in, need to insert details such as address and phone number.

![insertemptyfinalorder](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/76d1030a-dc70-48cf-915c-05a7546854e9)

Without inserting details, not logged-in users can't confirm the final order 

![alert-insert-address-and-phone-number-not-logged-in](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/cf40cbc3-07b8-4013-8193-37998a8f347b)

Validation if inserted phone number is a number or it has less than 5 digits

![invalidinputfinalorder](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/853c3ec5-a308-4461-9f1e-e2f6e19a1d4a)

![cartordernotloggedinphonedigitcheck](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/b45639fa-e2f9-4f4f-85f7-ec0f7df88e81)

After valid input, final order will be confirmed and not logged-in users can track its order status clicking on the link.

![not-logged-in](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9b99b590-538b-4055-a4a6-d911bb50bd72)

![not-logged-in-link](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/482853e5-56c4-4aa1-808f-6fea3cb177cf)

Clicking on "Show items" button, user can see all items from the (final) order that he ordered.

![not-logged-link-clicked](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/0a90888e-2fe5-46b6-942b-16a4b5956544)

![not-logged-show-items](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ebb30f4a-8eb4-423c-962b-9d5155085ab4)

Logged-in users get 10% discount on the final price of their order. Also they don't need to insert details, such as address and phone number, because it's stored in data base after registration. Logged-in users also have more tabs and options.

![logged-in-cart-final-order](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/56baafbd-02bc-4c96-842b-04ab694e0601)

After placing final order, the cart becomes empty

![empty-cart-logged-in](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/13374910-a4f4-450b-bc70-f5ba6ea53977)

Logged-in users can track their active orders (IN PREPARATION and ORDERED status) clicking on My active orders tab. Final orders with IN DELIVERY status will be visible clicking on My order history tab.

![my-active-final-orders-logged-in-user](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/a966cc39-c551-45a4-b080-8164112167b2)

Employee can see and change status of the final order depending on real status of the order, which user can track.

![employee-change-status](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/19ee2d3b-2637-4945-8ad2-cd80d82f8911)

Clicking on "Show items" button, employee can see all items from the (final) order.

![employee-show-items](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/18a25357-20d1-4bf2-90a8-007d4032f43d)

All orders with status *IN DELIVERY* are placed in order history, they aren't considered active anymore

![employee-order-history](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/cd8c23f5-49b5-4015-86a8-32fcb4917159)

Login component shows when the app starts.

![sign-in-smanjen-box-shadow](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/08aeac06-7dfb-42c4-9a8f-3c70cb620938)

Logged-in users can access their profile page where they edit profile or change password if necessary.

![myprofilenew](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3726a172-61e1-4bee-9910-52f2c6417058)

Edit profile

![myprofileeditprofilenew](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/6fd5b1dc-9f1d-4669-85d4-a73a11779670)

When user wants to change password, he needs to insert old password as well.

![myprofileoldnewpassword](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/0e8f8fdf-32ae-4226-b832-a874e01e32bf)

If inserted old password and password from the database don't match, he won't be allowed to save new password.

![myprofileoldnewpasswordalert](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/94c3e9d8-fb97-4ed9-be4d-5f1b97b4e5ec)

If they match, new password will be saved successfully (will be encripted and saved in database)

![myprofilechangepasssuccess](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/cd3c1d63-b951-44b6-b401-7baa21ee9b06)

Registration 

![registration-smanjen-box-shadow](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/8a7ba048-c6c4-4042-932a-9eaac617f1ff)

Validation and alert if username already exists in the database.

![usernamealreadyexistsregistration](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/6eb8aef9-176e-4ece-ab97-30ba3e746ba7)

Validation and alert if email already exists in the database

![emailalreadyexistsregistration](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/d0ac3d78-81ef-452f-9b3a-bac3e689c6b5)
