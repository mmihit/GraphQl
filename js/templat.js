const login = `

   <div id="loginPage" class="container1">
  <h2>Login</h2>
  <form id="loginForm">
    <input type="text" id="email" placeholder="Email" required>
    <input type="password" id="password" placeholder="Password" required>
    <button type="submit">Login</button>
    <div class="login-error hidden">
      <p>Invalid email or password</p>
    </div>
  </form>
</div>

   
`;

const profile = `

     <header>
        <div class="container">
            <div class="username-box">
                <h1>Welcome, Mohammed Mihit</h1>
            </div>

            <div class="logout-section">
                <button type="button" id="logout-btn">Logout</button>
            </div>

        </div>
    </header>

    <main>
        <div class="container">
            <div class="general-info">
                <h3 style="font-weight: 800; text-align: center;">General Informations</h3>
                <div class="main">
                    <div class="xp-and-level-box">
                        <div class="level-box">
                            <h2>Level 24</h2>
                        </div>
                        <div class="xp-box">
                            <h2>597 Kb</h2>
                        </div>
                    </div>
                    <div class="audit-ratio-box">
                        <h3>audits info</h3>
                        <div class="audit-details">
                            <div class="stats done"></div>
                            <div class="stats received"></div>
                        </div>
                        <div class="audit-main">
                            <div class="audit-ratio"></div>
                        </div>
                    </div>
                </div>
            </div>

        <div class="skills-modules-wrapper">
            <div class="skills-section">
                <h3 style="font-weight: 800;">skills</h3>
            </div>
            <div class="module-section">
                <h3 style="font-weight: 800;">module</h3>
            </div>
        </div>
        </div>
    </main>
`;

export {login, profile}