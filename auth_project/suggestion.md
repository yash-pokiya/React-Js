# Quiz App Backend API Suggestions (Mapped to Database Design)

This document maps out a comprehensive set of backend REST APIs designed specifically around your 4-table database schema (`users`, `quiz`, `questions`, `quiz_attempts`) shown in your ER diagram.

---

## 1. Database Relations Overview
*   **`users` ➡️ `quiz`** (1-to-Many): A teacher (`created_by`) can create multiple quizzes.
*   **`quiz` ➡️ `questions`** (1-to-Many): A quiz has many questions.
*   **`users` + `quiz` ➡️ `quiz_attempts`** (Many-to-Many association): A student (`user_id`) can attempt a quiz (`quiz_id`) multiple times (`attempt_no`).

---

## 2. API Endpoint Recommendations (Mapped to Roles)

### 🔑 A. Public & Authentication APIs (`/api/auth` or `/api/user`)
Handles registration, login, and profile operations.

*   `POST /api/user/register`
    *   **Description:** Register a user.
    *   **Payload:** `{ "email", "firstName", "lastName", "userName", "password", "role" }`
    *   **Role Constraint:** Validate that `role` is one of `student`, `teacher` (admins should be promoted manually or have a secure route).
*   `POST /api/user/login`
    *   **Description:** Authenticate user, issue JWT cookie.
    *   **Payload:** `{ "email" or "userName", "password" }`
*   `POST /api/user/logout`
    *   **Description:** Clear the cookie/session.
*   `GET /api/user/profile` (Auth required)
    *   **Description:** Get profile information of the logged-in user.
*   `PATCH /api/user/update` (Auth required)
    *   **Description:** Update profile fields (`firstName`, `lastName`, `profileImage`).
*   `PATCH /api/user/change-password` (Auth required)
    *   **Description:** Change password securely by validating the `oldPassword` and hashing the `newPassword`.

---

### 📝 B. Quiz Management APIs (`/api/quiz` - Teacher/Admin Focused)
Allows teachers to manage their quizzes and questions.

*   `POST /api/quiz/create` (Teacher only)
    *   **Description:** Create a new quiz.
    *   **Payload:** `{ "title", "description", "duration", "passing_percentage" }`
    *   **Notes:** Automatically sets `created_by` to the logged-in teacher's ID and initializes `total_marks` to 0.
*   `PATCH /api/quiz/update/:id` (Teacher only - Creator of the quiz)
    *   **Description:** Edit quiz metadata.
    *   **Payload:** `{ "title", "description", "duration", "passing_percentage" }`
*   `DELETE /api/quiz/delete/:id` (Teacher only - Creator of the quiz)
    *   **Description:** Delete a quiz (cascades and deletes questions and attempts).
*   `PATCH /api/quiz/status/:id` (Teacher only - Creator of the quiz)
    *   **Description:** Change quiz status between `draft` and `published`.
*   `GET /api/quiz/teacher/all` (Teacher only)
    *   **Description:** Fetch all quizzes created by the logged-in teacher.

---

### ❓ C. Question Management APIs (`/api/question` - Teacher Focused)
Allows adding and maintaining questions inside a quiz.

*   `POST /api/question/create` (Teacher only)
    *   **Payload:** `{ "quiz_id", "question", "option_a", "option_b", "option_c", "option_d", "option_e", "answer", "mark", "question_type" }`
    *   **Automatic logic:** Triggers code to increment the parent quiz's `total_marks` by `mark`.
*   `PATCH /api/question/update/:id` (Teacher only)
    *   **Payload:** `{ "question", "option_a", ..., "mark", "question_type" }`
    *   **Automatic logic:** Recalculates the parent quiz's `total_marks` if the `mark` is altered.
*   `DELETE /api/question/delete/:id` (Teacher only)
    *   **Automatic logic:** Subtracts the deleted question's `mark` from the parent quiz's `total_marks`.
