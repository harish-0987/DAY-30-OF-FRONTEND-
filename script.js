// ======================================================
// Day 30: Modern React & Full Frontend Mastery Hub - Logic
// 100 Days Frontend Challenge by Harish (@harish-0987)
// ======================================================

// ------------------------------------------------------
// 1. JSX ARCHITECTURE & LIVE COMPILATION LAB
// ------------------------------------------------------
const jsxState = {
    userName: "Harish Kumar",
    role: "Frontend Developer",
    isOnline: true,
    skills: ["React", "JSX", "Router", "ES6+"],
    viewMode: "jsx" // 'jsx' or 'compiled'
};

function updateJsxDemo() {
    const nameInput = document.getElementById("jsx-user-name");
    const roleSelect = document.getElementById("jsx-user-role");
    
    if (nameInput) jsxState.userName = nameInput.value || "Anonymous Developer";
    if (roleSelect) jsxState.role = roleSelect.value;

    renderJsxLivePreview();
    renderJsxCodeDisplay();
}

function toggleJsxStatus() {
    jsxState.isOnline = !jsxState.isOnline;
    const btn = document.getElementById("jsx-status-toggle");
    if (btn) {
        btn.textContent = jsxState.isOnline ? "Toggle Online: 🟢 Online" : "Toggle Online: ⚪ Offline";
    }
    renderJsxLivePreview();
    renderJsxCodeDisplay();
}

function addJsxTag() {
    const defaultPool = ["TypeScript", "Next.js", "Redux", "Tailwind", "CSS Grid", "REST API", "Vite"];
    const unadded = defaultPool.filter(tag => !jsxState.skills.includes(tag));
    if (unadded.length > 0) {
        jsxState.skills.push(unadded[0]);
    } else {
        jsxState.skills = ["React", "JSX", "Router", "ES6+"];
    }
    renderJsxLivePreview();
    renderJsxCodeDisplay();
}

function switchJsxCodeView(mode) {
    jsxState.viewMode = mode;
    
    const btnJsx = document.getElementById("btn-show-jsx");
    const btnCompiled = document.getElementById("btn-show-compiled");

    if (btnJsx && btnCompiled) {
        if (mode === "jsx") {
            btnJsx.classList.add("active");
            btnCompiled.classList.remove("active");
        } else {
            btnJsx.classList.remove("active");
            btnCompiled.classList.add("active");
        }
    }
    renderJsxCodeDisplay();
}

