# 🔍 AI Code Review Report

**Generated:** Wednesday, July 29, 2026 at 6:47:15 PM GMT+5:30  
**Files scanned:** 41  
**Total issues:** 166

---

## 🔴 Critical (8)

### Bug

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\EditQuestion.jsx` | 42 | Data structure mismatch: The state object uses keys like 'optA', 'optB', but the API request is sending 'option_a', 'option_b', etc., which are undefined in the state. | Align the state property names with the API payload keys or map the values correctly in the handleSubmit function. |
| `client\src\components\ViewQuiz.jsx` | 13 | The async call inside useEffect is called as a synchronous function, meaning the try-catch block does not actually catch errors from the asynchronous axios request. | Define the async function inside the useEffect or use a dedicated helper, then call it with await or .catch(). |
| `client\src\pages\auth\Profile.jsx` | 40 | State variables (firstName, lastName, etc.) are initialized with undefined because the 'user' object is empty during component mounting. | Initialize state using useEffect or use a loading state until the user data is fetched. |
| `server\db\db.js` | 7 | The password property is assigned an array containing the environment variable instead of the string value. | Change 'password: [process.env.DB_PASSWORD]' to 'password: process.env.DB_PASSWORD'. |

### Security

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `server\controllers\auth.controller.js` | 15 | SQL Injection vulnerability through lack of unique constraint validation or manual handling of 'status' field. | While parameterization is used, the logic allows arbitrary status assignment if not careful. Validate inputs against an allow-list. |
| `server\controllers\quiz.controller.js` | 139 | Missing authorization check in deleteQuiz | Verify that the user requesting the deletion is the one who created the quiz or has admin privileges. |

### Logic

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `server\controllers\questions.controller.js` | 15 | Lack of database transaction for multi-table updates. | Wrap the INSERT into questions and UPDATE to quiz within a SQL transaction (START TRANSACTION / COMMIT) to prevent data inconsistency if the second query fails. |
| `server\controllers\questions.controller.js` | 194 | Lack of database transaction for multi-table updates. | Wrap the DELETE from questions and UPDATE to quiz within a SQL transaction to ensure the quiz marks/counts remain synchronized even if a query fails. |

## 🟠 High (15)

### Bug

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\eslint.config.js` | 5 | The import 'defineConfig' and 'globalIgnores' from 'eslint/config' do not exist in the standard ESLint flat config API. | Remove the import from 'eslint/config' and export the array directly. Replace 'globalIgnores' with a top-level object: { ignores: ['dist/'] }. |
| `client\src\components\dashboard\UserDashboard.jsx` | 13 | The fetchAttempt effect will trigger an API call with an undefined user ID if the user object is not yet loaded in Redux. | Add a conditional check: if (!user?.id) return; inside the useEffect. |
| `client\src\components\EditQuestion.jsx` | 15 | The initial state keys (optA, optB...) do not match the input name attributes (option_a, option_b...). This causes controlled inputs to stay blank or fail to update correctly. | Standardize the state object keys to match the form input 'name' attributes (e.g., rename 'optA' to 'option_a'). |
| `client\src\components\EditStudent.jsx` | 28 | Property name mismatch when setting state (lastname vs lastName). | Update the mapping to 'lastName: response.data.data[0].lastName' (or whatever the backend returns) to match the state object structure. |
| `client\src\components\StudentInfoPage.jsx` | 49 | Division by zero in average calculation. | Add a check: const avgScore = studentQuizData.length > 0 ? (totalPercent / studentQuizData.length).toFixed(2) : 0; |
| `client\src\pages\auth\Profile.jsx` | 15 | API error handling is missing for fetchProfile. If the request fails, the application may crash or leave the UI in an inconsistent state. | Add try-catch blocks to API calls and handle errors appropriately (e.g., redirect or show notification). |
| `client\src\pages\QuizPage.jsx` | 7 | Missing error handling for the API request. | Wrap the axios call in a try/catch block and set an error state to inform the user if the request fails. |

