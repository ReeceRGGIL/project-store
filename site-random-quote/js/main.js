$(document).ready(function() {

    $("#getQuote").on("click", getQuote);
    $("#tweetQuote").on("click", getTweet);
    $("#setBackgroundGradient").on("click", setRandomBackgroundColor);
    $("#setBackgroundImage").on("click", setRandomBackgroundImage);
    $("#copyQuote").on("click", copyQuote);

    function getQuote(){
        $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", displayQuote);
    }

    function displayQuote(json) {
        $("#quote").html(json.quoteText.trim());
        $("#author").html(json.quoteAuthor.trim());
    }

    function getTweet(){
        var quote = $("#quote").text();
        var author = $("#author").text();
        if (quote.length > 140) {
            alert('Quote is too long to tweet. Tweets can only be 140 characters long.');
        }
        else if ((quote.length + author.length + 2) < 140 && author.length > 0) {
            tweet(quote + ' -' + author);
        }
        else {
            tweet(quote);
        }
    }

    function tweet(message) {
        var twitterLink = 'http://twitter.com/home?status=' + encodeURIComponent(message);
        window.open(twitterLink, '_blank');
    }

    //Has a bias towards dark and/or unsaturated colors because of the way the RGB color format wraps the color space.
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function setRandomBackgroundColor() {
        var color1 = getRandomColor();
        var color2 = getRandomColor();
        var degree = [Math.floor(Math.random() * 360)];
        $("#background").css('background-color', color1);
        $("#background").css('background', 'linear-gradient( ' + degree + 'deg, ' + color1 + ', ' + color2 + ')');
    }

    function setRandomBackgroundImage() {
        let imageSource = "https://source.unsplash.com/random";
        imageSource = imageSource + "?sig=" + new Date().getTime();
        console.log(imageSource);
        $("#background").css('background', 'url(' + imageSource + ') center center/cover');
    }

    function copyQuote() {
        var targetId = "_hiddenCopyText_";

        target = $("#" + targetId)[0];
        console.log(target);
        if (!target) {
            console.log('creating target');
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }

        var quote = $("#quote").text();
        var author = $("#author").text();
        var text = "";
        if (author.length > 0) {
            text = '"' + quote + '" -' + author;

        } else {
            text = '"' + quote + '"';
        }
        target.textContent = text;

        var currentFocus = document.activeElement;
        target.focus();
        target.setSelectionRange(0, target.value.length);
        document.execCommand("copy");
    }

    setRandomBackgroundImage();
    getQuote(); 
});
