// ==================================================
// VELORA AUTO
// FULL INTERACTIVE WEBSITE SCRIPT
// ==================================================


// ==================================================
// IMAGE PATHS
// ==================================================

const IMAGES = {

    hero: "images/Hero.png",

    signature: "images/Signature.png",

    correction: "images/Correction.png",

    ceramic: "images/Ceramic.png",

    about: "images/About.png",

    gallery1: "images/Gallery-1.png",

    gallery2: "images/Gallery-2.png",

    gallery3: "images/Gallery-3.png",

    gallery4: "images/Gallery-4.png"

};


// ==================================================
// PRELOAD IMAGES
// ==================================================

Object.values(IMAGES).forEach(path => {

    const image = new Image();

    image.src = path;

});


// ==================================================
// PAGE ELEMENTS
// ==================================================

const pages =
    document.querySelectorAll(".page");

const navButtons =
    document.querySelectorAll(".nav-button");

const mainNavButtons =
    document.querySelectorAll(
        ".main-nav .nav-button"
    );

const currentPageText =
    document.getElementById(
        "currentPage"
    );


// ==================================================
// PAGE NAMES
// ==================================================

const pageLabels = {

    home:
        "01 / HOME",

    services:
        "02 / SERVICES",

    gallery:
        "03 / GALLERY",

    about:
        "04 / ABOUT",

    booking:
        "05 / BOOKING"

};


// ==================================================
// OPEN PAGE
// ==================================================

function openPage(
    pageName,
    updateHash = true
) {

    if (!pageLabels[pageName]) {

        pageName = "home";

    }


    // Change visible page

    pages.forEach(page => {

        const isActive =
            page.id === pageName;

        page.classList.toggle(
            "active",
            isActive
        );

    });


    // Update navbar underline

    mainNavButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });


    // Update bottom page number

    if (currentPageText) {

        currentPageText.textContent =
            pageLabels[pageName];

    }


    // Update URL

    if (updateHash) {

        history.replaceState(
            null,
            "",
            `#${pageName}`
        );

    }

}


// ==================================================
// NAV BUTTONS
// ==================================================

navButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;

            if (page) {

                openPage(page);

            }

        }
    );

});


// ==================================================
// OPEN CORRECT PAGE FROM URL
// ==================================================

const startingPage =
    window.location.hash
        .replace("#", "");

if (
    pageLabels[startingPage]
) {

    openPage(
        startingPage,
        false
    );

} else {

    openPage(
        "home",
        false
    );

}


// ==================================================
// HASH CHANGE
// ==================================================

window.addEventListener(
    "hashchange",
    () => {

        const page =
            window.location.hash
                .replace("#", "");

        openPage(
            pageLabels[page]
                ? page
                : "home",
            false
        );

    }
);


// ==================================================
// HOME HERO IMAGE
// ==================================================

const homeImage =
    document.querySelector(
        ".home-image"
    );

if (homeImage) {

    homeImage.style.backgroundImage =
        `
        linear-gradient(
            rgba(0,0,0,0.08),
            rgba(0,0,0,0.18)
        ),
        url("${IMAGES.hero}")
        `;

    homeImage.style.backgroundSize =
        "cover";

    homeImage.style.backgroundPosition =
        "center";

    homeImage.style.backgroundRepeat =
        "no-repeat";

}


// ==================================================
// REMOVE OLD FAKE CAR SHAPE
// ==================================================

const fakeCar =
    document.querySelector(
        ".car-shape"
    );

if (fakeCar) {

    fakeCar.style.display =
        "none";

}


// ==================================================
// ABOUT IMAGE
// ==================================================

const aboutImage =
    document.querySelector(
        ".about-image"
    );

if (aboutImage) {

    aboutImage.style.backgroundImage =
        `
        linear-gradient(
            rgba(0,0,0,0.05),
            rgba(0,0,0,0.20)
        ),
        url("${IMAGES.about}")
        `;

    aboutImage.style.backgroundSize =
        "cover";

    aboutImage.style.backgroundPosition =
        "center";

    aboutImage.style.backgroundRepeat =
        "no-repeat";

}


// ==================================================
// SERVICES
// ==================================================

const serviceOptions =
    document.querySelectorAll(
        ".service-option"
    );

const serviceVisual =
    document.getElementById(
        "serviceVisual"
    );

const serviceLabel =
    document.getElementById(
        "serviceLabel"
    );

const serviceDescription =
    document.getElementById(
        "serviceDescription"
    );


// ==================================================
// SERVICE DATA
// ==================================================

