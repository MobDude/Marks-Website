import json
import sys

def validate_map_data():
    errors = []

    # 1. Load and parse stations.json
    try:
        with open('stations.json', 'r', encoding='utf-8') as f:
            stations = json.load(f)
    except Exception as e:
        print(f"FAILED to parse stations.json: {e}")
        sys.exit(1)

    # 2. Load and parse routes.json
    try:
        with open('routes.json', 'r', encoding='utf-8') as f:
            routes = json.load(f)
    except Exception as e:
        print(f"FAILED to parse routes.json: {e}")
        sys.exit(1)

    # 3. Check for Duplicate Names and Overlapping Coordinates
    seen_names = set()
    seen_coords = {}  # Maps (x, z) tuple to station name

    for idx, station in enumerate(stations):
        name = station.get("name")
        x = station.get("x")
        z = station.get("z")

        # Name validation
        if not name:
            errors.append(f"Station at index {idx} is missing a 'name'.")
        elif name in seen_names:
            errors.append(f"Duplicate station name found: '{name}'")
        else:
            seen_names.add(name)

        # Coordinate validation
        if x is None or z is None:
            errors.append(f"Station '{name}' is missing 'x' or 'z' coordinates.")
        else:
            coord = (x, z)
            if coord in seen_coords:
                errors.append(
                    f"Duplicate coordinates (X: {x}, Z: {z}) shared by '{seen_coords[coord]}' and '{name}'"
                )
            else:
                seen_coords[coord] = name

    # 4. (Optional) Validate routes reference existing stations
    for idx, route in enumerate(routes):
        start = route.get("start")
        end = route.get("end")

        if start and start not in seen_names:
            errors.append(f"Route #{idx} references unknown start station: '{start}'")
        if end and end not in seen_names:
            errors.append(f"Route #{idx} references unknown end station: '{end}'")

    # Output results
    if errors:
        print("Data Validation Errors Found:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("SUCCESS: stations.json and routes.json are valid with no duplicate names or overlapping coordinates.")

if __name__ == "__main__":
    validate_map_data()