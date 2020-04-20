---
layout: post
title: PyPy's Approach to Virtual Machine Construction
categories: [papers]
tags: [conocimiento, paper, saber, hacer, cs]
---

<!--Resumen-->

Authors:
    - Armin Rigo
    - Samuele Pedroni
    

---
<!--more-->

Abstract

The PyPy project seeks to prove both on a research and a practical level the feasibility of constructing a virtual machine (VM)
for a dynamic language in a dynamic language - in this case, Python.  The aim is to translate (i.e compile) the VM to arbitrary target environmnets, tanging in the level from C/Posix to Smaltlak/Squeak via Java and CLI/.NET, while still being of reasonable efficiency within these environments.

A key pool to archieve this goal is te systematic reuse of Python language as a system programming language at various levels of our architecture and translation process. for each level,  we design a corresponding type system and apply a generic type inference engine - for example, the garbage collector is written in a style that manipulates simulated pointer and address objects, and when translated to C these operations become C-level pointer and address instructions.

Resume

...

Conclusion

...
  
Thanks for reading!