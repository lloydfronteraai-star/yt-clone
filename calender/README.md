# Simple Web Calendar

This is a minimal static web calendar app that runs in the browser.

Features:
- Month navigation
- Click a day to add/edit events (stored in `localStorage`)

Run:

1. Open `index.html` in your browser, or run a simple static server:

```powershell
# from the project root
python -m http.server 8080
# then open http://localhost:8080
```

Next steps you might want:
- Persist events to a backend / sync with Google Calendar
- Improve UI with modal editor and time slots
- Add recurring events and reminders
