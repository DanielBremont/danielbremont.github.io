---
layout: post
title: How Google Code Search Worked
tags: [article, cs]
---

[How Google Code Search Worked](https://swtch.com/~rsc/regexp/regexp4.html)

In the summer of 2006, I was lucky enough to be an intern at Google. At the time, Google had an internal tool called gsearch that acted as if it ran grep over all the files in the Google source tree and printed the results. Of course, that implementation would be fairly slow, so what gsearch actually did was talk to a bunch of servers that kept different pieces of the source tree in memory: each machine did a grep through its memory and then gsearch merged the results and printed them. Jeff Dean, my intern host and one of the authors of gsearch, suggested that it would be cool to build a web interface that, in effect, let you run gsearch over the world's public source code. I thought that sounded fun, so that's what I did that summer. Due primarily to an excess of optimism in our original schedule, the launch slipped to October, but on October 5, 2006 we did launch (by then I was back at school but still a part-time intern).

<!--more-->

