// ============ catalog.js - home page ============
// Shows equipment cards. Can be filtered by lab and by search text.

const catalogDiv = document.getElementById("catalog");
const searchBox = document.getElementById("searchBox");
const filterButtons = document.querySelectorAll("#filters button");

let selectedLab = "All";   // which lab button is active

// Build the cards and put them on the page
function showEquipment() {
  const searchText = searchBox.value.toLowerCase();
  catalogDiv.innerHTML = "";              // clear old cards
  let count = 0;

  equipmentList.forEach(function (item) {
    const labMatches = (selectedLab === "All" || item.lab === selectedLab);
    const textMatches = item.name.toLowerCase().includes(searchText);

    if (labMatches && textMatches) {
      count++;
      catalogDiv.innerHTML += `
        <article class="card">
          <span class="lab-tag lab-${item.lab}">${item.lab} Lab</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="btn-row">
            <a class="btn" href="equipment.html?id=${item.id}">View details</a>
            <a class="btn btn-outline" href="booking.html?id=${item.id}">Book</a>
          </div>
        </article>`;
    }
  });

  if (count === 0) {
    catalogDiv.innerHTML = '<p class="empty">No equipment found. Try another lab or search word.</p>';
  }
}

// When a lab button is clicked
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");
    selectedLab = button.dataset.lab;
    showEquipment();
  });
});

// When the user types in the search box
searchBox.addEventListener("input", showEquipment);

showEquipment();   // show everything when page opens
