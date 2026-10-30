/* ==========================================
   NETHER GPS & ROUTING ENGINE (gps.js)
   ========================================== */

let routeGraph = new Map();

// Initialize the GPS module once stations are loaded
function initGPS(stationsList, routesList) {
    buildGraph(stationsList, routesList);
    populateRouteDropdowns(stationsList);
    bindGPSControls();
}

// Build adjacency graph with geometric fallback for intermediate stations
function buildGraph(stationsList, routesList) {
    routeGraph.clear();

    const stationByName = new Map(stationsList.map(s => [s.name, s]));

    function addEdge(u, v, weight) {
        if (!routeGraph.has(u)) routeGraph.set(u, new Map());
        if (!routeGraph.has(v)) routeGraph.set(v, new Map());
        if (!routeGraph.get(u).has(v) || routeGraph.get(u).get(v) > weight) {
            routeGraph.get(u).set(v, weight);
            routeGraph.get(v).set(u, weight);
        }
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
            addEdge(u, v, dist);
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
        // Find unvisited node with smallest distance
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
        if (current === endName) break; // Reached destination

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

    if (path.length === 1 && path[0] !== startName) return null; // No path found
    return { path, totalDistance: distances.get(endName) };
}

// Populate UI Dropdowns
function populateRouteDropdowns(stationsList) {
    const fromSelect = document.getElementById("gps-from");
    const toSelect = document.getElementById("gps-to");
    if (!fromSelect || !toSelect) return;

    const sortedStations = [...stationsList].sort((a, b) => a.name.localeCompare(b.name));

    sortedStations.forEach(station => {
        // Skip pure internal coordinate nodes if any
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
            return;
        }

        const result = findShortestPath(fromVal, toVal);
        if (!result) {
            resultContainer.innerHTML = "<span>No route found between these stations.</span>";
            return;
        }

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