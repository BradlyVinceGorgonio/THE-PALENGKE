function changeMainImage(newImageSrc) {
    console.log("Changing main image to:", newImageSrc);
    const mainProductImage = document.getElementById("mainProductImage");
    mainProductImage.src = newImageSrc;
}

function showBuyMessage() {
    var buymessage = document.getElementById('buymessage');
    buymessage.style.display = 'block';
}

function closeBuyMessage() {
    var buymessage = document.getElementById('buymessage');
    buymessage.style.display = 'none';
}

function showCartMessage() {
    var cartmessage = document.getElementById('cartmessage');
    cartmessage.style.display = 'block';
}

function closeCartMessage() {
    var cartModal = document.getElementById('cartmessage');
    cartModal.style.display = 'none';
}