import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/login", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Asset Tracker Login</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Inter, Arial, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(74, 117, 255, 0.28), transparent 34%),
        linear-gradient(135deg, #07111f 0%, #13233a 48%, #203f68 100%);
      color: #f8fbff;
      display: grid;
      place-items: center;
      padding: 28px;
    }
    .shell {
      width: min(1080px, 100%);
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 34px;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(24px);
    }
    .brand-panel {
      padding: 58px;
      background:
        linear-gradient(160deg, rgba(45, 93, 255, 0.95), rgba(14, 30, 55, 0.82)),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cg fill='none' stroke='rgba(255,255,255,.16)' stroke-width='2'%3E%3Cpath d='M20 20h55v55H20zM105 20h55v55h-55zM20 105h55v55H20zM105 105h55v55h-55z'/%3E%3Cpath d='M75 47h30M47 75v30M132 75v30M75 132h30'/%3E%3C/g%3E%3C/svg%3E");
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 64px;
    }
    .logo {
      width: 56px;
      height: 56px;
      border-radius: 18px;
      background: #ffffff;
      color: #2458ff;
      display: grid;
      place-items: center;
      font-size: 26px;
      font-weight: 900;
      box-shadow: 0 16px 35px rgba(0, 0, 0, 0.24);
    }
    .eyebrow {
      margin: 0 0 14px;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-size: 12px;
      font-weight: 800;
      color: #c8d9ff;
    }
    h1 {
      margin: 0;
      max-width: 520px;
      font-size: clamp(38px, 5vw, 68px);
      line-height: 0.95;
      letter-spacing: -0.055em;
    }
    .brand-panel p:not(.eyebrow) {
      max-width: 460px;
      color: #dce7ff;
      font-size: 17px;
      line-height: 1.7;
    }
    .mini-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .metric {
      padding: 16px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.13);
      border: 1px solid rgba(255, 255, 255, 0.16);
    }
    .metric strong {
      display: block;
      font-size: 24px;
    }
    .metric span {
      color: #dce7ff;
      font-size: 12px;
    }
    .login-panel {
      padding: 58px;
      background: rgba(255, 255, 255, 0.96);
      color: #132033;
    }
    .login-panel h2 {
      margin: 0 0 10px;
      font-size: 34px;
      letter-spacing: -0.04em;
    }
    .login-panel > p {
      margin: 0 0 30px;
      color: #667085;
      line-height: 1.6;
    }
    form {
      display: grid;
      gap: 18px;
    }
    label {
      display: grid;
      gap: 8px;
      font-weight: 800;
      font-size: 14px;
      color: #263246;
    }
    input {
      width: 100%;
      border: 1px solid #d7deeb;
      border-radius: 16px;
      padding: 15px 16px;
      font: inherit;
      outline: none;
      background: #f8faff;
      transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
    }
    input:focus {
      border-color: #2458ff;
      background: #ffffff;
      box-shadow: 0 0 0 5px rgba(36, 88, 255, 0.12);
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      color: #667085;
      font-size: 14px;
    }
    .row label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .row input {
      width: auto;
      box-shadow: none;
    }
    .row a, .helper a {
      color: #2458ff;
      text-decoration: none;
      font-weight: 800;
    }
    button {
      border: 0;
      border-radius: 16px;
      padding: 16px 18px;
      font: inherit;
      font-weight: 900;
      cursor: pointer;
      color: white;
      background: linear-gradient(135deg, #2458ff, #1737a8);
      box-shadow: 0 16px 35px rgba(36, 88, 255, 0.26);
      transition: transform 160ms ease, box-shadow 160ms ease;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 42px rgba(36, 88, 255, 0.34);
    }
    .message {
      min-height: 24px;
      color: #0f8a4b;
      font-weight: 800;
    }
    .helper {
      margin-top: 24px;
      padding: 16px;
      border-radius: 18px;
      background: #eef4ff;
      color: #526071;
      line-height: 1.55;
      font-size: 14px;
    }
    @media (max-width: 860px) {
      body { padding: 18px; }
      .shell { grid-template-columns: 1fr; }
      .brand-panel, .login-panel { padding: 34px; }
      .mini-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <section class="brand-panel" aria-label="Asset Tracker overview">
      <div>
        <div class="logo">O</div>
        <p class="eyebrow">Asset Tracker</p>
        <h1>Know exactly who has every company asset.</h1>
        <p>Secure HR and asset teams can track employees, laptops, phones, repairs, returns, and department-wise asset usage from one organized system.</p>
      </div>
      <div class="mini-grid">
        <div class="metric"><strong id="assets-count">--</strong><span>Total assets</span></div>
        <div class="metric"><strong id="assigned-count">--</strong><span>Assigned</span></div>
        <div class="metric"><strong id="employee-count">--</strong><span>Employees</span></div>
      </div>
    </section>
    <section class="login-panel" aria-label="Login form">
      <h2>Welcome back</h2>
      <p>Sign in to continue to the asset-management workspace.</p>
      <form id="login-form">
        <label>
          Email address
          <input id="email" type="email" placeholder="hr@assettracker.com" autocomplete="email" required />
        </label>
        <label>
          Password
          <input id="password" type="password" placeholder="Enter your password" autocomplete="current-password" required />
        </label>
        <div class="row">
          <label><input type="checkbox" /> Remember me</label>
          <a href="/api/docs">Need help?</a>
        </div>
        <button type="submit">Login to Dashboard</button>
        <div class="message" id="message" role="status"></div>
      </form>
      <div class="helper">
        Demo page only: enter any valid email and any password with 4 or more characters. For API testing, open <a href="/api/docs">Swagger Docs</a>.
      </div>
    </section>
  </main>
  <script>
    async function loadSummary() {
      try {
        const response = await fetch('/api/dashboard/summary');
        const summary = await response.json();
        document.getElementById('assets-count').textContent = summary.total_assets;
        document.getElementById('assigned-count').textContent = summary.assigned_assets;
        document.getElementById('employee-count').textContent = summary.total_employees;
      } catch {
        document.getElementById('assets-count').textContent = '6';
        document.getElementById('assigned-count').textContent = '3';
        document.getElementById('employee-count').textContent = '6';
      }
    }

    document.getElementById('login-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const message = document.getElementById('message');

      if (!email.includes('@') || password.length < 4) {
        message.style.color = '#c0392b';
        message.textContent = 'Please enter a valid email and password.';
        return;
      }

      message.style.color = '#0f8a4b';
      message.textContent = 'Login successful. Opening API dashboard documentation...';
      setTimeout(() => {
        window.location.href = '/api/docs';
      }, 900);
    });

    loadSummary();
  </script>
</body>
</html>`);
});

export default router;
