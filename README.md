
Transform Learning with IQUIZ – AI-powered quiz creation and feedback tailored just for you.
Create, share, and grow your knowledge effortlessly.


Hero section Image Attributes :Photo by <a href="https://unsplash.com/@brookecagle?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Brooke Cagle</a> on <a href="https://unsplash.com/photos/a-group-of-friends-at-a-coffee-shop--uHVRvDr7pg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      






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
____________________________________________________________

Great idea — a flash card study session where users can remove cards they’ve memorized is a simple and effective learning tool. Here’s the kind of **valuable data** you can collect from such a session:

---

### 🧠 **User Learning Data (Per Session)**

1. **Total number of cards** in the session.
2. **Cards removed** (memorized).
3. **Cards skipped / repeated** (not memorized).
4. **Session duration** (start time, end time).
5. **Average time per card**.
6. **Attempts per card** (if a card was repeated multiple times before being removed).
7. **Completion rate**:

   * How many cards were memorized vs total.
8. **First pass accuracy**:

   * How many cards were memorized on first try.

---

### 📈 **Progress Tracking Over Time (Per User)**

1. **Most missed cards** (those that persist across sessions).
2. **Time to master each card** (how many sessions or attempts).
3. **Learning curve**:

   * Are users getting faster?
   * Fewer repetitions needed over time?
4. **Daily/weekly activity**:

   * How often does the user study?
5. **Retention metrics** (if you add spaced repetition):

   * Did they still remember the card after X days?

---

### 🧩 **Card-Specific Analytics**

1. **Difficulty rating** (based on how many users struggle with a specific card).
2. **Average removal time** for each card.
3. **Commonly skipped cards**.
4. **Which cards are mastered fastest / slowest**.

---

### 💡 Bonus Data Points (if you want to enhance UX)

* **User confidence rating per card** (e.g., buttons like “easy”, “medium”, “hard”).
* **User feedback per card** (e.g., confusing wording).
* **Custom tags or topics** to analyze performance by topic.

---

### ✅ This data helps you:

* Personalize future sessions (e.g., focus on weak areas).
* Improve card quality (detect which cards need rewording).
* Visualize progress for the user (charts, stats).
* Implement spaced repetition logic.

Would you like a schema or a sample data structure (JSON or DB format) for tracking this data in your app?

Great! Since you’re using **Prisma** and **Supabase (PostgreSQL)**, here’s a well-structured schema design that tracks user progress with flashcards — including **memorization status, attempts, time tracking, and session-level analytics**.

---

## 🗂️ Suggested Prisma Schema

```prisma
model User {
  id             String     @id @default(uuid())
  email          String     @unique
  name           String?
  sessions       StudySession[]
  cardProgresses CardProgress[]
  createdAt      DateTime   @default(now())
}

model Deck {
  id        String     @id @default(uuid())
  title     String
  cards     FlashCard[]
  createdBy String
  createdAt DateTime   @default(now())
}

model FlashCard {
  id        String     @id @default(uuid())
  question  String
  answer    String
  deckId    String
  deck      Deck       @relation(fields: [deckId], references: [id])
  progresses CardProgress[]
  createdAt DateTime   @default(now())
}

model StudySession {
  id          String         @id @default(uuid())
  userId      String
  user        User           @relation(fields: [userId], references: [id])
  deckId      String
  deck        Deck           @relation(fields: [deckId], references: [id])
  startedAt   DateTime       @default(now())
  endedAt     DateTime?
  durationSec Int?
  cardProgresses CardProgress[]
}

model CardProgress {
  id            String       @id @default(uuid())
  sessionId     String
  session       StudySession @relation(fields: [sessionId], references: [id])
  cardId        String
  flashCard     FlashCard    @relation(fields: [cardId], references: [id])
  userId        String
  user          User         @relation(fields: [userId], references: [id])
  attempts      Int          @default(1)
  isMemorized   Boolean      @default(false)
  timeSpentSec  Int?
  lastSeenAt    DateTime     @default(now())
}
```

---

## 🧾 Explanation

### 🔄 `CardProgress`

* Tracks the **user's interaction** with each flashcard **per session**.
* Can be used to calculate:

  * Time spent per card
  * Attempts to memorize
  * Whether they marked it as memorized
  * Which cards are harder or easier

### 📊 `StudySession`

* Tracks:

  * Start and end times
  * Duration
  * Which deck was studied
  * All associated `CardProgress` records

---

## ✅ Benefits

* You can query:

  * Cards most users struggle with
  * Average attempts/time per card
  * Session completion rates
  * User learning progress over time
* Easy to plug into Supabase dashboard or visualize in your frontend.

---

## 🔌 Example Usage (Prisma)

```ts
// Create a new study session
const session = await prisma.studySession.create({
  data: {
    userId: user.id,
    deckId: deck.id,
  }
})

// Track progress per card
await prisma.cardProgress.create({
  data: {
    sessionId: session.id,
    cardId: flashCard.id,
    userId: user.id,
    attempts: 2,
    isMemorized: true,
    timeSpentSec: 32,
  }
})
```

---

Would you like help creating seed data or writing analytics queries (like "get most memorized cards", "get hardest cards", etc.)?
