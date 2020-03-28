---
layout: post
title: MapReduce Simplified Data Processing on Large Clusters
tags: [conocimiento, paper, saber, hacer, cs]
---

<!--Resumen-->

Authors:
    - Jeffrey Dean
    - Sanjay Chemawat

---
<!--more-->

Abstract

MapReduce is a programming model and an associated implementation for processing and generating large data sets.
Users specify a map function that processes a key/value pair, and a reduce function that merges all intermediate values associated with the same intermediate key. Many real world tasks are expressible in this model, as shown in the paper.

Programs written in this functional style are automatically parallelized and executed on a large clusters of comodity machines.
The run-time system takes care of the details of partitioning the input data, scheduling the program's execution across a set of machines, handling machine failures, and managing the required inter-machine communication. This allows programmers without any experience with parallel and distributed systems to easily utilize the rosources of a large distributed system.

Introduction

...

Resume

...

Conclusion

...
  
Thanks for reading!