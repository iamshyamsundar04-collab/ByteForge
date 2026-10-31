// ============ detail.js - equipment detail card ============

// 1. Read the id from the address, e.g. equipment.html?id=phy-resistor
const params = new URLSearchParams(window.location.search);
const item = findEquipment(params.get("id"));
const detailDiv = document.getElementById("detail");

// small helper: turns ["a","b"] into <li>a</li><li>b</li>
function makeList(array) {
  return array.map(function (text) { return "<li>" + text + "</li>"; }).join("");
}

if (!item) {
  detailDiv.innerHTML = "<p>Equipment not found. Please go back and choose from the catalog.</p>";
} else {
  document.title = item.name + " - Detail Card";
  detailDiv.innerHTML = `
    <span class="lab-tag lab-${item.lab}">${item.lab} Lab</span>
    <h1>${item.name}</h1>
    <p>${item.description}</p>

    <div class="sections">
      <div class="section">
        <h3>Registration Details</h3>
        <ul>
          <li>Asset ID: ${item.assetId}</li>
          <li>Location: ${item.location}</li>
          <li>Custodian: ${item.custodian}</li>
        </ul>
      </div>

      <div class="section">
        <h3>Technical Specifications</h3>
        <ul>${makeList(item.specs)}</ul>
      </div>

      <div class="section">
        <h3>Usage Instructions</h3>
        <ol>${makeList(item.usage)}</ol>
      </div>

      <div class="section safety">
        <h3>Safety Precautions</h3>
        <ul>${makeList(item.safety)}</ul>
      </div>

      <div class="section">
        <h3>Operating Manual</h3>
        <p><a href="${item.manual}" target="_blank" rel="noopener">Open operating manual</a></p>
      </div>
    </div>

    <div class="btn-row">
      <a class="btn" href="booking.html?id=${item.id}">Book the slot</a>
    </div>`;
}
