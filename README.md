### Food ordering application 

Project is implemented using ReactJS (Hooks) library and Java Spring Boot framework (Hibernate, Spring Secuirty with JSON Web token, REST API) with some additional libraries (Bootstrap, AXIOS, Sweetalert, Redux and few more).

### Project specification

The main purpose of the application is to enable users to view restaurant offers, place food orders, then track the status of their orders, which can be updated by employees. The system consists of three user roles with different capabilities:
- ADMIN
- EMPLOYEE
- USER

The application can also be accessed by unregistered users, who have the following abilities:
- Register an account
- Order food by selecting different meals and specifying quantities. The user can view the menu, choose a meal type, and see the complete offer for that type. By clicking on a selected meal, a modal window appears, allowing the user to enter the quantity and add the meal to the cart. To confirm the final order, a new modal window appears where the user enters their address and phone number since they are not logged in. After successfully placing an order, the user receives a message containing a link to track the order status.

Registered users with the *USER* role can log into the system using their username and password. They have the following abilities:
- Update their personal information
- Order food similar to unregistered users, but without the need to enter their address and phone number since their data is already saved in the system.
- Receive a 10% discount on every order
- View their active orders (with *ORDERED* and *IN PREPARATION* status)
- View the history of their orders (with *IN DELIVERY* status)

Users with the *EMPLOYEE* role have the following abilities:
- Review all incoming orders and change their status to *IN PREPARATION* or *IN DELIVERY*, depending on whether the orders are being prepared or in the process of  delivery.
- View the history of all orders.

Users with the *ADMIN* role have the following abilities:
- Create, delete, and update meal types in the database (including uploading images)
- Create, delete and update meals (including uploading images)
- Logically delete users (change their status, their data remains in the database)
- View the order history
- Create, delete, and update employee data (users with the *EMPLOYEE* role)

### Application UI preview:

Every user can see meals after choosing the meal type first.

![menu2](https://user-images.githubusercontent.com/76042091/207375484-c348115b-9f37-46ea-8c4c-f1b886a171da.jpg)

Users can add items (meals) to the cart after they insert quantity.

![pancakemenuadd](https://user-images.githubusercontent.com/76042091/207381480-321455da-eaa7-4957-855e-e980b8f99c00.jpg)

After inserting quantity, item is successfully added to the cart.

![successaddtocart](https://user-images.githubusercontent.com/76042091/207573422-dee15923-7e98-42b8-8f10-348b217481b0.jpg)

There are additional tabs in the navigation bar that logged-in user can use.

![cartloggedin](https://user-images.githubusercontent.com/76042091/207377274-be2a1ddd-0dfa-4312-97f8-d4993d654a8d.jpg)

Additional tabs are not shown in the navigation bar when user is not logged in.

![cart2](https://user-images.githubusercontent.com/76042091/207376805-303f7a19-023d-4a10-9e3c-672d2b92a457.jpg)

Logged-in users get 10% discount on the final price of their order. Also they don't need to insert details, such as address and phone number, because it's stored in data base after registration.

![finalorderconfirm](https://user-images.githubusercontent.com/76042091/207379965-6182f926-56a0-4783-aec3-ac772c431635.jpg)

Users that are not logged-in need to insert details such as address and phone number.

![insertdetailsnotlogged](https://user-images.githubusercontent.com/76042091/207380537-85ba0143-dad8-466c-8263-b51f7c4af82b.jpg)

When the user in not logged-in, he can track order status clicking on the link after the order is confirmed.

![statusnotlogged](https://user-images.githubusercontent.com/76042091/207575418-b4af2a5d-0e1c-4a12-828f-cc32b34209d9.jpg)

![statusnotlg2](https://user-images.githubusercontent.com/76042091/207575713-6184abdf-9c07-43f1-8efa-4dd9e4eba10b.jpg)

Clicking on "Show items" button, user can see all items from the (final) order.

![showitemsnotlogged](https://user-images.githubusercontent.com/76042091/207575732-50de1794-2b44-45e4-93c5-1203438ed3b6.jpg)

Employee can see and change status of the final order depending on real status of the order, which user can track.

![status1](https://user-images.githubusercontent.com/76042091/207382882-c0bc7deb-b991-4896-aaf5-e60b7d88de9b.jpg)

![status2](https://user-images.githubusercontent.com/76042091/207382915-d5d1e7a7-8c55-4eb2-b6a1-ba1123f73b8e.jpg)

Clicking on "Show items" button, employee can see all items from the (final) order.

![ацтивефиналордерсхоњ](https://user-images.githubusercontent.com/76042091/207574541-1210417e-8523-47a1-b0f8-4af1ce9d858e.jpg)

Login component shows when the app starts.

![login2](https://user-images.githubusercontent.com/76042091/207374137-7b5acf55-8416-4b1c-9620-008cca1fd5de.jpg)

Logged-in users can access their profile page where they can see and change details if necessary.

![myprofile](https://user-images.githubusercontent.com/76042091/207382087-b5d9a567-6ff1-41ff-94a3-19c0ee2fea6d.jpg)

Registration 

![registration](https://user-images.githubusercontent.com/76042091/207576431-b957269f-72f3-4c36-8ba5-5bc6b59c619f.jpg)

Alert if email already or username already exist in the database.

![alertfailusernameoremailexist](https://user-images.githubusercontent.com/76042091/207576724-b19efb2a-7770-4b2d-acb0-6cfc268375ab.jpg)

