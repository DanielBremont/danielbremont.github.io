---
layout: post
title: Cost of a thread in C++ under Linux
categories: [articles]
tags: [learning]
---

[Cost of a thread in C++ under Linux](https://lemire.me/blog/2020/01/30/cost-of-a-thread-in-c-under-linux/)

Almost all our computers are made of several processing cores. Thus it can be efficient to “parallelize” expensive processing in a multicore manner. That is, instead of using a single core to do all of the work, you divide the work among multiple cores. A standard way to approach this problem is to create threads.