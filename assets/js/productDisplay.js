window.onload = function() {

    let chngProdView = document.querySelector("#chngProdView");

    let changeFlag = true;
    chngProdView.addEventListener('click', function() {
        if(changeFlag){
            changeView();
            changeFlag = false;
        }else{
            reverseView();
            changeFlag = true;
        }
        
        console.log("View changed!!!!!!!")
    })

    function changeView(){
        document.querySelector("#chngProdView").innerHTML = '<ion-icon name="grid"></ion-icon>';
        document.querySelector("#chngProdView").style.fontSize = '20px';
        document.querySelector("#chngProdView").style.color = '#212529';
        document.querySelector(".productDisplay").style.display = "block";
        document.querySelector(".prodImgAndDetails").style.display = "flex";
        document.querySelector(".adsCrousel").style.width = "100%";
        document.querySelector(".adsBorder").style.width = "100%";
        document.querySelector(".imgHeight").style.width = "100%";
        document.querySelector(".imgHeight").style.objectFit = "fill";
        document.querySelector(".productDetails").style.width = "65%";
        
    }

    function reverseView(){
        document.querySelector("#chngProdView").innerHTML = '<ion-icon name="list"></ion-icon>';
        document.querySelector("#chngProdView").style.fontSize = '20px';
        document.querySelector("#chngProdView").style.color = '#212529';
        document.querySelector(".productDisplay").style.display = "flex";
        document.querySelector(".prodImgAndDetails").style.display = "block";
        document.querySelector(".adsCrousel").style.width = "50%";
        document.querySelector(".adsBorder").style.width = "100%";
        document.querySelector(".productDetails").style.width = "100%";
        
    }

    // $(document).ready(function() {
    //     $('#mySelect2').select2();
    // });

    document.querySelector("#mySelect2").select2();
}