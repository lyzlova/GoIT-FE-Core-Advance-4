'use strict';

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  {
    preview: 'img/preview-1.jpg',
    fullview: 'img/fullview-1.jpg',
    alt: 'alt text 1',
  },
  {
    preview: 'img/preview-2.jpg',
    fullview: 'img/fullview-2.jpg',
    alt: 'alt text 2',
  },
  {
    preview: 'img/preview-3.jpg',
    fullview: 'img/fullview-3.jpg',
    alt: 'alt text 3',
  },
  {
    preview: 'img/preview-4.jpg',
    fullview: 'img/fullview-4.jpg',
    alt: 'alt text 4',
  },
  {
    preview: 'img/preview-5.jpg',
    fullview: 'img/fullview-5.jpg',
    alt: 'alt text 5',
  },
  {
    preview: 'img/preview-6.jpg',
    fullview: 'img/fullview-6.jpg',
    alt: 'alt text 6',
  },
];
/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
    Реализуйте функционал:
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы. 
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
      - Изображений может быть произвольное количество.
      - Используйте делегирование для элементов preview.
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      - CSS-оформление и имена классов на свой вкус.
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

// const imageGallery = document.querySelector('.js-image-gallery');
// const fullviewCase = document.createElement('div');
// fullviewCase.classList.add('fullview');
// const imgOnFullview = document.createElement('img');
// const defaultActiveItem = 1;

// const previewCase = document.createElement('ul');
// previewCase.classList.add('preview');

// imageGallery.append(fullviewCase, previewCase);

// const imgFullview = createGalleryFullviewItems(galleryItems[defaultActiveItem]);
// imageGallery.append(imgFullview);

// function createGalleryFullviewItems({
//   fullview,
//   alt
// }) {
//   imgOnFullview.setAttribute('src', fullview);
//   imgOnFullview.setAttribute('alt', alt);
//   imgOnFullview.classList.add('image-fullview');
//   fullviewCase.appendChild(imgOnFullview);

//   return fullviewCase;
// }

// const imgPreview = createGalleryPreview(galleryItems);
// imageGallery.append(...imgPreview);

// function createGalleryPreview(arr) {
//   return arr.reduce((acc, obj) => acc.concat(createGalleryPreviewItems(obj)), []);
// }

// function createGalleryPreviewItems({
//   preview,
//   fullview,
//   alt
// }) {
//   const previewLi = document.createElement('li');
//   previewLi.classList.add('image-preview');
//   previewCase.append(previewLi);
//   const img = document.createElement('img');
//   img.classList.add('image-preview');
//   img.setAttribute('src', preview);
//   img.setAttribute('alt', alt);
//   img.setAttribute('data-fullview', fullview);
//   previewLi.append(img);

//   return previewCase;
// }

// const previewListener = document.querySelector('.preview');
// previewListener.addEventListener('click', handleChange);

// function handleChange(event) {
//   const nodeName = event.target.nodeName;

//   if (nodeName === 'IMG') {
//     const getAtrributePreview = event.target.getAttribute('data-fullview');
//     imgOnFullview.setAttribute('src', getAtrributePreview);
//   }
// }

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
  чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
  аналогичный заданию выше.
  
  При создании экземпляра конструктор получает:
    - items - список элементов для preview
    - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
    - defaultActiveItem - номер активного элемента preview по умолчанию
    
  Тогда создание экземпляра будет выглядеть следующим образом.
*/

const imageGallery = document.querySelector('.js-image-gallery');
const fullviewCase = document.createElement('div');
fullviewCase.classList.add('fullview');
const imgOnFullview = document.createElement('img');
const previewCase = document.createElement('ul');
previewCase.classList.add('preview');
imageGallery.append(fullviewCase, previewCase);

class Gallery {
  constructor({ items, parentNode, defaultActiveItem }) {
    this.items = items;
    this.parentNode = parentNode;
    this.defaultActiveItem = defaultActiveItem;
  }

  imgFullview() {
    const obj = this.items[this.defaultActiveItem];
    const imgFullview = createGalleryFullviewItems(obj);

    function createGalleryFullviewItems({ fullview, alt }) {
      imgOnFullview.setAttribute('src', fullview);
      imgOnFullview.setAttribute('alt', alt);
      imgOnFullview.classList.add('image-fullview');
      fullviewCase.appendChild(imgOnFullview);

      return fullviewCase;
    }
    return imgFullview;
  }

  imgPreview() {
    const items = this.items;

    const getImgPreview = function createGalleryPreview(items) {
      return items.reduce(
        (acc, obj) => acc.concat(createGalleryPreviewItems(obj)),
        [],
      );
    };

    const getImg = getImgPreview(items);

    function createGalleryPreviewItems({ preview, fullview, alt }) {
      const previewLi = document.createElement('li');
      previewLi.classList.add('image-preview');
      previewCase.append(previewLi);
      const img = document.createElement('img');
      img.classList.add('image-preview');
      img.setAttribute('src', preview);
      img.setAttribute('alt', alt);
      img.setAttribute('data-fullview', fullview);
      previewLi.append(img);

      return previewCase;
    }
    return previewCase;
  }
}

const newGallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.image-gallery'),
  defaultActiveItem: 1,
});

const appendimgFullview = newGallery.imgFullview();
imageGallery.append(appendimgFullview);

const appendimgPreview = newGallery.imgPreview();
imageGallery.append(appendimgPreview);

const previewListener = document.querySelector('.preview');
previewListener.addEventListener('click', handleChange);

function handleChange(event) {
  const nodeName = event.target.nodeName;

  if (nodeName === 'IMG') {
    const getAtrributePreview = event.target.getAttribute('data-fullview');
    imgOnFullview.setAttribute('src', getAtrributePreview);
  }
}