### Security

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\ViewQuiz.jsx` | 136 | Exposing 'Correct Answer' to the client-side for all users, including students, creates a vulnerability where the answer key is visible in the network tab or DOM. | Restrict the visibility of the 'Correct Answer' field to only users with 'admin' or 'teacher' roles. |
| `server\controllers\auth.controller.js` | 78 | Generic error message 'Something went wrong' for authentication failure. | Always return 'Invalid email or password' to avoid user enumeration or ambiguity during authentication. |
| `server\db\db.js` | 4 | Hardcoded database configuration (user, host, database) can lead to configuration leaks and security risks. | Move all database configuration settings into environment variables using a package like 'dotenv'. |
| `server\middlewares\auth.middleware.js` | 13 | The error handler returns error.message directly to the client, which can leak internal server details (e.g., JWT secret mismatch details or stack traces). | Log the actual error server-side and return a generic 'Internal Server Error' or a specific 'Invalid Token' message to the user. |
| `server\routes\user.routes.js` | 15 | The route /attempts/student/:userId lacks authentication and authorization middleware, potentially allowing any user or unauthorized actor to access sensitive student assessment data. | Add authMiddleware and appropriate role-based middleware (like teacherMiddleware) to ensure only authorized personnel can access student attempts. |
| `server\utils\jwt.js` | 9 | The ACCESS_TOKEN_SECRET environment variable is missing a fallback or validation, which can lead to undefined behavior or weak security if not set. | Add a check to throw an error if process.env.ACCESS_TOKEN_SECRET is undefined, or provide a robust default for development only. |

### Logic

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\dashboard\TeacherDashboard.jsx` | 34 | The try-catch block inside useEffect does not correctly catch errors from asynchronous calls. | The fetch functions should handle their own errors or the useEffect should be restructured to handle rejections properly by adding .catch() or using async/await syntax inside the effect correctly. |
| `server\controllers\quiz.controller.js` | 287 | Answers map relies on input array index order | The client might send answers in an order inconsistent with the DB query. Map answers to question IDs instead of relying on array index matching. |

## 🟡 Medium (54)

### Bug

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\AddQuestion.jsx` | 34 | The form relies on a side-effect (setting state via onClick) to distinguish between 'Save' and 'Save & Add Another'. If the user triggers the form submission via the 'Enter' key, the `actionType` state might not be updated correctly depending on which button had focus. | Include the action type directly in the button click handler or use a single submission handler that inspects the event object, or handle state inside the button handler function before calling the submission logic. |
| `client\src\components\CreateQuiz.jsx` | 16 | HTML input elements return values as strings, but state expects numbers for 'duration' and 'passingPercentage'. | Convert values to numbers in handleChange using Number(e.target.value) or explicitly parse them during form submission. |
| `client\src\components\dashboard\TeacherDashboard.jsx` | 15 | The fetchQuiz function does not handle potential request failures, potentially leaving the component in an inconsistent state. | Add a try/catch block inside fetchQuiz and set a loading/error state to handle UI feedback. |
| `client\src\components\dashboard\TeacherDashboard.jsx` | 20 | The fetchStudentAndAttempt function does not handle potential request failures. | Add a try/catch block inside fetchStudentAndAttempt and set an error state. |
| `client\src\components\EditQuiz.jsx` | 20 | The input handles numbers as strings because event.target.value is always a string. | Cast values to Number() inside handleInputChange when the input type is number. |
| `client\src\components\EditStudent.jsx` | 25 | Direct index access on response.data.data[0] assumes the array is never empty. | Add a check to ensure response.data.data exists and has elements before accessing index 0 to avoid TypeError. |
| `client\src\components\Navbar.jsx` | 13 | Axios throws an exception for non-2xx status codes, so response.status === 401 is unreachable inside the try block. | Remove the response status check and handle status codes within the catch block using error.response.status. |
| `client\src\components\Results.jsx` | 9 | The effect dependency array includes 'user', which can trigger unnecessary API calls if the user object reference changes, and potentially fails if 'user' is null or undefined. | Check if user.id exists before calling the API and use user.id in the dependency array instead of the whole user object. |
| `client\src\components\StudentAddForm.jsx` | 34 | No user feedback provided on failed API requests. | Update the catch block to show an error message (e.g., using toast notifications or a local error state) rather than just logging to the console. |
| `client\src\components\StudentInfoPage.jsx` | 182 | Table structure mismatch when no data is available. | Ensure the 'No Data Available' row uses a colspan attribute (e.g., <td colSpan="6">) to maintain table layout consistency. |
| `client\src\main.jsx` | 9 | The root element may not exist or might be null when running in certain environments or if the script loads before the DOM is parsed. | Add a null check for document.getElementById('root') before calling render. |
| `client\src\pages\auth\RegistrationPage.jsx` | 23 | Using 'alert()' for error handling is considered poor UX in modern React applications. | Implement a toast notification library (e.g., react-hot-toast) or a dedicated error UI component. |
| `client\src\pages\Students.jsx` | 13 | The fetchAllstudent function lacks error handling. If the API call fails, the UI will break or remain in a loading state indefinitely. | Wrap the axios call in a try/catch block and set an error state to inform the user. |
| `client\src\pages\Students.jsx` | 123 | The application assumes the existence of 'student.id', but it is not guaranteed based on the mapping logic performed on line 14. | Validate that the API response contains an 'id' field before using it in navigation or update calls. |
| `client\src\redux\features\AuthSlice.js` | 3 | JSON.parse on localStorage can throw an error if the stored string is malformed, causing the app to crash on initialization. | Wrap JSON.parse in a try-catch block. |
| `server\controllers\questions.controller.js` | 128 | Update logic fails to synchronize total_marks in the 'quiz' table when individual question marks are modified. | Calculate the difference between the old and new mark value and perform an UPDATE on the 'quiz' table to keep the total_marks accurate. |
| `server\controllers\quiz.controller.js` | 178 | Uncaught error in updateStatus | Wrap database calls in updateStatus in a try-catch block similar to other controller functions. |

### Security

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\EditStudent.jsx` | 128 | Username and Email are marked as read-only/disabled via 'bg-gray-100' but are editable via handleChange. | If these fields are meant to be read-only, add the 'disabled' or 'readOnly' attribute. If they are meant to be edited, remove the CSS classes that imply they are disabled. |
| `client\src\components\Results.jsx` | 12 | Directly injecting a user ID into an API URL path can be dangerous if the 'user' object is not properly validated or if this component is rendered without a valid authenticated user. | Ensure the 'user' object is verified by Redux/Auth provider and handle the case where user.id might be missing or invalid. |
| `client\vite.config.js` | 12 | Setting changeOrigin to false can cause issues with host header validation on the backend server, potentially causing requests to be rejected if the target server expects the host header to match the proxy target. | Set changeOrigin: true to ensure the proxy modifies the Host header to match the target URL. |
| `server\controllers\auth.controller.js` | 195 | Potential Null pointer reference if database query fails or user is missing. | Check if 'user[0]' exists before accessing 'user[0].password'. |
| `server\index.js` | — | Missing security middleware (Helmet) and CORS configuration. | Install and use 'helmet' to set secure HTTP headers and 'cors' to control cross-origin requests. |
| `server\routes\teacher.routes.js` | 10 | The /register endpoint is publicly accessible without any authentication or authorization. | Implement a registration key, administrator approval, or restrict registration access to existing administrative roles. |
| `server\utils\bcrypt.js` | 4 | Hardcoded salt rounds (10) may not be sufficient for long-term security as hardware performance increases. | Use an environment variable to define salt rounds so they can be increased over time without code changes. |

