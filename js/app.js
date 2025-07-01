/* ---------- DATA ---------- */
const pabxData = [
  /* 2nd Floor */
  { floor: "2nd Floor", name: "K. M. Mostafa Kamal", extension: "201" },
  { floor: "2nd Floor", name: "Subir", extension: "202" },
  { floor: "2nd Floor", name: "Kawsar", extension: "203" },
  { floor: "2nd Floor", name: "Accounts", extension: "205" },
  { floor: "2nd Floor", name: "Kishor", extension: "206" },
  { floor: "2nd Floor", name: "Rayhan", extension: "207" },
  { floor: "2nd Floor", name: "L2 – Meeting Room (L)", extension: "291" },
  { floor: "2nd Floor", name: "L2 – Meeting Room (S)", extension: "292" },
  { floor: "2nd Floor", name: "L2 – Pantry Zone", extension: "299" },
  { floor: "2nd Floor", name: "Reserved", extension: "-" },
  { floor: "2nd Floor", name: "Reserved", extension: "-" },
  { floor: "2nd Floor", name: "Reserved", extension: "-" },
  { floor: "2nd Floor", name: "Reserved", extension: "-" },
  { floor: "2nd Floor", name: "Reserved", extension: "-" },
  { floor: "2nd Floor", name: "Reserved", extension: "-" },

  /* 3rd Floor */
  { floor: "3rd Floor", name: "Reception", extension: "300" },
  { floor: "3rd Floor", name: "Nazmul", extension: "301" },
  { floor: "3rd Floor", name: "Tasawoof", extension: "302" },
  { floor: "3rd Floor", name: "Sujan", extension: "303" },
  { floor: "3rd Floor", name: "UI/UX", extension: "311" },
  { floor: "3rd Floor", name: "Business Team‑01", extension: "312" },
  { floor: "3rd Floor", name: "Business Team‑02", extension: "313" },
  { floor: "3rd Floor", name: "Maruf", extension: "314" },
  { floor: "3rd Floor", name: "MVP", extension: "315" },
  { floor: "3rd Floor", name: "Riad", extension: "333" },
  { floor: "3rd Floor", name: "TechCare‑01", extension: "334" },
  { floor: "3rd Floor", name: "TechCare‑02", extension: "335" },
  { floor: "3rd Floor", name: "L3 – Meeting Room (L)", extension: "391" },
  { floor: "3rd Floor", name: "L3 – Meeting Room (S)", extension: "392" },
  { floor: "3rd Floor", name: "L3 – Pantry Zone", extension: "399" },

  /* 4th Floor */
  { floor: "4th Floor", name: "Reception", extension: "400" },
  { floor: "4th Floor", name: "Masum", extension: "401" },
  { floor: "4th Floor", name: "R&D‑01", extension: "402" },
  { floor: "4th Floor", name: "R&D‑02", extension: "403" },
  { floor: "4th Floor", name: "Medical Room", extension: "411" },
  { floor: "4th Floor", name: "DevOps (Mehedy)", extension: "441" },
  { floor: "4th Floor", name: "Network (Taki)", extension: "444" },
  { floor: "4th Floor", name: "Selim", extension: "456" },
  { floor: "4th Floor", name: "HR Team", extension: "457" },
  { floor: "4th Floor", name: "L4 – Meeting Room", extension: "491" },
  { floor: "4th Floor", name: "Training Room", extension: "492" },
  { floor: "4th Floor", name: "L4 – Pantry Zone", extension: "499" },
  { floor: "4th Floor", name: "Reserved", extension: "-" },
  { floor: "4th Floor", name: "Reserved", extension: "-" },
  { floor: "4th Floor", name: "Reserved", extension: "-" },

  /* 5th Floor */
  { floor: "5th Floor", name: "Reception", extension: "500" },
  { floor: "5th Floor", name: "Byron", extension: "501" },
  { floor: "5th Floor", name: "Habib", extension: "502" },
  { floor: "5th Floor", name: "Riyad", extension: "503" },
  { floor: "5th Floor", name: "Shakil", extension: "504" },
  { floor: "5th Floor", name: "Beta", extension: "511" },
  { floor: "5th Floor", name: "Delta", extension: "512" },
  { floor: "5th Floor", name: "DevTeam‑1", extension: "513" },
  { floor: "5th Floor", name: "Polash", extension: "521" },
  { floor: "5th Floor", name: "Obaidul", extension: "522" },
  { floor: "5th Floor", name: "SQA Team", extension: "523" },
  { floor: "5th Floor", name: "L5 – Meeting Room (L)", extension: "591" },
  { floor: "5th Floor", name: "L5 – Meeting Room (S)", extension: "592" },
  { floor: "5th Floor", name: "L5 – Pantry Zone", extension: "599" },
  { floor: "5th Floor", name: "Reserved", extension: "-" },
];

/* ---------- STATE & HELPERS ---------- */
let filteredData = [...pabxData];
const MOBILE_BP = 992;
const isReserved = (row) =>
  row.extension === "-" || /^reserved-/i.test(row.name);

/* ---------- INIT ---------- */
$(function () {
  populateFloorDropdown();
  bindEvents();
  applyFilters(); // initial render
});

function populateFloorDropdown() {
  const floors = [...new Set(pabxData.map((r) => r.floor))];
  $("#floor-filter").html(
    '<option value="">All Floors</option>' +
      floors.map((f) => `<option value="${f}">${f}</option>`).join("")
  );
}

