window.onload = (event) => {
    console.log('page is fully loaded');
};

let tg = null
function more(backbg){
    // let backbg = target.parentElement.parentElement;
    //backbg.dataset.back
    
    Swal.fire({title: backbg.dataset.title, html: backbg.dataset.back,  width: 400});
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function run(){
    let slideshows =  Array.from(document.querySelectorAll(".slideshow"))

    // filter because they most have to children  slide
    // an only of does types.

    slideshows.forEach(function(slideshow){ // Append dots do every slideshow (For every slide in the slideshow)
        let dots = document.createElement("div")
        dots.classList.add("dots")

        for (let index = 0; index < slideshow.childElementCount; index++) {
            let dot  = document.createElement("span")
            dot.classList.add("dot")
            dot.dataset.order = index
            dots.appendChild(dot)
        }
        slideshow.appendChild(dots)
    })

    slideshows = slideshows.map(function(slideshow, index){
        return  {
            "order": index,
            "slides": Array.from(slideshow.querySelectorAll(".slide")),
            "dots": Array.from(slideshow.querySelectorAll(".dot"))
        }
    })

    // wire clicks
    slideshows.forEach(function(slideshow){
        for (let index = 0; index < slideshow.dots.length; index++) {
            slideshow.dots[index].onclick = function(event){
                
                slideshow.slides.forEach(function(slide){ 
                    slide.classList.remove("show")
                    slide.classList.remove("hide") 
                })

                slideshow.dots.forEach(function(dot){ 
                    dot.classList.remove("active") 
                })
                
                let slide = slideshow.slides[index]
                slide.classList.add("show")

                slideshow.dots[index].classList.add("active")
            }
        }
    })

    // show first slide of every slideshow
    slideshows.forEach(function(slideshow){
        let firstSlide = slideshow.slides[0]
        let firstDot = slideshow.dots[0]

        firstSlide.classList.remove("hide") 
        firstSlide.classList.remove("show")
        firstDot.classList.remove("active")

        firstSlide.classList.add("show") 
        firstDot.classList.add("active")
    })
}