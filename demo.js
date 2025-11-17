document.addEventListener("DOMContentLoaded", () => {
  //note for future developer
  // Provide the addon variant Id here , and then include the same variant name in the below list.

  const variantObject = {
    "Argan Oil": 45874658181287,
    "Avocado Oil": 45874658214055,
    "Batana Oil": 45874658246823,
    "Black Seed Oil": 45874658279591,
    "Coconut Oil": 45874658312359,
    "Flaxseed Oil": 45874658345127,
    "Lavender Essential Oil": 45874658377895,
    "Macadamia Oil": 45874658410663,
    "Rice Bran Oil": 45874658443431,
    "Rose Petals (dried)": 45874658476199,
    "Shea Butter": 45874658508967,
    "Tea Tree Essential Oil": 45874658541735,
    "Wheat Germ Oil": 45874658574503,
    "Aloe Vera Juice": 45883281899687,
    "Agave Extract": 45883281932455,
    "Chamomile Flower Extract": 45883281965223,
    "Ginger Root Extract": 45883281997991,
    Honey: 45883282030759,
    "Marshmallow Root Extract": 45883282063527,
    "Nettle Extract": 45883282096295,
    "Sugarcane Extract": 45883282129063,
    "Lemongrass Essential Oil": 46959967994023,
    "Castor Oil": 47105199472807,
    "Cocoa Butter": 47136444317863,
    "Fragrance Free": 47136444350631,
    Buttercreme: 47136444383399,
    Coconut: 47136444416167,
    "Coconut Lime Verbena": 47136444448935,
    Jasmine: 47136444481703,
    "Lemon Verbena": 47136444514471,
    Mango: 47136444547239,
    Rose: 47136444580007,
    Sandalwood: 47136444612775,
    Vanilla: 47136444645543,
    "Vanilla Sugar": 47136444678311,
  };

  const descriptionObject = {
    "Argan Oil":
      "Restores shine and softness while protecting hair from breakage and heat damage.",
    "Avocado Oil":
      "Deeply nourishes dry strands with vitamins and fatty acids for smooth, healthy hair.",
    "Batana Oil":
      "Revives thinning or damaged hair, encouraging thicker and fuller growth.",
    "Black Seed Oil":
      "Strengthens roots, reduces shedding, and promotes healthy scalp balance.",
    "Castor Oil":
      "Boosts hair growth and thickness while locking in long-lasting moisture.",
    "Coconut Oil":
      "Hydrates and softens hair, leaving it smooth, frizz-free, and naturally shiny.",
    "Flaxseed Oil":
      "Rich in omega-3s to strengthen strands and enhance natural luster.",
    "Lavender Essential Oil":
      "Soothes the scalp, calms irritation, and adds a relaxing floral aroma.",
    "Macademia Oil":
      "Smooths frizz and repairs dryness, giving your hair a silky, healthy finish.",
    "Rice Bran Oil":
      "Adds shine and body while protecting hair from UV and pollution damage.",
    "Tea Tree Essential Oil":
      "Purifies the scalp, reduces dandruff, and refreshes with a clean, herbal scent.",
    "Wheat Germ Oil":
      "Fortifies hair strands with vitamins for stronger, healthier growth.",
    "Aloe Vera Juice":
      "Hydrates and soothes the scalp, adding shine and smoothness to every strand.",
    Honey:
      "A natural humectant that locks in moisture for soft, shiny, and manageable hair.",
    "Shea Butter":
      "Deeply conditions and seals in moisture, perfect for taming frizz and curls.",
    "Cocoa Butter":
      "Nourishes and softens dry hair while giving a silky, touchable finish.",
    "Agave Extract":
      "Boosts hydration and smoothness, leaving hair soft and silky.",
    "Chamomile Flower Extract":
      "Softens strands and enhances natural highlights with a calming scent.",
    "Ginger Root Extract":
      "Stimulates scalp circulation to encourage healthy hair growth.",
    "Marshmallo Root Extract":
      "Detangles and conditions hair, adding smoothness and slip.",
    "Nettle Extract":
      "Strengthens roots, reduces hair fall, and supports thicker growth.",
    "Sugarcane Extract":
      "Gently exfoliates the scalp, promoting smoothness and renewal.",
    "Fragrance Free":
      "Pure nourishment with zero added scent — perfect for sensitive scalps.",
    Buttercreme:
      "A rich, creamy scent that leaves hair soft, smooth, and indulgent.",
    Coconut:
      "Tropical and refreshing — hydrates hair and leaves a beachy aroma.",
    "Coconut Lime Verbana":
      "A bright, citrusy tropical blend that energizes and refreshes.",
    Jasmine:
      "A delicate floral scent that soothes the senses and enhances elegance.",
    "Lemon Verbena":
      "Uplifting citrus fragrance that refreshes and revitalizes your hair.",
    Mango:
      "Sweet tropical scent that nourishes while adding a juicy, fruity touch.",
    Rose: "Romantic floral essence that adds softness and a timeless, fresh scent.",
    Sandalwood:
      "Earthy, warm fragrance that calms the senses and smooths your hair.",
    Vanilla:
      "Sweet and comforting aroma that leaves hair silky and delicately scented.",
    "Vanilla Sugar":
      "Soft, sugary scent that adds warmth and a touch of sweetness to your style.",
  };

  // include the variant in the following list

  const categories = {
    Oils: [
      "Argan Oil",
      "Avocado Oil",
      "Batana Oil",
      "Black Seed Oil",
      "Castor Oil",
      "Coconut Oil",
      "Flaxseed Oil",
      "Lavender Essential Oil",
      "Macademia Oil",
      "Rice Bran Oil",
      "Tea Tree Essential Oil",
      "Wheat Germ Oil",
    ],
    Botanicals: ["Aloe Vera Juice", "Honey"],
    Butters: ["Shea Butter", "Cocoa Butter"],
    Extracts: [
      "Agave Extract",
      "Chamomile Flower Extract",
      "Ginger Root Extract",
      "Marshmallo Root Extract",
      "Nettle Extract",
      "Sugarcane Extract",
    ],
    Fragrance: [
      "Fragrance Free",
      "Buttercreme",
      "Coconut",
      "Coconut Lime Verbana",
      "Honey",
      "Jasmine",
      "Lemon Verbena",
      "Mango",
      "Rose",
      "Sandalwood",
      "Vanilla",
      "Vanilla Sugar",
    ],
  };

  const container = document.getElementById("manual-tab-addons");
  if (!container) return;

  // Read config from data attributes

  const PRODUCT_TITLE = container.dataset.productTitle || "";
  const MAIN_VARIANT_ID = container.dataset.variantId || null;

  // console.log("aaaaaaaaaaaaaaaaa")
  const outputDiv = document.getElementById("manual-outputs");

  const MAX_ADDONS = 4;
  let selectedAddons = []; // array of addon objects: { category, name, description }

  // Enable/disable generate button

  // Utility: create DOM element from html
  function el(html) {
    const div = document.createElement("div");
    div.innerHTML = html.trim();
    return div.firstElementChild;
  }

  // Toggle selection for manual addon
  function toggleAddonSelection(addon) {
    const idx = selectedAddons.findIndex(
      (a) => a.name === addon.name && a.category === addon.category
    );
    if (idx !== -1) {
      selectedAddons.splice(idx, 1);
    } else {
      if (selectedAddons.length >= MAX_ADDONS) {
        alert(`You can select up to ${MAX_ADDONS} add-ons.`);
        return;
      }
      selectedAddons.push(addon);
    }
    renderSelectedList();
    // update UI buttons
    refreshAddonButtons();
  }

  function renderSelectedList() {
    const list = outputDiv.querySelector("#pla-selected-list");
    if (!list) return;
    list.innerHTML = "";
    selectedAddons.forEach((a) => {
      const pill = document.createElement("span");
      pill.className = "selected-pill";
      pill.textContent = `${a.name}`;
      list.appendChild(pill);
    });
    const countSpan = outputDiv.querySelector("#pla-selected-count");
    if (countSpan)
      countSpan.textContent = `(${selectedAddons.length}/${MAX_ADDONS})`;
  }

  function refreshAddonButtons() {
    const btns = outputDiv.querySelectorAll(".select-addon");
    btns.forEach((btn) => {
      const cat = btn.dataset.category;
      const name = btn.dataset.name;
      const found = selectedAddons.find(
        (a) => a.name === name && a.category === cat
      );
      btn.textContent = found ? "Selected" : "Select";
      btn.style.background = found ? "#065f68" : "#06b6d4";
    });
  }

  // Build packaging options UI and handlers
  function renderPackagingControls() {
    const packaging = outputDiv.querySelector("#packaging-options2");
    if (!packaging) return;
    packaging.innerHTML = `
      <div class="small">Bottle Size</div>
      <div id="pla-size-wrap" class="packaging-row">
        <div class="option-box" data-value="60ml">60ml</div>
        <div class="option-box" data-value="120ml">120ml</div>
      </div>

      <div class="small" style="margin-top:8px;">Bottle Style</div>
      <div id="pla-style-wrap" class="packaging-row">
        <div class="option-box" data-value="glass-dropper-bottle">Glass dropper bottle</div>
        <div class="option-box" data-value="cosmetic-jar">Cosmetic jar</div>
      </div>

      <div class="small" style="margin-top:8px;">Bottle Color</div>
      <div id="pla-color-wrap" class="packaging-row">
        <div class="option-box" data-value="amber">Amber</div>
        <div class="option-box" data-value="cobalt">Cobalt</div>
        <div class="option-box" data-value="frosted">Frosted</div>
        <div class="option-box" data-value="matte">Matte</div>
      </div>

      <div style="margin-top:10px;">
        <label class="small" for="pla-quantity">Quantity (min 25)</label>
        <select id="pla-quantity" class="pla-select"></select>
      </div>

      <div style="margin-top:12px;">
        <div class="small" id="pla-selected-summary">Selected add-ons: <span id="pla-selected-count">(0/4)</span></div>
        <div id="pla-selected-list" class="selected-list"></div>
      </div>

      <div style="margin-top:12px;">
        <button id="pla-addtocart">Add to Cart</button>
      </div>
    `;

    // quantity options 25..250 step 25
    const qtySelect = packaging.querySelector("#pla-quantity");
    for (let q = 25; q <= 250; q += 25) {
      const opt = document.createElement("option");
      opt.value = q;
      opt.textContent = q;
      if (q === 25) opt.selected = true;
      qtySelect.appendChild(opt);
    }

    // Make option-boxes single-select for each group
    ["pla-size-wrap", "pla-style-wrap", "pla-color-wrap"].forEach((id) => {
      const wrap = packaging.querySelector(`#${id}`);
      if (!wrap) return;
      wrap.querySelectorAll(".option-box").forEach((box) => {
        box.addEventListener("click", () => {
          wrap
            .querySelectorAll(".option-box")
            .forEach((b) => b.classList.remove("selected"));
          box.classList.add("selected");
        });
      });
    });

    // Add to cart handler
    const addToCartBtn = packaging.querySelector("#pla-addtocart");
    addToCartBtn.addEventListener("click", handleAddToCart);
    renderSelectedList();
  }

  // Core: add to cart
  async function handleAddToCart() {
    // validations
    if (!MAIN_VARIANT_ID) {
      alert(
        "Main product variant ID missing. Check data-variant-id on container."
      );
      return;
    }
    const qty = parseInt(
      outputDiv.querySelector("#pla-quantity").value || "25",
      10
    );
    if (isNaN(qty) || qty < 25) {
      alert("Please select a valid quantity (min 25).");
      return;
    }

    // packaging selections
    const size =
      outputDiv.querySelector("#pla-size-wrap .option-box.selected")?.dataset
        .value || "";
    const style =
      outputDiv.querySelector("#pla-style-wrap .option-box.selected")?.dataset
        .value || "";
    const color =
      outputDiv.querySelector("#pla-color-wrap .option-box.selected")?.dataset
        .value || "";

    if (!size || !style || !color) {
      if (!confirm("You have not selected size/style/color. Proceed anyway?"))
        return;
    }

    // build properties
    const properties = {
      "Selected Add-ons": selectedAddons.map((a) => a.name).join(", ") || "",
      "Bottle Size": size,
      "Bottle Style": style,
      "Bottle Color": color,
      "Add-ons Count": String(selectedAddons.length),
    };

    // include per add-on details
    selectedAddons.forEach((a, i) => {
      properties[`Add-on ${i + 1} Name`] = a.name;
      properties[`Add-on ${i + 1} Category`] = a.category;
      properties[`Add-on ${i + 1} Note`] = descriptionObject[a.name] || "";
    });

    // 2) Add selected add-ons as separate line items with individual variant IDs
    if (selectedAddons.length > 0) {
      try {
        // Loop through each selected add-on
        for (const addon of selectedAddons) {
          const variantId = variantObject[addon.name]; // get variantId from mapping
          if (!variantId) {
            console.warn(`No variant ID found for add-on: ${addon.name}`);
            continue; // skip this add-on
          }

          const quantity = qty; // multiply by main product quantity if needed

          const addAddonResponse = await fetch("/cart/add.js", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: parseInt(variantId, 10), // make sure it's a number
              quantity,
              properties: {
                "Add-ons for product": PRODUCT_TITLE,
                "Add-on Name": addon.name,
                "Add-on Category": addon.category,
                "Add-on Note": addon.description || "",
              },
            }),
          });

          if (!addAddonResponse.ok) {
            const errText = await addAddonResponse.text();
            console.error(`Failed to add add-on: ${addon.name}`, errText);
            alert(
              `Main product added, but failed to add add-on: ${addon.name}`
            );
          }
        }
      } catch (err) {
        console.error("Error adding add-ons", err);
        alert("Main product added, but failed to add some add-ons.");
      }
    }

    // 1) Add main product as a line item with properties and quantity = qty
    try {
      const addMain = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: MAIN_VARIANT_ID,
          quantity: qty,
          properties,
        }),
      });
      if (!addMain.ok) {
        const err = await addMain.text();
        console.error("Add main product failed:", err);
        alert("Failed to add main product to cart.");
        return;
      }
    } catch (err) {
      console.error("Add main product error", err);
      alert("Failed to add main product to cart.");
      return;
    }
    console.log(selectedAddons, "selected add");

    // Redirect to cart page
    window.location.href = "/cart";
  }

  // Render addons + combinations after fetching backend
  async function fetchAndRender() {
    const addonsByCategory = categories || {};

    renderFromData({ addonsByCategory });
  }

  // Render UI given structured data
  function renderFromData({ addonsByCategory }) {
    outputDiv.innerHTML = `
      

      <h4 style="margin-top:14px; margin-bottom:8px;">Manual Add-ons Selection</h4>
      <div id="manual-addons2" class="addons-wrap"></div>

      <h4 style="margin-top:14px; margin-bottom:8px;">Packaging Options</h4>
      <div id="packaging-options2"></div>
    `;

    // Render addons by category
    const manualWrap = outputDiv.querySelector("#manual-addons2");

    for (const cat of Object.keys(addonsByCategory)) {
      const catDiv = document.createElement("div");
      catDiv.className = "addon-category";
      catDiv.innerHTML = `
    <h4>${escapeHtml(cat)}</h4>
    <div class="card-container"></div>
  `;

      // find the container inside THIS category block
      const cardContainer = catDiv.querySelector(".card-container");

      (addonsByCategory[cat] || []).forEach((a) => {
        const card = document.createElement("div");
        card.className = "addon-card";
        card.innerHTML = `
      <div class="addon-info">
        <div class="addon-name">${escapeHtml(a.name)}</div>
        <p class="addon-desc">${escapeHtml(descriptionObject[a.name] || "")}</p>
      </div>
      <div>
        <button class="select-addon" 
          data-category="${escapeHtml(cat)}" 
          data-name="${escapeHtml(a.name)}">Select</button>
      </div>
    `;
        cardContainer.appendChild(card);
      });

      manualWrap.appendChild(catDiv);
    }

    // Attach select button handlers
    manualWrap.querySelectorAll(".select-addon").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const category = e.currentTarget.dataset.category;
        const name = e.currentTarget.dataset.name;
        // find description from addonsByCategory
        const addonObj = (addonsByCategory[category] || []).find(
          (x) => x.name === name
        );
        if (!addonObj) return;
        toggleAddonSelection({
          category,
          name: addonObj.name,
          description: addonObj.description || "",
        });
      });
    });

    // Selected list placeholder
    const summaryWrap = document.createElement("div");
    summaryWrap.style.marginTop = "12px";
    summaryWrap.innerHTML = ``;
    outputDiv.appendChild(summaryWrap);

    // Packaging controls
    const packagingWrap = outputDiv.querySelector("#packaging-options2");
    renderPackagingControls();
  }

  // escape helper
  function escapeHtml(s) {
    if (!s) return "";
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }

  // hook generate btn
  fetchAndRender();
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
});
