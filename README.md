# Study Buddy AI

Build a modern study application called "REVIXA".

Tagline:
"Turn your notes into knowledge you can test."

This is a portfolio project for a Computer Engineering student.

Build the frontend UI first using dummy data. Do NOT connect an AI API yet.

Main user flow

Landing Page
→ User pastes study notes
→ Clicks "Generate Study Kit"
→ Flashcards screen
→ Quiz screen
→ Final results screen

Landing Page

Create:

Application logo/name: MemoForge AI

Short tagline

Short description explaining that the application converts study notes into flashcards and quizzes

Large textarea for study notes

Character/word counter

Maximum input: 3000 words

"Generate Study Kit" button

Loading state for generation

Validation message when notes are empty

Clean minimal design

Responsive mobile-first layout

Flashcards Screen

Create:

10 flashcards

Question on the front

Answer on the back

Clicking the card flips it

Previous button

Next button

Progress indicator such as "Card 3 of 10"

Progress bar

Restart flashcards button

Button to continue to quiz

Use dummy flashcard data initially.

Quiz Screen

Create:

5 multiple-choice questions

4 options per question

Difficulty badge:

Easy

Medium

Hard

User selects an answer

Immediately show correct/incorrect feedback

Show the correct answer when the user is wrong

Prevent changing the answer after submission

Next question button

Quiz progress indicator

Use dummy quiz data initially.

Results Screen

Display:

Final score

Percentage

Number of correct answers

Number of incorrect answers

Performance message

"Retry Quiz"

"Generate New Study Kit"

Design

Use:

Modern minimal interface

Dark mode

Responsive design

Mobile-first layout

Good spacing

Accessible buttons

Clean typography

Subtle animations

Professional portfolio-quality appearance

Do not over-design the application.

Architecture

Keep the code modular.

Separate:

Pages

Components

Data/models

API/service layer

Use dummy data through a clearly separated data/service layer so that it can later be replaced with the real AI API.

Do not implement authentication, payments, social features, or unnecessary functionality.

The primary goal is a clean and functional AI study application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/62fe023a-97ee-4c96-a1dd-c73b136c7218).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