### Performance

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\dashboard\UserDashboard.jsx` | 40 | The array spread and sort are recalculated on every render regardless of whether 'attempts' has changed. | Wrap the recentAttempts calculation in useMemo. |
| `client\src\pages\QuizPage.jsx` | 7 | Missing loading state while data is being fetched. | Add a boolean 'loading' state to show a spinner or skeleton screen while waiting for the response. |
| `server\controllers\auth.controller.js` | 140 | Potential SQL logic error in COALESCE usage. | If email or userName is updated, ensure there are no unique constraint conflicts with other existing rows. |
| `server\controllers\quiz.controller.js` | 196 | N+1 query risk in readAll | The current query is efficient, but if the data grows, ensure proper indexing on quiz_attempts(quiz_id) and quiz(created_by). |
| `server\controllers\teacher.controller.js` | 4 | In the function `getAllAttempts`, an unnecessary database query is executed to fetch `quizes` which is never used. | Remove the unused `connection.execute` call assigned to the `quizes` constant. |
| `server\db\db.js` | 3 | Missing pool configuration (e.g., connectionLimit, waitForConnections) for a production-ready application. | Add explicit pool settings like 'connectionLimit: 10' to manage database resource usage effectively. |

### Logic

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\AddQuestion.jsx` | — | There is no validation for the 'marks' field. Negative numbers or zero could be submitted to the backend. | Add a `min` attribute to the input field or validate the value in the `handleChange` function. |
| `client\src\components\EditQuestion.jsx` | 23 | The API response access `response.data.data[0]` assumes the backend always returns an array. If the backend returns a single object, this will crash the application. | Check the API response format or use optional chaining safely: 'response.data.data[0] \|\| response.data.data'. |
| `client\src\components\EditQuestion.jsx` | 26 | No loading or error UI state while fetching data. | Implement a 'loading' state boolean to show a spinner and handle fetch errors by updating an 'error' state to show feedback to the user. |
| `client\src\components\EditQuiz.jsx` | 21 | State updates in React are asynchronous; console.log(editQuizData) will show the previous state instead of the newly set value. | Use useEffect to log changes or use a callback function if available. |
| `client\src\components\ProtectedRoute.jsx` | 4 | The component does not handle the authentication loading state, which may cause users to be redirected to login while the app is still checking their session. | Introduce an 'isLoading' flag from the Redux store and return a loading spinner or null while true. |
| `client\src\components\Quizzes.jsx` | 3 | The logic 'per && per.length === 0' is unreachable because the first condition checks 'per', and if it exists, the ternary operator executes the first branch, making the second condition impossible. | If 'per' represents an object, remove the check for 'per.length'. If you intended to handle an empty state, pass a flag or handle the empty array condition in the parent component. |
| `client\src\components\StudentAddForm.jsx` | 31 | Form submission lacks loading state, allowing for multiple duplicate submissions if clicked rapidly. | Add a 'loading' state boolean to disable the submit button during the API request. |
| `client\src\components\StudentInfoPage.jsx` | 43 | Using .map() for side effects (variable accumulation). | Use .forEach() or .reduce() for side effects, as .map() is intended for transforming data. |
| `client\src\components\ViewQuiz.jsx` | 15 | There is no loading or error state handling. If the API call fails or is slow, the UI will break or remain empty without feedback. | Introduce 'loading' and 'error' state variables and conditionally render a loader or error message. |
| `client\src\pages\auth\LoginPage.jsx` | 19 | Lack of loading state management during the asynchronous login process. | Add a 'loading' state variable to disable the submit button and show a spinner/loading indicator to prevent multiple concurrent requests. |
| `client\src\pages\auth\Profile.jsx` | 19 | Setting state immediately after fetching is prone to race conditions if component unmounts. | Use an abort controller or a cleanup variable to check if the component is still mounted. |
| `client\src\pages\auth\Profile.jsx` | 28 | Using loose equality (==) for HTTP status check. | Use strict equality (=== 200). |
| `client\src\pages\auth\RegistrationPage.jsx` | 15 | Form inputs are missing the 'required' attribute, allowing submission of empty fields. | Add the 'required' attribute to all input fields to ensure data integrity before sending to the server. |
| `client\src\pages\QuizPage.jsx` | 26 | Search input is not connected to any filter state or logic. | Implement a state variable to capture the input value and filter the 'quizzes' array before mapping. |
| `client\src\pages\Students.jsx` | 52 | Filtering logic will crash if student.email or student.userName are null or undefined. | Add optional chaining or default values: (student.email \|\| '').toLowerCase()... |
| `server\controllers\auth.controller.js` | 17 | No check for duplicate email or username during registration. | Check for existing user in database before inserting to prevent duplicate account errors. |
| `server\controllers\quiz.controller.js` | 230 | Insecure access to takeQuiz | Validate that the user is authenticated (req.user exists) before checking the role, otherwise req.user?.role will throw or fail silently. |
| `server\controllers\teacher.controller.js` | 273 | The function `getAttemptsOnOwnQuiz` allows a SQL query but does not handle the case where `req.user.id` might be undefined, potentially causing a 500 error. | Add a guard clause to verify `teacherId` exists before executing the database query. |
| `server\middlewares\auth.middleware.js` | 11 | JWT verification failure (e.g., token expired or tampered) throws an error that results in a 500 status code. | Catch 'JsonWebTokenError' and 'TokenExpiredError' explicitly and return a 401 status code instead of a 500. |
| `server\middlewares\auth.middleware.js` | 34 | JWT verification failure in teacherMiddleware results in a 500 status code instead of a 401. | Handle JWT verification errors specifically to return a 401 status for expired or invalid tokens. |

