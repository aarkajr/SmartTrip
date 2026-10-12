const tripsList =
    document.getElementById("tripsList");

const tripCount =
    document.getElementById("tripCount");


let itinerary = [];


const savedItinerary =
    localStorage.getItem("smartTripItinerary");


if (savedItinerary) {

    itinerary =
        JSON.parse(savedItinerary);

}


function displayTrips() {

    if (itinerary.length === 0) {

        tripCount.textContent = "0 trips";

        tripsList.innerHTML = `

            <div class="empty-trips">

                <div class="empty-trips-icon">
                    ✈
                </div>

                <h2>
                    No trips saved yet
                </h2>

                <p>
                    Start planning your next adventure
                    and your trips will appear here.
                </p>

                <a href="planner.html" class="primary-button">
                    Plan Your First Trip →
                </a>

            </div>

        `;

        return;

    }


    /* Group activities into trips */

    const groupedTrips = {};


    itinerary.forEach(function (trip) {

        const tripKey =
            `${trip.tripName}-${trip.destination}`;


        if (!groupedTrips[tripKey]) {

            groupedTrips[tripKey] = [];

        }


        groupedTrips[tripKey].push(trip);

    });


    /* Count actual trips */

    const totalTrips =
        Object.keys(groupedTrips).length;


    tripCount.textContent =
        `${totalTrips} ${totalTrips === 1
            ? "trip"
            : "trips"
        }`;


    /* Clear existing cards */

    tripsList.innerHTML = "";


    /* Create one card for each trip */

    Object.values(groupedTrips).forEach(function (tripActivities) {

        const firstActivity =
            tripActivities[0];


        const tripCard =
            document.createElement("div");


        tripCard.className =
            "saved-trip-card";


        tripCard.innerHTML = `

            <div class="saved-trip-image">

                <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=85"
                    alt="Travel destination"
                >

            </div>


            <div class="saved-trip-content">

                <span class="saved-trip-label">
                    SAVED TRIP
                </span>


                <h2>
                    ${firstActivity.tripName}
                </h2>


                <p class="saved-trip-destination">
                    📍 ${firstActivity.destination}
                </p>


                <div class="saved-trip-details">

                    <span>
                        📅 ${firstActivity.date}
                    </span>


                    <span>
                        ✈ ${tripActivities.length}
                        ${tripActivities.length === 1
                ? "activity"
                : "activities"
            }
                    </span>

                </div>


                <div class="trip-activities">

                    ${tripActivities.map(function (activity) {

                return `

                            <div class="trip-activity">

                                <strong>
                                    ${activity.activity}
                                </strong>


                                ${activity.notes
                        ? `<small>${activity.notes}</small>`
                        : ""
                    }

                            </div>

                        `;

            }).join("")}

                </div>
                <button
    class="delete-trip"
    data-trip-name="${firstActivity.tripName}"
    data-destination="${firstActivity.destination}"
>
    Delete Trip
</button>

            </div>

        `;


        tripsList.appendChild(tripCard);

        const deleteButton =
    tripCard.querySelector(".delete-trip");


deleteButton.addEventListener("click", function () {

    const tripName =
        deleteButton.dataset.tripName;

    const destination =
        deleteButton.dataset.destination;


    itinerary =
        itinerary.filter(function (activity) {

            return !(
                activity.tripName === tripName &&
                activity.destination === destination
            );

        });


    localStorage.setItem(
        "smartTripItinerary",
        JSON.stringify(itinerary)
    );


    displayTrips();

});

    });

}


displayTrips();