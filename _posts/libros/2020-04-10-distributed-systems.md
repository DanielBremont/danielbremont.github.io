---
layout: post
title: Distributed systems
categories: [libros]
tags: [libro, digital]
---

# Preface

Iwanted a text that would bring together the ideas behind many of the more recent
distributed systems - systems such as Amazon's Dynamo, Google's BigTable and
MapReduce, Apache's Hadoop and so on.

In my view, much of distributed programming is about dealing with the implications of
two consequences of distribution:

- that information travels at the speed of light
- that independent things fail independently*

In other words, that the core of distributed programming is dealing with distance (duh!)
and having more than one thing (duh!). These constraints define a space of possible
system designs, and my hope is that after reading this you'll have a better sense of how
distance, time and consistency models interact.

This text is focused on distributed programming and systems concepts you'll need to
understand commercial systems in the data center. It would be madness to attempt to
cover everything. You'll learn many key protocols and algorithms (covering, for example,
many of the most cited papers in the discipline), including some new exciting ways to
look at eventual consistency that haven't still made it into college textbooks - such as
CRDTs and the CALM theorem.

I hope you like it! If you want to say thanks, follow me on [Github](https://github.com/mixu/) (or [Twitter(https://twitter.com/mikitotakada)]). And if you
spot an error, file a pull request on [Github](https://github.com/mixu/distsysbook/issues).

<!--more-->

# Topics 

- Basics
- Up and down the level of abstraction
- Time and order
- Replication: preventing divergence
- Replication: accepting divergence
- Appendix

Thanks for reading!