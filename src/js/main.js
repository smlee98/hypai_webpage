import navScrollHandler from "./navbar";
import carouselHander from "./carousel";

const carousel = document.getElementById("carousel");

navScrollHandler.navScrollLock();

if (carousel) {
    carouselHander.carouselCount();
}
