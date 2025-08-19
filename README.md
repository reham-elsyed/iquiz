Transform Learning with IQUIZ – AI-powered quiz creation and feedback tailored just for you.
Create, share, and grow your knowledge effortlessly.



User Authentication And EndPoints in IQuiz app:

POST Quiz checkAnswer API
This file implements the POST endpoint for handling quiz answer submissions in a Next.js application. It validates user input using Zod, retrieves the relevant question from the database, and updates the database with the user's answer. Depending on the question type (mcq or open_ended), it determines correctness or calculates a similarity percentage using the string-similarity library. The endpoint ensures proper error handling, including validation errors and missing question records.

POST Quiz Creation API
This file implements the POST endpoint for creating a new quiz in a Next.js application. It performs the following key functions:

User Authentication: Verifies that the user is logged in using getAuthSession before proceeding.
Input Validation: Validates the request body using the quizCreationSchema defined with Zod.
Game Initialization: Creates a new game record in the database, linking it to the authenticated user.
Question Fetching: Fetches quiz questions from an external API based on the quiz type (mcq or open_ended), topic, and amount specified.
Question Handling: Processes and formats the fetched questions before storing them in the database:
For MCQs: Randomizes options and stores them as JSON strings.
For Open-ended questions: Saves the question and answer pairs directly.
Error Handling: Provides detailed responses for validation errors (e.g., schema mismatch) and internal server errors.
Game ID Response: Returns the gameId for the newly created quiz.
This endpoint is a critical part of the quiz application's backend, allowing authenticated users to create customized quizzes with properly stored questions.

POST Quiz Question Generator API
This file defines the POST endpoint responsible for generating quiz questions dynamically. It utilizes GPT-based AI to create questions for quizzes and performs the following functions:

User Authentication: (Currently commented out) Verifies if the user is logged in using getAuthSession to ensure only authenticated users can create a quiz.
Input Validation: Validates the request body using the quizCreationSchema defined with Zod, ensuring the payload includes the required fields: amount, topic, and type.
Question Generation:
For Open-Ended Questions: Uses GPT to generate a specified number of questions and answers related to the given topic. Answers are limited to 15 words.
For MCQs: Uses GPT to generate a specified number of multiple-choice questions with randomized options, including one correct answer.
Error Handling: Handles validation errors with appropriate responses and logs unexpected errors for debugging purposes.
Response: Returns the generated questions in JSON format to the client.
This endpoint serves as an AI-powered solution to dynamically generate high-quality quiz questions based on user-specified parameters, enhancing the functionality and adaptability of the quiz application.

---

Great idea — a flash card study session where users can remove cards they’ve memorized is a simple and effective learning tool. Here’s the kind of **valuable data** you can collect from such a session:

---


# Flashcard Feedback Session Workflow & Design Pattern

## 1. Workflow Overview

### A. Page Load and Game Fetching
- **File:** `src/app/play/flash_card/[gameId]/page.tsx`
- **Purpose:** Server-side fetches a game (flashcard set) and its questions from the database using Prisma, based on the `gameId` route parameter.
- **How:**  
  - The `gameId` is extracted from the route params.
  - The game and its questions are fetched from the database.
  - The data is passed as props to the `FlipCardComponent`.

---

### B. FlipCardComponent Initialization
- **File:** `src/components/FlipCardComponent/FlipCardComponent.tsx`
- **Purpose:** Handles the flashcard UI, user interaction, and feedback logic.
- **How:**
  - Receives the `game` object (with questions) as a prop.
  - On mount (`useEffect`), it **creates a new study session** by POSTing to `/api/studySessionCreation`.
    - The returned `studySessionId` is stored in state for later use.
  - Uses `useLocalStorage` to track the current question index, so progress persists across reloads.
  - Uses `useReducer` to manage the questions and feedback actions.

---

### C. Creating a Study Session
- **File:** `src/app/api/studySessionCreation/route.ts`
- **Purpose:** API endpoint to create a new study session in the database.
- **How:**
  - Receives a POST request (no body needed; uses session cookies).
  - Gets the authenticated user session.
  - Creates a new `studySession` in the database with the user’s ID.
  - Returns the new session’s ID.

---

### D. User Interaction and Feedback
- **File:** `FlipCardComponent.tsx`
- **Purpose:** Allows the user to flip cards, navigate, and submit feedback.
- **How:**
  - The user flips the card to see the answer.
  - The user selects feedback (EASY, MEDIUM, HARD) for the current card.
    - On "EASY", the reducer triggers an async call to save feedback:
      - Calls `saveFeedbackFlashCardEasy`, which POSTs to `/api/flashCardFeedback` with:
        - `questionId`, `feedback` (EASY/MEDIUM/HARD), `timeSpent`, and `sessionId`.
    - "MEDIUM" and "HARD" currently just update the reducer state (could be extended to also save feedback).
  - The user can navigate to the next card, which updates the index in local storage.

---

## 2. Design Pattern Used

### A. Client-Server Separation
- **Server Side:**  
  - Fetches game data and creates study sessions using API routes and Prisma ORM.
- **Client Side:**  
  - Handles UI, state management, and user interactions.
  - Communicates with the server via RESTful API endpoints.

### B. State Management
- **useReducer:**  
  - Manages the list of questions and feedback actions, making it easy to extend for more complex feedback logic.
- **useLocalStorage:**  
  - Persists the current question index, so users can resume where they left off.

### C. API-Driven Feedback
- **RESTful API Endpoints:**  
  - `/api/studySessionCreation` for session creation.
  - `/api/flashCardFeedback` for saving feedback per card.
- **Decouples** UI logic from database logic, making the system modular and scalable.

### D. Authentication Context
- **getAuthSession:**  
  - Ensures all study sessions and feedback are tied to the authenticated user.

---

## 3. Step-by-Step Flow

1. **User navigates to a flashcard game page.**
2. **Server fetches game and questions, passes to `FlipCardComponent`.**
3. **On mount, `FlipCardComponent` creates a new study session via API.**
4. **User flips cards, reviews questions, and gives feedback (EASY/MEDIUM/HARD).**
5. **On feedback, the component sends feedback to the server, associating it with the current study session and question.**
6. **User navigates through all cards, with progress saved in local storage.**
7. **All feedback is stored in the backend, tied to the session and user.**

---

## 4. Summary Table

| Step                | File(s) Involved                                   | Responsibility                                   |
|---------------------|---------------------------------------------------|--------------------------------------------------|
| Fetch game & questions | `page.tsx`                                      | Server-side data fetching                        |
| Create study session   | `FlipCardComponent.tsx`, `route.ts` (API)       | API call to backend, session creation            |
| Show flashcards        | `FlipCardComponent.tsx`                         | UI, state, navigation, feedback dispatch         |
| Save feedback          | `FlipCardComponent.tsx`, `/api/flashCardFeedback` | API call to backend, feedback persistence        |
| Persist progress       | `FlipCardComponent.tsx`                         | Local storage for current question index         |

---

## 5. Design Pattern Summary

- **Separation of Concerns:** UI, state, and backend logic are clearly separated.
- **API-First:** All data mutations go through RESTful endpoints.
- **Stateful UI:** Uses React hooks for state and persistence.
- **Authenticated Actions:** All study sessions and feedback are tied to the logged-in user.

---

**This architecture is scalable, maintainable, and follows modern full-stack React/Next.js best practices.**




 