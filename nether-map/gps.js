/* ==========================================
   NETHER GPS & ROUTING ENGINE (gps.js)
   ========================================== */

let routeGraph = new Map();
let nodeCoordsMap = new Map(); // Maps node keys to { x, z } coordinates

// Initialize the GPS module once stations are loaded
function initGPS(stationsList, routesList) {
    buildGraph(stationsList, routesList);
    populateRouteDropdowns(stationsList);
    bindGPSControls();
}

// Build adjacency graph with geometric fallback for intermediate stations
function buildGraph(stationsList, routesList) {
    routeGraph.clear();
    nodeCoordsMap.clear();

    const stationByName = new Map(stationsList.map(s => [s.name, s]));

    function addEdge(u, v, weight, p1, p2) {
        if (!routeGraph.has(u)) routeGraph.set(u, new Map());
        if (!routeGraph.has(v)) routeGraph.set(v, new Map());
        if (!routeGraph.get(u).has(v) || routeGraph.get(u).get(v) > weight) {
            routeGraph.get(u).set(v, weight);
            routeGraph.get(v).set(u, weight);
        }

        // Store coordinates for map rendering lookup
        const uKey = p1.name || `coord_${p1.x}_${p1.z}`;
        const vKey = p2.name || `coord_${p2.x}_${p2.z}`;
        nodeCoordsMap.set(uKey, { x: p1.x, z: p1.z });
        nodeCoordsMap.set(vKey, { x: p2.x, z: p2.z });
    }

    routesList.forEach(route => {
        const start = stationByName.get(route.start);
        const end = stationByName.get(route.end);
        if (!start || !end) return;

        let points = [start];
        if (Array.isArray(route.via)) {
            route.via.forEach(v => {
                if (typeof v === "object" && v.x !== undefined && v.z !== undefined) {
                    points.push(v);
                } else if (typeof v === "string" && stationByName.has(v)) {
                    points.push(stationByName.get(v));
                }
            });
        }
        points.push(end);

        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i+1];
            const dist = Math.hypot(p1.x - p2.x, p1.z - p2.z);

            const u = p1.name || `coord_${p1.x}_${p1.z}`;
            const v = p2.name || `coord_${p2.x}_${p2.z}`;
            addEdge(u, v, dist, p1, p2);
        }
    });
}

// Dijkstra's Shortest Path Algorithm
function findShortestPath(startName, endName) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();

    routeGraph.forEach((_, node) => {
        distances.set(node, Infinity);
        unvisited.add(node);
    });

    distances.set(startName, 0);

    while (unvisited.size > 0) {
        let current = null;
        let shortestDist = Infinity;
        unvisited.forEach(node => {
            const dist = distances.get(node);
            if (dist < shortestDist) {
                shortestDist = dist;
                current = node;
            }
        });

        if (current === null || shortestDist === Infinity) break;
        if (current === endName) break;

        unvisited.delete(current);

        const neighbors = routeGraph.get(current);
        if (neighbors) {
            neighbors.forEach((weight, neighbor) => {
                if (unvisited.has(neighbor)) {
                    const alt = distances.get(current) + weight;
                    if (alt < distances.get(neighbor)) {
                        distances.set(neighbor, alt);
                        previous.set(neighbor, current);
                    }
                }
            });
        }
    }

    // Reconstruct path
    const path = [];
    let curr = endName;
    while (curr !== undefined) {
        path.unshift(curr);
        curr = previous.get(curr);
    }

    if (path.length === 1 && path[0] !== startName) return null;
    return { path, totalDistance: distances.get(endName) };
}

function renderGpsRoute(path) {
    let layer = document.getElementById("gps-route-layer");
    if (!layer) {
        const viewport = document.getElementById("viewport");
        if (viewport) {
            layer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            layer.id = "gps-route-layer";
            viewport.appendChild(layer);
        }
    }
    if (!layer) return;
    layer.innerHTML = "";

    if (!path || path.length < 2) return;

    const points = path.map(nodeName => {
        const coords = nodeCoordsMap.get(nodeName);
        return coords ? `${coords.x},${coords.z}` : null;
    }).filter(Boolean).join(" ");

    if (!points) return;

    // 1. Dark outline layer for contrast
    const outline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    outline.setAttribute("points", points);
    outline.setAttribute("class", "gps-route-outline");
    layer.appendChild(outline);

    // 2. Vibrant neon yellow inner line
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", points);
    polyline.setAttribute("class", "gps-highlight-line");
    layer.appendChild(polyline);

    // 3. Animated dashed flow layer for direction
    const flowLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    flowLine.setAttribute("points", points);
    flowLine.setAttribute("class", "gps-route-flow");
    layer.appendChild(flowLine);
}

function clearGpsRoute() {
    const layer = document.getElementById("gps-route-layer");
    if (layer) layer.innerHTML = "";
}

// Populate UI Dropdowns
function populateRouteDropdowns(stationsList) {
    const fromSelect = document.getElementById("gps-from");
    const toSelect = document.getElementById("gps-to");
    if (!fromSelect || !toSelect) return;

    const sortedStations = [...stationsList].sort((a, b) => a.name.localeCompare(b.name));

    sortedStations.forEach(station => {
        if (station.name.startsWith("Intersection")) return;

        fromSelect.add(new Option(station.name, station.name));
        toSelect.add(new Option(station.name, station.name));
    });
}

function bindGPSControls() {
    const calcBtn = document.getElementById("gps-calculate");
    if (!calcBtn) return;

    calcBtn.addEventListener("click", () => {
        const fromVal = document.getElementById("gps-from").value;
        const toVal = document.getElementById("gps-to").value;
        const resultContainer = document.getElementById("gps-results");

        if (!fromVal || !toVal || fromVal === toVal) {
            resultContainer.innerHTML = "<span style='color: #d32f2f;'>Please select two different stations.</span>";
            clearGpsRoute();
            return;
        }

        const result = findShortestPath(fromVal, toVal);
        if (!result) {
            resultContainer.innerHTML = "<span>No route found between these stations.</span>";
            clearGpsRoute();
            return;
        }

        // Render the highlighted path on the map
        renderGpsRoute(result.path);

        const distanceBlocks = Math.round(result.totalDistance);
        const overworldBlocks = distanceBlocks * 8;

        resultContainer.innerHTML = `
            <strong>Route Found!</strong>
            <span>Distance: ${distanceBlocks} Nether blocks (${overworldBlocks} OW)</span>
            <ol style="margin: 6px 0 0 16px; padding: 0;">
                ${result.path.map(step => `<li>${step}</li>`).join("")}
            </ol>
        `;
    });

    const gpsPanel = document.getElementById("gps-panel");
    const gpsTab = document.getElementById("gps-tab");

    if (gpsTab && gpsPanel) {
        gpsTab.addEventListener("click", () => {
            gpsPanel.classList.toggle("open");
        });
    }
}