/* ---------- RENDER CARDS ---------- */
function renderCards(filterActive) {
  const mobile = window.innerWidth <= MOBILE_BP;
  const $c = $("#cards-container").empty();

  const floors = [...new Set(filteredData.map((r) => r.floor))];
  const colors = ["floor-green", "floor-blue", "floor-cyan", "floor-purple"];

  const redExts = ["511", "512", "513"];

  floors.forEach((fl, idx) => {
    const rows = filteredData.filter((r) => r.floor === fl);
    if (!rows.length) return;

    if (!mobile) {
      /* ---------- DESKTOP ---------- */
      $c.append(`
          <div class="desktop-floor-card ${colors[idx % colors.length]}">
            <div class="card-header"><h3>${fl}</h3></div>
            <div class="card-table">
              <div class="table-header"><div>Floor</div><div>Name</div><div>Extension</div></div>
              <div class="table-body">
                ${rows
                  .map((r) => {
                    const highlight =
                      fl === "5th Floor" && redExts.includes(r.extension)
                        ? "highlight-red"
                        : "";
                    return `
                    <div class="table-row">
                      <div class="col-floor">${r.floor}</div>
                      <div class="col-name ${highlight}">${r.name}</div>
                      <div class="col-extension ">${
                        isReserved(r) ? "-" : r.extension
                      }</div>
                    </div>`;
                  })
                  .join("")}
              </div>
            </div>
          </div>`);
    } else {
      /* ---------- MOBILE ---------- */
      const open = filterActive ? " open" : "";
      const disp = filterActive ? "block" : "none";
      const icon = filterActive ? "▲" : "▼";

      $c.append(`
          <div class="mobile-floor-card${open}" data-floor="${fl}">
            <div class="mobile-card-header">
               <h3>${fl}</h3><span class="toggle-icon">${icon}</span>
            </div>
            <div class="mobile-card-content" style="display:${disp}">
              <div class="mobile-header-row">
              <div>Floor</div>  <div>Name</div><div>Extension</div>
              </div>
              <div class="mobile-entries">
                ${rows
                  .map((r) => {
                    const highlight =
                      fl === "5th Floor" && redExts.includes(r.extension)
                        ? "highlight-red"
                        : "";
                    return `
                    <div class="mobile-entry">
                    <div class="entry-floor ${highlight}">${r.floor}</div>
                      <div class="entry-name  ${highlight}">${r.name}</div>
                      
                      <div class="entry-extension ${highlight}">${
                      isReserved(r) ? "-" : r.extension
                    }</div>
                    </div>`;
                  })
                  .join("")}
              </div>
            </div>
          </div>`);
    }
  });
}

/* ---------- FILTER / COUNTS ---------- */
function applyFilters() {
  const f = $("#floor-filter").val().toLowerCase();
  const n = $("#name-filter").val().trim().toLowerCase();
  const e = $("#extension-filter").val().trim().toLowerCase();

  const filterActive = !!(f || n || e);

  filteredData = pabxData.filter((r) => {
    const a = !f || r.floor.toLowerCase().includes(f);
    const b = !n || r.name.toLowerCase().includes(n);
    const c = !e || r.extension.toLowerCase().includes(e);
    return a && b && c;
  });

  /* stats */
  let active = 0,
    reserved = 0;
  filteredData.forEach((r) => (isReserved(r) ? reserved++ : active++));
  $("#results-count").html(
    `${filteredData.length} result${filteredData.length !== 1 ? "s" : ""} — ` +
      `Active ${active} | Reserved ${reserved}`
  );

  renderCards(filterActive);

  /* auto‑expand only the matching mobile cards */
  /* auto‑expand only the matching mobile cards
– stay collapsed when NO filter is active */
  if (window.innerWidth <= MOBILE_BP) {
    if (filterActive) {
      // 1️⃣  there IS a filter → expand cards with matches
      $(".mobile-floor-card").each(function () {
        const floor = $(this).data("floor");
        const hasMatch = filteredData.some((r) => r.floor === floor);

        if (hasMatch) {
          $(this)
            .addClass("open")
            .find(".mobile-card-content")
            .slideDown(0)
            .end()
            .find(".toggle-icon")
            .text("▲");
        } else {
          $(this)
            .removeClass("open")
            .find(".mobile-card-content")
            .slideUp(0)
            .end()
            .find(".toggle-icon")
            .text("▼");
        }
      });
    } else {
      // 2️⃣  NO filter → collapse everything
      $(".mobile-floor-card")
        .removeClass("open")
        .find(".mobile-card-content")
        .slideUp(0);
      $(".mobile-floor-card .toggle-icon").text("▼");
    }
  }
}

/* ---------- EVENTS ---------- */
function bindEvents() {
  $("#floor-filter,#name-filter,#extension-filter").on(
    "input change",
    applyFilters
  );
  $("#clear-filters").on("click", function () {
    $("#floor-filter,#name-filter,#extension-filter").val("");
    applyFilters();
  });

  /* accordion toggle */
  $(document).on("click", ".mobile-card-header", function () {
    if (window.innerWidth > MOBILE_BP) return;
    const $card = $(this).parent();
    const open = $card.hasClass("open");
    $(".mobile-floor-card")
      .removeClass("open")
      .find(".mobile-card-content")
      .slideUp(300);
    $(".mobile-floor-card .toggle-icon").text("▼");
    if (!open) {
      $card.addClass("open");
      $card.find(".mobile-card-content").slideDown(300);
      $(this).find(".toggle-icon").text("▲");
    }
  });

  /* responsive switch */
  $(window).on("resize", function () {
    applyFilters();
  });
}
