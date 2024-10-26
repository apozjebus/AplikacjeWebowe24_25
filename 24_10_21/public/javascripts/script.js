function generateGallery(images) {
    var container = document.getElementById('container');
    images.forEach(function (image) {
        var div = document.createElement('div');
        div.classList.add('mySlides');
        dis.classList.add('fade');
        var img = document.createElement('img');
        img.src = image;
        container.appendChild(img);
    });
}