### Food ordering application - Bachelor Project

This project was initiated during my bachelor's studies. Even though I've finished my studies, I'm still working on and improving the app, adding new features to make it better.

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
- Create, delete (logically) and update meal types in the database (including uploading images)
- Create, delete (logically) and update meals (including uploading images)
- Logically delete users (change their isDeleted status, their data remains in the database)
- View active final orders
- Delete final orders and all their ordered items from the database
- View the order history
- Create, delete, and update employee data (users with the *EMPLOYEE* role)

Application has fully responsive design for users who order the food.

### Application UI preview:

Users first need to select the specific category, then they can see complete offers for that category.

![1-new](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/a1c789d9-8727-4f54-82c1-a544dba91e12)

![2-new](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/1d02c090-e392-452f-81ea-98f6036fe26c)
![3-new](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/21af3116-9c62-4d4a-a2c6-8208833d8411)

After choosing category (meal type), available meals (offers) will be listed.

![4](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/cbb4d2dc-efcd-4bbd-870a-91b98ef6167b)

![5](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/605b88ed-3bae-45e5-9073-3aba13ec63ee)
![6](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/c2d284cf-2ba6-4d75-ac5f-c9a206ee0b7c)

Users can add items (meals) to the cart after they specify quantity. Default and minimum value for quantity is 1 and users can't go below that value. 
After clicking on *Confirm* button, item is successfully added to the cart.

![7](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/6fc5fd43-ad76-4041-9f6b-16a9ee7b058a)
![8](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/947abcfe-86f2-41e3-9479-1bc9b043f9e7)

![9](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/f3e7ada8-e794-468c-9b85-f29edb5d9778)
![10](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3707e695-44ee-434c-b5df-5fb9e3c06791)

Clicking on the cart button or icon in the navigation, users can see items from the cart.

![11](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/e24b2caf-209a-4574-9bad-bb80c5fc9bc5)

![12](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/deb62c95-2bc2-4df5-9c69-156232fdbe9f)
![13](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/d5c3b2af-260e-4821-b864-f7e96a4325da)

Users that are not logged-in, need to insert details such as address and phone number.

![14](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/73eb8ed0-5dae-4931-9f1e-2df35dba8680)

Without inserting details, not logged-in users can't confirm the final order 

![15](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/c8059b1b-f5bb-4ff6-8add-9d55bc821304)

Validation if inserted phone number is a number or it has less than 5 digits

![16](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ae42d4f4-e96b-4c32-ac98-8bb6d83638fe)

![17](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/51bac0a0-9985-402c-bab8-874b9c511a15)

After valid input, final order will be confirmed and not logged-in users can track their order status clicking on the link.

![18](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/527d6246-6903-4c15-a322-606aeeecee9b)

![19](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/970363e4-eaa5-433e-94c2-312b287e7c3a)

![20](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/bf234304-f9db-4a28-a955-db52a6af64c6)

Clicking on *Show items* button, user can see all items from the (final) order that he ordered.

![21](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/fd532af9-7204-4696-91d4-bbe10db6700f)
![22](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/94171e40-5d5f-431d-a0d6-e8b1aed71897)

![23](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ae737b0a-c365-43d3-925e-58e44aef56e7)
![24](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/cc1f19a9-9f63-4623-a4a0-feeb709f7948)

Logged-in users get 10% discount on the final price of their order. Also they don't need to insert details, such as address and phone number, because it's stored in the database after registration. Logged-in users also have more tabs and options.

![25](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/b5f8cb96-1e13-4687-a115-e2881c3b7501)

![26](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/d727a736-33c9-4f1c-80a8-80f478f742a0)
![27](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/968a80a1-16da-42be-ad36-bc2271993cc4)

Logged-in users can track their active orders (*IN PREPARATION* and *ORDERED* status) clicking on *My active orders tab*. Final orders with *IN DELIVERY* status will be visible clicking on *My order history* tab.

Clicking on *Show items* button, user can see his ordered items

![28](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/75066e84-1303-438a-8035-1c8c84ee7c10)

![29](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/2fbfacc1-b8e8-40b1-869b-d6848f0ce8b3)

![30](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/01e06d25-ad76-48eb-9b7d-910a90b5ed55)
![31](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/95388b1b-b65d-47f7-8fbf-605c59542898)

Admin have option to delete final order and all its ordered items from the database, but he doesn't have an option to change status as employee can do (same component shows for both roles, but they don't have same available actions).

![exc-admin-delete](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/09b9db37-eddc-4921-9841-05ff9cb6ae2a)
![exc-admin-delete-2](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/6b2599bb-689d-412b-918f-3a773325242d)

Employee can see and change status of the final order depending on real status of the order, which user can track (but they can't delete them as Admin can do).

![32](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/b22727a1-598a-43e9-8b2c-a6637b45f3a8)

Clicking on *Show items* button, employee can see all items from the (final) order.

![33](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/58fdc043-a19a-4f72-94ae-fc493a9c4416)

All orders with status *IN DELIVERY* are placed in order history, they aren't considered active anymore

![34](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/3b0dcca3-8371-4ec5-b537-3bffc42ec52e)

Login component shows when the app starts.

![35](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/b3d0bf70-23cd-464f-b277-569a95550971)

![36](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/ad44cd0f-dc62-4c45-8bd2-4949930de848)
![37](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/d31f8600-59a3-4980-99d2-3b9cac4b6a5f)

Logged-in users can access their profile page where they edit profile or change password if necessary.

![38](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/c6a1e444-e785-44a6-93f0-ade0ab594084)

Edit profile

![39](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/73e35977-3052-4c5c-b342-49750021eeed)

![40](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/67f96241-9455-44e0-9317-1cd0c07630b0)
![41](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/2ff5e2c8-74ad-4e43-81b4-09c45e34ab5c)

When user wants to change password, he needs to insert old password as well.

![42](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9289d332-6d87-4965-9fe8-68c7f941528b)

If inserted old password and password from the database don't match, he won't be allowed to save new password.

![43](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/79e784eb-c404-4160-9dab-cb7464c78487)

If they match, new password will be saved successfully (will be encripted and saved in the database)

![44](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/d7541c6c-40a8-4d2c-bba8-e7fb9db4cc09)

Registration (unregistered users can sign up and they will have 10% off on every order)

![45](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/95c8ed46-8986-4635-b9f2-079b3e67e0de)

Validation and alert if username already exists in the database.

![46](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/1c33944a-f51c-44dc-8f73-2935c6e4cc65)

Validation and alert if email already exists in the database

![47](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/84a6ec13-2b36-4dab-b203-26a39ecff789)

Registration design for mobile screen size

![48](https://github.com/bujakkristijan/food-ordering-app/assets/76042091/9f52480d-5d50-4b00-a388-a36117da8088)
