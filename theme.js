const selector = document.getElementById("theme-selector");
const fontToggle = document.getElementById("font-toggle-checkbox");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.body.classList.remove("default", "light", "cherry", "dark", "midnight");
    document.body.classList.add(savedTheme);
    selector.value = savedTheme;
}

// Theme change handler
selector.addEventListener("change", function () {
    document.body.classList.remove("default", "light", "cherry", "dark", "midnight");
    document.body.classList.add(this.value);
    localStorage.setItem("theme", this.value);
});

// Load saved font
if (localStorage.getItem("retroFont") === "enabled") {
    document.body.classList.add("retro-font");
    fontToggle.checked = true;
}

// Font toggle handler
fontToggle.addEventListener("change", () => {
    if (fontToggle.checked) {
        document.body.classList.add("retro-font");
        localStorage.setItem("retroFont", "enabled");
    } else {
        document.body.classList.remove("retro-font");
        localStorage.setItem("retroFont", "disabled");
    }
});