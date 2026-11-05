# ⚡ Day 29 of Frontend: API Integration and SPA (Single Page Application)

Welcome to **Day 29 of the 100 Days Frontend Challenge**! Today's project focuses on two critical pillars of modern web development: **Consuming REST APIs** and understanding **Single Page Application (SPA)** architecture with clean, beginner-friendly code.

🔗 **Repository:** [harish-0987/DAY-29-OF-FRONTEND-](https://github.com/harish-0987/DAY-29-OF-FRONTEND-)

---

## 📌 Part 1: API Integration in the Frontend

### What is an API?
An **API (Application Programming Interface)** acts as a messenger between your frontend user interface and backend servers. It allows web applications to request data, authenticate users, and send updates across the network using the HTTP protocol.

### The 3 Core States of API Calls
Every robust API integration in frontend development must handle three states:
1. **Loading State (`isLoading = true`)**: Informing users that data is being fetched (showing skeletons, spinners, or loading messages).
2. **Success State (`data`)**: Rendering the received JSON data once the response arrives.
3. **Error State (`error`)**: Catching network failures or HTTP errors (`404`, `500`) and displaying a friendly message.

### Basic Code Examples

#### 1. Fetching Data with `GET` and `async/await`
```javascript
async function fetchUser() {
  try {
    console.log("Loading started... ⏳");
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const userData = await response.json();
    console.log("Success! Data:", userData);
    return userData;
  } catch (error) {
    console.error("API Fetch Failed:", error.message);
  } finally {
    console.log("Loading finished. ✅");
  }
}
```

#### 2. Sending Data with `POST`
```javascript
async function createPost(newPost) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });

    const result = await response.json();
    console.log("Created successfully:", result);
    return result;
  } catch (error) {
    console.error("POST failed:", error.message);
  }
}
```

---

## 📌 Part 2: SPA (Single Page Application) Architecture

### What is an SPA?
A **Single Page Application (SPA)** is a web application that loads only **one** HTML document (`index.html`). As the user clicks links or navigates, JavaScript dynamically intercepts the navigation and rewrites the DOM content in place, **without refreshing or reloading the entire web page**.

### Client-Side Routing (CSR)
In traditional websites (MPA), clicking a link requests a completely new HTML file from the server. In an SPA, the browser URL changes using **hash routing** (`#home`, `#products`, `#about`) or the **History API** (`pushState`), while JavaScript renders the matching view in real time.

```javascript
// Minimal Hash Router (Few Lines of Code!)
const routes = {
  "#home": "<h2>Home View 🏠</h2><p>Welcome to our SPA!</p>",
  "#products": "<h2>Products View 🛍️</h2><p>Explore our items.</p>",
  "#about": "<h2>About View ℹ️</h2><p>Learn more about Day 29.</p>"
};

function router() {
  const hash = window.location.hash || "#home";
  const viewContent = routes[hash] || "<h2>404 Not Found</h2>";
  document.getElementById("spa-content").innerHTML = viewContent;
}

// Listen for hash changes and initial page load
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
```

---

## 📊 Summary: SPA vs. MPA Comparison

| Feature | Single Page Application (SPA) | Multi-Page Application (MPA) |
| :--- | :--- | :--- |
| **Page Reloads** | ❌ None (Smooth, zero reloads) | ✅ Yes (Full page reload on every link) |
| **User Experience** | Fluid, app-like, fast transitions | Slower page transitions |
| **Routing** | Client-Side Routing (JavaScript) | Server-Side Routing |
| **Data Transfer** | Small JSON payloads via APIs | Entire HTML, CSS, and JS re-downloaded |
| **Popular Frameworks** | React, Next.js, Vue, Angular | Traditional WordPress, PHP, Django |

---

## 🚀 Interactive Features Included in This Project

- **Live API Fetcher (GET):** Fetches real-time sample user data with live loading spinner and status feedback.
- **API Creator (POST):** Sends custom user-entered titles/body to a REST endpoint and displays status `201 Created`.
- **Error Boundary Tester:** Intentionally triggers a 404 endpoint to demonstrate clean `try/catch` error state UI.
- **Client-Side SPA Hash Router:** Fully functioning multi-view SPA navigation (`Home`, `Products`, `About`, `Contact`) with zero page reloads.
- **SPA Performance Monitor:** Real-time page reload counter proving the browser never reloads during navigation.

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/harish-0987/DAY-29-OF-FRONTEND-.git
   ```
2. Open the project folder:
   ```bash
   cd DAY-29-OF-FRONTEND-
   ```
3. Open `index.html` in any modern web browser.

---

## 👤 Author
- **Harish** - [@harish-0987](https://github.com/harish-0987)
- 100 Days Frontend Challenge
