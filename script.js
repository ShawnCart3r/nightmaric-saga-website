const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
});

const art = document.querySelector('.hero-art');
const image = new Image();
image.src = 'hero.webp';
image.onload = () => art.classList.add('loaded');

document.querySelectorAll('a[href*="mybook.to"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof window.fbq === 'function') {
      const title = link.dataset.book || 'The Nightmaric Saga';
      const entryPath = title === 'The Fractured Girl'
        ? 'episode_one'
        : title === 'The Complete Fractured Arc'
          ? 'omnibus'
          : title === 'The Nightmaric Saga'
            ? 'series_page'
            : ['Syriana', 'The Women with a Thousand Faces'].includes(title)
              ? 'special_episode'
              : 'catalog_book';

      window.fbq('track', 'ViewContent', {
        content_name: title,
        content_category: 'Book',
        entry_path: entryPath,
        destination: 'Amazon'
      });

      window.fbq('trackCustom', 'AmazonClick', {
        content_name: title,
        entry_path: entryPath
      });
    }
  });
});

const hero = document.querySelector('.hero');
const stickyObserver = new IntersectionObserver(([entry]) => {
  document.body.classList.toggle('show-scroll-cta', !entry.isIntersecting);
}, { threshold: 0.12 });

stickyObserver.observe(hero);
