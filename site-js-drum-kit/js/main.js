function ready(fn) {
    document.readyState != "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn)
}
ready(() => {

    function playSound(e) {
        if (e.type == "click" || e.type == "touchend") {
            var key = e.target;
            var keyCode = key.getAttribute("data-key");
            var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        } else if (e.type == "keydown") {
            var key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
            var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        }

        if (!audio) {
            return;
        }

        /* Create a new audio element so that there can be multiple of the same sound playing at once. */
        var newAudio = document.createElement("audio");
        newAudio.src = audio.src;

        /* Removes the new audio element after it has finished playing */
        newAudio.addEventListener("loadedmetadata", function() {
            setTimeout(function() {
                newAudio.outerHTML = "";
                delete newAudio;
            }, Math.ceil(newAudio.duration)); /* Rounded up to account for browser inconsistencies */
        });

        newAudio.play();
        key.classList.add("playing");
    }

    function removeTransition(e) {
        if (e.propertyName !== "transform") {
            return;
        } else if (!e.target.classList.contains("playing")) {
            /* When the "playing" class is removed it transitions back to normal.
            This stops the event at the end of the return transition from continuing into this function. */
            return;
        }
        this.classList.remove('playing');
    }

    window.addEventListener("keydown", playSound);
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => key.addEventListener("transitionend", removeTransition));
    keys.forEach(key => key.addEventListener("click", playSound));
    keys.forEach(key => key.addEventListener("touchend", playSound));

})