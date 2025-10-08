# EcoWell Nexus AI

EcoWell Nexus AI is a modern web application designed to help users track and improve their wellness at work. The app provides a friendly survey experience, collects wellness feedback, and displays personalized summaries on a dashboard.

## Features

- 📝 **Wellness Survey**: Simple, interactive survey to assess stress, satisfaction, and inclusion.
- 🤖 **Survey Bot**: Friendly entry point to encourage participation.
- 📊 **Dashboard**: Visual summary of your latest wellness responses.
- 🎨 **Material UI**: Clean, responsive, and accessible interface.
- ⚛️ **React + Redux**: Robust state management and scalable architecture.
- 🔄 **TypeScript**: Type-safe codebase for reliability.

## Project Structure

```
src/
  App.tsx
  index.tsx
  app/
    store.ts
  components/
    Dashboard.tsx
    SurveyBot.tsx
    SurveyForm.tsx
    ThankYou.tsx
  features/
    survey/
      surveySaga.ts
      surveySlice.ts
  root/
    rootSaga.ts
    store.ts
```

## Getting Started

1. **Install dependencies**
   ```
   npm install
   ```

2. **Run the development server**
   ```
   npm run dev
   ```

3. **Open in your browser**
   ```
   http://localhost:3000
   ```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## Tech Stack

- React
- Redux Toolkit
- Redux Saga
- TypeScript
- Material UI

## License

This project is for educational and demonstration purposes.