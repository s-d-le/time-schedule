# Time schedule

Created with Vue 3, TypeScript, Pinia and Schedule-X in Vite.

## Features

- Create time slots with `endTime` automatically filled.
- Create calendar events based on `numberOfBooking` and `visitDuration`
- Events are made ahead of time with first matching day of the week. It will not create events for past days
- Day selection will create/remove all time slots
- Pinia state management and persistent `localStorage`
- Hover to show details on calendar events
- Typescript and data models
- SPA with routing
- Demo unit test with pinia store
- Demo tailwindCSS usage

## Future Improvements

- Recurring events
- Refactor calendar render method
- Write calendar edit event plugin for Schedule-X
- Input validation (`startTime`, `endTime`, min max values etc)
- Better model and data flow for backend integration

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