*   `GET /api/question/read/:id` (Teacher only)
    *   **Description:** Read a single question details (including correct answer).

---

### 🎓 D. Student Quiz-Taking & Attempts APIs (`/api/quiz` & `/api/attempts` - Student Focused)
Enables students to find, start, submit, and review quizzes.

*   `GET /api/quiz` (Student/Teacher/Admin)
    *   **Description:** List all published quizzes (supports search by title/description and pagination).
*   `GET /api/quiz/take/:id` (Student only)
    *   **Description:** Load the quiz and its questions for attempting.
    *   **Important Security Rule:** The query must select questions but **exclude the `answer` column** to prevent cheating.
*   `POST /api/quiz/submit/:id` (Student only)
    *   **Description:** Evaluate student answers, compare percentage against `passing_percentage`, and write to `quiz_attempts`.
    *   **Payload:**
        ```json
        {
          "answers": [
            { "questionId": 101, "selectedOption": "A" },
            { "questionId": 102, "selectedOption": "C" }
          ]
        }   
        ```
    *   **Response:** `{ "success": true, "attempt_no", "score", "total_marks", "percentage", "is_pass" }`
*   `GET /api/quiz/attempts/my` (Student only)
    *   **Description:** Get all past attempts of the logged-in student.
*   `GET /api/quiz/:id/attempts/my` (Student only)
    *   **Description:** Fetch all attempts of the student for a specific quiz (to see progress/highest scores).

---

### 📊 E. Teacher Dashboard & Analytics APIs (`/api/teacher`)
Helps teachers review student attempts and calculate class averages.

*   `GET /api/teacher/dashboard/stats` (Teacher only)
    *   **Description:** Fetch stats like: total quizzes created, total attempts across all quizzes, and the average class score.
*   `GET /api/quiz/:id/attempts` (Teacher only)
    *   **Description:** Retrieve all student submissions for a specific quiz. Returns attempt details joined with the `users` table to display student name, score, and completion timestamp.

---

### 🛠️ F. Admin Panel APIs (`/api/admin`)
*   `GET /api/admin/users` -> List all users (with option to filter by `role`).
*   `PATCH /api/admin/users/:id/role` -> Change a user's role (promote student to teacher).
*   `DELETE /api/admin/users/:id` -> Terminate/disable a user account.
*   `GET /api/admin/quizzes` -> Review all quizzes across the entire system.

---

## 3. Designing Review APIs under your current 4-Table DB constraints

### The Review Dilemma
Currently, your `quiz_attempts` table saves only the **total score** and **is_pass status**. It does **not** store which option the student selected for which question. Therefore, if a student clicks *"Review Attempt"* on the frontend, you cannot show them:
*   *"You answered A, but the correct answer was C."*

### Two Proposed Solutions:

#### 💡 Solution A: Use a JSON Column in `quiz_attempts` (Keep exactly 4 tables)
MySQL supports a `JSON` data type. You can add a column named `responses` to your `quiz_attempts` table:
```sql
ALTER TABLE quiz_attempts ADD COLUMN responses JSON NULL;
```
When a student submits, save their responses array as a JSON string:
```json
[
  { "question_id": 101, "selected": "A", "is_correct": false },
  { "question_id": 102, "selected": "C", "is_correct": true }
]
```
*   **Review API Endpoint:** `GET /api/quiz/attempts/:attemptId` (Student only)
    *   **Response:** Returns `quiz_attempts.responses` along with question titles, allowing the frontend to easily display a review without extra tables.

#### 💡 Solution B: Add a 5th table `attempt_answers` (Normalised Database Approach)
If you prefer a strictly relational structure, create a 5th table:
```sql
CREATE TABLE attempt_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option CHAR(1) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
```
*   **Review API Endpoint:** `GET /api/quiz/attempts/:attemptId`
    *   **Query:** Joins `quiz_attempts`, `attempt_answers`, and `questions` to construct a complete review dataset.
