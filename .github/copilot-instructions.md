# WTWR (What to Wear?) - AI Coding Guidelines

## Architecture Overview
- **Single-page React app** built with Vite, using React Router for navigation between Main (weather + filtered clothing) and Profile (all clothing items) pages.
- **Component structure**: Each component lives in its own folder with `.jsx` and `.css` files (e.g., `src/components/ItemCard/ItemCard.jsx` and `ItemCard.css`).
- **State management**: Global temperature unit toggle via React Context (`CurrentTemperatureUnitContext`). Local state in `App.jsx` for weather data, modals, and clothing items.
- **Data flow**: Weather fetched from OpenWeatherMap API on app load, filtered to determine clothing recommendations. Clothing items stored in local JSON server (`db.json`), filtered by weather type ("hot", "warm", "cold") in `Main.jsx`.

## Key Patterns
- **Component imports**: Use relative paths, e.g., `import ItemCard from "../ItemCard/ItemCard";`.
- **CSS naming**: BEM-like convention, e.g., `clothes-section__row-text`, `card__image`.
- **Forms**: Use custom `useForm` hook for controlled inputs, reset on submit (see `AddItemModal.jsx`).
- **API calls**: Centralized in `src/utils/api.js` for CRUD on clothing items (GET/POST/DELETE to `localhost:3001/items`). Weather API in `src/utils/weatherApi.js`.
- **Weather logic**: Temperature converted F/C in `filterWeatherData`; condition mapped to "hot" (>86°F), "warm" (66-85°F), "cold" (<66°F).
- **Modals**: Managed by `activeModal` string in App state; close on overlay click or delete action.

## Developer Workflows
- **Run locally**: `npm install` then `npm run dev` (Vite on port 3000). Separately run `npx json-server --watch db.json --port 3001` for mock backend.
- **Linting**: `npm run lint` (ESLint with React rules).
- **Build**: `npm run build` (Vite production build).
- **Add clothing item**: Via `AddItemModal`, select weather type matching API expectations ("hot", "warm", "cold").

## Integration Points
- **Weather API**: OpenWeatherMap with API key from `constants.js`; coordinates hardcoded to Phoenix, AZ.
- **Mock backend**: JSON Server for clothing items; items have `_id`, `name`, `weather`, `imageUrl`.
- **External dependencies**: React Router for routing, no state libraries beyond Context.

## Examples
- **Filtering items**: `clothingItems.filter(item => item.weather === weatherData.type)` in `Main.jsx`.
- **Context usage**: `<CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>` in `App.jsx`.
- **Form handling**: `const { values, handleChange, handleReset } = useForm(defaultValues);` in modals.