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

![menu-step-2](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/b0e59b49-4bcc-4cf7-b58c-c60aa3557fd3)

Users can add items (meals) to the cart after they insert quantity.

![menu-step-3](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/5c581145-229e-4acb-b9ad-59c4108d1631)

After inserting quantity and submiting, item is successfully added to the cart.

![added-to-cart](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/0b96b709-91a5-4a77-9020-150881ac6dcf)

Clicking on cart button or icon in navigation, users can see items from the cart

![items-from-cart](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/74c4a0bf-5be1-426a-a710-2849f1a15b13)

Users that are not logged-in, need to insert details such as address and phone number.

![not-logged-in](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9b99b590-538b-4055-a4a6-d911bb50bd72)

Not logged-in users can track their order status clicking on the link after the final order is placed.

![not-logged-in-link](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/482853e5-56c4-4aa1-808f-6fea3cb177cf)

Clicking on "Show items" button, user can see all items from the (final) order that he ordered.

![not-logged-link-clicked](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/0a90888e-2fe5-46b6-942b-16a4b5956544)

![not-logged-show-items](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ebb30f4a-8eb4-423c-962b-9d5155085ab4)

Logged-in users get 10% discount on the final price of their order. Also they don't need to insert details, such as address and phone number, because it's stored in data base after registration. Logged-in users also have more tabs and options.

![logged-in-cart-final-order](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/56baafbd-02bc-4c96-842b-04ab694e0601)

After placing final order, the cart becomes empty

![empty-cart-logged-in](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/13374910-a4f4-450b-bc70-f5ba6ea53977)

Employee can see and change status of the final order depending on real status of the order, which user can track.

![employee-change-status](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/19ee2d3b-2637-4945-8ad2-cd80d82f8911)

Clicking on "Show items" button, employee can see all items from the (final) order.

![employee-show-items](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/18a25357-20d1-4bf2-90a8-007d4032f43d)

All orders with status *IN DELIVERY* are placed in order history, they aren't considered active anymore

![employee-order-history](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/cd8c23f5-49b5-4015-86a8-32fcb4917159)

Login component shows when the app starts.

![sign-in](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/7b684fd6-3870-4a5d-acc5-3379a38666c7)

Logged-in users can access their profile page where they can see and change details if necessary.

![my-profile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e9cc7c8b-04ab-450f-bca5-6e172ed1b107)

Registration 

![registration](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/11d95fa7-6b29-46b3-9cfa-cad973b8776d)

Alert if email or username already exists in the database.

![email-username-already-exist](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/04779c3e-5f60-4f30-9a41-3408cfbcbe00)

