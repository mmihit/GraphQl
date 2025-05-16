# Zone01 Oujda GraphQL Project

This project is a web application built for Zone01 Oujda by Mohammed Mihit. It demonstrates the use of GraphQL for user authentication and dynamic content rendering in a JavaScript environment.

## Features

- User authentication using JWT tokens
- Dynamic page rendering based on user authentication state
- Modular JavaScript code structure
- Easy to extend and maintain

## Project Structure

```
index.html         # Main HTML file
style.css          # Stylesheet
js/
  ├─ index.js           # Main entry point
  ├─ query.js           # Handles GraphQL queries
  ├─ renderPage.js      # Renders HTML content dynamically
  ├─ login.js           # Login logic
  ├─ logout.js          # Logout logic
  ├─ createGraphs.js    # Graph creation logic
  ├─ headerViewData.js  # Header data view
  ├─ moduleViewData.js  # Module data view
  ├─ template.js        # HTML templates
```

## Getting Started

Open this link `https://mmihit.github.io/GraphQl/`.

or:
1. Clone the repository `git clone https://github.com/mmihit/GraphQl.git`
2. Open `index.html` in your browser.
3. Make sure your backend GraphQL server is running and accessible.

## Usage

- On first load, the app checks for a JWT token in local storage.
- If authenticated, it loads the home page; otherwise, it loads the login page.
- All main logic is in `js/index.js`.

## Author

Mohammed Mihit

## License

This project is for educational purposes at Zone01 Oujda.
