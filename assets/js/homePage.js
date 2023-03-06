window.onload = function() {
    document.querySelector(".commercialTabDisplay").style.display = "none";


    document.querySelector("#commercialTab").addEventListener("click", showCommercial);

    function showCommercial(){
        document.querySelector(".commercialTabDisplay").style.display = "block";
        document.querySelector("#homeTab").style.display = "none";
        document.querySelector("#stickyTab").style.display = "none";
        document.querySelector("#commercialTab").style.color = "#e30b1c";
        document.querySelector("#commercialTab").style.borderBottom = "3px solid #e30b1c";
        document.querySelector("#homePageTab").style.color = "#cecece";
        document.querySelector("#homePageTab").style.borderBottom = "3px solid #fff";
    }

    document.querySelector("#homePageTab").addEventListener("click", showHome);

    function showHome(){
        document.querySelector(".commercialTabDisplay").style.display = "none";
        document.querySelector("#homeTab").style.display = "block";
        document.querySelector("#stickyTab").style.display = "block";
        document.querySelector("#homePageTab").style.color = "#e30b1c";
        document.querySelector("#homePageTab").style.borderBottom = "3px solid #e30b1c";
        document.querySelector("#commercialTab").style.color = "#cecece";
        document.querySelector("#commercialTab").style.borderBottom = "3px solid #fff";
    }
}