### Style

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\eslint.config.js` | 10 | The 'extends' property is not supported in the ESLint flat config format. | Use the configuration objects directly by spreading them into the array, e.g., ...[js.configs.recommended]. |
| `client\src\App.jsx` | 45 | Inconsistent casing in import/file path 'userDashboard' | Rename the file to 'UserDashboard.jsx' and update the import statement to maintain consistent PascalCase naming conventions. |
| `client\src\components\ViewQuiz.jsx` | 105 | Using the array index as a key for mapping elements is a bad practice when the list might change order or items. | Use a unique ID (e.g., question._id) as the key prop. |
| `server\routes\user.routes.js` | 13 | Inconsistent HTTP method for updating resources. The '/update' route uses POST instead of PUT or PATCH, which is the RESTful standard for updates. | Change the method for '/update' to PUT or PATCH to adhere to RESTful conventions. |

## 🔵 Low (89)

### Bug

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\CreateQuiz.jsx` | 105 | Input for 'duration' does not have validation attributes like 'min'. | Add min='1' to the duration input to prevent negative or zero values. |
| `client\src\components\dashboard\UserDashboard.jsx` | 40 | Recent attempts calculation uses sort() which mutates the original array if not careful, although the spread operator mitigates this, it's safer to be explicit. | The current approach is safe due to [...attempts], but ensure the backend data structure consistently provides the 'submitted_at' property. |
| `client\src\components\EditQuestion.jsx` | 15 | The initial state 'mark' is a number (0), but HTML inputs return strings, which may cause type mismatches during API submission. | Ensure the 'mark' value is parsed to an integer before submitting or ensure the backend handles string numbers. |
| `client\src\components\Quizzes.jsx` | 4 | The 'key' prop is applied to the <tr> element, but it is placed inside a fragment where the 'key' might be ignored or misplaced if not handled correctly by the parent renderer. | Ensure the parent component mapping over these items applies the key to the 'Quizzes' component itself, not inside the component. |
| `client\src\pages\auth\LoginPage.jsx` | 34 | Logging raw error objects to the console in production can expose sensitive debugging info. | Use a logging service or only log specific error details relevant for debugging. |
| `server\controllers\auth.controller.js` | 182 | Missing input validation check for req.body existence. | Use a middleware like 'joi' or 'express-validator' to validate request bodies rather than manual if-checks. |
| `server\controllers\quiz.controller.js` | 285 | Potential division by zero | If totalMarks is 0 due to misconfiguration, the calculation will result in NaN. Add a check for totalMarks > 0. |
| `server\controllers\teacher.controller.js` | 218 | The `updateStudent` function performs an update without checking if the user ID exists or if the input data is valid/sanitized. | Validate inputs and check `affectedRows` to ensure the update was successful. |

