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