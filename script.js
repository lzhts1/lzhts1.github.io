const page = document.body;

page.classList.add('is-loading');
document.querySelector('#year').textContent = new Date().getFullYear();

const video = document.querySelector('.background__video');
const avatar = document.querySelector('.portrait__image img');

function showAvatarWhenReady() {
  if (avatar.naturalWidth > 0) {
    avatar.parentElement.classList.add('has-image');
  }
}

avatar.addEventListener('load', showAvatarWhenReady);
showAvatarWhenReady();

// The video is decorative. If a browser blocks autoplay or cannot decode it,
// the lavender fallback remains readable and intentional.
video.addEventListener('error', () => {
  document.body.classList.add('video-unavailable');
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    video.pause();
  } else {
    video.play().catch(() => {});
  }
});

function waitForVideo() {
  return new Promise((resolve) => {
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }

    video.addEventListener('canplay', resolve, { once: true });
    video.addEventListener('error', resolve, { once: true });
  });
}

function waitForAvatar() {
  return new Promise((resolve) => {
    if (avatar.complete) {
      resolve();
      return;
    }

    avatar.addEventListener('load', resolve, { once: true });
    avatar.addEventListener('error', resolve, { once: true });
  });
}

function revealPage() {
  window.requestAnimationFrame(() => {
    page.classList.remove('is-loading');
    page.classList.add('is-ready');
  });
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealPage();
} else {
  const maximumWait = new Promise((resolve) => window.setTimeout(resolve, 3500));
  Promise.race([Promise.all([waitForVideo(), waitForAvatar()]), maximumWait]).then(revealPage);
}
