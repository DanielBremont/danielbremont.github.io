---
layout: post
title: The Emperor's Old Clothes
tags: [conocimiento, paper, saber, cs]
---

<!--Resumen-->

Authors:
    - Antony Richard Hoare

Intro

The tailor is canonized as the patron saint of all consultants, because in spite of the enormous fees that he extracted, he was never able to convince his clients of his dawning realization that their clothes have no Emperor.
Overview/Main Points

Implementation design principles:
 - Security - every syntactically incorrect program should be rejected by the compiler and every syntactically correct program should give a result or an error message that is predictable and comprehensible in terms of the source language program itself.
        violations - interpreted languages (Perl), most programs ever written.

 - Brevity - brevity of the object code produced by the compiler and compactness of of run time working data. Implementations in which the hardware remains much more powerful than necessary lend themselves to simplicity, ruggedness, and reliability.
        violations - Microsoft, MacOS, Netscape 3.0

 - Clean, tight, procedural interfaces - entry and exit conventions for procedures and functions should be as compact and efficient as for tightly coded machine-code subroutines.
        violations - termios/ioctl, CGI, Perl

 - The compiler should use only a single pass.
        I, being completely naiive about compilers, dare to disagree. 

Language features:
    
    - Programming notations must be designed to maximize the number of errors which cannot be made, or if made, can be reliably detected at compile time. The way to shorten programs is to use procedures, not to omit vital declarative information.
        violations - Perl, assembly

    - Programmers are surrounded by complexity. Programs are complex, because of the large number of comflicting objectives for each of our programming projects. If our basic tool, the langauge in which we design and code our programs, is also complicated, the language itself becomes part of the problem rather than part of its solution.
        violations - Perl, HTML, C++
    
    - The programmer should make a number of definite assertions which can be checked individually, and from which the correctness of the whole program easily follows.
        violations - link-layer protocols, TCP backoff algorithms, UNIX process scheduling
    
    - A feature which is omitted can always be added later, when its design and its implications are well understood. A feature which is included before it is fully understood can never be removed later.
        violations - x86, Perl 

System Syndrome:
    - Elliott 503 Mark II software project had failed, ostensibly due to hardware limitations. [They] were fortunate that hardware limitations had protected them from the arbitrary excesses of [their] software designs.
        violations - Win95, Multics, Word vs. Bank Street Writer

    - A lack of clarity in specification is one of the surest signs of a deficiency in the program it describes, and the two faults must be removed simultaneously before the project is embarked upon.
        violations - most committee designs (ANSI, ITU, OSI, MPEG)

    - You shouldn't trust us intelligent programmers. We can think up such good arguments for convincing ourselves and each other of the utterly absurd.
        violations - Java

    - There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies. The price of reliability is the pursuit of the utmost simplicity.
        violations - Multics! 
  
Thanks for reading!