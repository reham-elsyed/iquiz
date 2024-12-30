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
