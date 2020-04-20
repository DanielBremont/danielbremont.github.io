---
layout: post
title: Concurrent programming, with examples
categories: [articles]
tags: [cs]
---


[POSIX Threads Programming](https://computing.llnl.gov/tutorials/pthreads/)

In shared memory multiprocessor architectures, threads can be used to implement parallelism. Historically, hardware vendors have implemented their own proprietary versions of threads, making portability a concern for software developers. For UNIX systems, a standardized C language threads programming interface has been specified by the IEEE POSIX 1003.1c standard. Implementations that adhere to this standard are referred to as POSIX threads, or Pthreads.

The tutorial begins with an introduction to concepts, motivations, and design considerations for using Pthreads. Each of the three major classes of routines in the Pthreads API are then covered: Thread Management, Mutex Variables, and Condition Variables. Example codes are used throughout to demonstrate how to use most of the Pthreads routines needed by a new Pthreads programmer. The tutorial concludes with a discussion of LLNL specifics and how to mix MPI with pthreads. A lab exercise, with numerous example codes (C Language) is also included.

Level/Prerequisites: This tutorial is ideal for those who are new to parallel programming with pthreads. A basic understanding of parallel programming in C is required. For those who are unfamiliar with Parallel Programming in general, the material covered in EC3500: Introduction to Parallel Computing would be helpful.

[Concurrent programming, with examples](https://begriffs.com/posts/2020-03-23-concurrent-programming.html)

Mention concurrency and you’re bound to get two kinds of unsolicited advice: first that it’s a nightmarish problem which will melt your brain, and second that there’s a magical programming language or niche paradigm which will make all your problems disappear.

---

[Concurrency with Python](https://bytes.yingw787.com/posts/2019/01/11/concurrency_with_python_why/)

Recently, I found myself needing to generate a great deal of randomized data (e.g. a CSV file with a billion non-trivial records), in order to run load/performance tests to ensure data ingestion through the ETL pipelines I developed ran correctly from static files to the database. Now, our products are quite fast. Very fast, actually; you can create a gigabyte-scale CSV export from a randomly generated table in seconds. So ultimately, data generation wasn't the performance bottleneck for me.

---

[Concurrency with Python: Threads and Locks](https://bytes.yingw787.com/posts/2019/01/12/concurrency_with_python_threads_and_locks/)

Threads and locks are a software-defined formalization of the hardware underneath, and as such comprise the simplest possible concurrency model. It forms the basis of other concurrency abstractions built on top of it, so it's important to understand in this regards. However, it's difficult or impossible to build reliable, scalable systems directly on these primitives.

---

[Concurrency with Python: Functional Programming](https://bytes.yingw787.com/posts/2019/01/19/concurrency_with_python_functional_programming/)

In contrast to the threading/locking concurrency model I described previously, the functional concurrency model abstracts most if not all hardware primitives out of the application picture. No mutable state, and no side effects, can exist in (pure) functional programming – even though the Von Neumann architecture, that all contemporary, commercially useful computer microarchitectures are based on, literally composes finite state machines that remain wholly stateful. This is possible because after compilation, all program instructions and variables are stored in memory, and all functions become CPU branches, regardless of what design paradigms a high-level programming language specifies. In this sense, a functional language and its corresponding toolchain act as a declarative shim for the imperative reality.

---

[Concurrency with Python: Separating Identity From State](https://bytes.yingw787.com/posts/2019/01/26/concurrency_with_python_identity_and_state/)

In “Seven Concurrency Models in Seven Weeks”, Paul Butcher forks off the previous chapter's focus on functional programming to discuss the benefits of Clojure, a Lisp implemented on the JVM, in detail. In doing so, he bases an entire concurrency model on a key design aspect of Clojure: the ability for Clojure's types to separate identity from state.

---

[Concurrency with Python: Actor Models](https://bytes.yingw787.com/posts/2019/02/02/concurrency_with_python_actor_models/)

Actors are containers of state communicating with each other via message passing. Based on a received message, actors can choose to:

- Send messages to other actors
- Create new actors
- Alter how it treats new messages it receives

---

[Concurrency with Python: CSP and Coroutines](https://bytes.yingw787.com/posts/2019/02/09/concurrency_with_python_csp_and_coroutines/)

The concept of communicating sequential processes, or CSP, is similar to the notion of actor models, but brings added utility to contemporary concurrency challenges. Both of these concurrency models leverage message passing, but whereas actors pass messages between containers of state, the CSP model passes messages between channels, a form of synchronization and communication between coroutines or coroutine-like processes.

[Concurrency with Python: Hardware-Based Parallelism](https://bytes.yingw787.com/posts/2019/02/16/concurrency_with_python_hardware_based_parallelism/)

If there is one concurrency model that makes Python one of the dominant programming languages of today, it's hardware-based parallelism. Python's C/C++ API, backed by an extensive integration tutorial, transforms Python from a general-purpose scripting language into a data orchestration language. This, combined with the superlinearly increasing value prop differentiation between companies that sanctify data and those that do not, make Python and its ecosystem very much worth investing in.

---

[Concurrency with Python: Data-Intensive Architectures](https://bytes.yingw787.com/posts/2019/02/23/concurrency_with_python_data_intensive_architectures/)

The field of data-intensive computing introduces systems design around datasets much larger than a single machine's disk or memory, and hence must be persisted and processed across multiple machines. Ensuring data-intensive tasks are correct, performant, and efficient, among other criteria, are key priorities of designing scalable systems. Implementing those goals involves leveraging the concurrency primitives made available to the developer by the language(s) used.


---

[Concurrency with Python: Conclusion](https://bytes.yingw787.com/posts/2019/02/24/concurrency_with_python_conclusion/)
Original estimates averaged about half a week from research to publication per blog post. In actuality it's taken about two to three full weeks per blog post, and 2-4 hours a day at that. I've learned a lot, but I'm also ready to try something else to give back to the software community and improve my own professional career. Feel free to email me if you have any advice/tips.




