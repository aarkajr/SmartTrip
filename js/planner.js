const tripForm = document.getElementById("tripForm");

const tripNameInput = document.getElementById("tripName");

const destinationInput = document.getElementById("destination");

const tripDateInput = document.getElementById("tripDate");

const activityInput = document.getElementById("activity");

const notesInput = document.getElementById("notes");

const itineraryList = document.getElementById("itineraryList");

const itineraryCount = document.getElementById("itineraryCount");


let itinerary = [];


tripForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const tripName = tripNameInput.value.trim();

    const destination = destinationInput.value.trim();

    const tripDate = tripDateInput.value;

    const activity = activityInput.value.trim();

    const notes = notesInput.value.trim();


    if (
        tripName === "" ||
        destination === "" ||
        tripDate === "" ||
        activity === ""
    ) {

        alert("Please fill in all required fields.");

        return;

    }


    const newActivity = {

        id: Date.now(),

        tripName: tripName,

        destination: destination,

        date: tripDate,

        activity: activity,

        notes: notes

    };


    itinerary.push(newActivity);


    localStorage.setItem(
        "smartTripItinerary",
        JSON.stringify(itinerary)
    );


    displayItinerary();


    tripForm.reset();

});


function displayItinerary() {

    itineraryCount.textContent =
        `${itinerary.length} ${itinerary.length === 1
            ? "activity"
            : "activities"
        }`;

    if (itinerary.length === 0) {

        itineraryList.innerHTML = `

            <div class="empty-itinerary">

                <div class="empty-itinerary-icon">
                    ✈
                </div>

                <h3>
                    Your journey starts here
                </h3>

                <p>
                    Add your first activity using
                    the form on the left.
                </p>

            </div>

        `;

        return;
    }


    itineraryList.innerHTML = "";


    itinerary.forEach(function (item) {

        const activityElement =
            document.createElement("div");


        activityElement.className =
            "itinerary-item";


        activityElement.innerHTML = `

    <div class="itinerary-date">
        ${item.date}
    </div>

    <div class="itinerary-content">

        <h3>
            ${item.activity}
        </h3>

        <p>
            ${item.destination}
        </p>

        ${item.notes
                ? `<small>${item.notes}</small>`
                : ""
            }

        <button
            class="delete-activity"
            data-id="${item.id}"
        >
            Delete
        </button>

    </div>

`;


        itineraryList.appendChild(
            activityElement
        );

        const deleteButton =
            activityElement.querySelector(".delete-activity");

        deleteButton.addEventListener("click", function () {

            itinerary =
                itinerary.filter(function (activity) {

                    return activity.id !== item.id;

                });

            localStorage.setItem(
                "smartTripItinerary",
                JSON.stringify(itinerary)
            );

            displayItinerary();

        });

    });

}


const savedItinerary =
    localStorage.getItem("smartTripItinerary");


if (savedItinerary) {

    itinerary =
        JSON.parse(savedItinerary);

}


displayItinerary();