/* Cached DOM references */
const svg = document.getElementById("map");
const viewport = document.getElementById("viewport");
const gridLayer = document.getElementById("grid-layer");
const boundaryLayer = document.getElementById("boundary-layer");
const routeLayer = document.getElementById("route-layer");
const stationLayer = document.getElementById("station-layer");
const labelLayer = document.getElementById("label-layer");
const tooltip = document.getElementById("tooltip");

const gridToggle = document.getElementById("grid-toggle");
const scaleLegend = document.getElementById("scale-legend");
const scaleLine = document.getElementById("scale-line");
const scaleDistance = document.getElementById("scale-distance");
const gridSize = document.getElementById("grid-size");
const overworldScale = document.getElementById("overworld-scale");

const stationModal = document.getElementById("station-modal");
const modalTitle = document.getElementById("modal-title");
const modalNether = document.getElementById("modal-nether");
const modalOverworld = document.getElementById("modal-overworld");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.getElementById("modal-close");
const modalWindow = document.querySelector(".modal-window");

/* Map configuration */
const SVG_NS = "http://www.w3.org/2000/svg";
const MAX_ZOOM = 4;
const GRID_STEPS = [1, 5, 10, 25, 50, 100, 250, 500, 1000];
const VIEW_PADDING = 180;
const NETHER_TO_OVERWORLD_SCALE = 8;
const MOBILE_BREAKPOINT = 720;
const MOBILE_MODAL_CLOSE_DISTANCE = 120;

// Minecraft Nether coordinates use X/Z; the SVG renders Z on the vertical axis.
const WILD_TP_BOUNDARY = {
  x: -6250,
  z: -1875,
  width: 12500,
  height: 3750
};

const LINE_NAMES = {
  "#df8600": "Ice Track 61",
  "#67BED9": "Trans Siberian",
  "#B3321E": "The Meridian Line",
  "#FFAEC9": "The Bullet Line",
  "#e53935": "Default Route"
};

let minZoom = 0.05;
let stations = [];
let stationByName = new Map();
let transform = { x: 0, y: 0, scale: 1 };
let defaultTransform = { x: 0, y: 0, scale: 1 };
let drag = null;
let pinch = null;
let modalTouchStartY = 0;
let modalTouchCurrentY = 0;
let isDraggingModal = false;

init();

/* Data loading */
async function init() {
  handleExportMode();

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
    drawMapBoundary();
    generateLineLegend(routes);
    setupInitialView();
    bindControls();
    bindModalSwipe();
  } catch (error) {
    console.error("Map data unavailable:", error.message);
  }
}

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tag);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}

