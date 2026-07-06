const svg = document.getElementById("map");
const viewport = document.getElementById("viewport");
const gridLayer = document.getElementById("grid-layer");
const routeLayer = document.getElementById("route-layer");
const stationLayer = document.getElementById("station-layer");
const labelLayer = document.getElementById("label-layer");
const tooltip = document.getElementById("tooltip");
const stationCard = document.getElementById("station-card");
const gridToggle = document.getElementById("grid-toggle");
const scaleLegend = document.getElementById("scale-legend");
const scaleLine = document.getElementById("scale-line");
const scaleDistance = document.getElementById("scale-distance");
const gridSize = document.getElementById("grid-size");
const overworldScale = document.getElementById("overworld-scale");

const cardNether = document.getElementById("card-nether");
const cardOverworld = document.getElementById("card-overworld");
const cardDescription = document.getElementById("card-description");

const SVG_NS = "http://www.w3.org/2000/svg";
let MIN_ZOOM = 0.05;
const MAX_ZOOM = 4;
const GRID_STEPS = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
const VIEW_PADDING = 180;

const LINE_NAMES = {
  "#df8600": "Ice Track 61",
  "#67BED9": "Trans Siberian",
  "#B3321E": "The Meridian Line",
  "#FFAEC9": "The Bullet Line",
  "#e53935": "Default Route" // Fallback color
};

let stations = [];
let stationByName = new Map();
let transform = { x: 0, y: 0, scale: 1 };
let defaultTransform = { x: 0, y: 0, scale: 1 };
let drag = null;
let pinch = null;

init();

async function init() {
  try {
    const [stationResponse, routeResponse] = await Promise.all([
      fetch("stations.json"),
      fetch("routes.json")
    ]);

    if (!stationResponse.ok || !routeResponse.ok) {
      throw new Error("Map JSON files could not be loaded.");
    }

    stations = await stationResponse.json();
    const routes = await routeResponse.json();
    stationByName = new Map(stations.map((station) => [station.name, station]));

    drawRoutes(routes);
    drawStations();
    generateLineLegend(routes);
    setupInitialView();
    bindControls();
  } catch (error) {
    stationCard.querySelector("h2").textContent = "Map data unavailable";
    cardDescription.textContent = error.message;
  }
}

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tag);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

function drawGrid() {
  gridLayer.replaceChildren();

  const gridStep = getGridStep();
  const majorGridStep = getMajorGridStep(gridStep);
  const bounds = getVisibleBounds();
  const startX = roundDown(bounds.minX, gridStep);
  const endX = roundUp(bounds.maxX, gridStep);
  const startZ = roundDown(bounds.minZ, gridStep);
  const endZ = roundUp(bounds.maxZ, gridStep);
  const labelSize = Math.max(11 / transform.scale, 0.8);
  const labelOffset = 24 / transform.scale;

  for (let x = startX; x <= endX; x += gridStep) {
    const isMajor = isGridMultiple(x, majorGridStep);
    const line = createSvgElement("line", {
      x1: x,
      y1: startZ,
      x2: x,
      y2: endZ,
      class: x === 0 ? "grid-axis" : `grid-line${isMajor ? " major" : ""}`
    });
    gridLayer.appendChild(line);

    if (isMajor) {
      const label = createSvgElement("text", {
        x,
        y: startZ + labelOffset,
        class: "grid-label",
        "font-size": labelSize,
        "text-anchor": "middle"
      });
      label.textContent = `X ${x}`;
      gridLayer.appendChild(label);
    }
  }

  for (let z = startZ; z <= endZ; z += gridStep) {
    const isMajor = isGridMultiple(z, majorGridStep);
    const line = createSvgElement("line", {
      x1: startX,
      y1: z,
      x2: endX,
      y2: z,
      class: z === 0 ? "grid-axis" : `grid-line${isMajor ? " major" : ""}`
    });
    gridLayer.appendChild(line);

    if (isMajor) {
      const label = createSvgElement("text", {
        x: startX + labelOffset,
        y: z - 8 / transform.scale,
        class: "grid-label",
        "font-size": labelSize
      });
      label.textContent = `Z ${z}`;
      gridLayer.appendChild(label);
    }
  }

  updateScaleLegend(gridStep);
}

function drawRoutes(routes) {
  routeLayer.replaceChildren();

  routes.forEach((route) => {
    const start = stationByName.get(route.start);
    const end = stationByName.get(route.end);

    if (!start || !end) {
      console.warn(`Route skipped: ${route.start} to ${route.end}`);
      return;
    }

    const pathData = buildRoutePath(start, end, route);
    routeLayer.appendChild(createSvgElement("path", {
      d: pathData,
      class: "route-outline"
    }));
    routeLayer.appendChild(createSvgElement("path", {
      d: pathData,
      class: "route-line",
      stroke: route.color || start.color || "#e53935"
    }));
  });
}

