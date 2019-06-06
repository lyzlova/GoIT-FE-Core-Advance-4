'use strict';

const posts = [
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-1.com',
  },
  {
    img: 'https://placeimg.com/400/150/nature',
    title: 'Post title 2',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-2.com',
  },
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 3',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-3.com',
  },
];

// const obj = createCards(posts);
// document.body.append(...obj);

// function createCards(arr) {
//   return arr.reduce((acc, obj) => acc.concat(createPostCard(obj)), []);
// }

// function createPostCard({ img, title, text, link }) {
//   const movie = document.createElement('div');
//   movie.classList.add('movie');

//   const movieImage = document.createElement('img');
//   movieImage.classList.add('movie__image');
//   movieImage.setAttribute('src', img);
//   movieImage.setAttribute('alt', 'movie image');

//   const movieBody = document.createElement('div');
//   movieBody.classList.add('movie__body');

//   const movieTitle = document.createElement('h2');
//   movieTitle.classList.add('movie__title');
//   movieTitle.textContent = title;

//   const movieDescription = document.createElement('p');
//   movieDescription.classList.add('movie__description');
//   movieTitle.textContent = text;

//   const movieDate = document.createElement('p');
//   movieDate.classList.add('movie__date');
//   movieDate.textContent = 'Released: 1972-03-14';

//   const button = document.createElement('a');
//   button.classList.add('button');
//   button.href = '#';
//   button.textContent = link;

//   movie.append(movieImage, movieBody);
//   movieBody.append(movieTitle, movieDescription, movieDate, button);

//   return movie;
// }

const obj = createCards(posts);
document.body.append(...obj);

function createCards(arr) {
  return arr.reduce((acc, obj) => acc.concat(createPostCard(obj)), []);
}

function createPostCard({ img, title, text, link }) {
  const movie = $cel('div', { className: 'movie' });

  const movieImage = $cel('img', {
    className: 'movie__image',
    src: img,
    alt: 'movie image',
  });

  const movieBody = $cel('div', { className: 'movie__body' });

  const movieTitle = $cel('h2', { className: 'movie__title' }, title);

  const movieDescription = $cel('p', { className: 'movie__description' }, text);

  const button = $cel('a', { className: 'button', href: '#' }, link);

  movie.append(movieImage, movieBody);
  movieBody.append(movieTitle, movieDescription, button);

  return movie;
}
