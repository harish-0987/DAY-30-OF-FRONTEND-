// ======================================================
// Day 29: API Integration & SPA Architecture (Basic Level)
// 100 Days Frontend Challenge by Harish (@harish-0987)
// ======================================================

// ------------------------------------------------------
// 1. API GET REQUEST (Loading, Success & Data States)
// ------------------------------------------------------
async function handleFetchUser() {
    const output = document.getElementById("api-get-output");
    const chips = document.getElementById("api-get-chips");

    // 1. Loading State
    if (output) {
        output.innerHTML = `
            <div class="spinner-wrap">
                <div class="spinner"></div>
                <span style="color: #06b6d4;">Fetching user data from API... (isLoading = true)</span>
            </div>
        `;
    }

    try {
        // Attempt network fetch with fallback simulation if offline
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);
        }

        const data = await response.json();

        // 2. Success State
        if (output) {
            output.innerHTML = `
                <div style="color: #67e8f9; font-weight: 700; margin-bottom: 4px;">👤 ${data.name} (@${data.username})</div>
                <div style="color: #9ca3af; font-size: 0.85rem;">Email: ${data.email} | City: ${data.address ? data.address.city : "Internet"}</div>
                <div style="color: #9ca3af; font-size: 0.85rem;">Company: ${data.company ? data.company.name : "Tech Corp"}</div>
            `;
        }

        if (chips) {
            chips.innerHTML = `
                <span class="step-chip">Status: 200 OK ✅</span>
                <span class="step-chip">Method: GET</span>
                <span class="step-chip">isLoading: false</span>
            `;
        }
    } catch (err) {
        // Offline / fallback mock data to ensure demo always works
        const mockData = { id: 1, name: "Harish Kumar", username: "harish-0987", email: "harish@example.com", city: "Bengaluru" };
        if (output) {
            output.innerHTML = `
                <div style="color: #67e8f9; font-weight: 700; margin-bottom: 4px;">👤 ${mockData.name} (@${mockData.username}) [Simulated Data]</div>
                <div style="color: #9ca3af; font-size: 0.85rem;">Email: ${mockData.email} | City: ${mockData.city}</div>
            `;
        }
        if (chips) {
            chips.innerHTML = `
                <span class="step-chip">Network Note: Fallback mock data served</span>
                <span class="step-chip">Handled gracefully ✅</span>
            `;
        }
    }
}

// ------------------------------------------------------
// 2. API POST REQUEST (Sending JSON Payloads)
// ------------------------------------------------------
async function handleCreatePost(event) {
    if (event) event.preventDefault();

    const titleInput = document.getElementById("post-title-input");
    const bodyInput = document.getElementById("post-body-input");
    const output = document.getElementById("api-post-output");
    const chips = document.getElementById("api-post-chips");

    const newPost = {
        title: titleInput ? titleInput.value : "Day 29 of Frontend",
        body: bodyInput ? bodyInput.value : "Exploring API and SPA architecture!",
        userId: 1
    };

    if (output) {
        output.innerHTML = `
            <div class="spinner-wrap">
                <div class="spinner"></div>
                <span style="color: #06b6d4;">Sending POST request with payload...</span>
            </div>
        `;
    }

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(newPost)
        });

        const createdData = await response.json();

        if (output) {
            output.innerHTML = `
                <pre style="margin: 0;">${JSON.stringify(createdData, null, 2)}</pre>
            `;
        }

        if (chips) {
            chips.innerHTML = `
                <span class="step-chip">Status: 201 Created 🎉</span>
                <span class="step-chip">Method: POST</span>
                <span class="step-chip">Created ID: #${createdData.id || 101}</span>
            `;
        }
    } catch (err) {
        // Fallback simulation
        const mockResult = { ...newPost, id: 101, status: "created_offline" };
        if (output) output.innerHTML = `<pre style="margin: 0;">${JSON.stringify(mockResult, null, 2)}</pre>`;
        if (chips) chips.innerHTML = `<span class="step-chip">Status: 201 Created (Mock)</span>`;
    }
}

// ------------------------------------------------------
// 3. API ERROR HANDLING (try / catch & Status Validation)
// ------------------------------------------------------
async function handleTriggerApiError() {
    const output = document.getElementById("api-error-output");
    const chips = document.getElementById("api-error-chips");

    if (output) {
        output.innerHTML = `
            <div class="spinner-wrap">
                <div class="spinner"></div>
                <span style="color: #ef4444;">Calling non-existent endpoint (404)...</span>
            </div>
        `;
    }

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/non-existent-endpoint-404");
        
        if (!response.ok) {
            throw new Error(`Endpoint not found! (HTTP Status ${response.status})`);
        }
    } catch (err) {
        if (output) {
            output.innerHTML = `
                <div style="color: #f87171; font-weight: 600;">⚠️ Caught in catch block:</div>
                <div style="color: #fca5a5; font-size: 0.85rem;">"${err.message}"</div>
                <div style="color: #9ca3af; font-size: 0.8rem; margin-top: 4px;">User sees friendly error banner rather than a crash.</div>
            `;
        }

        if (chips) {
            chips.innerHTML = `
                <span class="step-chip" style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;">Error caught ✅</span>
                <span class="step-chip">App stays stable</span>
            `;
        }
    }
}

// ------------------------------------------------------
// 4. SPA ARCHITECTURE & CLIENT-SIDE ROUTER
// ------------------------------------------------------
let spaNavigationsCount = 0;

// SPA View Templates (Rendered in-memory without page reload)
const spaViews = {
    "#home": {
        title: "🏠 Home Dashboard",
        content: "Welcome to the SPA! Notice how switching between views updates immediately without flashing or reloading the browser page.",
        badge: "View: Home"
    },
    "#products": {
        title: "🛍️ Products Catalog",
        content: "Browse our frontend modules: HTML5, CSS3, Modern JavaScript, React.js, and API Integration.",
        badge: "View: Products"
    },
    "#about": {
        title: "ℹ️ About Day 29",
        content: "Day 29 of the 100 Days Frontend Challenge by Harish. Demonstrating Client-Side Routing (CSR) and REST APIs.",
        badge: "View: About"
    },
    "#contact": {
        title: "📬 Contact & Support",
        content: "Have questions on SPA or APIs? Open an issue on GitHub or connect with the community!",
        badge: "View: Contact"
    }
};

function navigateSpa(targetHash) {
    window.location.hash = targetHash;
}

function handleSpaRouting() {
    const hash = window.location.hash || "#home";
    const view = spaViews[hash] || spaViews["#home"];

    // Update canvas
    const canvas = document.getElementById("spa-view-canvas");
    if (canvas) {
        canvas.innerHTML = `
            <div class="spa-view-title">${view.title}</div>
            <div class="spa-view-text">${view.content}</div>
        `;
    }

    // Update active nav button
    document.querySelectorAll(".spa-nav-btn").forEach(btn => {
        if (btn.getAttribute("data-hash") === hash) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    spaNavigationsCount++;
    const chips = document.getElementById("spa-router-chips");
    if (chips) {
        chips.innerHTML = `
            <span class="step-chip">Current Hash: ${hash}</span>
            <span class="step-chip">View Switches: ${spaNavigationsCount}</span>
            <span class="step-chip" style="color: #6ee7b7; border-color: rgba(16, 185, 129, 0.4);">Page Reloads: 0 ⚡</span>
        `;
    }
}

// ------------------------------------------------------
// Initial triggers on DOM load
// ------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    handleFetchUser();
    handleSpaRouting();
});

window.addEventListener("hashchange", handleSpaRouting);
