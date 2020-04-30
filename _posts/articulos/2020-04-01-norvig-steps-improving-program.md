---
layout: post
title: Peter Norvig's 9 Master Steps To Improving A Program
categories: [articles]
tags: []
---

[Ir](http://highscalability.com/blog/2014/2/25/peter-norvigs-9-master-steps-to-improving-a-program.html){:target="_blank"}

<!--more-->

## Steps

- **Profiling:** Figure out where the program spends its time.
- **Speedup:** Make the program faster.
- **Benchmarking:** Run the program over pairs of arbitrary lists to see how fast it is and how short the solutions are.
- **Studying:** Learn something by looking at the benchmark results.
- **Searching:** Introduce a better search algorithm.
- **Eliminating Components:** Get rid of components that can't possibly be part of an optimal solution.
- **Adding Components:** Add new types of components to allow new, shorter solutions.
- **Randomizing Search:** Randomness allows us to explore different parts of the search space.
- **Speculating:** Think about what we could do next.


## Code

- [Regex Golf Peter Norvig](https://nbviewer.jupyter.org/url/norvig.com/ipython/xkcd1313.ipynb?create=1)