### Security

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\AddQuestion.jsx` | 25 | Axios requests without explicit base URL configuration can be fragile depending on the hosting environment. | Use an environment variable (e.g., process.env.REACT_APP_API_URL) for the API base path. |
| `client\src\components\EditQuiz.jsx` | 30 | Directly alerting raw error messages from API calls can expose sensitive internal server details to users. | Use generic error messages and log the specific technical details to a monitoring service. |
| `client\src\pages\auth\LoginPage.jsx` | 17 | The login request does not implement rate limiting or request throttling, making it susceptible to brute-force attacks. | Implement rate limiting on the backend, or add a simple client-side debounce/cooldown mechanism. |
| `client\src\redux\features\AuthSlice.js` | 15 | Storing raw authentication tokens in localStorage makes the application vulnerable to Cross-Site Scripting (XSS) attacks. | Consider using an HttpOnly, Secure cookie for token storage or implement stricter Content Security Policies. |
| `server\controllers\questions.controller.js` | 84 | Improper error handling leads to potential information disclosure. | Avoid returning 'error.message' directly in production as it may leak internal database schema details or stack traces. |
| `server\controllers\teacher.controller.js` | 100 | The `getAllQuizAndAttempts` function returns data for all users/attempts without any authorization checks on the requester. | Ensure the middleware verifying that the requester is an admin or teacher is present on this route. |

### Performance

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\eslint.config.js` | 9 | The pattern '**/*.{js,jsx}' may include files that are already ignored or shouldn't be linted (like node_modules). | Ensure proper ignore patterns are defined and consider narrowing the scope to 'src/**/*.{js,jsx}' if applicable. |
| `client\src\App.jsx` | 25 | Redundant Fragment | The empty <></> fragments wrapping BrowserRouter are unnecessary and add a layer to the DOM tree. |
| `client\src\components\AddQuestion.jsx` | — | Missing loading state. The UI does not provide feedback (e.g., disabling buttons) while the request is in flight. | Introduce an `isLoading` state and disable the submit buttons during the API call. |
| `client\src\components\dashboard\TeacherDashboard.jsx` | 43 | Redundant calculations inside the render method. | Use useMemo for the 'published' and 'draft' counts to avoid recalculating on every re-render. |
| `client\src\components\EditQuiz.jsx` | 45 | Missing cleanup for asynchronous fetchQuiz calls if the component unmounts before request completion. | Use an AbortController to cancel ongoing requests on unmount. |
| `client\src\components\Navbar.jsx` | 5 | The profile fetch runs every time the Navbar mounts, which may be unnecessary if the user data is already in Redux. | Check if user data exists in Redux before triggering the API call, or move this logic to a higher-level AuthProvider. |
| `client\src\components\Results.jsx` | 34 | Using the array index as a key in 'attempts.map' is an anti-pattern in React. | Use a unique identifier from the 'per' object (e.g., per._id or per.id) as the key. |
| `client\src\components\StudentAddForm.jsx` | 15 | The handleChange function is recreated on every render. | Wrap handleChange in useCallback or move it outside the component if it does not depend on component-specific variables. |
| `client\src\components\StudentInfoPage.jsx` | 34 | Inefficient re-calculation on every render. | Wrap the statistic calculations (passedQuiz, failedQuiz, avgScore) in a useMemo hook. |
| `client\src\components\ViewQuiz.jsx` | 10 | The 'search' state is declared but never used. | Remove the unused 'search' state variable. |
| `client\src\pages\auth\Profile.jsx` | 13 | The dependencies array in useEffect is empty, but the component relies on data fetched inside it. | Ensure the logic for data loading is robust or includes necessary dependencies if required by linter rules. |
| `client\src\pages\auth\RegistrationPage.jsx` | 28 | Lack of loading state prevents user feedback and risks duplicate submissions while the API request is in progress. | Add a 'loading' state boolean and disable the button while 'isLoading' is true. |
| `client\src\pages\Students.jsx` | 12 | useEffect dependency array is empty, but the function inside calls a state setter. While standard, if the component unmounts quickly, it could cause memory leak warnings. | Implement an abort controller for the axios request or a boolean flag to track mounted state. |
| `client\src\pages\Students.jsx` | 48 | filteredStudents is calculated on every render even if students or search state hasn't changed. | Wrap the filtering logic in useMemo to prevent unnecessary recalculations. |
| `server\controllers\questions.controller.js` | 7 | Input validation is brittle. | Use a schema validation library like Joi or Zod to enforce data types, lengths, and required fields instead of manual if-statements. |
| `server\index.js` | — | Missing request rate limiting. | Implement 'express-rate-limit' to prevent brute-force attacks and resource exhaustion. |
| `server\middlewares\auth.middleware.js` | 4 | The 'async' keyword is unnecessary for authMiddleware and teacherMiddleware because there are no awaited asynchronous operations inside the function body. | Remove the 'async' keyword to avoid unnecessary promise wrapping. |
| `server\utils\bcrypt.js` | 4 | The 'await' keyword is unnecessary when returning the result of an async function directly. | Remove 'await' from the return statement: 'return bcrypt.hash(password, 10);' |
| `server\utils\bcrypt.js` | 8 | The 'await' keyword is unnecessary when returning the result of an async function directly. | Remove 'await' from the return statement: 'return bcrypt.compare(password, hashedPassword);' |
| `server\utils\jwt.js` | 4 | The generateToken function is marked as 'async', but 'jwt.sign' is a synchronous function call in this implementation (unless a callback is provided), making the 'async' keyword redundant. | Remove the 'async' keyword and the 'await' operator, or use the callback/promise-based version of jwt.sign if asynchronous behavior is intended. |