const services = {

    signature: {

        label:
            "SIGNATURE DETAIL",

        name:
            "Signature Detail",

        description:
            "A complete exterior and interior treatment focused on cleanliness, finish and presentation.",

        image:
            IMAGES.signature

    },


    correction: {

        label:
            "PAINT CORRECTION",

        name:
            "Paint Correction",

        description:
            "Machine polishing designed to restore gloss and reduce visible swirls, haze and paint imperfections.",

        image:
            IMAGES.correction

    },


    ceramic: {

        label:
            "CERAMIC PROTECTION",

        name:
            "Ceramic Protection",

        description:
            "Durable surface protection designed to enhance gloss and make routine maintenance easier.",

        image:
            IMAGES.ceramic

    }

};


let selectedService =
    "signature";


// ==================================================
// CREATE SERVICE BOOK BUTTON
// ==================================================

const serviceDescriptionArea =
    document.querySelector(
        ".service-description"
    );

let serviceBookButton =
    document.getElementById(
        "serviceBookButton"
    );


if (
    serviceDescriptionArea &&
    !serviceBookButton
) {

    serviceBookButton =
        document.createElement(
            "button"
        );

    serviceBookButton.id =
        "serviceBookButton";

    serviceBookButton.className =
        "service-book-button";

    serviceBookButton.innerHTML =
        `
        Book this service
        <span>↗</span>
        `;

    serviceDescriptionArea.appendChild(
        serviceBookButton
    );

}


// ==================================================
// CHANGE SERVICE IMAGE
// ==================================================

function changeServiceImage(
    imagePath
) {

    if (!serviceVisual) {
        return;
    }


    // Tiny fade animation

    serviceVisual.style.opacity =
        "0";


    setTimeout(() => {

        serviceVisual.style.backgroundImage =
            `
            linear-gradient(
                rgba(0,0,0,0.03),
                rgba(0,0,0,0.12)
            ),
            url("${imagePath}")
            `;

        serviceVisual.style.backgroundSize =
            "cover";

        serviceVisual.style.backgroundPosition =
            "center";

        serviceVisual.style.backgroundRepeat =
            "no-repeat";


        serviceVisual.style.opacity =
            "1";

    }, 180);

}


// ==================================================
// SELECT SERVICE
// ==================================================

function selectService(
    serviceKey
) {

    const service =
        services[serviceKey];


    if (!service) {
        return;
    }


    selectedService =
        serviceKey;


    // Selected row

    serviceOptions.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.service ===
                serviceKey
        );

    });


    // Update text

    if (serviceLabel) {

        serviceLabel.textContent =
            service.label;

    }


    if (serviceDescription) {

        serviceDescription.textContent =
            service.description;

    }


    // Update image

    changeServiceImage(
        service.image
    );

}


// ==================================================
// SERVICE BUTTON EVENTS
// ==================================================

serviceOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            selectService(
                option.dataset.service
            );

        }
    );

});


// ==================================================
// BOOK SELECTED SERVICE
// ==================================================

if (serviceBookButton) {

    serviceBookButton.addEventListener(
        "click",
        () => {

            const bookingSelect =
                document.querySelector(
                    ".booking-form select"
                );


            if (bookingSelect) {

                bookingSelect.value =
                    services[
                        selectedService
                    ].name;

            }


            openPage(
                "booking"
            );

        }
    );

}


// ==================================================
// SET DEFAULT SERVICE
// ==================================================

selectService(
    "signature"
);


// ==================================================
// GALLERY
// ==================================================

const galleryMain =
    document.getElementById(
        "galleryMain"
    );

const galleryThumbs =
    document.querySelectorAll(
        ".gallery-thumb"
    );


const galleryImages = {

    1:
        IMAGES.gallery1,

    2:
        IMAGES.gallery2,

    3:
        IMAGES.gallery3,

    4:
        IMAGES.gallery4

};


let currentGallery =
    1;


// ==================================================
// CHANGE GALLERY IMAGE
// ==================================================

function selectGallery(
    number
) {

    number =
        Number(number);


    if (!galleryImages[number]) {
        return;
    }


    currentGallery =
        number;


    // Update button selection

    galleryThumbs.forEach(
        button => {

            button.classList.toggle(
                "active",
                Number(
                    button.dataset.gallery
                ) === number
            );

        }
    );


    if (!galleryMain) {
        return;
    }


    // Fade old image

    galleryMain.style.opacity =
        "0";


    setTimeout(() => {

        galleryMain.style.backgroundImage =
            `
            linear-gradient(
                rgba(0,0,0,0.03),
                rgba(0,0,0,0.15)
            ),
            url("${galleryImages[number]}")
            `;

        galleryMain.style.backgroundSize =
            "cover";

        galleryMain.style.backgroundPosition =
            "center";

        galleryMain.style.backgroundRepeat =
            "no-repeat";


        const numberLabel =
            galleryMain.querySelector(
                "span"
            );


        if (numberLabel) {

            numberLabel.textContent =
                `0${number}`;

        }


        galleryMain.style.opacity =
            "1";

    }, 180);

}


