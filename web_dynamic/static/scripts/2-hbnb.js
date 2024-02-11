document.ready(function () {
    const amenities = {};
    $('li input[type=checked]').change(function () {
        if (this.checked) {
            amenities[this.dataset.name] = this.dataset.id;
        } else {
            delete amenities[this.dataset.name];
        }
        $('div.amenities h4').text(Object.keys(amenities).sort().join(', '));
    });


$.getJSON("http://0.0.0.0:5001/api/v1/status/", function(data) {
    if (data.status === "OK") {
        $("div#api_status").addClass("available");
    } else {
        $("div#api_status").removeClass("available");
        }
    });
});