### Logic

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\App.jsx` | 13 | Mixed language comments | The comment at line 13 is in Gujarati/English mix. Maintain English for professional codebase consistency. |
| `client\src\components\dashboard\TeacherDashboard.jsx` | 113 | Using a simple alert for deletion feedback is poor user experience. | Use a proper UI toast notification library instead of blocking browser alerts. |
| `client\src\components\dashboard\TeacherDashboard.jsx` | 35 | Errors are logged to the console but not communicated to the user. | Maintain a 'loading' and 'error' state variable and display a proper error message in the UI when data fetching fails. |
| `client\src\components\dashboard\UserDashboard.jsx` | 42 | There is no loading or error state handling for the API calls, providing a poor user experience if the network request fails or takes time. | Implement a 'loading' state boolean and handle errors by displaying a UI notification rather than just console.log. |
| `client\src\components\EditStudent.jsx` | 15 | Missing dependency in useEffect. | Add 'id' to the dependency array of useEffect to ensure data re-fetches if the route param changes. |
| `client\src\components\EditStudent.jsx` | 34 | Excessive console logging in production-ready code. | Remove 'console.log' statements to avoid sensitive information leaks or performance degradation in production. |
| `client\src\components\ProtectedRoute.jsx` | 12 | Hardcoded redirect to '/' when the user lacks authorization. | Consider redirecting to a dedicated 'Unauthorized' page or allowing the redirect path to be passed as a prop. |
| `client\src\components\Results.jsx` | 13 | The component does not handle the loading state or potential null values for 'attempts'. | Add a 'loading' state variable to provide better UX while the data is being fetched. |
| `client\src\components\StudentAddForm.jsx` | 20 | Missing input validation (e.g., required fields, email format, password strength). | Add client-side validation logic or use a library like Formik/React Hook Form with Zod/Yup. |
| `client\src\components\StudentInfoPage.jsx` | 204 | Inconsistent field naming convention (firstName vs lastname vs userName). | Standardize to camelCase (e.g., lastName, username) across the backend and frontend. |
| `client\src\pages\auth\LoginPage.jsx` | 22 | The application does not handle the case where the user role is undefined or unrecognized. | Add a default redirect or error handling for users without a valid role. |
| `client\src\pages\auth\Profile.jsx` | 64 | The image src uses user.avatar, which is not initialized or guarded, leading to broken image placeholders. | Add an optional chaining operator (user?.avatar) or a fallback URL. |
| `client\src\pages\QuizPage.jsx` | 133 | Unnecessary logic inside button onClick. | Disable the button via the 'disabled' attribute if status is not 'published' for better UX and accessibility. |
| `server\controllers\quiz.controller.js` | 209 | Inconsistent error handling for missing quiz in takeQuiz | Add a check for isPublished array index [0] existence before accessing .status to prevent 'Cannot read property of undefined'. |
| `server\controllers\teacher.controller.js` | 158 | The `updateStudentStatus` function does not verify if the record actually existed or was updated; it returns 200 even if the ID doesn't exist. | Check `changeStatus.affectedRows` to confirm if a record was actually updated and return 404 if it is 0. |
| `server\index.js` | — | Missing global error handling middleware. | Add a centralized error handling middleware at the end of the middleware stack to catch and log errors consistently. |
| `server\index.js` | — | No 404 handler for undefined routes. | Add a middleware function at the end of your routes to handle requests for non-existent endpoints. |
| `server\routes\questions.routes.js` | 8 | RESTful naming convention violation. Routes usually represent resources, not actions. | Use '/questions' for the base path and rely on HTTP verbs (POST, GET, PATCH, DELETE) to define the operation, rather than including action names like '/create' or '/delete' in the URI. |

### Style

| File | Line | Issue | Suggestion |
|------|------|-------|------------|
| `client\src\components\AddQuestion.jsx` | 13 | Hardcoding the initial state in multiple places (useState and inside the conditional logic). | Define an `INITIAL_QUESTION_STATE` object outside the component to keep the code DRY. |
| `client\src\components\CreateQuiz.jsx` | 11 | State initialization uses null, which results in controlled inputs displaying 'null' or empty strings improperly depending on the browser. | Initialize duration and passingPercentage with empty strings or 0. |
| `client\src\components\dashboard\AdminDashboard.jsx` | 4 | The component does not implement any access control or authorization checks, potentially exposing admin routes to unauthorized users. | Wrap the component in a Higher-Order Component (HOC) or use a route guard to verify the user's role before rendering. |
| `client\src\components\dashboard\TeacherDashboard.jsx` | 95 | The table header has 6 columns but the row mapping does not match alignment properly in all cases. | Ensure the number of <th> elements matches the number of <td> elements (currently matching, but structure could be cleaner with a shared configuration). |
| `client\src\components\dashboard\UserDashboard.jsx` | 95 | Using the array index as a key for the Quizzes component list can cause rendering issues if the list order changes. | Use a unique identifier from the attempt object (e.g., key={per.id}) instead of the index. |
| `client\src\components\EditQuestion.jsx` | 30 | Debug console.log left in production code. | Remove 'console.log(question)'. |
| `client\src\components\EditQuiz.jsx` | 160 | Typo in 'There is no any questions' | Change to 'There are no questions' |
| `client\src\components\EditStudent.jsx` | 194 | Empty anonymous function inside button onClick. | Remove the empty arrow function inside the 'Save Changes' button as it serves no purpose. |
| `client\src\components\Navbar.jsx` | 42 | Nested ternary operators for conditional navigation are hard to read and maintain. | Extract the dashboard link calculation into a helper function or a variable before the return statement. |
| `client\src\components\Navbar.jsx` | 54 | Using empty strings as fallbacks for conditional rendering in JSX is considered a code smell. | Use the logical AND operator (&&) instead: {condition && <Component />} |
| `client\src\components\ProtectedRoute.jsx` | 6 | Missing prop-types validation for 'children' and 'allowedRoles'. | Add prop-types or migrate to TypeScript for better type safety. |
| `client\src\components\Quizzes.jsx` | 4 | Using the array index (idx) as a key is an anti-pattern in React when the list is subject to reordering or filtering. | Use a unique identifier from the data object (e.g., 'per.id') as the key. |
| `client\src\components\Quizzes.jsx` | 1 | The component structure is slightly confusing as it expects a table row but returns a Fragment, which may break HTML table layout expectations. | If this component is intended to be a table row, ensure the parent is a <table> or <tbody> and consider removing the React.Fragment if possible. |
| `client\src\components\Results.jsx` | 16 | Errors are only logged to the console, providing no feedback to the user when the API call fails. | Implement a user-facing error state or toast notification to inform the user of the failure. |
| `client\src\components\StudentAddForm.jsx` | 95 | Inconsistent casing for status option ('block' vs 'Active'). | Change the 'block' option text to 'Blocked' for better UI consistency. |
| `client\src\components\StudentInfoPage.jsx` | 234 | Using array index (idx) as a React key. | Use a unique identifier from the database record, such as `item.id` or `item.attempt_id`. |
| `client\src\pages\auth\LoginPage.jsx` | 1 | Unused imports (user, token). | Remove 'user' and 'token' constants if they are not utilized within the component. |
| `client\src\pages\auth\Profile.jsx` | 3 | Unused import: import { use } from 'react'. | Remove the unused import. |
| `client\src\pages\auth\RegistrationPage.jsx` | 45 | The 'placeholder' text for 'Last Name' is incorrect; it says 'Enter your full name' instead of 'Enter your last name'. | Update the placeholder to 'Enter your last name'. |
| `client\src\pages\auth\RegistrationPage.jsx` | 4 | Unused 'Link' import is potentially misleading, though it is used in the JSX footer. | The import is actually used; ensure code style remains consistent. |
| `client\src\pages\QuizPage.jsx` | 5 | Inconsistent variable naming (setquizzes). | Rename to setQuizzes to follow camelCase convention. |
| `client\src\pages\Students.jsx` | 34 | The handler receives an event object but the function is invoked as handleSearch(e). | Simplify to onChange={handleSearch} and define handleSearch as (e) => setSearch(e.target.value). |
| `client\src\redux\features\AuthSlice.js` | 8 | The slice is named 'user' but the file is named 'AuthSlice', leading to potential confusion. | Rename the slice constant or the file to maintain consistency (e.g., authSlice). |
| `server\controllers\auth.controller.js` | 10 | Hardcoded magic string for status. | Define a constants file for user roles and status values to improve maintainability. |
| `server\controllers\questions.controller.js` | 40 | Leaking database internal response objects. | Do not return the raw database result object (e.g., addQuestion) to the client; return a simplified object or just the success message. |
| `server\controllers\quiz.controller.js` | 39 | Hardcoded magic strings | Use an enum or constant object for status values like 'draft' and 'published' to maintain consistency across the codebase. |
| `server\controllers\teacher.controller.js` | 108 | Inconsistent formatting and lack of pagination for endpoints that return large datasets like `getAllQuizAndAttempts`. | Implement LIMIT and OFFSET in SQL queries to prevent memory exhaustion as the number of attempts grows. |
| `server\middlewares\auth.middleware.js` | — | Redundant code repetition in authMiddleware and teacherMiddleware violates the DRY (Don't Repeat Yourself) principle. | Create a shared utility function for verifying tokens or chain the middlewares by calling authMiddleware first. |
| `server\routes\admin.routes.js` | — | The router file is empty and currently serves no purpose. | Add route definitions or remove the file if it is not yet implemented. |
| `server\routes\questions.routes.js` | 4 | Missing semicolon at the end of the require statement for the controller. | Add a semicolon after the require statement. |
| `server\routes\quiz.routes.js` | 4 | Inconsistent spacing in import statement | Standardize spacing in the import list for better readability. |
| `server\routes\quiz.routes.js` | 8 | Inconsistent spacing in route definitions | Ensure consistent spacing around arguments in router methods, e.g., router.get("/all", authMiddleware, readAll) |
| `server\routes\teacher.routes.js` | 15 | Inconsistent naming convention for endpoints (e.g., '/own/quiz' vs '/attempts/all'). | Standardize naming conventions to be plural and RESTful (e.g., /quizzes/own, /attempts/students/all). |
| `server\routes\teacher.routes.js` | — | Typo in 'getOwnQuizes' function name imported from controller. | Rename to 'getOwnQuizzes' for correct spelling. |
| `server\routes\teacher.routes.js` | 13 | Inconsistent formatting and trailing spaces. | Use a linter like ESLint or Prettier to enforce consistent styling across the routes file. |
| `server\routes\user.routes.js` | 13 | Missing semicolon at the end of the line. | Add a semicolon to maintain consistent coding style with the rest of the file. |
