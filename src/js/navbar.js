const topNav = document.querySelector("#top-nav");

const navScrollHandler = {
    navScrollLock: () => {
        if (topNav) {
            let pos;
            const body = document.querySelector("body");
            const openButton = document.querySelector(
                "#top-nav .navbar-toggler"
            );
            const closeButton = document.querySelector(
                "#navbarFull .btn-close"
            );

            const navOpenHandler = () => {
                pos = document.documentElement.scrollTop;
                body.style = `top: -${pos}px; position: fixed; width: 100vw; `;
            };

            const navCloseHandler = () => {
                body.style = "";
                window.scrollTo({
                    top: pos,
                    behavior: "instant",
                });
            };

            openButton.addEventListener("click", navOpenHandler);
            closeButton.addEventListener("click", navCloseHandler);
        }
    },
};

export default navScrollHandler;
