(()=> {
    var aboutTabs = document.querySelector(".aboutTabs"),
    aboutSection = document.querySelector(".aboutSection");
    aboutTabs.addEventListener("click" , (e)=>{
        var tarGet = e.target.getAttribute("data-skill");
        if(e.target.classList.contains("tabLabel") && !e.target.classList.contains("active")){
            aboutTabs.querySelector(".active").classList.remove("active" , "outerShadow");
            e.target.classList.add("active" , "outerShadow");
        }
        if(tarGet != null){
            aboutSection.querySelector(".aboutContent.active").classList.remove("active");
            aboutSection.querySelector(tarGet).classList.add("active");
        }
    });
})();
    function scrollBody() {
        document.body.classList.toggle("scrollY");
    }
(()=>{
        const portfolioFilters   = document.querySelector(".portfolioFilters"),
            portfolioBox         = document.querySelectorAll(".portfolioBox"),
            portfolioBoxes       = document.querySelector(".portfolioBoxes"),
            portfoloiPopup       = document.querySelector(".portfolio_popup"),
            closePopup           = document.querySelector(".close_popup"),
            prevArrow            = document.querySelector(".prevArrow"),
            nextArrow            = document.querySelector(".nextArrow"),
            detail_btn           = document.querySelector(".detail_btn"),
            popupDetails         = document.querySelector(".popupDetails");



        portfolioFilters.addEventListener("click" , function(event){
            if(event.target.classList.contains("filterLabel") && !event.target.classList.contains("active")){
                portfolioFilters.querySelector(".active").classList.remove("active","outerShadow");
                event.target.classList.add("active","outerShadow");

                let filterTarget = event.target.getAttribute("data-filter");
                portfolioBox.forEach((box) =>{
                    if(filterTarget === box.getAttribute("data-target") || filterTarget === "all"){
                        box.classList.remove("hide");
                        box.classList.add("show");
                    }else{
                        box.classList.remove("show");
                        box.classList.add("hide");
                    }
                });
            }
        });
        
        portfolioBoxes.addEventListener("click" , (event)=>{
            if(event.target.closest(".innerPortfolio")){
                const boxes = event.target.closest(".innerPortfolio").parentElement;
                // itemIndex = Array.from(boxes.parentElement.children).indexOf(boxes); First method
                itemIndex = Array.from(portfolioBoxes.children).indexOf(boxes);  // My method

                screenShoot = portfolioBox[itemIndex].querySelector(".imgPortfolio img").getAttribute("data-screen");

                screenShoot = screenShoot.split(",");
                if(screenShoot.length === 1){
                    prevArrow.style.display = "none";
                    nextArrow.style.display = "none";
                }else{
                    prevArrow.style.display = "block";
                    nextArrow.style.display = "block";
                }
                slideIndex = 0;
                openPopup();
                popupSlider();
                popupDetail();
            }
        });
        function openPopup(){
            portfoloiPopup.classList.toggle("open");
            scrollBody();
        }
        closePopup.addEventListener("click" , function(){
            // portfoloiPopup.classList.toggle("open");
            // scrollBody();
            openPopup();
        });
        function popupSlider(){
            const imgSrc             = screenShoot[slideIndex],
                    popupImg         = portfoloiPopup.querySelector(".img_popup"),
                    popup_counter    = portfoloiPopup.querySelector(".popup_counter");
            popupImg.src = imgSrc;
            popup_counter.innerHTML = (slideIndex + 1) + " of " + screenShoot.length;
        }
        function popupDetail(){
            const portfolioDetails = portfolioBox[itemIndex].querySelector(".portfolioDetails").innerHTML;
            portfoloiPopup.querySelector(".pp_portfolioDetails").innerHTML = portfolioDetails;

            const titleProjet = portfolioBox[itemIndex].querySelector(".titleProjet").innerHTML;
            popupDetails.querySelector(".popupInner h2").innerHTML = titleProjet;

            const category = portfolioBox[itemIndex].getAttribute("data-target");
            portfoloiPopup.querySelector(".pp_head_paragraph span").innerHTML = category;
        }
        nextArrow.addEventListener("click" , ()=>{
            if(slideIndex === (screenShoot.length-1)){
                slideIndex = 0;
            }else{
                slideIndex++;
                popupSlider();
            }
        });
        prevArrow.addEventListener("click" , ()=>{
            if(slideIndex === 0){
                slideIndex = screenShoot.length-1;
            }else{
                slideIndex--;
                popupSlider();
            }
        });
        function projectDetailsToggle(){
            if(detail_btn.classList.contains("active")){
                detail_btn.querySelector("i").classList.add("fa-plus");
                detail_btn.querySelector("i").classList.remove("fa-minus");
                popupDetails.style.maxHeight = 0 + "px";
                detail_btn.classList.remove("active");
                
            }else{
                detail_btn.querySelector("i").classList.add("fa-minus");
                detail_btn.querySelector("i").classList.remove("fa-plus");
                detail_btn.classList.add("active");
                popupDetails.style.maxHeight = popupDetails.scrollHeight + "px";
                portfoloiPopup.scrollTo(0 , popupDetails.offsetTop)
            }
        }
        detail_btn.addEventListener("click" , ()=> {
            projectDetailsToggle();
        });
})();