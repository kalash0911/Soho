// for accordion
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

