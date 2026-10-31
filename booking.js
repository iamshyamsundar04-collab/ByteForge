// ============ booking.js - slot reservation ============

// ---- 1. Get all the elements we need ----
const equipmentSelect = document.getElementById("equipment");
const dateInput = document.getElementById("date");
const slotsDiv = document.getElementById("slots");
const nameInput = document.getElementById("studentName");
const rollInput = document.getElementById("rollNo");
const approvalBox = document.getElementById("approval");
const messageDiv = document.getElementById("message");
const bookBtn = document.getElementById("bookBtn");
const listDiv = document.getElementById("bookingList");

let selectedSlot = "";   // the slot the student clicked

// ---- 2. Small helpers ----

// Turn a Date object into text like "2026-10-30" (what <input type=date> uses)
function toDateText(d) {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = "message " + type;   // "error" or "success"
}

// ---- 3. Set up the page when it opens ----

// fill the equipment drop-down
equipmentList.forEach(function (item) {
  equipmentSelect.innerHTML += `<option value="${item.id}">${item.name} (${item.lab})</option>`;
});

// if we came from a detail page (booking.html?id=...), select that equipment
const startId = new URLSearchParams(window.location.search).get("id");
if (startId && findEquipment(startId)) {
  equipmentSelect.value = startId;
}

// allow dates from today to today + 14 days
const today = new Date();
const lastDay = new Date();
lastDay.setDate(today.getDate() + 14);
dateInput.min = toDateText(today);
dateInput.max = toDateText(lastDay);
dateInput.value = toDateText(today);

// ---- 4. Draw the four slot buttons ----
function showSlots() {
  const bookings = getBookings();
  const chosenDate = dateInput.value;
  const now = new Date();
  slotsDiv.innerHTML = "";
  selectedSlot = "";

  timeSlots.forEach(function (slot) {
    // is this slot already taken for this equipment and date?
    const taken = bookings.some(function (b) {
      return b.equipmentId === equipmentSelect.value && b.date === chosenDate && b.slot === slot;
    });

    // is this slot already over (only matters for today)?
    const startHour = parseInt(slot.split(":")[0]);
    const over = (chosenDate === toDateText(now) && startHour <= now.getHours());

    const button = document.createElement("button");
    button.type = "button";
    button.className = "slot";
    button.textContent = taken ? slot + " (Booked)" : slot;
    button.disabled = taken || over;

    button.addEventListener("click", function () {
      document.querySelectorAll(".slot").forEach(function (s) { s.classList.remove("selected"); });
      button.classList.add("selected");
      selectedSlot = slot;
    });

    slotsDiv.appendChild(button);
  });
}

// ---- 5. Show the list of bookings in a table ----
function showBookingList() {
  const bookings = getBookings();

  if (bookings.length === 0) {
    listDiv.innerHTML = '<p class="empty">No bookings yet.</p>';
    return;
  }

  let rows = "";
  bookings.forEach(function (b, index) {
    rows += `<tr>
      <td>${findEquipment(b.equipmentId).name}</td>
      <td>${b.date}</td>
      <td>${b.slot}</td>
      <td>${b.rollNo}</td>
      <td><button class="cancel-btn" data-index="${index}">Cancel</button></td>
    </tr>`;
  });

  listDiv.innerHTML = `<table>
    <thead><tr><th>Equipment</th><th>Date</th><th>Slot</th><th>Roll No</th><th></th></tr></thead>
    <tbody>${rows}</tbody></table>`;
}

// ---- 6. Confirm booking (with checks) ----
bookBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();
  const rollNo = rollInput.value.trim();

  if (dateInput.value === "" || dateInput.value < dateInput.min || dateInput.value > dateInput.max) {
    showMessage("Please choose a date within the next 14 days.", "error"); return;
  }
  if (selectedSlot === "") {
    showMessage("Please select a time slot.", "error"); return;
  }
  if (name === "") {
    showMessage("Please enter your name.", "error"); return;
  }
  // roll number must be exactly 8 digits
  if (!/^[0-9]{8}$/.test(rollNo)) {
    showMessage("Roll number must be exactly 8 digits.", "error"); return;
  }
  if (!approvalBox.checked) {
    showMessage("Project guide approval is required to book.", "error"); return;
  }

  // everything is fine - save the booking
  const bookings = getBookings();
  bookings.push({
    equipmentId: equipmentSelect.value,
    date: dateInput.value,
    slot: selectedSlot,
    name: name,
    rollNo: rollNo
  });
  saveBookings(bookings);

  showMessage("Booked " + findEquipment(equipmentSelect.value).name + " on " + dateInput.value + ", " + selectedSlot + ".", "success");
  approvalBox.checked = false;
  showSlots();
  showBookingList();
});

// ---- 7. Cancel a booking (button inside the table) ----
listDiv.addEventListener("click", function (event) {
  if (event.target.classList.contains("cancel-btn")) {
    const bookings = getBookings();
    bookings.splice(Number(event.target.dataset.index), 1);   // remove 1 item
    saveBookings(bookings);
    showMessage("Booking cancelled.", "success");
    showSlots();
    showBookingList();
  }
});

// redraw slots when equipment or date changes
equipmentSelect.addEventListener("change", showSlots);
dateInput.addEventListener("change", showSlots);

showSlots();
showBookingList();
