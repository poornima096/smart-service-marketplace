Yes 👍 That's the beginning of the README, but I notice one important thing: **your text has been formatted with `**` and `\` characters**, so it may not render correctly as Markdown.

Since you are editing `README.md`, **replace everything currently inside it** with the clean version below.

```markdown
# Smart Service Marketplace

A full-stack service marketplace application where customers can discover and book services, vendors can manage their services and bookings, and administrators can monitor registered users.

The application also includes an AI-powered service recommendation assistant using Spring AI and Ollama.

---

## 🚀 Features

### 👤 Customer

- Customer registration and login
- JWT-based authentication
- Browse available services
- View service details
- Book services
- View personal bookings
- Track booking status
- AI-powered service recommendation

### 🧑‍🔧 Vendor

- Vendor registration and login
- JWT-based authentication
- Add new services
- Manage customer bookings
- View booking requests
- Accept bookings
- Reject bookings

### 👨‍💼 Admin

- Secure admin login
- Admin dashboard
- View registered users
- View total number of users
- View customer count
- View vendor count
- View admin count

### 🤖 AI Service Assistant

Customers can describe the problem they have in natural language.

Example:

> I have a leaking bathroom tap and need someone to fix it.

The AI analyzes the customer's request and recommends an appropriate service category and service type.

The AI functionality is implemented using:

- Spring AI
- Ollama
- Qwen 2.5 1.5B

---

## 🏗️ Project Architecture

```text
Smart Service Marketplace
│
├── Frontend
│   └── React + Vite
│
├── Backend
│   └── Spring Boot
│
├── Database
│   └── MySQL
│
├── Authentication
│   └── JWT
│
└── AI
    └── Spring AI + Ollama
```

---

## 🛠️ Technologies Used

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- Lombok
- Maven

### Database

- MySQL

### AI

- Spring AI
- Ollama
- Qwen 2.5 1.5B

### Frontend

- React
- Vite
- Axios
- React Router
- HTML
- CSS
- JavaScript

### Development Tools

- Eclipse
- Visual Studio Code
- MySQL
- Postman
- Git
- GitHub

---

## 🔐 Authentication and Security

The application uses JWT-based authentication.

Users are assigned one of the following roles:

```text
CUSTOMER
VENDOR
ADMIN
```

Role-based authorization is implemented using Spring Security.

Protected APIs require a valid JWT token.

---

## 📌 Main Application Flow

### Customer Flow

```text
Register
   ↓
Login
   ↓
Customer Dashboard
   ↓
Browse Services
   ↓
AI Service Recommendation
   ↓
Book Service
   ↓
View Booking
   ↓
Track Booking Status
```

### Vendor Flow

```text
Register
   ↓
Login
   ↓
Vendor Dashboard
   ↓
Add Service
   ↓
Receive Customer Booking
   ↓
Accept / Reject Booking
```

### Admin Flow

```text
Admin Login
   ↓
Admin Dashboard
   ↓
View Users
   ↓
View Customer / Vendor / Admin Statistics
```

---

## 🔗 Backend API

Backend runs on:

```text
http://localhost:8084
```

### Authentication

```text
POST /api/users/register
POST /api/auth/login
```

### Services

```text
GET    /api/services
GET    /api/services/{id}
GET    /api/services/search?title={title}
GET    /api/services/category/{category}
GET    /api/services/location/{location}

POST   /api/services
```

### Bookings

```text
POST /api/bookings?serviceId={serviceId}

GET /api/bookings/my

GET /api/bookings/vendor

GET /api/bookings/user/{userId}

PUT /api/bookings/{bookingId}/status?status={status}
```

### Admin

```text
GET /api/admin/users
```

### AI

```text
GET  /api/ai/test

POST /api/ai/recommend
```

---

## 🤖 AI API Example

Request:

```json
{
  "request": "I have a leaking bathroom tap and need someone to fix it."
}
```

The AI returns a service recommendation based on the customer's request.

---

## ⚙️ How to Run the Backend

### 1. Start MySQL

Make sure MySQL is running.

Make sure the database configuration in `application.properties` is correct.

### 2. Start Ollama

Make sure Ollama is installed and running.

The project uses:

```text
qwen2.5:1.5b
```

Check the installed models:

```bash
ollama list
```

If required:

```bash
ollama pull qwen2.5:1.5b
```

### 3. Start Spring Boot

Open the backend project in Eclipse.

Run the Spring Boot application.

Backend will start at:

```text
http://localhost:8084
```

---

## 💻 How to Run the Frontend

Open the frontend project in Visual Studio Code.

Open the terminal and run:

```bash
npm install
```

Then:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## 🧪 Testing

The backend APIs were tested using Postman.

The application was tested for:

- User registration
- User login
- JWT authentication
- Role-based authorization
- Service creation
- Service listing
- Service search
- Booking creation
- Vendor booking management
- Booking status updates
- Admin user management
- AI service recommendations

---

## 📷 Screenshots

Screenshots of the following application pages can be added here:

### Home Page


![Login Page](screenshots/Login%20Page.png)


### Customer Dashboard

![Customer Dashboard](screenshots/Customer%20Dashboard.png)



### Login Page

![Login Page](screenshots/Login%20Page.png)

### Admin Dashboard

![Admin Dashboard](screenshots/Admin%20Dashboard.png)

---

## 🔮 Future Enhancements

Possible future improvements include:

- Online payment integration
- Service ratings and reviews
- Vendor profile pages
- Customer notifications
- Email notifications
- Advanced service filtering
- Location-based service discovery
- Booking history and analytics
- Admin service management
- AI-based vendor matching

---

## 👩‍💻 Author

**Poornima HN**

Smart Service Marketplace  
Full Stack Java Project

---

## 📄 License

This project was developed as an academic / portfolio project.
```

### Then press:

**Ctrl + S**

