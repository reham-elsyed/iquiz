Transform Learning with IQUIZ – AI-powered quiz creation and feedback tailored just for you.
Create, share, and grow your knowledge effortlessly.

This project is built with Next.js as the primary framework, leveraging its full-stack capabilities for both server-side and client-side logic. The application uses:

React for building interactive user interfaces.
Next.js for routing, API endpoints, and server-side rendering.
Prisma as the ORM for database access and migrations.
NextAuth.js for authentication and session management.
Tailwind CSS for styling and utility-first design.
Zod for schema validation on both client and server.
Jest and React Testing Library for unit and integration testing.
OpenAI/Google Generative AI for AI-powered quiz and flashcard generation.
RESTful API routes under /api for all backend operations, including quiz creation, answer checking, study session management, and flashcard feedback.
The architecture follows a clear separation of concerns:

UI and State Management: React components, hooks, and reducers.
API Layer: Next.js API routes for all data mutations and queries.
Database Layer: Prisma ORM for type-safe database access.
Authentication: All sensitive actions require a logged-in user session.
What Else Should Be Included in the README

Project Setup

////
Got it ✅ You want a **README Requirements section** for your Next.js app based on your `package.json`.
Here’s a clean template you can drop straight into your README.md:

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed before running the project:

* **[Node.js](https://nodejs.org/)** (>= 18.x recommended)
* **npm** (comes with Node.js)
* A database (configured in your environment variables, Prisma is used)
* Setup your `.env` file (see Environment Variables section)

---

### ⚙️ Environment Variables

Create a `.env` file in the root of the project and configure it with the following (examples, adjust as needed):

```env
DATABASE_URL="your-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-next-auth-secret"

# (Optional) Provider API Keys
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_API_KEY="your-google-api-key"
```

---

### 🛠 Installation

Clone the repo and install dependencies:

```bash
git clone <https://github.com/reham-elsyed/iquiz.git>
cd iquiz
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

---

### ▶️ Running the App Locally

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

### 🏗️ Build & Start in Production

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

### ✅ Testing

Run tests:

```bash
npm test
```

Run in watch mode:

```bash
npm run test:watch
```

////

How to run migrations (npx prisma migrate dev)
How to seed the database (if applicable)
Testing

How to run tests (npm test)
Testing philosophy and coverage
Folder Structure
iquiz/
├── components.json
├── jest.config.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma/                  # Database schema & migrations
├── public/                  # Static assets (images, icons, etc.)
├── README.md
├── setupTests.js            # Jest setup file
├── tailwind.config.ts       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
└── src/                     # Main application source
    ├── app/                 # Next.js App Router pages & layouts
    │   ├── (auth)/          # Authentication routes
    │   ├── api/             # API routes
    │   │   ├── auth/ 
    │   │   ├── checkAnswer/
    │   │   ├── endTime/
    │   │   ├── finishSession/
    │   │   ├── flashCardFeedback/
    │   │   ├── game/
    │   │   ├── gameDuration/
    │   │   ├── questions/
    │   │   └── studySessionCreation/
    │   ├── create-flashcard/
    │   ├── error.tsx
    │   ├── favicon.ico
    │   ├── flash-card-stats/
    │   ├── fonts/
    │   ├── games/
    │   ├── globals.css
    │   ├── history/
    │   ├── home/
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   ├── not-found.tsx
    │   ├── page.test.tsx
    │   ├── page.tsx
    │   ├── play/
    │   ├── providers/
    │   ├── quiz/
    │   ├── schemas/
    │   ├── statistics/
    │   └── userDashboard/
    │
    ├── components/          # Reusable UI and feature components
    │   ├── BlankAnswersComponent/
    │   ├── Buttons/
    │   ├── ChartLineDotsColors/
    │   ├── Charts/
    │   ├── ChoicesButton/
    │   ├── Counter/
    │   ├── CutomWordCloud/
    │   ├── EmptyStatsForNewUsers/
    │   ├── EndOfQuizModal/
    │   ├── FilterEffect/
    │   ├── FlashCard/
    │   ├── FlashCardStats/
    │   ├── Footer/
    │   ├── GamesDurationGraph/
    │   ├── GamesPerformanceReview/
    │   ├── Hero/
    │   ├── HistoryComponent/
    │   ├── LoadingQuestions/
    │   ├── MCQuiz/
    │   ├── NavBar/
    │   ├── NavBarList/
    │   ├── NewUserComponents/
    │   ├── OpenEndedQuiz/
    │   ├── OverviewStatsComponent/
    │   ├── PerformanceReviewCard/
    │   ├── PieChartComponent/
    │   ├── PopularGames/
    │   ├── ProgressBar/
    │   ├── QuizCreation/
    │   ├── QuizTypesComponent/
    │   ├── SectionComponent/
    │   ├── SideBar/
    │   ├── Slider/
    │   ├── Statistics/
    │   ├── SVGComponents/
    │   ├── TitleCard/
    │   ├── ui/              # ShadCN / UI primitives
    │   ├── UserAvatar/
    │   ├── userDashboard/
    │   └── UserNav/
    │
    ├── hooks/               # Custom React hooks
    │   ├── use-toast.tsx
    │   ├── useChartDotsColor.tsx
    │   ├── useEventListener.tsx
    │   ├── useFlashCardSession.tsx
    │   ├── useLocalStorage.tsx
    │   └── useReloade.ts
    │
    ├── lib/                 # Utility functions (shared logic)
    │
    └── types/               # TypeScript types & interfaces
        ├── cardTypes.ts
        ├── feedbackFlashcardTypes.ts
        ├── formTypes.ts
        ├── gameTypes.ts
        ├── geminiResponseTypes.ts
        ├── navbarTypes.ts
        └── weakQuestionsPerformanceTypes.ts


API Documentation

Endpoints, request/response examples
Contributing

Guidelines for contributing, code style, PR process
Deployment

How to deploy (Vercel, Docker, etc.)
License

Project license information
Contact/Support

How to get help or report issues


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