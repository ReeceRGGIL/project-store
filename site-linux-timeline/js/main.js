const items = document.querySelectorAll('.timeline li');

// Check that the element is in the viewport
const isInViewport =  el => {
    const rect = el.getBoundingClientRect();
    return (
        // Check that top is in viewport
        rect.top >= -15 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) -15 ||
        // Check that bottom is in viewport
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 15 &&
        rect.bottom > 15 ||
        // Check that top is above, and bottom below the viewport (aka middle is in viewport)
        rect.top < 0 &&
        rect.bottom > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const run = () => {
    items.forEach(item => {
        if (isInViewport(item)) {
            item.classList.add('show');
        }
    });
    items.forEach(item => {
        if (!isInViewport(item)) {
            item.classList.remove('show');
        }
    });
};

//Events
window.addEventListener('load', run);
window.addEventListener('resize', run);
window.addEventListener('scroll', run);
