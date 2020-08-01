---
layout: default
title: Daniel box of notes
---



<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">

<link rel="stylesheet" href="/borrador/style.css">

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap&family=PT+Sans+Caption&display=swap" rel="stylesheet">

<script src="/borrador/main.js"></script>

<div style="width: 100%; margin: 0px;">
    <div id="cards" class="cards flex-container wrap">
    </div>
</div>

<script>
    let cards = document.querySelector("#cards")

    function getCard(idea) {

        let card = document.createElement("div")
        card.classList.add("card")
        card.classList.add("flex-item")

        let frontbg = document.createElement("div")
        frontbg.classList.add("frontbg")
        frontbg.innerHTML = `
            <div class="frontbg">
                <p class ='title' > ${idea.front} </p>
            </div>
        `

        let slideshow = document.createElement("div")
        slideshow.classList.add("slideshow")

        idea.backs.forEach(function (back) {
            let backbg = document.createElement("div")
            backbg.classList.add("backbg")
            backbg.classList.add("slide")
            backbg.classList.add("fade")
            backbg.classList.add("hide")
            backbg.innerHTML = `${back.less}`
            backbg.dataset.title = idea.front
            backbg.dataset.back = back.more

            slideshow.appendChild(backbg)
        })

        card.appendChild(frontbg)
        card.appendChild(slideshow)

        return card;
    }


    (async function () {
        response = await fetch("/borrador/ideas.json")
        ideas = await response.json()

        // randomIdeas = getRandom(ideas.ideas, 6)

        // ideas.ideas.map(idea => getCard(idea))

        ideas.ideas.forEach(function (idea) {
            cards.appendChild(getCard(idea))
        })
        console.log(ideas.ideas.length.toString())
        // swal("Cantidad Cards", ideas.ideas.length.toString())

        run()
    })()
</script>
