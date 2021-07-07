# Conference Management Tool

As part of our SE3040 – Application Framework Group Project, we will develop a Web application for a Conference management tool based on the requirements given in the assignment.

Youtube :movie_camera: https://www.youtube.com/watch?v=HG2UhEKuO2k

Demo :earth_asia: https://conference-management-sliit.herokuapp.com

Final report :books: https://conference-management-sliit.herokuapp.com/public/file/view/250dded4b76d49bcb037f2a9268cafa0

User guide :blue_book: https://conference-management-sliit.herokuapp.com/public/file/view/2d4c33107cb64074b44e75f92ca024bf

</br>

## :computer: Technology

##### ✤ Layered Architecture
##### ✤ React + Material UI
##### ✤ Node JS + Express JS
##### ✤ Mongo database
##### ✤ Mail trap + Twilio + Payhere

</br>

## :information_desk_person: Individual Contribution

### 1) Manuka Yasas

##### Refer the branch master : https://github.com/manuka99/Conference-Management-Tool/tree/master

1. Role based authentication using JWT. </br>
2. Secure password recovery. </br>
3. User Registration for both members and administrators.</br>
4. Intergrating <b>Payhere payment gateway</b> to process payments. </br>
5. Intergrating <b>Mail trap</b> to send emails to users. </br>
6. Intergrating <b>Twilio cloud services</b> to send password recovery link to users. </br>
7. In app notifications to administrators based on role for user(members) and post updates. </br>
8. View and revoke user <b>signed in devices</b>(Only for administrators).</br>
9. Intergrating a <b>file viewer</b> to view uploaded files.
10. Unit Test Cases related to member registration.
11. Developing User interfaces related to all the above features and Lazy loading react components.
12. Deploying the master branch in cloud using heroku and Atlas mongo database.

#### Application flow

A user can register as an Innovator, Researcher, Presenter or as an Attendee. All users must submit their basic contact information along with some additonal details based on their role selected. http://conference-management-sliit.herokuapp.com/public/auth/register
</br>To register as an Innovator, user must submit their innovation details in PDF format and also must pay LKR 800.00.
</br>To register as a Researcher, user must submit their research details in PDF format.
</br>To register as a Presenter, user must submit their presentation details in PDF format.
</br>To register as an Attendee, user must pay LKR 500.00.
</br>To process payments, users can use the payhere payment gateway which is intergrated to the application. http://conference-management-sliit.herokuapp.com/public/payment

</br>After a successfull registration, a welcome message will be emailed. Users can request a password recovery http://conference-management-sliit.herokuapp.com/public/auth/recover-password. If there is an account associated with the email provided, a password reset link will be emailed as well as sent to their mobile number. This reset link will be valid only for 10 minutes. https://conference-management-sliit.herokuapp.com/public/auth/reset-password/8928a3cd020eb6115ec24ca21092a1d5b4f9182663657f590ec5207685ac6fce/manukayasas99@gmail.com/ManukaYasas
</br></br>
Administrators can update their profile, change password and manage signed in devices. Administrators can view the locations and ip addresses of the devices logged in with their credentials and revoke a particular device.
</br>
</br>Administrators with role ADMIN and REVIEWER can view members account details and accept or reject the account with a message.
</br>Administrators with role ADMIN will recieve notifications for every user registration.
</br>Administrators with role ADMIN or REVIEWER will recieve notifications for every user account approval or rejection.
</br>Administrators with role ADMIN or EDITOR can create a new post.
</br>Administrators with role ADMIN can approve or reject a post.
</br>Administrators with role ADMIN or EDITOR will recieve notifications for every update on posts.

### 2) Nethmi Divya

##### Refer the branch divya : https://github.com/manuka99/Conference-Management-Tool/tree/divya

Users can view conference/workshop details without login to the system. But only registered user
can request for conduct workshop or conference. For registration, user can add their details to the
given form and submit it. For registration for conduct workshop also user need to submit given
form.

### 3) Harini

##### Refer the branch harini : https://github.com/manuka99/Conference-Management-Tool/tree/harini

Authors can submit, update, delete and see the details of a submitted papers under paper
management. Not only that user can download templates from the site. Users can also create their
own templates and upload them to the site. Furthermore, they can update and delete those
templates.
When submitting a paper, the details of the paper such as title, subject of the paper, names of the
authors, type of the paper, number of the pages in the paper and submitting date will be taking as
the inputs. Date is not compulsory to fill, if that field is empty, the default value will be set to the
current date and time. The content of the paper should be uploaded to the site in pdf format. The
templates also can be uploaded to the site and if in need of uploading an updated version, user can
delete the previous and upload the new one.

</br>

## User Interfaces

![conference-management-sliit herokuapp com_public_auth_register (7)](https://user-images.githubusercontent.com/63389716/124611785-66b8aa80-de8f-11eb-99a0-f9593fe144ae.png)
![conference-management-sliit herokuapp com_public_auth_register (8)](https://user-images.githubusercontent.com/63389716/124611796-691b0480-de8f-11eb-9aab-4928652b90e2.png)
![conference-management-sliit herokuapp com_public_auth_register (9)](https://user-images.githubusercontent.com/63389716/124611801-6a4c3180-de8f-11eb-8669-651c8e57f7c1.png)
![conference-management-sliit herokuapp com_public_auth_reset-password_e5662c8ce2a25252bcf8758f11b09e17767d1031f8430a6f0da550ea5acd6765_manukayasas99@gmail com_ManukaYasas](https://user-images.githubusercontent.com/63389716/124611858-7afca780-de8f-11eb-8ac4-eb89fb3e6ef5.png)
![conference-management-sliit herokuapp com_public_payment](https://user-images.githubusercontent.com/63389716/124611877-7df79800-de8f-11eb-88d6-35470b33d22e.png)
![sandbox payhere lk_pay_checkout](https://user-images.githubusercontent.com/63389716/124611903-8223b580-de8f-11eb-9106-286dba74b59f.png)
![conference-management-sliit herokuapp com_protected_](https://user-images.githubusercontent.com/63389716/124611937-89e35a00-de8f-11eb-8874-981580242630.png)
![conference-management-sliit herokuapp com_protected_posts (2)](https://user-images.githubusercontent.com/63389716/124611961-8fd93b00-de8f-11eb-854b-9f23a073669f.png)
![conference-management-sliit herokuapp com_protected_profile_security (1)](https://user-images.githubusercontent.com/63389716/124611999-98317600-de8f-11eb-82e1-c67e2394e712.png)
![conference-management-sliit herokuapp com_protected_profile_devices](https://user-images.githubusercontent.com/63389716/124612013-99fb3980-de8f-11eb-93f3-6bd5cf0c3fe8.png)
![conference-management-sliit herokuapp com_protected_users_60e05e09962dde0015a7136f](https://user-images.githubusercontent.com/63389716/124612034-9f588400-de8f-11eb-9c0f-97e381a550e8.png)
![conference-management-sliit herokuapp com_protected_users_roles_admin](https://user-images.githubusercontent.com/63389716/124612051-a2ec0b00-de8f-11eb-98ae-3362420f7aa2.png)
![conference-management-sliit herokuapp com_protected_profile_security](https://user-images.githubusercontent.com/63389716/124612077-a8e1ec00-de8f-11eb-81cc-65bdbb22e1a8.png)
![conference-management-sliit herokuapp com_protected_profile](https://user-images.githubusercontent.com/63389716/124612098-ad0e0980-de8f-11eb-88d5-75d0954c59d2.png)
