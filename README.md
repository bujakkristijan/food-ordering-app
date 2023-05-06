Project is implemented using ReactJS (Hooks) and Java Spring Boot framework (Hibernate, Spring Secuirty with JSON Web token, REST API) with some additional libraries (Bootstrap, AXIOS, Sweetalert, Redux and few more).

### Project specification

The main purpose of the application is to allow the user to view the offer and order food from the restaurant, then track status of the order. There are 3 user roles in the system with different capabilities:
- ADMIN
- EMPLOYEE
- USER

The application can also be used by an unregistered user. He has the ability to:
- register
- order food (different meals with inserted quantities). By viewing the menu, he needs to select the type of meal, after which the complete offer for that type will be listed. By clicking on the button next to the selected meal, a modal window will appear, where he can insert quantity and the meal is placed in the cart. When he wants to confirm the final order, a new modal window appears where he enters the address and phone number, because the user is not logged in. After successfully ordering food, he receives a message containing a link, where he can track his order status by clicking on it.

A registered user (with the *USER* role) logs into the system by entering his username and password. He has the ability to:
- change personal data
- orders food like a non-registered user, but there is no need to enter his address and phone number, because his data is already saved in the system.
- gets a 10% discount on every order
- view his active orders (with status *ORDERED* and *IN PREPARATION*)
- view the history of his orders (with *IN DELIVERY* status)

A user with the *EMPLOYEE* role has the ability to:
- reviews all incoming orders and changes their status to *IN PREPARATION* or *IN DELIVERY* depending on whether the orders are in the process of preparation or the delivery person has started delivering them.
- view the history of all orders.

A user with the *ADMIN* role has the ability to:
- create, delete and update meal types in the database (including uploading images)
- create, delete and update meals (including uploading images)
- logically deletes users (status changes, data remains in the database)
- view the order history
- create, delete and update data for employees (users with *EMPLOYEE* role)

The application is primarily intended to be accessed via a browser from a DESKTOP or LAPTOP computer.

### Application UI preview:

There are additional tabs in the navigation bar that logged-in user can use.

![cartloggedin](https://user-images.githubusercontent.com/76042091/207377274-be2a1ddd-0dfa-4312-97f8-d4993d654a8d.jpg)

Additional tabs are not shown in the navigation bar.

![cart2](https://user-images.githubusercontent.com/76042091/207376805-303f7a19-023d-4a10-9e3c-672d2b92a457.jpg)

Logged-in users get 10% discount on the final price of their order. Also they don't need to insert details, such as address and phone number, because it's stored in data base after registration.

![finalorderconfirm](https://user-images.githubusercontent.com/76042091/207379965-6182f926-56a0-4783-aec3-ac772c431635.jpg)

Users that are not logged-in need to insert details such as address and phone number.

![insertdetailsnotlogged](https://user-images.githubusercontent.com/76042091/207380537-85ba0143-dad8-466c-8263-b51f7c4af82b.jpg)

Employee can see and change status of the final order depending on real status of the order, which user can track.

![status1](https://user-images.githubusercontent.com/76042091/207382882-c0bc7deb-b991-4896-aaf5-e60b7d88de9b.jpg)

![status2](https://user-images.githubusercontent.com/76042091/207382915-d5d1e7a7-8c55-4eb2-b6a1-ba1123f73b8e.jpg)

Clicking on "Show items" button, employee can see all items from the (final) order.

![ацтивефиналордерсхоњ](https://user-images.githubusercontent.com/76042091/207574541-1210417e-8523-47a1-b0f8-4af1ce9d858e.jpg)

When the user in not logged-in, he can track order status clicking on the link after the order is confirmed.

![statusnotlogged](https://user-images.githubusercontent.com/76042091/207575418-b4af2a5d-0e1c-4a12-828f-cc32b34209d9.jpg)

![statusnotlg2](https://user-images.githubusercontent.com/76042091/207575713-6184abdf-9c07-43f1-8efa-4dd9e4eba10b.jpg)

Clicking on "Show items" button, user can see all items from the (final) order.

![showitemsnotlogged](https://user-images.githubusercontent.com/76042091/207575732-50de1794-2b44-45e4-93c5-1203438ed3b6.jpg)

Login component shows when the app starts.

![login2](https://user-images.githubusercontent.com/76042091/207374137-7b5acf55-8416-4b1c-9620-008cca1fd5de.jpg)

Every user can see meals after choosing the meal type first.

![menu2](https://user-images.githubusercontent.com/76042091/207375484-c348115b-9f37-46ea-8c4c-f1b886a171da.jpg)

Logged-in users can access their profile page where they can see and change details if necessary.

![myprofile](https://user-images.githubusercontent.com/76042091/207382087-b5d9a567-6ff1-41ff-94a3-19c0ee2fea6d.jpg)

Registration 

![registration](https://user-images.githubusercontent.com/76042091/207576431-b957269f-72f3-4c36-8ba5-5bc6b59c619f.jpg)

Alert if email already or username already exist in the database.

![alertfailusernameoremailexist](https://user-images.githubusercontent.com/76042091/207576724-b19efb2a-7770-4b2d-acb0-6cfc268375ab.jpg)

Users can add items (meals) to cart after they insert quantity.

![pancakemenuadd](https://user-images.githubusercontent.com/76042091/207381480-321455da-eaa7-4957-855e-e980b8f99c00.jpg)

After inserting quantity, item is successfully added to cart.

![successaddtocart](https://user-images.githubusercontent.com/76042091/207573422-dee15923-7e98-42b8-8f10-348b217481b0.jpg)