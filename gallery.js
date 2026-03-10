function resizeMasonryItems() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    const items = gallery.querySelectorAll('.gallery-item');

    items.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;

        // Wait for image to fully load
        if (!img.complete) {
            img.addEventListener('load', resizeMasonryItems);
            return;
        }

        //only use image height
        const imgHeight = img.naturalHeight * (img.clientWidth / img.naturalWidth);

        // CSS grid info
        const rowHeight = parseFloat(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
        const rowGap = parseFloat(window.getComputedStyle(gallery).getPropertyValue('gap'));

        // Calculate row span
        const rowSpan = Math.ceil((imgHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = `span ${rowSpan}`;
    });
}

window.addEventListener('load', resizeMasonryItems);
window.addEventListener('resize', resizeMasonryItems);