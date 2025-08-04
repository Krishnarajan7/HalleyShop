**HalleyShop – Full-Stack E-commerce Platform**
===============================================

HalleyShop is a **full-featured e-commerce web application** built with **React (frontend)**, **Node.js/Express (backend)**, and **PostgreSQL with Prisma ORM**.It supports **two distinct roles**:

*   **Customers** – Shop products, manage cart & orders, update profile.
    
*   **Admins** – Manage products, customers, and orders via a powerful dashboard.
    

**✨ Features**
--------------

### **Customer Portal**

✅ User Authentication (Register, Login, JWT-based Auth)✅ Browse Products (Search, Filter, Pagination)✅ Cart & Checkout System✅ Order Management (View, Cancel Orders)✅ Profile Management (Update Info & Password)✅ Wishlist & Address Management✅ Mobile-friendly UI

### **Admin Portal**

✅ Dashboard with Analytics✅ Product Management (Full CRUD + Bulk Upload)✅ Customer Management (CRUD, Impersonate Customer, Reset Password)✅ Order Management (View & Update Status)✅ Portal Branding (Logo, Colors, Fonts)

**🛠 Tech Stack**
-----------------

**Frontend:**

*   React.js
    
*   ShadCN UI + Tailwind CSS
    
*   Axios for API Calls
    
*   Lucide Icons
    

**Backend:**

*   Node.js + Express
    
*   Prisma ORM
    
*   PostgreSQL Database
    
*   Zod for Validation
    
*   JWT for Authentication
    
*   Multer + Cloudinary for Image Upload
    

**Other:**

*   Day.js for Date Formatting
    
*   Sonner for Toast Notifications
    

**📂 Project Structure**
```
HalleyShop/
├── backend/
│   ├── controllers/       # API controllers
│   ├── routes/            # API routes
│   ├── middlewares/       # Auth & Error handling
│   ├── validations/       # Zod validation schemas
│   ├── prisma/            # Prisma schema & migrations
│   └── server.js          # App entry
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Main pages
    │   ├── context/       # Auth & Cart context
    │   └── App.jsx        # Main App
```
**🚀 Setup & Installation**
1. Clone Repo
```
git clone https://github.com/your-username/HalleyShop.git
```
_then_
```
cd HalleyShop
```
2. Backend Setup
```
cd backend
```
_then_
```
npm install
```
Create .env file:
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/halley_shop"
JWT_SECRET="your-secret"
CLOUDINARY_URL="your-cloudinary-config"
```
**Run Prisma migration:**
```
npx prisma migrate dev
```
Start backend:
```
npm run dev
```
3. Frontend Setup
```
cd ../frontend
```
_then_
```
npm install
```
Create .env file:
```
VITE_API_URL="http://localhost:8080/api"
```
**Start frontend:**
```
npm run dev
```
**🔐 Authentication**
---------------------

*   **JWT** tokens stored in HTTP-only cookies.
    
*   **Protect Middleware** for private routes.
    
*   **Role-based Access Control** for admin routes.

**✅ Roadmap**
---------------------
* ✅ Product & Customer Management
* ✅ Cart & Orders
* ✅ Authentication & Profile Management
* 🔜 Payment Gateway Integration
* 🔜 Reviews & Ratings

## 📜 License
This project is licensed under the [MIT License](LICENSE).
