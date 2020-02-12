function ready(fn) {
    document.readyState != "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn)
}
ready(() => {

    function updateClock() {
        time++;

        var secondsDegrees = ((time / 60) * 360) + 90; // +90 makes the clock start from the top instead of the left side.
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        var minutesDegrees = ((time / 3600) * 360) + 90;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        var hoursDegrees = ((time / 43200) * 360) + 90;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

        /*  If you add the transition after the hands have moved from start to their first position the transition
        effect gets applied when it shouldn't, this results in the hands spinning many times around the clock. If
        you add the transition after the second update then it work fine, hence the code below. */
        if (updateCount == 1) {
            secondHand.classList.add("hand-transition");
            minuteHand.classList.add("hand-transition");
            hourHand.classList.add("hand-transition");
        } else {
            updateCount++
        }
    }

    var updateCount = 0;

    const secondHand = document.querySelector(".second-hand");
    const minuteHand = document.querySelector(".minute-hand");
    const hourHand = document.querySelector(".hour-hand");

    var currentDateTime = new Date();
    var seconds = currentDateTime.getSeconds();
    var minutes = currentDateTime.getMinutes();
    var hours = currentDateTime.getHours();
    var time = seconds + (minutes * 60) + (hours * 3600);

    setInterval(updateClock, 1000);
})
