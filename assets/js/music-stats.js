document.addEventListener("DOMContentLoaded", () => {
    fetchTopArtists();
    fetchHourlyHabits();
});

async function fetchTopArtists() {
    try {
        const response = await fetch('assets/data/top_artists_month.json');
        if (!response.ok) throw new Error("Failed to load top artists data.");
        
        const artists = await response.json();
        const listElement = document.getElementById('top-artists-month-list');
        listElement.innerHTML = '';

        if (artists.length === 0) {
            listElement.innerHTML = '<li>No listens recorded yet for this period.</li>';
            return;
        }

        artists.forEach((artist, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="rank">#${index + 1}</span>
                <span class="name">${escapeHTML(artist.name)}</span>
                <span class="count">${artist.listens} plays</span>
            `;
            listElement.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading top artists:", error);
        document.getElementById('top-artists-month-list').innerHTML = '<li>Failed to load stats.</li>';
    }
}

async function fetchHourlyHabits() {
    try {
        const response = await fetch('assets/data/hourly_habits.json');
        if (!response.ok) throw new Error("Failed to load hourly habits data.");
        
        const habits = await response.json();
        const container = document.getElementById('hourly-habits-chart');
        container.innerHTML = '';

        // Find max listens to scale a simple CSS bar chart
        const maxListens = Math.max(...habits.map(h => h.listens), 1);

        habits.forEach(h => {
            const hourLabel = String(h.hour).padStart(2, '0') + ':00';
            const percentage = (h.listens / maxListens) * 100;

            const barWrapper = document.createElement('div');
            barWrapper.className = 'habit-bar-wrapper';
            barWrapper.innerHTML = `
                <span class="hour-label">${hourLabel}</span>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${percentage}%;"></div>
                </div>
                <span class="hour-count">${h.listens}</span>
            `;
            container.appendChild(barWrapper);
        });
    } catch (error) {
        console.error("Error loading hourly habits:", error);
        document.getElementById('hourly-habits-chart').innerHTML = '<p>Failed to load habits.</p>';
    }
}

// Simple security helper to prevent HTML injection from track/artist names
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}