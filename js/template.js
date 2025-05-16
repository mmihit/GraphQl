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
                <h1 id="username-text"></h1>
            </div>

            <div class="logout-section">
                <button id="logout-btn">Logout</button>
            </div>

        </div>
    </header>

    <main>
        <div class="container">
            <div class="general-info section-box">
                <h3 style="font-weight: 800; text-align: center;">General Informations</h3>
                <div class="main">
                    <div class="xp-and-level-box">
                        <h2>Level & Xp</h2>
                        <div class="level-box">
                            <div id="drawing-level"></div>
                        </div>
                        <div class="xp-box">
                            <p class="xp-text" id="xp-text"></p>
                        </div>
                    </div>
                    <div class="audit-ratio-box">
                        <h3>audits info</h3>
                        <div class="audit-details">
                            <div class="stats-box">
                                <div class="audit-graph" id="audit-graph-done"></div>
                                <p id="done-text">Done:</p>
                            </div>
                            <div class="stats-box">
                                <div class="audit-graph" id="audit-graph-received"></div>
                                <p id="received-text">Received:</p>
                            </div>
                        </div>
                        <div class="audit-main">
                            <div class="ratio-box">
                                <p class="ratio-text" id="ratio-text"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
                <div class="progress-xp-section section-box" id="progress-xp-section">
                    <h3 style="font-weight: 800;">Progress Xp</h3>
                    <div class="dot-info-container" id="dot-info-container"></div>
                    <div class="progress-xp-graph" id="progress-xp-graph"></div>
                </div>
            
                <div class="xp-earned-by-project-section section-box" id="xp-earned-by-project-section">
                    <h3 style="font-weight: 800;">xp earned by project</h3>
                    <div class="xp-earned-by-project-graph" id="xp-earned-by-project-graph"></div>
                    <div class="project-info" id="project-info">
                        <h3 class="details">Project Name: <span>-</h3>
                        <h3 class="details">Xp Earned: <span>-</span></h3>  
                    </div>
                </div>
        </div>
    </main>
    <script type="module" src="">
`;

export { login, profile }