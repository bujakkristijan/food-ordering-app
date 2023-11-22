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
- Order food similar to unregistered users, but without the need to enter their address and phone number since their data is already saved in the database.
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

Application has fully responsive design for users who order the food.

### Application UI preview:

Users first need to select the specific category, then they can see complete offers for that category.

![1-menu-replaced](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/aa5e1993-563a-4683-99df-615e19afeb01)

![2-menu-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/456b9692-e857-4809-a0e1-8e78808c059e)
![2-menu-mobile-2-second](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9ceffe04-2998-4741-b5bb-8f8556fbda8b)

After choosing category (meal type), available meals (offers) will be listed.

![3-menu](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/0b185333-f6e7-4cae-bdfc-5738dae4af9a)

![4-menu-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/fd00e68c-9014-435e-8204-de3202aeefc8)
![4-menu-mobile-2](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e5933445-b8f0-4254-8b2c-605b6494ab6d)

Users can add items (meals) to the cart after they insert quantity.
After inserting quantity and submiting, item is successfully added to the cart.

![5-insert-quantity-new](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ce6693b9-97de-4c61-bd3c-87aae0f6f6b7)
![6-success-insert-quantity-new](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/23081500-83aa-483b-a98f-9434baaace2e)

![5-insert-quantity-mobile-new](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/fd34b04d-71a3-4060-82a3-24cfb3fb37ec)
![6-success-insert-quantity-mobile-new](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3f1399f5-e7d1-4cd8-ac89-14350ef750b7)

Clicking on cart button or icon in navigation, users can see items in the cart

![7-cart](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ebaea060-225c-4f3c-b1af-856158997a48)

![8-cart-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e6c4ce28-c800-403a-93db-1f8c7d07bdaa)
![8-cart-mobile-2](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/bb0d22bd-d82b-4b86-b630-33045d25b931)

Users that are not logged-in, need to insert details such as address and phone number.

![9-insert-details](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/132bdb18-ff94-4127-a728-be7b2fbc6a69)

Without inserting details, not logged-in users can't confirm the final order 

![10-insert-details-invalid](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/10ccafa7-8348-471c-a54e-7f6fe0d35a9e)

Validation if inserted phone number is a number or it has less than 5 digits

![11-insert-details-invalid-input](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/5b5d103c-8697-4d52-ad39-40f1d3d1b0c6)

![12-insert-details-alert-invalid-digits-phone](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e5b5b9b4-b7cd-46dc-bcda-52c8168e6aa5)

After valid input, final order will be confirmed and not logged-in users can track their order status clicking on the link.

![13-insert-details-valid-input](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/a70a6f58-7057-4042-9c15-5f9f5b06c1e7)

![14-are-you-sure-notlogged-EXCEPTION](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/589c5eb2-8da8-4800-8daa-9c805ea461c6)

![15-link-success-order](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/2224c2d7-f3d7-4b5c-a3d8-4e778df9d9d9)

Clicking on *Show items* button, user can see all items from the (final) order that he ordered.

![16-final-order-by-id](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/f2265ea6-817a-4e0c-af36-e9f5a55b367e)
![18-show-items](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ff0767a7-8a3d-434b-ae01-0765005b4540)

![17-final-order-by-id-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/bba08758-0c57-4c75-bc3a-4f2f115f417d)
![19-show-items-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/8d4fea1c-df71-4fd8-bd96-c2f0bd5a1def)

Logged-in users get 10% discount on the final price of their order. Also they don't need to insert details, such as address and phone number, because it's stored in the database after registration. Logged-in users also have more tabs and options.

![21-are-you-sure-logged](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/87415774-a552-49e0-8eb0-dfac7f14b9e9)

![22-are-you-sure-mobile-1](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/cb331a7a-8f87-4a55-b78b-0aeb9d142215)
![23-are-you-sure-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9488ef9e-1911-4ee5-9895-5a78d9277e5f)

Logged-in users can track their active orders (*IN PREPARATION* and *ORDERED* status) clicking on *My active orders tab*. Final orders with *IN DELIVERY* status will be visible clicking on *My order history* tab.

Clicking on *Show items* button, user can see his ordered items

![24-my-active-final-orders](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e969ee1e-734a-4b61-892e-088335864172)

![26-order-items](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/5b4ca6fc-7b6f-4922-b644-b59183a8bfb5)

![25-my-active-fo-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/f9581232-19bb-4769-9746-ae0f2b5338af)
![27-order-items-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/043c0418-2b6c-4b0d-97cc-5d4d8727e706)

Employee can see and change status of the final order depending on real status of the order, which user can track.

![28-employee-active-final-orders](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/f871f506-e523-4dab-adae-263e00e3000d)

Clicking on *Show items* button, employee can see all items from the (final) order.

![29-employee-active-final-orders](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/d90255a5-68b3-40d5-8b7a-b6d690c91951)

All orders with status *IN DELIVERY* are placed in order history, they aren't considered active anymore

![30-employee-order-history](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/5d2fd8a9-b92b-4dc8-bc32-c89e48562012)

Login component shows when the app starts.

![31-sign-in](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/fc20e0fe-39e4-4445-923a-870fe8b7b05c)

![32-sign-in-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e710a3e8-3368-45fc-a1a3-259892eec269)
![33-signed-in-mobile-3](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/dc0a1fcf-36bd-4dd3-84cf-86a29ff60845)

Logged-in users can access their profile page where they edit profile or change password if necessary.

![34-my-profile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9b0f6af1-82d7-4542-895e-b1597f57e4c2)

Edit profile

![35-edit-my-profile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/6ce0754a-7700-48f9-870a-2eb263fff1b8)

![36-edit-profile-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ff940da0-9815-4fc3-86ab-e1edb11d5e0e)
![37-edit-password-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/a61e3b2b-a4d5-4b1f-9ca3-828b3c3617c2)

When user wants to change password, he needs to insert old password as well.

![38-edit-password-insert](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/db3da865-6114-4156-9f26-b21dfce3d385)

If inserted old password and password from the database don't match, he won't be allowed to save new password.

![39-edit-password-dontmatch](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/18241d38-396c-47f5-a7f8-d0167deae796)

If they match, new password will be saved successfully (will be encripted and saved in the database)

![40-edit-pass-success](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/b3ce4dc2-61cb-4f24-a6cb-0d4dc9f0edc8)

Registration 

![41-registration](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/73089cfa-1eff-47df-812b-d009c0011218)

Validation and alert if username already exists in the database.

![41-username-exists](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/16827dc4-e470-4d11-9302-f65abf493382)

Validation and alert if email already exists in the database

![42-email-exists](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/6ef2aa44-664c-420f-9252-f7667a304b59)

Registration design for mobile screen size

![43-registration-mobile](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/38d98499-89c9-404a-8619-e27dcd730c57)
