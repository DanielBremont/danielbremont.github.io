---
layout: post
title: The End of Starsky Robotics
categories: [articles]
---

[Ir](https://medium.com/starsky-robotics-blog/the-end-of-starsky-robotics-acb8a6a8a5f5){:target="_blank"}

In 2015, I got obsessed with the idea of driverless trucks and started Starsky Robotics. In 2016, we became the first street-legal vehicle to be paid to do real work without a person behind the wheel. In 2018, we became the first street-legal truck to do a fully unmanned run, albeit on a closed road. In 2019, our truck became the first fully-unmanned truck to drive on a live highway.

And in 2020, we’re shutting down.

I remain incredibly proud of the product, team, and organization we were able to build; one where PhDs and truck drivers worked side by side, where generational challenges were solved by people with more smarts than pedigree, and where we discovered how the future of logistics will work.

Like Shackleton on his expedition to Antarctica, we did things no one else ever has. Similarly, though, it didn’t turn out as planned.

<!--more-->

## So what happened?

Timing, more than anything else, is what I think is to blame for our unfortunate fate. Our approach, I still believe, was the right one but the space was too overwhelmed with the unmet promise of AI to focus on a practical solution. As those breakthroughs failed to appear, the downpour of investor interest became a drizzle. It also didn’t help that last year’s tech IPOs took a lot of energy out of the tech industry, and that trucking has been in a recession for 18 or so months.

## The AV Space

There are too many problems with the AV industry to detail here: the professorial pace at which most teams work, the lack of tangible deployment milestones, the open secret that there isn’t a robotaxi business model, etc. The biggest, however, is that supervised machine learning doesn’t live up to the hype. It isn’t actual artificial intelligence akin to C-3PO, it’s a sophisticated pattern-matching tool.

Back in 2015, everyone thought their kids wouldn’t need to learn how to drive. Supervised machine learning (under the auspices of being “AI”) was advancing so quickly — in just a few years it had gone from mostly recognizing cats to more-or-less driving. It seemed that AI was following a Moore’s Law Curve:

![Moore’s Law Curve](https://miro.medium.com/max/1260/0*bw3DodADYWSVLe7t "Moore’s Law Curve")

Projecting that progress forward, all of humanity would certainly be economically uncompetitive in the near future. We would need basic income to cope, to connect with machines to stand a chance, etc.

Five years later and AV professionals are no longer promising Artificial General Intelligence after the next code commit. Instead, the consensus has become that we’re at least 10 years away from self-driving cars.

It’s widely understood that the hardest part of building AI is how it deals with situations that happen uncommonly, i.e. edge cases. In fact, the better your model, the harder it is to find robust data sets of novel edge cases. Additionally, the better your model, the more accurate the data you need to improve it. Rather than seeing exponential improvements in the quality of AI performance (a la Moore’s Law), we’re instead seeing exponential increases in the cost to improve AI systems — supervised ML seems to follow an S-Curve.

![S-Curve](https://miro.medium.com/max/1150/0*yRZb_FYxN3DXayf4 "S-Curve")

The S-Curve here is why Comma.ai, with 5–15 engineers, sees performance not wholly different than Tesla’s 100+ person autonomy team. Or why at Starsky we were able to become one of three companies to do on-public road unmanned tests (with only 30 engineers).

It isn’t incredibly unprecedented — S-curves are frequent in technological adoption (Moore’s Law is actually made up of a number of S curves as chip technologies continuously replace each other as the best candidate to continue the phenomenon’s overall curvature). The problem is when try to compare the current technology how good humans are at driving. I’d propose that there are possible options: we’ve already surpassed human equivalence (show below as L1), we’re nearly there (L2), or we’re a ways off (L3).

![Supervised ML vs Human Equivalence](https://miro.medium.com/max/1278/0*ODYBhgC4MmPRVTqr "Supervised ML vs Human Equivalence")

If L1 is the line of human equivalence, then leading AV companies merely have to prove safety to be able to deploy. I don’t think I know anyone serious who believes this, but it is a possibility. If L2 is the case, the bigger teams are somewhere from $1–25b away from solving this problem. When big AV investors say that autonomy is an industry just for big companies, this is the bet that they’re making. If, however, L3 is the line of human equivalence it’s unlikely any of the current technology will make that jump. Whenever someone says autonomy is 10 years away that’s almost certainly what their thought is. There aren’t many startups that can survive 10 years without shipping, which means that almost no current autonomous team will ever ship AI decision makers if this is the case.

> There aren’t many startups that can survive 10 years without shipping

## Why We Didn’t Survive

To someone unfamiliar with the dynamics of venture fundraising, all of the above might seem like a great case to invest in Starsky. We didn’t need “true AI” to be a good business (we thought it might only be worth ~$600/truck/yr) so we should have been able to raise despite the above becoming increasingly obvious. Unfortunately, when investors cool on a space, they generally cool on the entire space. We also saw that investors really didn’t like the business model of being the operator, and that our heavy investment into safety didn’t translate for investors.

## Trucking Blues

If teleop solves half the challenge of autonomy, the other half is solved by being the operator. As the trucking company you can choose where you operate — allowing you to pick your battles. Your system only has to be safe on the routes and in the conditions you choose to drive in (on the easiest routes and pulling over and waiting in bad conditions).

The nature of the participants in the trucking industry also reinforces the decision to be an operator. Trucking companies aren’t great technology customers (you should see what they use), and no one knows how to buy safety-critical on-road robots. Even if Starsky perfected general autonomy and perfectly validated safety, it would take years to deploy sufficient systems to make the necessary profits.

While trucking companies don’t know how to buy safety critical robots, they do know how to buy trucking capacity. Every large trucking company does so — their brokerages buy capacity from smaller fleets and owner-operators, many of whom they keep at an arm’s length because they don’t know how much to trust their self-reported safety metrics. At Starsky we found 25+ brokers and trucking companies more than willing to dispatch freight to trucks they already suspected were unmanned. While this is a lower margin business than software’s traditional 90%, we expected to be able to get to a 50% margin in time.

It took me way too long to realize that VCs would rather a $1b business with a 90% margin than a $5b business with a 50% margin, even if capital requirements and growth were the same.

And growth would be the same. The biggest limiter of autonomous deployments isn’t sales, it’s safety.

## No One Really Likes Safety, they like Features

In January of 2019, our Head of Safety, our Head of PR, and I gathered in a conference room for a strategy session. The issue: how could we make safety seem exciting enough to cover. A month earlier we had publicly released our VSSA, a highly technical document that detailed how we decided to approach safety. We had pitched it to a particularly smart reporter, but instead of covering it in detail they mostly wrote about teleoperation. We left the meeting in a fluster — we couldn’t figure out how to make safety engineering sexy enough to garner its own reporting.

And we never really figured out how.

The problem is that people are excited by things that happen rarely, like Starsky’s unmanned public road test. Even when it’s negative, a plane crash gets far more reporting than the 100 people who die each day in automotive accidents. By definition building safety is building the unexceptional; you’re specifically trying to make a system which works without exception.

Safety engineering is the process of highly documenting your product so that you know exactly the conditions under which it will fail and the severity of those failures, and then measuring the frequency of those conditions such that you know how likely it is that your product will hurt people versus how many people you’ve decided are acceptable to hurt.

Doing that is really, really hard. So hard, in fact, that it’s more or less the only thing we did from September of 2017 until our unmanned run in June of 2019. We documented our system, built a safety backup system, and then repeatedly tested our system to failure, fixed those failures, and repeated.

The problem is that all of that work is invisible. Investors expect founders to lie to them — so how are they to believe that the unmanned run we did actually only had a 1 in a million chance of fatality accident? If they don’t know how hard it is to do unmanned, how do they know someone else can’t do it next week?

Our competitors, on the other hand, invested their engineering efforts in building additional AI features. Decision makers which could sometimes decide to change lanes, or could drive on surface streets (assuming they had sufficient map data). Really neat, cutting- edge stuff.

Investors were impressed. It didn’t matter that that jump from “sometimes working” to statistically reliable was 10–1000x more work.

## So, what’s next?

Around November 12 of 2019, our $20m Series B fell apart. We furloughed most of the team on the 15th (probably the worst day of my life), and then started work on selling the company and making sure the team didn’t go without shelter (or visa status, or healthcare for the new and expectant parents).

We were able to land many of the vulnerable jobs by the end of January and I’m in the process of selling the assets of the company (which includes a number of patents essential to operating unmanned vehicles). Like the captain of a sinking ship, I’ve gotten most of the crew on lifeboats and am now noticing the icy waters at my ankles while I start to think about what I do next.

From my vantage point, I think the most likely line of human equivalence is L3 which means that no one should be betting a business on safe AI decision makers. The current companies who are will continue to drain momentum over the next two years, followed by a few years with nearly no investment in the space, and (hopefully) another unmanned highway test for 5 years.

I’d love to be wrong. The aging workforce which will almost certainly start to limit economic growth in the next 5–10 years; the 4000 people who die every year in truck accidents seem a needless sacrifice. If we showed anything at Starsky, it’s that this is buildable if you religiously focus on getting the person out of the vehicle in limited-use cases. But it will need to be someone else to realize that vision.

Signing off,

Stefan.