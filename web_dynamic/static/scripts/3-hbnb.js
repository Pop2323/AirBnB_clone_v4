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

$.post({
    url: `${HOST}/api/v1/places_search`,
    data: JSON.stringify({}),
    headers: {
        "Content-Type": "application/json",
    },
    success: (data) => {
        data.forEach((place) => {
            let maxGuestText, numRoomsText, numBathroomsText;

            // Check if max_guest is plural
            if (place.max_guest !== 1) {
                maxGuestText = `${place.max_guest} Guests`;
            } else {
                maxGuestText = `${place.max_guest} Guest`;
            }

            // Check if number_rooms is plural
            if (place.number_rooms !== 1) {
                numRoomsText = `${place.number_rooms} Bedrooms`;
            } else {
                numRoomsText = `${place.number_rooms} Bedroom`;
            }

            // Check if number_bathrooms is plural
            if (place.number_bathrooms !== 1) {
                numBathroomsText = `${place.number_bathrooms} Bathrooms`;
            } else {
                numBathroomsText = `${place.number_bathrooms} Bathroom`;
            }

            $("section.places").append(
                `<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${maxGuestText}</div>
                        <div class="number_rooms">${numRoomsText}</div>
                        <div class="number_bathrooms">${numBathroomsText}</div>
                    </div> 
                    <div class="description">
                        ${place.description}
                    </div>
                </article>`
            );
        });
    },
    dataType: "json",
});