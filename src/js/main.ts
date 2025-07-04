// for Accordion
const headers: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.accordion-header');

const lastHeader = headers[headers.length - 1];
const lastItem = lastHeader?.closest('.accordion-item');
const lastContent = lastHeader?.nextElementSibling;

if (lastItem instanceof HTMLElement && lastContent instanceof HTMLElement) {
    lastItem.classList.add('open');
    lastContent.style.maxHeight = lastContent.scrollHeight + 'px';
}

headers.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const content = header.nextElementSibling;

        if (!(item instanceof HTMLElement) || !(content instanceof HTMLElement)) return;

        document.querySelectorAll('.accordion-item.open').forEach(openItem => {
            const openContent = openItem.querySelector('.accordion-content') as HTMLElement | null;
            if (openItem !== item && openContent) {
                openContent.style.maxHeight = '';
                openItem.classList.remove('open');
            }
        });

        const isOpen = item.classList.contains('open');
        if (isOpen) {
            content.style.maxHeight = '';
            item.classList.remove('open');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            item.classList.add('open');
        }
    });
});

// for Swipers

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function destroySlidersOnResize(selector, width, obj, moreThan) {
    const init = {
        ...obj,
    };

    const win = window;
    const sliderSelector = document.querySelector(selector);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let swiper = new Swiper(selector, init);

    const toggleInit = () => {
        const neededWidth = moreThan
            ? win.innerWidth >= width
            : win.innerWidth <= width;
        if (neededWidth) {
            if (!sliderSelector?.classList.contains("swiper-initialized")) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                swiper = new Swiper(selector, init);
            }
        } else if (sliderSelector.classList.contains("swiper-initialized")) {
            swiper.destroy();
        }
    };

    ["load", "resize"].forEach((evt) =>
        win.addEventListener(evt, toggleInit, false)
    );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
destroySlidersOnResize(".docSlider", 99999, {
    spaceBetween: 150,
    slidesPerView: 4,

    /*     breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1500: {
                slidesPerView: 4,
                spaceBetween: 95,
            },
        }, */

    pagination: {
        el: '.doc-pag',
        clickable: true,
    },
});

// for Modal-doc

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-doc') as HTMLElement | null;
    const modalWrap = modal?.querySelector('.modal-doc-wrap') as HTMLElement | null;
    const closeBtn = modal?.querySelector('.btn-close') as HTMLElement | null;
    const overlay = modal?.querySelector('.modal-doc-overflow') as HTMLElement | null;
    const docButtons = document.querySelectorAll('.doc-btn');

    if (!modal || !modalWrap || !closeBtn || !overlay) return;

    docButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            modalWrap.innerHTML = '';

            const images = btn.querySelectorAll('img');
            if (images.length === 0) return;

            images.forEach((img) => {
                if (img.src) {
                    const modalImg = document.createElement('img');
                    modalImg.src = img.src;
                    modalImg.alt = img.alt || '';
                    modalWrap.appendChild(modalImg);
                }
            });

            document.body.classList.add('body_lock');
            modal.classList.add('modal-doc_active');
        });
    });

    const closeModal = () => {
        modal.classList.remove('modal-doc_active');
        document.body.classList.remove('body_lock');
        modalWrap.innerHTML = '';
    };

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
});

// for Modal-doc

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Fancybox.bind("[data-fancybox]", {});


// for Google map

function initMap(): void {
    const center: google.maps.LatLngLiteral = {
        lat: 46.4825,
        lng: 30.7233,
    };

    const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
            center,
            zoom: 12,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ],
        }
    );

    new google.maps.Marker({
        position: center,
        map,
        title: "Мой маркер",
        icon: {
            url: "/custom-marker.svg",
            scaledSize: new google.maps.Size(40, 40),
        },
    });
}

window.initMap = initMap;

const waitForGoogleMaps = () =>
    new Promise<void>((resolve) => {
        const check = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).google?.maps) resolve();
            else setTimeout(check, 100);
        };
        check();
    });

waitForGoogleMaps().then(() => {
    window.initMap();
});
