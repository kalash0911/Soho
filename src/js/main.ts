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

// @ts-ignore
function destroySlidersOnResize(selector, width, obj, moreThan) {
    const init = {
        ...obj,
    };

    const win = window;
    const sliderSelector = document.querySelector(selector);
    // @ts-ignore
    let swiper = new Swiper(selector, init);

    const toggleInit = () => {
        const neededWidth = moreThan
            ? win.innerWidth >= width
            : win.innerWidth <= width;
        if (neededWidth) {
            if (!sliderSelector?.classList.contains("swiper-initialized")) {
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

// for Modal-iframe

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-iframe') as HTMLElement | null;
    const modalIframe = modal?.querySelector('iframe') as HTMLIFrameElement | null;
    const closeBtn = modal?.querySelector('.btn-close') as HTMLElement | null;
    const overlay = modal?.querySelector('.modal-iframe-overflow') as HTMLElement | null;
    const iframeButtons = document.querySelectorAll('.iframe-btn');

    iframeButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const iframe = btn.querySelector('iframe') as HTMLIFrameElement | null;

            if (iframe && modal && modalIframe) {
                const src = iframe.getAttribute('src');
                if (src) {
                    modalIframe.setAttribute('src', src);
                    document.body.classList.add('body_lock');
                    modal.classList.add('modal-iframe_active');
                }
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('modal-iframe_active');
            document.body.classList.remove('body_lock');
            if (modalIframe) {
                modalIframe.setAttribute('src', '');
            }
        }
    };

    closeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    overlay?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });
});
