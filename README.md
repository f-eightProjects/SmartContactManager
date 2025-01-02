# Smart Contact Manager

Smart Contact Manager is a web application designed to manage contacts efficiently. It combines robust backend functionality with a user-friendly frontend to offer a seamless contact management experience.

## Features

- **Secure User Authentication:**
  - Self-provider login and sign-up.
  - OAuth 2.0 support with Google and GitHub.
- **Contact Management:**
  - Store and manage contacts in the cloud.
  - Fields include name, email, phone number, and social links (LinkedIn, website).
- **Profile Management:**
  - Default profile pictures for self-provider sign-ups.
  - Google profile picture integration.
- **Cloudinary Integration:**
  - Efficient media storage for user-uploaded images.
- **Customizable User Experience:**
  - Clean, responsive UI using Tailwind CSS and Flowbite.
  - Profile page showcasing user details.

## Technologies Used

### Backend:
- Java
- Spring Boot
- Hibernate

### Database:
- MySQL

### Frontend:
- HTML
- CSS
- JavaScript
- Tailwind CSS
- Flowbite
- Thymeleaf

### Other Tools:
- Cloudinary (for cloud storage)
- MySQL Workbench (local database management)

## Installation

### Prerequisites:
- Java 11 or later
- MySQL
- Maven
- A Cloudinary account
- Git

### Steps:
1. Clone the repository :
   
   ```bash
   git clone https://github.com/your-username/Smart-Contact-Manager.git
   cd Smart-Contact-Manager
2. Configure MySQL :
   - Create a database named smart_contact_manager or scm or scm2.0 or anything f your choice.
   - Update `application.properties` with your MySQL credentials.
  

   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
3. Configure Cloudinary :
   - Add your Cloudinary credentials to `applications.properties` :
  
  
   ```bash
   cloudinary.cloud_name=your_cloud_name
   cloudinary.api_key=your_api_key
   cloudinary.api_secret=your_api_secret
4. Build the project :
   
   ```bash
   mvn clean install
5. Run the application :
   
   ```bash
   mvn spring-boot:run
6. Access the application at http://localhost:8081
