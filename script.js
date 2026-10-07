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
