function getElementIndex(element, range) {
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element) + 1;
}

const carouselHander = {
    carouselCount: () => {
        const carousel = document.getElementById("carousel");
        const totalItems = document
            .querySelectorAll("#carousel .carousel-item")
            .length.toString()
            .padStart(2, "0");

        document.getElementById("totalSilde").innerHTML = ` / ${totalItems}`;

        carousel.addEventListener("slid.bs.carousel", function () {
            let currentIndex = getElementIndex(
                document.querySelector(".carousel-item.active")
            )
                .toString()
                .padStart(2, "0");
            document.getElementById("nowSlide").innerHTML = currentIndex;
        });
    },
};

export default carouselHander;