function renderJsxLivePreview() {
    const target = document.getElementById("jsx-live-render");
    if (!target) return;

    const statusBadge = jsxState.isOnline 
        ? `<span class="step-chip" style="color: #6ee7b7; border-color: rgba(16, 185, 129, 0.4);">🟢 Active Now</span>` 
        : `<span class="step-chip" style="color: #94a3b8; border-color: rgba(148, 163, 184, 0.4);">⚪ Offline</span>`;

    const skillChips = jsxState.skills.map(s => `<span class="step-chip">${s}</span>`).join(" ");

    target.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
            <div>
                <h3 style="color: #38bdf8; font-size: 1.15rem; margin-bottom: 2px;">👤 ${escapeHtml(jsxState.userName)}</h3>
                <p style="color: #94a3b8; font-size: 0.86rem;">${escapeHtml(jsxState.role)}</p>
            </div>
            <div>${statusBadge}</div>
        </div>
        <div style="margin-top: 10px;">
            <div style="font-size: 0.78rem; color: #64748b; margin-bottom: 4px;">Skills (Rendered via array.map with key):</div>
            <div class="result-box chips-wrap" style="padding: 4px; min-height: auto; border: none; background: transparent;">
                ${skillChips}
            </div>
        </div>
    `;
}

function renderJsxCodeDisplay() {
    const codeEl = document.getElementById("jsx-code-display");
    if (!codeEl) return;

    if (jsxState.viewMode === "jsx") {
        codeEl.textContent = `// 1. Declarative JSX Syntax (Syntactic Sugar)
const DeveloperProfile = () => {
  const user = {
    name: "${jsxState.userName}",
    role: "${jsxState.role}",
    isOnline: ${jsxState.isOnline},
    skills: ${JSON.stringify(jsxState.skills)}
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3>👤 {user.name}</h3>
        <p>{user.role}</p>
        {user.isOnline ? (
          <span className="badge-online">🟢 Active Now</span>
        ) : (
          <span className="badge-offline">⚪ Offline</span>
        )}
      </div>

      <div className="skills-list">
        {user.skills.map((skill, index) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};`;
    } else {
        codeEl.textContent = `// 2. What Babel Compiles JSX Into: Pure React.createElement()
function DeveloperProfile() {
  return React.createElement(
    "div",
    { className: "profile-card" },
    React.createElement(
      "div",
      { className: "profile-header" },
      React.createElement("h3", null, "👤 ", "${jsxState.userName}"),
      React.createElement("p", null, "${jsxState.role}"),
      ${jsxState.isOnline} 
        ? React.createElement("span", { className: "badge-online" }, "🟢 Active Now")
        : React.createElement("span", { className: "badge-offline" }, "⚪ Offline")
    ),
    React.createElement(
      "div",
      { className: "skills-list" },
      ${JSON.stringify(jsxState.skills)}.map((skill) =>
        React.createElement("span", { key: skill, className: "skill-chip" }, skill)
      )
    )
  );
}`;
    }
}

// ------------------------------------------------------
// 2. COMPONENT RENDERING & STATE / PROPS LAB
// ------------------------------------------------------
let counterState = 0;
let renderCount = 1;

function updateCounter(delta) {
    counterState += delta;
    renderCount++;
    triggerRenderPulse();
    renderComponentState();
}

function resetCounter() {
    counterState = 0;
    renderCount++;
    triggerRenderPulse();
    renderComponentState();
}

function triggerRenderPulse() {
    const pulseBox = document.getElementById("render-pulse-box");
    if (pulseBox) {
        pulseBox.classList.add("flash");
        setTimeout(() => pulseBox.classList.remove("flash"), 400);
    }
}

function renderComponentState() {
    const counterEl = document.getElementById("state-counter-val");
    const renderCountEl = document.getElementById("render-count-display");

    if (counterEl) counterEl.textContent = counterState;
    if (renderCountEl) renderCountEl.textContent = renderCount;
}

function updateChildProps() {
    const propInput = document.getElementById("child-prop-input");
    const colorSelect = document.getElementById("child-color-select");
    const target = document.getElementById("child-component-target");

    if (!target) return;

    const text = propInput ? propInput.value : "Certified Frontend Developer";
    const theme = colorSelect ? colorSelect.value : "cyan";

    const themeClass = `badge-theme-${theme}`;

    target.innerHTML = `
        <div>
            <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 2px;">Child Component (&lt;Badge /&gt;) received Props:</div>
            <strong style="color: #f1f5f9; font-size: 0.95rem;">${escapeHtml(text)}</strong>
        </div>
        <span class="step-chip ${themeClass}" style="padding: 5px 12px; font-weight: 700;">
            Theme: ${theme.toUpperCase()}
        </span>
    `;
}

function simulateLifecycle(stage) {
    const log = document.getElementById("lifecycle-log");
    if (!log) return;

    const time = new Date().toLocaleTimeString();

    if (stage === "mount") {
        log.innerHTML = `
            <div style="color: #10b981; font-weight: 600;">[${time}] 🟢 Component Mounted (Initial Render):</div>
            <div style="color: #a7f3d0;">1. Component evaluated &amp; DOM inserted.</div>
            <div style="color: #94a3b8;">2. <code>useEffect(() =&gt; { ... }, [])</code> executed once. Subscriptions / timers started.</div>
        `;
    } else if (stage === "update") {
        log.innerHTML = `
            <div style="color: #38bdf8; font-weight: 600;">[${time}] 🔄 Component Updated (State or Props Change):</div>
            <div style="color: #bae6fd;">1. State / Prop changed -> Component function re-evaluates.</div>
            <div style="color: #94a3b8;">2. React diffs Virtual DOM vs Real DOM -> efficiently patches changed nodes only.</div>
            <div style="color: #cbd5e1;">3. Dependency-driven <code>useEffect(() =&gt; { ... }, [deps])</code> fires.</div>
        `;
    } else if (stage === "unmount") {
        log.innerHTML = `
            <div style="color: #f87171; font-weight: 600;">[${time}] 🔴 Component Unmounting (Clean Up):</div>
            <div style="color: #fca5a5;">1. Component removed from DOM tree.</div>
            <div style="color: #94a3b8;">2. Cleanup function <code>return () =&gt; { clearInterval() }</code> executed to prevent memory leaks.</div>
        `;
    }
}

// ------------------------------------------------------
// 3. REACT ROUTER V6 INTERACTIVE SIMULATOR
// ------------------------------------------------------
const routerHistory = ["/"];
let historyIndex = 0;

const routesTable = {
    "/": {
        title: "🏠 Home Route (<Home />)",
        componentName: "HomeComponent",
        render: () => `
            <div class="router-view-card">
                <div class="router-view-title">🏠 Welcome to React Router SPA</div>
                <div class="router-view-body">
                    In React, client-side routing is powered by <code>&lt;BrowserRouter&gt;</code>, <code>&lt;Routes&gt;</code>, and <code>&lt;Route&gt;</code>. Navigation happens instantly in JavaScript memory without requesting a full page reload from the server.
                </div>
                <div class="btn-group">
                    <button type="button" onclick="navigateToRoute('/courses')">Browse Courses ➔</button>
                    <button type="button" class="btn-secondary" onclick="navigateToRoute('/about')">About Day 30 ➔</button>
                </div>
            </div>
        `
    },
    "/about": {
        title: "📖 About Day 30 (<About />)",
        componentName: "AboutComponent",
        render: () => `
            <div class="router-view-card">
                <div class="router-view-title">📖 Day 30 Milestone &amp; Author Vision</div>
                <div class="router-view-body">
                    Welcome to the <strong>Grand Finale of the 30-Day Frontend Challenge</strong> created by <strong>Harish (@harish-0987)</strong>. This milestone repo showcases the power of component-driven architecture, JSX compilation, client-side routing, and a complete 30-Day reference guide.
                </div>
                <div class="step-chip">Created for developers, students &amp; recruiters worldwide 🌍</div>
            </div>
        `
    },
    "/courses": {
        title: "🎓 Courses Catalog (<Courses />)",
        componentName: "CoursesComponent",
        render: () => `
            <div class="router-view-card">
                <div class="router-view-title">🎓 Available Frontend Masterclasses</div>
                <div class="router-view-body">
                    Explore available courses with dynamic route links:
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
                    <button type="button" onclick="navigateToRoute('/courses/react-mastery')">React 18 Mastery (/courses/react-mastery)</button>
                    <button type="button" class="btn-secondary" onclick="navigateToRoute('/courses/javascript-es6')">Modern JS (/courses/javascript-es6)</button>
                    <button type="button" class="btn-secondary" onclick="navigateToRoute('/courses/css-architecture')">CSS Architecture (/courses/css-architecture)</button>
                </div>
                <div style="font-size: 0.85rem; color: #94a3b8;">
                    Clicking any course navigates to dynamic route: <code>&lt;Route path="/courses/:courseId" element={&lt;CourseDetail /&gt;} /&gt;</code>
                </div>
            </div>
        `
    },
    "/courses/:courseId": {
        title: "⚡ Dynamic Route (<CourseDetail /> with useParams)",
        componentName: "CourseDetailComponent",
        render: (params) => `
            <div class="router-view-card">
                <div class="router-view-title">⚡ Dynamic Course View</div>
                <div class="router-view-body">
                    This component extracted the dynamic parameter using React Router's <code>useParams()</code> hook:
                </div>
                <div class="route-param-box">
                    <strong>useParams() Hook Result:</strong><br>
                    { "courseId": "${escapeHtml(params.courseId || "unknown")}" }
                </div>
                <div class="btn-group" style="margin-top: 14px;">
                    <button type="button" class="btn-secondary" onclick="navigateToRoute('/courses')">← Back to Course Catalog</button>
                    <button type="button" onclick="navigateToRoute('/dashboard')">Go to Dashboard ➔</button>
                </div>
            </div>
        `
    },
    "/dashboard": {
        title: "📊 Protected Dashboard (<Dashboard />)",
        componentName: "DashboardComponent",
        render: () => `
            <div class="router-view-card">
                <div class="router-view-title">📊 User Dashboard (Programmatic Navigation Demo)</div>
                <div class="router-view-body">
                    Need to navigate users after a form submit, login, or button click? React Router provides the imperative <code>const navigate = useNavigate()</code> hook.
                </div>
                <div class="btn-group">
                    <button type="button" class="btn-success" onclick="simulateProgrammaticRedirect()">
                        🚀 Execute: navigate('/courses/react-mastery')
                    </button>
                </div>
                <div style="font-size: 0.82rem; color: #94a3b8; margin-top: 8px;">
                    Code: <code>const navigate = useNavigate(); navigate('/courses/react-mastery');</code>
                </div>
            </div>
        `
    },
    "*": {
        title: "❌ 404 Catch-All Route (<NotFound404 />)",
        componentName: "NotFoundComponent",
        render: () => `
            <div class="router-view-card" style="border-color: rgba(239, 68, 68, 0.4);">
                <div class="router-view-title" style="color: #f87171;">❌ 404 - Route Not Found</div>
                <div class="router-view-body">
                    The requested URL did not match any defined <code>&lt;Route&gt;</code>. React Router caught this with the catch-all wildcard route: <code>&lt;Route path="*" element={&lt;NotFound /&gt;} /&gt;</code>.
                </div>
                <button type="button" onclick="navigateToRoute('/')">Return to Safe Home (/) 🏠</button>
            </div>
        `
    }
};

function matchRoute(path) {
    if (routesTable[path]) {
        return { routeKey: path, params: {} };
    }

    if (path.startsWith("/courses/")) {
        const parts = path.split("/");
        const courseId = parts[2] || "";
        return {
            routeKey: "/courses/:courseId",
            params: { courseId }
        };
    }

    return { routeKey: "*", params: {} };
}

function navigateToRoute(path) {
    if (routerHistory[historyIndex] !== path) {
        // Truncate forward history if navigating new path
        routerHistory.splice(historyIndex + 1);
        routerHistory.push(path);
        historyIndex = routerHistory.length - 1;
    }
    renderRouterCurrentRoute();
}

function routerGoBack() {
    if (historyIndex > 0) {
        historyIndex--;
        renderRouterCurrentRoute();
    }
}

function routerGoForward() {
    if (historyIndex < routerHistory.length - 1) {
        historyIndex++;
        renderRouterCurrentRoute();
    }
}

function routerRefresh() {
    renderRouterCurrentRoute();
}

function simulateProgrammaticRedirect() {
    navigateToRoute("/courses/react-mastery");
}

function renderRouterCurrentRoute() {
    const currentPath = routerHistory[historyIndex] || "/";
    const urlInput = document.getElementById("browser-url-input");
    const viewport = document.getElementById("router-viewport");
    const inspectorPath = document.getElementById("inspector-path");
    const inspectorParams = document.getElementById("inspector-params");

    if (urlInput) urlInput.value = currentPath;
    if (inspectorPath) inspectorPath.textContent = currentPath;

    const { routeKey, params } = matchRoute(currentPath);
    const route = routesTable[routeKey] || routesTable["*"];

    if (inspectorParams) {
        inspectorParams.textContent = JSON.stringify(params);
    }

    if (viewport) {
        viewport.innerHTML = route.render(params);
    }

    // Update active nav-link highlighting
    document.querySelectorAll(".router-nav-link").forEach(btn => {
        const btnPath = btn.getAttribute("data-path");
        if (btnPath === currentPath) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// ------------------------------------------------------
// 4. 30-DAY FRONTEND MASTERY ATLAS DATA & RENDERER
// ------------------------------------------------------
const atlasTopics = [
    {
        dayRange: "Days 1–5",
        category: "html",
        categoryName: "HTML5 & Semantic Web",
        title: "Semantic Structure & Web Accessibility",
        desc: "Laying rock-solid markup foundations using semantic tags, accessible forms with proper labeling, multimedia (video, audio, canvas), and search engine optimization (SEO) meta tags.",
        chips: ["<header>", "<main>", "<article>", "ARIA", "Forms", "SEO"],
        snippet: `<main role="main">\n  <article>\n    <h1>Semantic HTML5</h1>\n    <p>Accessible to screen readers</p>\n  </article>\n</main>`
    },
    {
        dayRange: "Days 6–9",
        category: "css",
        categoryName: "CSS3 Foundations & Box Model",
        title: "CSS Box Model & Specificity",
        desc: "Mastering margin collapsing, border-box sizing, specificity hierarchy (inline, ID, class, tag), pseudo-classes, pseudo-elements, and clean CSS variables.",
        chips: ["box-sizing: border-box", "Specificity", ":hover", "::before", "var(--color)"],
        snippet: `* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}`
    },
    {
        dayRange: "Days 10–13",
        category: "css",
        categoryName: "Modern CSS Layouts",
        title: "Flexbox & CSS Grid Mastery",
        desc: "Building responsive, modern 1D and 2D UI layouts. Flex direction, justify-content, align-items, grid template columns, minmax(), fr units, and gap styling.",
        chips: ["display: flex", "display: grid", "grid-template-columns", "align-items", "gap"],
        snippet: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n}`
    },
    {
        dayRange: "Days 14–16",
        category: "css",
        categoryName: "Responsive & Animations",
        title: "Responsive Design & CSS Keyframes",
        desc: "Mobile-first responsive design using media queries, fluid typography with clamp(), and smooth GPU-accelerated @keyframes and transform animations.",
        chips: ["@media (max-width)", "@keyframes", "transform: translateY()", "clamp()"],
        snippet: `@media (max-width: 768px) {\n  .nav { flex-direction: column; }\n}`
    },
    {
        dayRange: "Days 17–20",
        category: "js",
        categoryName: "JavaScript ES6+ Core",
        title: "Modern JavaScript & DOM Manipulation",
        desc: "Variables (let, const), arrow functions, template literals, array destructuring, spread/rest operators (...), querySelector, and event bubbling / delegation.",
        chips: ["let/const", "Arrow Functions", "Destructuring", "Spread (...)", "addEventListener"],
        snippet: `const [first, ...rest] = items;\nconst user = { name: "Harish", ...overrides };`
    },
    {
        dayRange: "Days 21–23",
        category: "js",
        categoryName: "Advanced JavaScript",
        title: "Closures, Scopes & High-Order Methods",
        desc: "Deep dive into lexical scoping, closures preserving outer variables, 'this' binding, prototypes, and functional array methods (map, filter, reduce, find).",
        chips: ["Closures", "Lexical Scope", "Array.map()", "Array.reduce()", "this"],
        snippet: `const doubleEven = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2);`
    },
    {
        dayRange: "Days 24–26",
        category: "async",
        categoryName: "Asynchronous JavaScript",
        title: "Event Loop, Promises & Async/Await",
        desc: "Understanding single-threaded JavaScript execution, call stack, microtask/macrotask queues, Promise chaining, async/await syntax, and try/catch error resilience.",
        chips: ["Event Loop", "Call Stack", "Promises", "async/await", "try / catch"],
        snippet: `async function loadData() {\n  try {\n    const res = await fetch("/api");\n    return await res.json();\n  } catch (err) {\n    console.error(err);\n  }\n}`
    },
    {
        dayRange: "Days 27–29",
        category: "async",
        categoryName: "APIs & SPA Architecture",
        title: "REST APIs & Single Page Applications",
        desc: "Consuming REST APIs (GET, POST), handling loading, data, and error states, Client-Side Routing (CSR), and zero-reload SPA navigation architecture.",
        chips: ["fetch()", "GET / POST", "Loading States", "Client-Side Routing", "SPA"],
        snippet: `// Client-Side Router:\nwindow.addEventListener("hashchange", () => {\n  viewContainer.innerHTML = routes[location.hash];\n});`
    },
    {
        dayRange: "Day 30",
        category: "react",
        categoryName: "React Framework Mastery",
        title: "React JSX, Components & React Router",
        desc: "The ultimate frontend capstone! JSX syntax rules & compilation, pure functional components, props & state with useState, Virtual DOM diffing, and React Router v6 navigation.",
        chips: ["JSX", "Components", "useState", "useEffect", "React Router v6", "useParams"],
        snippet: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\n// Grand Finale: The Complete Modern Frontend Stack!`
    }
];

function renderAtlasTopics(filteredList) {
    const container = document.getElementById("topic-grid-container");
    if (!container) return;

    if (filteredList.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 32px; color: #94a3b8;">
                No matching topics found. Try searching for "React", "flexbox", "promise", or "closure".
            </div>
        `;
        return;
    }

    container.innerHTML = filteredList.map(topic => `
        <div class="topic-card">
            <div>
                <div class="topic-card-header">
                    <span class="topic-day-tag">${topic.dayRange}</span>
                    <span class="topic-category-tag">${topic.categoryName}</span>
                </div>
                <h3 class="topic-card-title">${topic.title}</h3>
                <p class="topic-card-desc">${topic.desc}</p>
                <div class="topic-tech-stack">
                    ${topic.chips.map(c => `<span class="topic-tech-chip">${escapeHtml(c)}</span>`).join("")}
                </div>
            </div>
            <div class="topic-code-snippet">
                <pre style="margin: 0;"><code>${escapeHtml(topic.snippet)}</code></pre>
            </div>
        </div>
    `).join("");
}

let activeAtlasCategory = "all";

function filterAtlas(category, btnElement) {
    activeAtlasCategory = category;

    document.querySelectorAll(".atlas-tab-btn").forEach(btn => btn.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");

    const searchInput = document.getElementById("atlas-search-input");
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    applyAtlasFilters(query);
}

function searchAtlasTopics() {
    const searchInput = document.getElementById("atlas-search-input");
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    applyAtlasFilters(query);
}

function applyAtlasFilters(query) {
    const filtered = atlasTopics.filter(topic => {
        const matchesCategory = activeAtlasCategory === "all" || topic.category === activeAtlasCategory;
        const matchesQuery = query === "" || 
            topic.title.toLowerCase().includes(query) ||
            topic.desc.toLowerCase().includes(query) ||
            topic.categoryName.toLowerCase().includes(query) ||
            topic.chips.some(c => c.toLowerCase().includes(query));

        return matchesCategory && matchesQuery;
    });

    renderAtlasTopics(filtered);
}

// ------------------------------------------------------
// 5. INTERVIEW ACCORDION DATA & TOGGLE
// ------------------------------------------------------
const interviewQuestions = [
    {
        q: "1. What is the Virtual DOM and how does Reconciliation work in React?",
        a: "The Virtual DOM is a lightweight JavaScript object representation of the real DOM kept in memory. When state or props change, React creates a new Virtual DOM tree, compares ('diffs') it against previous snapshot using a heuristic O(n) algorithm, and batches minimal DOM mutations via the ReactDOM reconciler. This avoids costly full-tree browser repaints."
    },
    {
        q: "2. Why does React require a unique 'key' prop when rendering lists?",
        a: "Keys give elements a stable identity across renders. When items are added, removed, or reordered, keys allow React's diffing algorithm to match elements between renders. Without keys (or when using array indices for reorderable lists), React might recreate DOM nodes unnecessarily or reuse state across wrong items, causing visual and state bugs."
    },
    {
        q: "3. What is the difference between Props and State in React?",
        a: "Props (short for properties) are read-only inputs passed downwards from parent to child components. A child component must never mutate its props. State is internal, mutable data owned and managed directly within the component using hooks like <code>useState</code>. Updating state triggers a re-render of the component and its children."
    },
    {
        q: "4. How does Client-Side Routing (React Router) differ from Server-Side Routing?",
        a: "In traditional Server-Side Routing (MPA), every link click issues a GET request to the backend server, returning a fresh HTML page and causing a visible flash/reload. In Client-Side Routing (React Router SPA), JavaScript intercepts navigation using the HTML5 History API (<code>pushState</code>/<code>replaceState</code>), swaps the rendered components in memory, and updates the URL bar with zero page reloads."
    },
    {
        q: "5. What is the difference between '==' and '===' in JavaScript?",
        a: "The loose equality operator (<code>==</code>) performs type coercion before comparison (e.g., <code>'5' == 5</code> evaluates to true). The strict equality operator (<code>===</code>) checks both value and type without coercion (e.g., <code>'5' === 5</code> evaluates to false). Modern frontend best practices mandate using strict equality (<code>===</code>) to prevent subtle bugs."
    },
    {
        q: "6. Explain Closures in JavaScript with a practical example.",
        a: "A closure is the combination of a function bundled together with references to its surrounding lexical environment. In JavaScript, functions retain access to outer variables even after the outer function has finished execution. Practical uses include data privacy (private variables), function factories, and memoization."
    },
    {
        q: "7. What is Event Delegation and why is it beneficial?",
        a: "Event delegation is a technique where instead of adding event listeners to multiple individual child elements, you attach a single listener to their common ancestor. Thanks to event bubbling, events fired on child elements bubble up to the parent. This drastically reduces memory consumption and automatically handles dynamically added child elements."
    },
    {
        q: "8. What is the difference between CSS Flexbox and CSS Grid?",
        a: "Flexbox is primarily <strong>one-dimensional</strong> (designed to align items in either a row OR a column), making it ideal for navigation bars, button rows, and card headers. CSS Grid is <strong>two-dimensional</strong> (handling both columns and rows simultaneously), making it the superior choice for overall page layouts, galleries, and complex dashboard structures."
    }
];

function renderInterviewAccordion() {
    const container = document.getElementById("interview-accordion");
    if (!container) return;

    container.innerHTML = interviewQuestions.map((item, index) => `
        <div class="accordion-item ${index === 0 ? "active" : ""}" id="acc-item-${index}">
            <button type="button" class="accordion-header" onclick="toggleAccordion(${index})">
                <span>${item.q}</span>
                <span class="accordion-chevron">▼</span>
            </button>
            <div class="accordion-body">
                ${item.a}
            </div>
        </div>
    `).join("");
}

function toggleAccordion(index) {
    const item = document.getElementById(`acc-item-${index}`);
    if (item) {
        item.classList.toggle("active");
    }
}

// Utility: HTML Escaper to prevent any XSS issues in playground
function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ------------------------------------------------------
// INITIALIZATION ON DOM READY
// ------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
    updateJsxDemo();
    updateChildProps();
    renderComponentState();
    renderRouterCurrentRoute();
    renderAtlasTopics(atlasTopics);
    renderInterviewAccordion();
});