// ==================================================
// GALLERY BUTTON EVENTS
// ==================================================

galleryThumbs.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            selectGallery(
                button.dataset.gallery
            );

        }
    );

});


// ==================================================
// DEFAULT GALLERY IMAGE
// ==================================================

selectGallery(
    1
);


// ==================================================
// BOOKING FORM
// ==================================================

const bookingForm =
    document.querySelector(
        ".booking-form"
    );


if (bookingForm) {

    const bookingInputs =
        bookingForm.querySelectorAll(
            "input, select"
        );

    const bookingSubmit =
        bookingForm.querySelector(
            "button"
        );


    // Message box

    const bookingMessage =
        document.createElement(
            "div"
        );

    bookingMessage.className =
        "booking-message";

    bookingForm.appendChild(
        bookingMessage
    );


    // =========================
    // MESSAGE FUNCTION
    // =========================

    function showBookingMessage(
        message,
        type
    ) {

        bookingMessage.textContent =
            message;

        bookingMessage.className =
            `booking-message ${type}`;

    }


    // =========================
    // CLEAR ERRORS
    // =========================

    bookingInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                input.classList.remove(
                    "input-error"
                );

                bookingMessage.textContent =
                    "";

                bookingMessage.className =
                    "booking-message";

            }
        );

    });


    // =========================
    // SUBMIT
    // =========================

    if (bookingSubmit) {

        bookingSubmit.addEventListener(
            "click",
            () => {

                const textInputs =
                    bookingForm.querySelectorAll(
                        'input[type="text"]'
                    );

                const nameInput =
                    textInputs[0];

                const vehicleInput =
                    textInputs[1];

                const emailInput =
                    bookingForm.querySelector(
                        'input[type="email"]'
                    );

                const serviceSelect =
                    bookingForm.querySelector(
                        "select"
                    );


                let valid =
                    true;


                // Name

                if (
                    !nameInput ||
                    nameInput.value
                        .trim()
                        .length < 2
                ) {

                    if (nameInput) {

                        nameInput.classList.add(
                            "input-error"
                        );

                    }

                    valid =
                        false;

                }


                // Email

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailInput ||
                    !emailPattern.test(
                        emailInput.value.trim()
                    )
                ) {

                    if (emailInput) {

                        emailInput.classList.add(
                            "input-error"
                        );

                    }

                    valid =
                        false;

                }


                // Vehicle

                if (
                    !vehicleInput ||
                    vehicleInput.value
                        .trim()
                        .length < 2
                ) {

                    if (vehicleInput) {

                        vehicleInput.classList.add(
                            "input-error"
                        );

                    }

                    valid =
                        false;

                }


                // Failed validation

                if (!valid) {

                    showBookingMessage(
                        "Please complete all fields correctly.",
                        "error"
                    );

                    return;

                }


                // Concept success

                showBookingMessage(
                    `Booking request prepared for ${serviceSelect.value}.`,
                    "success"
                );


                bookingSubmit.innerHTML =
                    `
                    Request Prepared
                    <span>✓</span>
                    `;

                bookingSubmit.disabled =
                    true;


                // Reset button

                setTimeout(() => {

                    bookingSubmit.innerHTML =
                        `
                        Request Booking
                        <span>↗</span>
                        `;

                    bookingSubmit.disabled =
                        false;

                }, 2500);

            }
        );

    }

}


// ==================================================
// KEYBOARD CONTROLS
// ==================================================

document.addEventListener(
    "keydown",
    event => {

        const activePage =
            document.querySelector(
                ".page.active"
            )?.id;


        // =========================
        // ESCAPE = HOME
        // =========================

        if (
            event.key === "Escape"
        ) {

            openPage(
                "home"
            );

        }


        // =========================
        // GALLERY CONTROLS
        // =========================

        if (
            activePage === "gallery"
        ) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                let next =
                    currentGallery + 1;


                if (next > 4) {

                    next = 1;

                }


                selectGallery(
                    next
                );

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                let previous =
                    currentGallery - 1;


                if (previous < 1) {

                    previous = 4;

                }


                selectGallery(
                    previous
                );

            }

        }


        // =========================
        // SERVICE CONTROLS
        // =========================

        if (
            activePage === "services"
        ) {

            const serviceKeys =
                Object.keys(
                    services
                );

            let index =
                serviceKeys.indexOf(
                    selectedService
                );


            if (
                event.key ===
                "ArrowDown"
            ) {

                index++;


                if (
                    index >=
                    serviceKeys.length
                ) {

                    index = 0;

                }


                selectService(
                    serviceKeys[index]
                );

            }


            if (
                event.key ===
                "ArrowUp"
            ) {

                index--;


                if (index < 0) {

                    index =
                        serviceKeys.length - 1;

                }


                selectService(
                    serviceKeys[index]
                );

            }

        }

    }
);