function buildRoutePath(start, end, route) {
  if (Array.isArray(route.via) && route.via.length > 0) {
    const points = [start, ...route.via, end];
    return points.map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${point.x} ${point.z}`;
    }).join(" ");
  }

  return `M ${start.x} ${start.z} L ${end.x} ${end.z}`;
}

function drawStations() {
  stationLayer.replaceChildren();
  labelLayer.replaceChildren();

  stations.forEach((station) => {
    const group = createSvgElement("g", {
      class: "station",
      tabindex: "0",
      role: "button",
      "aria-label": `${station.name} station`
    });

    const radius = station.major ? 18 : 13;
    const ringRadius = station.major ? 27 : 0;

    if (station.major) {
      group.appendChild(createSvgElement("circle", {
        cx: station.x,
        cy: station.z,
        r: ringRadius,
        class: "station-ring",
        stroke: station.color || "#111"
      }));
    }

    group.appendChild(createSvgElement("circle", {
      cx: station.x,
      cy: station.z,
      r: radius,
      class: `station-node${station.major ? " major" : ""}`
    }));

    group.appendChild(createSvgElement("circle", {
      cx: station.x,
      cy: station.z,
      r: Math.max(ringRadius, 26),
      class: "station-hit"
    }));

    group.addEventListener("mouseenter", (event) => showStation(station, event));
    group.addEventListener("mousemove", moveTooltip);
    group.addEventListener("mouseleave", hideTooltip);
    group.addEventListener("focus", (event) => showStation(station, event));
    group.addEventListener("blur", hideTooltip);
    group.addEventListener("click", (event) => {
      event.stopPropagation();
      showStation(station, event);
    });

    stationLayer.appendChild(group);
    if (station.major){
      const label = createSvgElement("text", {
        x: station.labelX ?? station.x + 24,
        y: station.labelZ ?? station.z - 18,
        class: "station-label",
        "font-size": 18
      });

      label.textContent = station.name;

      //save a reference so it can be updated when zooming.
      station.labelElement = label;

      labelLayer.appendChild(label);
    } else{
      station.labelElement = null;
    }
  });
}

function showStation(station, event) {
  const overworldX = station.x * 8;
  const overworldZ = station.z * 8;

  stationCard.querySelector("h2").textContent = station.name;
  cardNether.textContent = `X ${station.x}, Z ${station.z}`;
  cardOverworld.textContent = `X ${overworldX}, Z ${overworldZ}`;
  cardDescription.textContent = station.description || "No description provided.";
  
  const descriptionHtml = station.description
      ? `<span class="tooltip-desc">${escapeHtml(station.description)}</span>`
      : '';
  
  tooltip.hidden = false;
  tooltip.innerHTML = `
    <strong>${escapeHtml(station.name)}</strong>
    <span>Nether: X ${station.x}, Z ${station.z}</span>
    <span>Overworld: X ${overworldX}, Z ${overworldZ}</span>
    ${descriptionHtml}
  `;
  moveTooltip(event);
}

function hideTooltip() {
  tooltip.hidden = true;
}

function moveTooltip(event) {
  if (!event || typeof event.clientX !== "number") {
    return;
  }

  const offset = 14;
  const tooltipRect = tooltip.getBoundingClientRect();
  const x = Math.min(event.clientX + offset, window.innerWidth - tooltipRect.width - offset);
  const y = Math.min(event.clientY + offset, window.innerHeight - tooltipRect.height - offset);

  tooltip.style.left = `${Math.max(offset, x)}px`;
  tooltip.style.top = `${Math.max(offset, y)}px`;
}

function bindControls() {
  document.getElementById("zoom-in").addEventListener("click", () => zoomAtCenter(1.6));
  document.getElementById("zoom-out").addEventListener("click", () => zoomAtCenter(0.625));
  document.getElementById("reset-view").addEventListener("click", resetView);

  gridToggle.addEventListener("change", () => {
    gridLayer.style.display = gridToggle.checked ? "" : "none";
    scaleLegend.style.display = gridToggle.checked ? "" : "none";
  });

  const legendPanel = document.getElementById("line-legend");
  const legendTab = document.getElementById("legend-toggle-tab");

  if (legendTab && legendPanel) {
    legendTab.addEventListener("click", () => {
      legendPanel.classList.toggle("is-collapsed");
    });
  }

  svg.addEventListener("wheel", handleWheel, { passive: false });
  svg.addEventListener("pointerdown", startPan);
  svg.addEventListener("pointermove", pan);
  svg.addEventListener("pointerup", endPan);
  svg.addEventListener("pointercancel", endPan);
  svg.addEventListener("touchstart", handleTouchStart, { passive: false });
  svg.addEventListener("touchmove", handleTouchMove, { passive: false });
  svg.addEventListener("touchend", handleTouchEnd);
  svg.addEventListener("touchcancel", handleTouchEnd);
  window.addEventListener("resize", setupInitialView);
}

function setupInitialView() {
  const bounds = getBounds(VIEW_PADDING);
  const rect = svg.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  const boundsWidth = Math.max(bounds.maxX - bounds.minX, 1);
  const boundsHeight = Math.max(bounds.maxZ - bounds.minZ, 1);
  const scale = Math.min(width / boundsWidth, height / boundsHeight);

  defaultTransform = {
    x: (width - boundsWidth * scale) / 2 - bounds.minX * scale,
    y: (height - boundsHeight * scale) / 2 - bounds.minZ * scale,
    scale
  };
  MIN_ZOOM = scale * 0.25;
  resetView();
}

function resetView() {
  transform = { ...defaultTransform };
  applyTransform();
}

function handleWheel(event) {
  event.preventDefault();
  const factor = event.deltaY < 0 ? 1.12 : 0.88;
  zoomAtPoint(factor, event.clientX, event.clientY);
}

function handleTouchStart(e) {
  if (e.touches.length === 2) {
    e.preventDefault();

    const [a, b] = e.touches;

    pinch = {
      startDist: getDistance(a, b),
      startScale: transform.scale,
      center: getCenter(a, b)
    };

    drag = null; // stop pan while pinching
  }

  if (e.touches.length === 1 && !pinch) {
    const t = e.touches[0];

    drag = {
      startX: t.clientX,
      startY: t.clientY,
      originX: transform.x,
      originY: transform.y
    };
  }
}

function handleTouchMove(e) {
  if (e.touches.length === 2 && pinch) {
    e.preventDefault();

    const [a, b] = e.touches;

    const dist = getDistance(a, b);
    const factor = dist / pinch.startDist;

    const nextScale = clamp(
        pinch.startScale * factor,
        MIN_ZOOM,
        MAX_ZOOM
    );

    const rect = svg.getBoundingClientRect();
    const cx = pinch.center.x - rect.left;
    const cy = pinch.center.y - rect.top;

    const actualFactor = nextScale / transform.scale;

    transform.x = cx - (cx - transform.x) * actualFactor;
    transform.y = cy - (cy - transform.y) * actualFactor;
    transform.scale = nextScale;

    applyTransform();
  }

  if (e.touches.length === 1 && drag && !pinch) {
    const t = e.touches[0];

    transform.x = drag.originX + (t.clientX - drag.startX);
    transform.y = drag.originY + (t.clientY - drag.startY);

    applyTransform();
  }
}

function handleTouchEnd() {
  if (pinch && event?.touches?.length < 2) {
    pinch = null;
  }

  if (event?.touches?.length === 0) {
    drag = null;
    pinch = null;
  }
}

function zoomAtCenter(factor) {
  const rect = svg.getBoundingClientRect();
  zoomAtPoint(factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function zoomAtPoint(factor, clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const pointX = clientX - rect.left;
  const pointY = clientY - rect.top;
  const nextScale = clamp(transform.scale * factor, MIN_ZOOM, MAX_ZOOM);
  const actualFactor = nextScale / transform.scale;

  transform.x = pointX - (pointX - transform.x) * actualFactor;
  transform.y = pointY - (pointY - transform.y) * actualFactor;
  transform.scale = nextScale;
  applyTransform();
}

function startPan(event) {
  if (event.button !== 0 || event.target.closest(".station")) {
    return;
  }

  svg.setPointerCapture(event.pointerId);
  svg.classList.add("dragging");
  drag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    originX: transform.x,
    originY: transform.y
  };
}

function pan(event) {
  if (!drag || drag.pointerId !== event.pointerId) {
    return;
  }

  transform.x = drag.originX + event.clientX - drag.startX;
  transform.y = drag.originY + event.clientY - drag.startY;
  applyTransform();
}

function endPan(event) {
  if (!drag || drag.pointerId !== event.pointerId) {
    return;
  }

  drag = null;
  svg.classList.remove("dragging");
}

function applyTransform() {
  viewport.setAttribute(
    "transform",
    `translate(${transform.x} ${transform.y}) scale(${transform.scale})`
  );

  updateStationLabels();
  drawGrid();
}

function getBounds(padding = 0) {
  if (!stations.length) {
    return { minX: -500, maxX: 500, minZ: -500, maxZ: 500 };
  }

  const xs = stations.map((station) => station.x);
  const zs = stations.map((station) => station.z);

  return {
    minX: Math.min(...xs) - padding,
    maxX: Math.max(...xs) + padding,
    minZ: Math.min(...zs) - padding,
    maxZ: Math.max(...zs) + padding
  };
}

function getVisibleBounds() {
  const rect = svg.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  const padding = 96 / transform.scale;

  return {
    minX: (0 - transform.x) / transform.scale - padding,
    maxX: (width - transform.x) / transform.scale + padding,
    minZ: (0 - transform.y) / transform.scale - padding,
    maxZ: (height - transform.y) / transform.scale + padding
  };
}

function getGridStep() {
  const minimumScreenGap = 24;
  return GRID_STEPS.find((step) => step * transform.scale >= minimumScreenGap)
    || GRID_STEPS[GRID_STEPS.length - 1];
}

function getMajorGridStep(gridStep) {
  if (gridStep === 1) {
    return 10;
  }

  if (gridStep === 5) {
    return 25;
  }

  return gridStep * 5;
}

function isGridMultiple(value, step) {
  return Math.abs(value / step - Math.round(value / step)) < 0.0001;
}

function updateScaleLegend(gridStep) {
  const targetWidth = 130;
  const distance = GRID_STEPS
    .slice()
    .reverse()
    .find((step) => step * transform.scale <= targetWidth)
    || GRID_STEPS[0];
  const lineWidth = clamp(distance * transform.scale, 28, 180);

  scaleLine.style.width = `${lineWidth}px`;
  scaleDistance.textContent = `${formatNumber(distance)} Nether block${distance === 1 ? "" : "s"}`;
  gridSize.textContent = `Grid: ${formatNumber(gridStep)} x ${formatNumber(gridStep)} Nether block${gridStep === 1 ? "" : "s"}`;
  overworldScale.textContent = `Overworld: ${formatNumber(distance * 8)} blocks`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function roundDown(value, step) {
  return Math.floor(value / step) * step;
}

function roundUp(value, step) {
  return Math.ceil(value / step) * step;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getDistance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function getCenter(a, b) {
  return {
    x: (a.clientX + b.clientX) / 2,
    y: (a.clientY + b.clientY) / 2
  };
}

function updateStationLabels() {
  const baseSize = 10; // The targeted screen-space font size in pixels

  // Invert the map scale so the text dimensions match screen pixels perfectly
  const screenConstantFontSize = baseSize / transform.scale;

  stations.forEach((station) => {
    const label = station.labelElement;
    if (!label) return;

    // Apply the inverse size to override the external CSS stylesheet
    label.style.fontSize = `${screenConstantFontSize}px`;
  });
}

function generateLineLegend(routes) {
  const legendList = document.getElementById("legend-list");
  if (!legendList) return;

  legendList.innerHTML = ""; // Clear existing placeholder nodes

  // --- Add Major Station to Legend ---
  const majorLi = document.createElement("li");
  majorLi.className = "legend-item";
  const majorSwatch = document.createElement("div");
  majorSwatch.className = "legend-node major"; // Styled like your map node
  const majorText = document.createElement("span");
  majorText.textContent = "Station";
  majorLi.appendChild(majorSwatch);
  majorLi.appendChild(majorText);
  legendList.appendChild(majorLi);

  // --- Add Minor Station to Legend ---
  const minorLi = document.createElement("li");
  minorLi.className = "legend-item";
  const minorSwatch = document.createElement("div");
  minorSwatch.className = "legend-node minor"; // Styled like your map node
  const minorText = document.createElement("span");
  minorText.textContent = "Intersection";
  minorLi.appendChild(minorSwatch);
  minorLi.appendChild(minorText);
  legendList.appendChild(minorLi);

  // --- Separator Line ---
  const divider = document.createElement("li");
  divider.className = "legend-divider";
  legendList.appendChild(divider);

  // Extract all unique line colors found across the dataset
  const uniqueColors = [...new Set(routes.map(r => r.color || "#e53935"))];

  uniqueColors.forEach(color => {
    const canonicalColor = color.toLowerCase();

    // Attempt matching key from the mapping or fallback gracefully
    const matchingKey = Object.keys(LINE_NAMES).find(k => k.toLowerCase() === canonicalColor);
    const lineName = matchingKey ? LINE_NAMES[matchingKey] : `Line (${color})`;

    const li = document.createElement("li");
    li.className = "legend-item";

    const swatch = document.createElement("div");
    swatch.className = "legend-color-swatch";
    swatch.style.backgroundColor = color;

    const text = document.createElement("span");
    text.textContent = lineName;

    li.appendChild(swatch);
    li.appendChild(text);
    legendList.appendChild(li);
  });
}