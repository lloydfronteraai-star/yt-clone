// Simple calendar app with localStorage events
class CalendarApp {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    const today = new Date();
    this.viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.eventsKey = 'calendar_events_v1';
    this.events = this.loadEvents();

    document.getElementById('prev').addEventListener('click', () => this.changeMonth(-1));
    document.getElementById('next').addEventListener('click', () => this.changeMonth(1));

    this.render();
  }

  loadEvents() {
    try {
      return JSON.parse(localStorage.getItem(this.eventsKey) || '{}');
    } catch (e) {
      return {};
    }
  }

  saveEvents() {
    localStorage.setItem(this.eventsKey, JSON.stringify(this.events));
  }

  changeMonth(delta) {
    this.viewDate.setMonth(this.viewDate.getMonth() + delta);
    this.render();
  }

  formatMonthYear(date) {
    return date.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  }

  render() {
    const monthYearEl = document.getElementById('monthYear');
    monthYearEl.textContent = this.formatMonthYear(this.viewDate);

    const calendarEl = this.container;
    calendarEl.innerHTML = '';

    // Weekday headers
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerRow = document.createElement('div');
    headerRow.className = 'row header';
    weekdays.forEach(w => {
      const cell = document.createElement('div');
      cell.className = 'cell header-cell';
      cell.textContent = w;
      headerRow.appendChild(cell);
    });
    calendarEl.appendChild(headerRow);

    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let row = document.createElement('div');
    row.className = 'row';

    // blank cells
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'cell empty';
      row.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (row.children.length === 7) {
        calendarEl.appendChild(row);
        row = document.createElement('div');
        row.className = 'row';
      }

      const cell = document.createElement('div');
      cell.className = 'cell day-cell';
      const dateStr = this.toISODate(new Date(year, month, day));
      const events = this.events[dateStr] || [];

      const dayNum = document.createElement('div');
      dayNum.className = 'day-number';
      dayNum.textContent = day;
      cell.appendChild(dayNum);

      if (events.length) {
        const dot = document.createElement('div');
        dot.className = 'event-dot';
        dot.title = events.join('\n');
        cell.appendChild(dot);
      }

      cell.addEventListener('click', () => this.onDayClick(dateStr));
      row.appendChild(cell);
    }

    // fill trailing blanks
    while (row.children.length < 7) {
      const blank = document.createElement('div');
      blank.className = 'cell empty';
      row.appendChild(blank);
    }
    calendarEl.appendChild(row);
  }

  toISODate(date) {
    return date.toISOString().slice(0, 10);
  }

  onDayClick(dateStr) {
    const existing = this.events[dateStr] || [];
    const summary = existing.join('\n');
    const input = prompt(`Events for ${dateStr} (one per line):`, summary);
    if (input === null) return; // cancelled

    const lines = input.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length) this.events[dateStr] = lines;
    else delete this.events[dateStr];
    this.saveEvents();
    this.render();
  }
}

window.addEventListener('DOMContentLoaded', () => new CalendarApp('calendar'));
