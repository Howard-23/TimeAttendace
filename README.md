# TimeTec Attendance Dashboard (Demo)

A modern, responsive frontend recreation of the **TimeTec Attendance** workforce overview dashboard.

Built as a static web app (HTML / CSS / JS) so you can open it locally or host it on GitHub Pages, Netlify, Vercel, etc.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-demo-orange.svg)

---

## Features

- **Workforce Overview** KPI cards (Work Rate, Normal, Rest Day, On Leave, Tardiness, No Clocking, Absent)
- **Attendance Analysis** with Chart.js doughnut + line charts
- **Flexi Dashboard** table with week-day selector
- **Today’s Exceptions** list
- **Device Status** panel
- **Dark / Light mode** toggle (persists when storage is available)
- **Export attendance data**
  - **Excel (.xlsx)** – multi-sheet workbook (Summary, Flexi Users, Exceptions, Work Rate History)
  - **PDF** – formatted report with tables

---

## Project structure

```
timetec-attendance-dashboard/
├── index.html          # Main page
├── css/
│   └── styles.css      # All styles + light/dark theme variables
├── js/
│   ├── theme.js        # Dark/light mode (sandbox-safe localStorage)
│   ├── charts.js       # Chart.js charts
│   ├── export.js       # Excel + PDF export logic
│   └── main.js         # Clock, tabs, week chips, filters
├── assets/             # (optional) images / logos
├── README.md
└── .gitignore
```

---

## Quick start

### Option 1 – Open locally

1. Clone or download this repo.
2. Open `index.html` in a modern browser  
   (Chrome / Edge / Firefox recommended).

> Some browsers restrict `file://` + CDN scripts. If exports or charts fail, use a simple local server (Option 2).

### Option 2 – Local server (recommended)

```bash
# Python 3
cd timetec-attendance-dashboard
python -m http.server 8080

# or Node
npx serve .
```

Then open: [http://localhost:8080](http://localhost:8080)

---

## Export

On the **Attendance Analysis** card:

| Button | Action |
|--------|--------|
| **Excel** | Downloads a multi-sheet `.xlsx` file |
| **PDF**   | Downloads a formatted PDF report |

The **Export** button on the Flexi section also triggers the Excel download.

Libraries used (via CDN):

- [SheetJS (xlsx)](https://sheetjs.com/) – Excel
- [jsPDF](https://github.com/parallax/jsPDF) + [autoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) – PDF

---

## Tech stack

| Layer        | Choice                          |
|--------------|---------------------------------|
| Markup       | Semantic HTML5                  |
| Styles       | CSS variables, light/dark theme |
| Charts       | Chart.js 4                      |
| Excel export | SheetJS (xlsx)                  |
| PDF export   | jsPDF + jspdf-autotable         |
| Icons        | Font Awesome 6                  |
| Font         | Inter (Google Fonts)            |

No build step required. Pure static files.

---

## Customising the data

Edit the `ATTENDANCE_DATA` object in `js/export.js` to change:

- Summary metrics
- Flexi user rows
- Exceptions
- Work-rate history

Charts currently use hard-coded sample series in `js/charts.js` — keep them in sync with the export data if you change numbers.

---

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. **Settings → Pages → Source**: Deploy from branch `main` (root or `/docs`).
3. Your site will be available at:  
   `https://<username>.github.io/<repo-name>/`

---

## Browser support

- Chrome / Edge / Firefox (latest)
- Safari 14+
- Dark mode uses `prefers-color-scheme` + optional `localStorage`

---

## Disclaimer

This is an **unofficial demo UI** inspired by the TimeTec Attendance product for learning / prototyping purposes.  
It is not affiliated with or endorsed by TimeTec Cloud. Sample data is fictional.

---

## License

MIT – feel free to use and modify.