/* Drawing */
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

    return points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.z}`)
      .join(" ");
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

    // The invisible hit area keeps stations easy to tap without changing their visual size.
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
      openStationModal(station);
    });

    stationLayer.appendChild(group);

    if (station.major) {
      const label = createSvgElement("text", {
        x: station.labelX ?? station.x + 24,
        y: station.labelZ ?? station.z - 18,
        class: "station-label",
        "font-size": 18
      });

      label.textContent = station.name;
      station.labelElement = label;
      labelLayer.appendChild(label);
    } else {
      station.labelElement = null;
    }
  });
}

function drawMapBoundary() {
  boundaryLayer.replaceChildren();

  boundaryLayer.appendChild(createSvgElement("rect", {
    x: WILD_TP_BOUNDARY.x,
    y: WILD_TP_BOUNDARY.z,
    width: WILD_TP_BOUNDARY.width,
    height: WILD_TP_BOUNDARY.height,
    class: "map-boundary"
  }));
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

    gridLayer.appendChild(createSvgElement("line", {
      x1: x,
      y1: startZ,
      x2: x,
      y2: endZ,
      class: x === 0 ? "grid-axis" : `grid-line${isMajor ? " major" : ""}`
    }));

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

    gridLayer.appendChild(createSvgElement("line", {
      x1: startX,
      y1: z,
      x2: endX,
      y2: z,
      class: z === 0 ? "grid-axis" : `grid-line${isMajor ? " major" : ""}`
    }));

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

/* Controls and map movement */
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
      const isCollapsed = legendPanel.classList.toggle("is-collapsed");
      legendTab.setAttribute("aria-expanded", String(!isCollapsed));
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

  modalClose.addEventListener("click", closeStationModal);
  stationModal.addEventListener("click", (event) => {
    if (event.target === stationModal) {
      closeStationModal();
    }
  });
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

  minZoom = scale * 0.25;

  // Read URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const paramX = urlParams.get("x");
  const paramZ = urlParams.get("z");
  const paramZoom = urlParams.get("zoom");

  // If X and Z are provided in the URL, center on them; otherwise fall back to default
  if (paramX !== null && paramZ !== null) {
    const targetX = parseFloat(paramX);
    const targetZ = parseFloat(paramZ);
    const targetZoom = paramZoom ? parseFloat(paramZoom) : scale;

    setViewportPosition(targetX, targetZ, targetZoom);
  } else {
    resetView();
  }
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

function handleTouchStart(event) {
  if (event.touches.length === 2) {
    event.preventDefault();

    const [a, b] = event.touches;

    pinch = {
      startDist: getDistance(a, b),
      startScale: transform.scale,
      center: getCenter(a, b)
    };

    drag = null;
  }

  if (event.touches.length === 1 && !pinch) {
    const touch = event.touches[0];

    drag = {
      startX: touch.clientX,
      startY: touch.clientY,
      originX: transform.x,
      originY: transform.y
    };
  }
}

function handleTouchMove(event) {
  if (event.touches.length === 2 && pinch) {
    event.preventDefault();

    const [a, b] = event.touches;
    const distance = getDistance(a, b);
    const factor = distance / pinch.startDist;
    const nextScale = clamp(pinch.startScale * factor, minZoom, MAX_ZOOM);
    const rect = svg.getBoundingClientRect();
    const centerX = pinch.center.x - rect.left;
    const centerY = pinch.center.y - rect.top;
    const actualFactor = nextScale / transform.scale;

    transform.x = centerX - (centerX - transform.x) * actualFactor;
    transform.y = centerY - (centerY - transform.y) * actualFactor;
    transform.scale = nextScale;

    applyTransform();
  }

  if (event.touches.length === 1 && drag && !pinch) {
    const touch = event.touches[0];

    transform.x = drag.originX + (touch.clientX - drag.startX);
    transform.y = drag.originY + (touch.clientY - drag.startY);

    applyTransform();
  }
}

function handleTouchEnd(event) {
  if (pinch && event.touches.length < 2) {
    pinch = null;
  }

  if (event.touches.length === 0) {
    drag = null;
    pinch = null;
  }
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

function zoomAtCenter(factor) {
  const rect = svg.getBoundingClientRect();
  zoomAtPoint(factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function zoomAtPoint(factor, clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const pointX = clientX - rect.left;
  const pointY = clientY - rect.top;
  const nextScale = clamp(transform.scale * factor, minZoom, MAX_ZOOM);
  const actualFactor = nextScale / transform.scale;

  transform.x = pointX - (pointX - transform.x) * actualFactor;
  transform.y = pointY - (pointY - transform.y) * actualFactor;
  transform.scale = nextScale;
  applyTransform();
}

function applyTransform() {
  viewport.setAttribute(
    "transform",
    `translate(${transform.x} ${transform.y}) scale(${transform.scale})`
  );

  updateStationLabels();
  drawGrid();
}

/* Station details */
function showStation(station, event) {
  const overworldX = station.x * NETHER_TO_OVERWORLD_SCALE;
  const overworldZ = station.z * NETHER_TO_OVERWORLD_SCALE;
  const descriptionHtml = station.description
    ? `<span class="tooltip-desc">${escapeHtml(station.description)}</span>`
    : "";

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

function openStationModal(station) {
  const overworldX = station.x * NETHER_TO_OVERWORLD_SCALE;
  const overworldZ = station.z * NETHER_TO_OVERWORLD_SCALE;

  modalTitle.textContent = station.name;
  modalNether.textContent = `X ${station.x}, Z ${station.z}`;
  modalOverworld.textContent = `X ${overworldX}, Z ${overworldZ}`;

  if (station.description) {
    modalDescription.innerHTML = formatStationDescription(station.description);
  } else {
    modalDescription.textContent = "No description provided.";
  }

  if (modalWindow) {
    modalWindow.style.transform = "";
  }

  stationModal.hidden = false;
}

function closeStationModal() {
  if (window.innerWidth <= MOBILE_BREAKPOINT && modalWindow) {
    modalWindow.style.transform = "translateY(100%)";

    setTimeout(() => {
      stationModal.hidden = true;
      modalWindow.style.transform = "";
    }, 300);

    return;
  }

  stationModal.hidden = true;
}

function bindModalSwipe() {
  if (!modalWindow) {
    return;
  }

  modalWindow.addEventListener("touchstart", (event) => {
    const modalContent = modalWindow.querySelector(".modal-content");

    // Let scrolled content keep normal touch scrolling; only drag from the top of the sheet.
    if (modalContent && modalContent.scrollTop > 0) {
      return;
    }

    modalTouchStartY = event.touches[0].clientY;
    modalTouchCurrentY = modalTouchStartY;
    isDraggingModal = true;
    modalWindow.classList.add("is-dragging");
  }, { passive: true });

  modalWindow.addEventListener("touchmove", (event) => {
    if (!isDraggingModal) {
      return;
    }

    modalTouchCurrentY = event.touches[0].clientY;
    const deltaY = modalTouchCurrentY - modalTouchStartY;

    if (deltaY > 0) {
      modalWindow.style.transform = `translateY(${deltaY}px)`;
    }
  }, { passive: true });

  modalWindow.addEventListener("touchend", () => {
    if (!isDraggingModal) {
      return;
    }

    isDraggingModal = false;
    modalWindow.classList.remove("is-dragging");

    const deltaY = modalTouchCurrentY - modalTouchStartY;

    if (deltaY > MOBILE_MODAL_CLOSE_DISTANCE) {
      closeStationModal();
    } else {
      modalWindow.style.transform = "translateY(0)";
    }

    modalTouchStartY = 0;
    modalTouchCurrentY = 0;
  });
}

/* Legend */
function generateLineLegend(routes) {
  const legendList = document.getElementById("legend-list");

  if (!legendList) {
    return;
  }

  legendList.replaceChildren(
    createLegendItem(createNodeSwatch("major"), "Station"),
    createLegendItem(createNodeSwatch("minor"), "Intersection"),
    createLegendItem(createElement("div", "legend-boundary-swatch"), "Wild TP Border"),
    createElement("li", "legend-divider")
  );

  const uniqueColors = [...new Set(routes.map((route) => route.color || "#e53935"))];

  uniqueColors.forEach((color) => {
    const matchingKey = Object.keys(LINE_NAMES)
      .find((key) => key.toLowerCase() === color.toLowerCase());
    const lineName = matchingKey ? LINE_NAMES[matchingKey] : `Line (${color})`;
    const swatch = createElement("div", "legend-color-swatch");

    swatch.style.backgroundColor = color;
    legendList.appendChild(createLegendItem(swatch, lineName));
  });
}

function createLegendItem(swatch, text) {
  const item = createElement("li", "legend-item");
  const label = document.createElement("span");

  label.textContent = text;
  item.appendChild(swatch);
  item.appendChild(label);

  return item;
}

function createNodeSwatch(type) {
  return createElement("div", `legend-node ${type}`);
}

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

/* Geometry and formatting utilities */
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
  overworldScale.textContent = `Overworld: ${formatNumber(distance * NETHER_TO_OVERWORLD_SCALE)} blocks`;
}

function updateStationLabels() {
  const targetScreenFontSize = 10;
  const screenConstantFontSize = targetScreenFontSize / transform.scale;

  stations.forEach((station) => {
    if (station.labelElement) {
      station.labelElement.style.fontSize = `${screenConstantFontSize}px`;
    }
  });
}

function formatStationDescription(description) {
  return escapeHtml(description)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replaceAll("\n", "<br>");
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

/* URL Query Parameter & Viewport Utilities */

// Enables export mode CSS overrides if ?export=minecraft or ?print is in the URL
function handleExportMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const exportType = urlParams.get("export");

  if (exportType === "legend") {
    document.documentElement.classList.add("export-legend");
  } else if (exportType === "minecraft" || urlParams.has("print")) {
    document.documentElement.classList.add("export-mode");
  }
}

// Sets the map transform so (worldX, worldZ) lands in the center of the viewport
function setViewportPosition(worldX, worldZ, customScale) {
  const rect = svg.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);

  // Clamp desired scale between minZoom and MAX_ZOOM
  const scale = clamp(customScale || transform.scale, minZoom, MAX_ZOOM);

  // Translate transform origin so target coordinates are centered
  const x = (width / 2) - (worldX * scale);
  const y = (height / 2) - (worldZ * scale);

  transform = { x, y, scale };
  applyTransform();
}
