# ReelShare Client

## Overview

ReelShare is a modern web application built with **React** and **Vite**. It utilizes various libraries for styling, state management, and data fetching to create an efficient and seamless user experience.

### **Tech Stack**

-  **Framework:** React + Vite
-  **Styling:** Tailwind CSS and shadcn/ui
-  **State Management:** React Context API
-  **Form Handling:** React Hook Form
-  **Data Fetching:** TanStack React Query
-  **Routing:** React Router
-  **Animations:** Framer Motion

## **Running the Application**

### **1. Access the Deployed Application**

The ReelShare Client is deployed and accessible online. You can check it out at:

🔗 [ReelShare Deployed Application](https://reelshareclient.netlify.app/)

---

### **2. Running in Docker**

#### **Prerequisites**

-  Install [Docker](https://docs.docker.com/get-docker/)

#### **Steps to Run in Docker**

1. Clone the repository:
   ```sh
   git clone https://github.com/mizanmahi/reelclient.git
   cd reelclient
   ```
2. Build and run the Docker container:
   ```sh
   docker build -t reelclient .
   docker run --name reelclient-container -p 3000:3000 reelclient yarn dev --host
   ```
3. Access the application at:
   ```
   http://localhost:3000
   ```

---

### **3. Running Locally**

#### **Prerequisites**

-  Install [Node.js](https://nodejs.org/en/download/) (version 20 or later)
-  Install [Yarn](https://yarnpkg.com/getting-started/install)

#### **Steps to Run Locally**

1. Clone the repository:
   ```sh
   git clone https://github.com/mizanmahi/reelclient.git
   cd reelclient
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Start the development server:
   ```sh
   yarn dev
   ```
4. Access the application at:
   ```
   http://localhost:3000
   ```

---

## **Backend Repository**

The backend for this application is hosted separately. You can find it here:

🔗 [Backend Repository Link](https://github.com/mizanmahi/reelserver.git)

⚠ **Warning:** Make sure to spin up the backend server before checking the frontend to ensure full functionality!
