const selector = document.getElementById("theme-selector");

selector.addEventListener("change", function () {
    document.body.className = this.value;
    localStorage.setItem("theme", this.value);
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.body.className = savedTheme;
    selector.value = savedTheme;
}