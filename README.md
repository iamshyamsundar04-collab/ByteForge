# ByteForge: College Science and Engineering Lab Equipment Booking System

A responsive web application where students can browse lab equipment, read its specifications and safety rules, and reserve a 2-hour slot. Built with plain **HTML, CSS and JavaScript**. No frameworks, no libraries, no database.

**Course:** CSE326 Internet Programming (Continuous Assessment project)

---

## Features

- **Equipment catalog** grouped by Physics, Electronics, Mechanical and IoT labs (26 items)
- **Filter and search**: lab buttons plus a live search box
- **Equipment detail card** with registration details, technical specifications, usage instructions, safety precautions and an operating manual link
- **Slot reservation**: pick equipment, a date within the next 14 days, and one of four 2-hour slots
- **Clash prevention**: booked slots, and slots that have already started today, are disabled
- **Verification**: student name, 8-digit roll number and a project guide approval checkbox
- **Booking list**: view all bookings and cancel any of them
- **Responsive layout** for desktop and mobile

---

## Technologies

| Technology | Used for |
| --- | --- |
| HTML5 | Page structure |
| CSS3 | Styling, grid layout, mobile layout, colour variables |
| JavaScript (ES6) | Filtering, slot checking, validation, saving data |
| `localStorage` | Saving bookings in the browser (built in, nothing to install) |

---

## How to Run

1. Keep all files in one folder.
2. Double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox).

No server, installation or internet connection is needed. The internet is only used when you open an operating manual link.

---

## Project Structure

```
ByteForge/
├── index.html        Home page: equipment catalog
├── equipment.html    Equipment detail card page
├── booking.html      Slot booking page
├── style.css         Shared styling for all pages
├── data.js           Equipment list and save/load helper functions
├── catalog.js        Logic for the home page
├── detail.js         Logic for the detail card page
├── booking.js        Logic for the booking page
└── README.md         This file
```

### What each script does

| File | Responsibility |
| --- | --- |
| `data.js` | Holds the `equipmentList` array, the `timeSlots` array, and the helpers `getBookings()`, `saveBookings()` and `findEquipment()` |
| `catalog.js` | Loops over `equipmentList` and builds the cards; handles the lab filter buttons and the search box |
| `detail.js` | Reads the equipment `id` from the web address (for example `equipment.html?id=phy-resistor`) and builds the detail card |
| `booking.js` | Draws the slot buttons, validates the form, saves and cancels bookings |

---

## How It Works

### Catalog
`catalog.js` filters `equipmentList` by the selected lab and the search text, then writes a card for each match. Each card links to `equipment.html?id=...` and `booking.html?id=...`.

### Detail card
`detail.js` uses `URLSearchParams` to read the `id`, finds the item with `findEquipment()`, and fills the page. Safety precautions are highlighted in amber.

### Booking
1. The equipment drop-down and date picker are set up (dates from today to today + 14 days).
2. Four slot buttons are drawn: `09:00 - 11:00`, `11:00 - 13:00`, `14:00 - 16:00`, `16:00 - 18:00`.
3. A slot is disabled if a saved booking already has the same equipment, date and slot, or if the slot has already started today.
4. When **Confirm booking** is clicked, these checks run in order:
   - date is within the allowed range
   - a slot is selected
   - name is not empty
   - roll number matches `/^[0-9]{8}$/` (exactly 8 digits)
   - project guide approval checkbox is ticked
5. If all checks pass, the booking is saved in `localStorage` as JSON and the table is updated.

---

## Adding or Editing Equipment

All equipment is stored in `data.js`. To add an item, copy one block in `equipmentList` and change its values:

```js
{
  id: "phy-example", lab: "Physics", name: "Example Instrument",
  assetId: "PHY-EXA-0001", location: "Physics Lab, Block 28", custodian: "Prof. Name",
  description: "One or two sentences about the equipment.",
  specs: ["Spec 1", "Spec 2"],
  usage: ["Step 1", "Step 2"],
  safety: ["Precaution 1", "Precaution 2"],
  manual: "https://example.com/manual"
}
```

- `id` must be unique.
- `lab` must be one of `Physics`, `Electronics`, `Mechanical` or `IoT`.
- To change the manual link of an item, edit its `manual:` line.

---

## Operating Manual Links

Each item links to a manual, datasheet or procedure page. Some are manufacturer manuals (Arduino, Raspberry Pi, Espressif, Mitutoyo, Hakko, Siglent, Saleae). For basic physics apparatus the links are experiment guides. Some links point to a specific model (for example Rigol, Siglent or Hakko), so replace them if your lab uses a different model.

---

## Data Storage and Limitations

- Bookings are saved in the **browser's `localStorage`**, so they are stored per browser and per computer. A booking made on one computer is not visible on another.
- Clearing browser data deletes the bookings.
- Roll number verification checks only the format (8 digits). It does not look up a real student record.
- Project guide approval is a checkbox, not a real approval request.

---

## Future Scope

- Add **Supabase** (PostgreSQL) as the database so bookings are shared across all computers and double booking is blocked for everyone. In this project only `getBookings()` and `saveBookings()` in `data.js` would need to change.
- Real login for students and faculty using **Supabase Auth**.
- Email or SMS booking confirmation.
- Admin panel for lab staff to add or remove equipment.
- A real project guide approval request instead of a checkbox.
- QR code on each equipment linking to its detail card.

## PPT
-ppt link : https://docs.google.com/presentation/d/1oePTYj_z-2ZAOiuwPkwncbCGL7bFYPFE/edit?usp=sharing&ouid=110824462916881477675&rtpof=true&sd=true

---

## Team

| Member | Role | Responsibility |
| --- | --- | --- |
| Shyam Sundar(12623715) | Team lead, JavaScript developer, DevOps and Deployment Manager | Project plan, booking logic, slot checking and roll number validation (`booking.js`),Equipment data and detail card page: specs, usage steps, safety (data.js, detail.js), catalog cards, lab filters and search (catalog.js), Create and manage the GitHub repository, Handle branches, merges and pull requests, Resolve merge conflicts, Deploy the site to Vercel and check it after each update, Manage the README and project documentation|
|Krish(12622956)| Frontend developer | Home page, equipment card page and slot booking page (index.html, equipment.html, Booking.html) and video preparation for project |
|Aryan(12622305)| UI designer and tester | Styling, mobile layout, testing all pages and preparing the PPT (`style.css`) |



---

## Resources

- Physics lab equipment details: https://www.labkafe.com/blog/physics-laboratory-equipment-a-complete-list-of-important-equipment-and-their-uses/
- Physics lab equipment list (PDF): https://cdnbbsr.s3waas.gov.in/s3kv02c60549ede842a11ec07346b8928d/uploads/2024/09/2024092372-1.pdf
- Electrical lab equipment details: https://www.scribd.com/doc/282618512/Laboratories-Equipment-for-Electrical-engineering
