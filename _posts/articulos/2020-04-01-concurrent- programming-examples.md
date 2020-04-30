---
layout: post
title: Concurrent programming, with examples
categories: [articles]
tags: [cs]
---

Mention concurrency and you’re bound to get two kinds of unsolicited advice: first that it’s a nightmarish problem which will melt your brain, and second that there’s a magical programming language or niche paradigm which will make all your problems disappear.

We won’t run to either extreme here. Instead we’ll cover the production workhorses for concurrent software – threading and locking – and learn about them through a series of interesting programs. By the end of this article you’ll know the terminology and patterns used by POSIX threads (pthreads).

This is an introduction rather than a reference. Plenty of reference material exists for pthreads – whole books in fact. I won’t dwell on all the options of the API, but will briskly give you the big picture. None of the examples contain error handling because it would merely clutter them.

<!--more-->

# Concurrency vs parallelism

First it’s important to distinguish concurrency vs parallelism. Concurrency is the ability of parts of a program to work correctly when executed out of order. For instance, imagine tasks A and B. One way to execute them is sequentially, meaning doing all steps for A, then all for B:

<svg width="250" height="50" style="display: block; margin: 0 auto;">
<rect width="120" height="50" style="fill:rgb(0,0,127);stroke-width:1;stroke:rgb(0,0,0)"></rect> <text x="55" y="30" fill="white">A</text> <rect x="130" width="120" height="50" style="fill:rgb(127,0,0);stroke-width:1;stroke:rgb(0,0,0)"></rect> <text x="185" y="30" fill="white">B</text>
</svg>

Concurrent execution, on the other hand, alternates doing a little of each task until both are all complete:

<svg width="250" height="50" style="display: block; margin: 0 auto;">
<rect width="40" height="50" style="fill:rgb(0,0,127);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="50" width="10" height="50" style="fill:rgb(127,0,0);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="70" width="10" height="50" style="fill:rgb(0,0,127);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="90" width="20" height="50" style="fill:rgb(127,0,0);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="120" width="10" height="50" style="fill:rgb(0,0,127);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="140" width="30" height="50" style="fill:rgb(127,0,0);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="180" width="20" height="50" style="fill:rgb(0,0,127);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="210" width="10" height="50" style="fill:rgb(127,0,0);stroke-width:1;stroke:rgb(0,0,0)"></rect> <rect x="230" width="20" height="50" style="fill:rgb(0,0,127);stroke-width:1;stroke:rgb(0,0,0)"></rect>
</svg>

Concurrency allows a program to make progress even when certain parts are blocked. For instance, when one task is waiting for user input, the system can switch to another task and do calculations.

When tasks don’t just interleave, but run at the same time, that’s called parallelism. Multiple CPU cores can run instructions simultaneously:

<svg width="120" height="110" style="display: block; margin: 0 auto;">
<rect width="120" height="50" style="fill:rgb(0,0,127);stroke-width:1;stroke:rgb(0,0,0)"></rect> <text x="55" y="30" fill="white">A</text> <rect y="55" width="120" height="50" style="fill:rgb(127,0,0);stroke-width:1;stroke:rgb(0,0,0)"></rect> <text x="55" y="85" fill="white">B</text>
</svg>

When a program – even without hardware parallelism – switches rapidly enough from one task to another, it can feel to the user that tasks are executing at the same time. You could say it provides the “illusion of parallelism.” However, true parallelism has the potential for greater processor throughput for problems that can be broken into independent subtasks. Some ways of dealing with concurrency, such as multi-threaded programming, can exploit hardware parallelism automatically when available.

Some languages (or more accurately, some language implementations) are unable to achieve true multi-threaded parallelism. Ruby MRI and CPython for instance use a global interpreter lock (GIL) to simplify their implementation. The GIL prevents more than one thread from running at once. Programs in these interpreters can benefit from I/O concurrency, but not extra computational power.


# Our first concurrent program

Languages and libraries offer different ways to add concurrency to a program. UNIX for instance has a bunch of disjointed mechanisms like signals, asynchronous I/O (AIO), select, poll, and setjmp/longjmp. Using these mechanisms can complicate program structure and make programs harder to read than sequential code.

Threads offer a cleaner and more consistent way to address these motivations. For I/O they’re usually clearer than polling or callbacks, and for processing they are more efficient than Unix processes.


##  Crazy bankers

Let’s get started by adding concurrency to a program to simulate a bunch of crazy bankers sending random amounts of money from one bank account to another. The bankers don’t communicate with one another, so this is a demonstration of concurrency without synchronization.

Adding concurrency is the easy part. The real work is in making threads wait for one another to ensure a correct result. We’ll see a number of mechanisms and patterns for synchronization later, but for now let’s see what goes wrong without synchronization.


```c

/* banker.c */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>

#define N_ACCOUNTS 10
#define N_THREADS  20
#define N_ROUNDS   10000

/* 10 accounts with $100 apiece means there's $1,000
   in the system. Let's hope it stays that way...  */
#define INIT_BALANCE 100

/* making a struct here for the benefit of future
   versions of this program */
struct account
{
	long balance;
} accts[N_ACCOUNTS];

/* Helper for bankers to choose an account and amount at
   random. It came from Steve Summit's excellent C FAQ
   http://c-faq.com/lib/randrange.html */
int rand_range(int N)
{
	return (int)((double)rand() / ((double)RAND_MAX + 1) * N);
}

/* each banker will run this function concurrently. The
   weird signature is required for a thread function */
void *disburse(void *arg)
{
	size_t i, from, to;
	long payment;

	/* idiom to tell compiler arg is unused */
	(void)arg;

	for (i = 0; i < N_ROUNDS; i++)
	{
		/* pick distinct 'from' and 'to' accounts */
		from = rand_range(N_ACCOUNTS);
		do {
			to = rand_range(N_ACCOUNTS);
		} while (to == from);

		/* go nuts sending money, try not to overdraft */
		if (accts[from].balance > 0)
		{
			payment = 1 + rand_range(accts[from].balance);
			accts[from].balance -= payment;
			accts[to].balance   += payment;
		}
	}
	return NULL;
}

int main(void)
{
	size_t i;
	long total;
	pthread_t ts[N_THREADS];

	srand(time(NULL));

	for (i = 0; i < N_ACCOUNTS; i++)
		accts[i].balance = INIT_BALANCE;

	printf("Initial money in system: %d\n",
		N_ACCOUNTS * INIT_BALANCE);

	/* start the threads, using whatever parallelism the
	   system happens to offer. Note that pthread_create
	   is the *only* function that creates concurrency */
	for (i = 0; i < N_THREADS; i++)
		pthread_create(&ts[i], NULL, disburse, NULL);

	/* wait for the threads to all finish, using the
	   pthread_t handles pthread_create gave us */
	for (i = 0; i < N_THREADS; i++)
		pthread_join(ts[i], NULL);

	for (total = 0, i = 0; i < N_ACCOUNTS; i++)
		total += accts[i].balance;

	printf("Final money in system: %ld\n", total);
}

```

The following simple Makefile can be used to compile all the programs in this article:

```makefile
.POSIX:
CFLAGS = -std=c99 -pedantic -D_POSIX_C_SOURCE=200809L -Wall -Wextra
LDFLAGS = -lpthread
```

Make’s default [suffix rules](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/make.html#tag_20_76_13_09) mean that if you have foo.c you can simply run make foo and it knows what to do without your needing to add any extra rules to the Makefile.

**Note: building with gcc**

Most compilers work correctly with *-lpthread* but GCC is unusual and requires *-pthreads*. For portability we could attempt to use the POSIX *c99* compiler interface. In fact the latest standard provides configuration variables containing the proper pthreads compiler options for whatever platform compiler underlies this interface:

- POSIX_V7_THREADS_CFLAGS
- POSIX_V7_THREADS_LDFLAGS

Makefiles would use *getconf* to retrieve these values and add them to CFLAGS and LDFLAGS. However the feature is too new to be supported by most systems. You’ll have to modify the Makefile manually for now if you’re in nonstandard GNU land.

#  Data races

Try compiling and running *banker.c*. Notice anything strange?

Threads share memory directly. Each thread can read and write variables in shared memory without any overhead. However when threads simultaneously read and write the same data it’s called a **data race** and generally causes problems.

In particular, threads in *banker.c* have data races when they read and write account balances. The bankers program moves money between accounts, however the total amount of money in the system does not remain constant. The books don’t balance. Exactly how the program behaves depends on thread scheduling policies of the operating system. On OpenBSD the total money seldom stays at $1,000. Sometimes money gets duplicated, sometimes it vanishes. On macOS the result is generally that all the money disappears, or even becomes negative!

The property that money is neither created nor destroyed in a bank is an example of a **program invariant**, and it gets violated by data races. Note that parallelism is not required for a race, only concurrency.

Here’s the problematic code in the *disburse()* function:

```c
payment = 1 + rand_range(accts[from].balance);
accts[from].balance -= payment;
accts[to].balance   += payment;
```

The threads running this code can be paused or interleaved at any time. Not just between any of the statements, but partway through arithmetic operations which may not execute atomically on the hardware. Never rely on “thread inertia,” which is the mistaken feeling that the thread will finish a group of statements without interference.

Let’s examine exactly how statements can interleave between banker threads, and the resulting problems. The columns of the table below are threads, and the rows are moments in time.

Here’s a timeline where two threads read the same account balance when planning how much money to transfer. It can cause an overdraft.

<table class="table" style="border: 1px solid #ccc; background: #eee;">
    <caption> Overdrafting </caption>
    <thead>
        <tr>
            <th> Thread A </th>
            <th> Thread B </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> payment = 1 + rand_range(accts[from].balance); </td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                payment = 1 + rand_range(accts[from].balance);
            </td>
        </tr>
        <tr>
            <td colspan="2">
                At this point, thread B’s payment-to-be may be in excess of the true balance because thread A has already earmarked some of the money unbeknownst to B.
            </td>
        </tr>
        <tr>
            <td>
                accts[from].balance -= payment;
            </td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                accts[from].balance -= payment;
            </td>
        </tr>
        <tr>
            <td colspan="2">
                Some of the same dollars could be transferred twice and the originating account could even go negative if the overlap of the payments is big enough.
            </td>
        </tr>
    </tbody>
</table>

Here’s a timeline where the debit made by one thread can be undone by that made by another.

Lost debit

<table class="table" style="border: 1px solid #ccc; background: #eee;">
    <caption>
        Overdrafting
    </caption>
    <thead>
        <tr>
            <th>
                Thread A
            </th>
            <th>
                Thread B
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                payment = 1 + rand_range(accts[from].balance);
            </td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                payment = 1 + rand_range(accts[from].balance);
            </td>
        </tr>
        <tr>
            <td colspan="2">
                At this point, thread B’s payment-to-be may be in excess of the true balance because thread A has already earmarked some of the money unbeknownst to B.
            </td>
        </tr>
        <tr>
            <td>
                accts[from].balance -= payment;
            </td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td>
                accts[from].balance -= payment;
            </td>
        </tr>
        <tr>
            <td colspan="2">
                Some of the same dollars could be transferred twice and the originating account could even go negative if the overlap of the payments is big enough.
            </td>
        </tr>
    </tbody>
</table>

Similar problems can occur when bankers have a data race in destination accounts. Races in the destination account would tend to decrease total money supply. (To learn more about concurrency problems, see my article [Practical Guide to SQL Transaction Isolation](https://begriffs.com/posts/2017-08-01-practical-guide-sql-isolation.html)).

# Locks and deadlock

In the example above, we found that a certain section of code was vulnerable to data races. Such tricky parts of a program are called **critical sections**. We must ensure each thread gets all the way through the section before another thread is allowed to enter it.

To give threads mutually exclusive access to a critical section, pthreads provides the mutually exclusive lock (**mutex** for short). The pattern is:

```c

pthread_mutex_lock(&some_mutex);

/* ... do things in the critical section ... */

pthread_mutex_unlock(&some_mutex);

```

Any thread calling *pthread_mutex_lock* on a previously locked mutex will go to sleep and not be scheduled until the mutex is unlocked (and any other threads already waiting on the mutex have gone first).

Another way to look at mutexes is that their job is to preserve program invariants. The critical section between locking and unlocking is a place where a certain invariant may be temporarily broken, as long as it is restored by the end. Some people recommend adding an *assert()* statement before unlocking, to help document the invariant. If an invariant is difficult to specify in an assertion, a comment can be useful instead.

A function is called **thread-safe** if multiple invocations can safely run concurrently. A cheap, but inefficient, way to make any function thread-safe is to give it its own mutex and lock it right away:

```c
/* inefficient but effective way to protect a function */

pthread_mutex_t foo_mtx = PTHREAD_MUTEX_INITIALIZER;

void foo(/* some arguments */)
{
	pthread_mutex_lock(&foo_mtx);

	/* we're safe in here, but it's a bottleneck */

	pthread_mutex_unlock(&foo_mtx);
}

```

To see why this is inefficient, imagine if *foo()* was designed to output characters to a file specified in its arguments. Because the function takes a global lock, no two threads could run it at once, even if they wanted to write to different files. Writing to different files should be independent activities, and what we really want to protect against are two threads concurrently writing the same file.

The amount of data that a mutex protects is called its **granularity**, and smaller granularity can often be more efficient. In our *foo()* example, we could store a mutex for every file we write, and have the function choose and lock the appropriate mutex. Multi-threaded programs typically add a mutex as a member variable to data structures, to associate the lock with its data.

Let’s update the banker program to keep a mutex in each account and prevent data races.

```c

/* banker_lock.c */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>

#define N_ACCOUNTS 10
#define N_THREADS  100
#define N_ROUNDS   10000

struct account
{
	long balance;
	/* add a mutex to prevent races on balance */
	pthread_mutex_t mtx;
} accts[N_ACCOUNTS];

int rand_range(int N)
{
	return (int)((double)rand() / ((double)RAND_MAX + 1) * N);
}

void *disburse(void *arg)
{
	size_t i, from, to;
	long payment;

	(void)arg;

	for (i = 0; i < N_ROUNDS; i++)
	{
		from = rand_range(N_ACCOUNTS);
		do {
			to = rand_range(N_ACCOUNTS);
		} while (to == from);

		/* get an exclusive lock on both balances before
		   updating (there's a problem with this, see below) */
		pthread_mutex_lock(&accts[from].mtx);
		pthread_mutex_lock(&accts[to].mtx);
		if (accts[from].balance > 0)
		{
			payment = 1 + rand_range(accts[from].balance);
			accts[from].balance -= payment;
			accts[to].balance   += payment;
		}
		pthread_mutex_unlock(&accts[to].mtx);
		pthread_mutex_unlock(&accts[from].mtx);
	}
	return NULL;
}

int main(void)
{
	size_t i;
	long total;
	pthread_t ts[N_THREADS];

	srand(time(NULL));

	/* set the initial balance, but also create a
	   new mutex for each account */
	for (i = 0; i < N_ACCOUNTS; i++)
		accts[i] = (struct account)
			{100, PTHREAD_MUTEX_INITIALIZER};

	for (i = 0; i < N_THREADS; i++)
		pthread_create(&ts[i], NULL, disburse, NULL);

	puts("(This program will probably deadlock, "
	     "and need to be manually terminated...)");

	for (i = 0; i < N_THREADS; i++)
		pthread_join(ts[i], NULL);

	for (total = 0, i = 0; i < N_ACCOUNTS; i++)
		total += accts[i].balance;

	printf("Total money in system: %ld\n", total);
}

```

Now everything should be safe. No money being created or destroyed, just perfect exchanges between the accounts. The invariant is that the total balance of the source and destination accounts is the same before we transfer the money as after. It’s broken only inside the critical section.

As a side note, at this point you might think it would be more efficient be to take a single lock at a time, like this:

-  lock the source account
- withdraw money into a thread local variable
- unlock the source account
- (danger zone!)
- lock the destination account
- deposit the money
- unlock the destination account

This would not be safe. During the time between unlocking the source account and locking the destination, the invariant does not hold, yet another thread could observe this state. For instance a report running in another thread just at that time could read the balance of both accounts and observe money missing from the system.

We do need to lock both accounts during the transfer. However the way we’re doing it causes a different problem. Try to run the program. It gets stuck forever and never prints the final balance! Its threads are **deadlocked**.

Deadlock is the second villain of concurrent programming, and happens when threads wait on each others’ locks, but no thread unlocks for any other. The case of the bankers is a classic simple form called the **deadly embrace**. Here’s how it plays out:

Deadly embrace

<table class="table" style="border: 1px solid #ccc; background: #eee;">
    <caption>
        Deadly embrace
    </caption>
    <thead>
        <tr>
            <th>
                Thread A
            </th>
            <th>
                Thread B
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                lock account 1
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                lock account 2
            </td>
        </tr>
        <tr>
            <td>
                lock account 2
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                At this point thread A is blocked because thread B already holds a lock on account 2.
            </td>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                lock account 1
            </td>
        </tr>
        <tr>
            <td colspan="2">
                Now thread B is blocked because thread A holds a lock on account 1. However thread A will never unlock account 1 because thread A is blocked!
            </td>
        </tr>
    </tbody>
</table>

The problem happens because threads lock resources in different orders, and because they refuse to give locks up. We can solve the problem by addressing either of these causes.

The first approach to preventing deadlock is to enforce a **locking hierarchy**. This means the programmer comes up with an arbitrary order for locks, and always takes “earlier” locks before “later” ones. The terminology comes from locks in hierarchical data structures like trees, but it really amounts to using any kind of consistent locking order.

In our case of the banker program we store all the accounts in an array, so we can use the array index as the lock order. Let’s compare.

```c

/* the original way to lock mutexes, which caused deadlock */

pthread_mutex_lock(&accts[from].mtx);
pthread_mutex_lock(&accts[to].mtx);
/* move money */
pthread_mutex_unlock(&accts[to].mtx);
pthread_mutex_unlock(&accts[from].mtx);

```

Here’s a safe way, enforcing a locking hierarchy:

```c
/* lock mutexes in earlier accounts first */

#define MIN(a,b) ((a) < (b) ? (a) : (b))
#define MAX(a,b) ((a) < (b) ? (b) : (a))

pthread_mutex_lock(&accts[MIN(from, to)].mtx);
pthread_mutex_lock(&accts[MAX(from, to)].mtx);
/* move money */
pthread_mutex_unlock(&accts[MAX(from, to)].mtx);
pthread_mutex_unlock(&accts[MIN(from, to)].mtx);

/* notice we unlock in opposite order */
```

A locking hierarchy is the most efficient way to prevent deadlock, but it isn’t always easy to contrive. It’s also creates a potentially undocumented coupling between different parts of a program which need to collaborate in the convention.

**Backoff** is a different way to prevent deadlock which works for locks taken in any order. It takes a lock, but then checks whether the next is obtainable. If not, it unlocks the first to allow another thread to make progress, and tries again.

```c
/* using pthread_mutex_trylock to dodge deadlock */

while (1)
{
	pthread_mutex_lock(&accts[from].mtx);
	
	if (pthread_mutex_trylock(&accts[to].mtx) == 0)
		break; /* got both locks */

	/* didn't get the second one, so unlock the first */
	pthread_mutex_unlock(&accts[from].mtx);
	/* force a sleep so another thread can try --
	   include <sched.h> for this function */
	sched_yield();
}
/* move money */
pthread_mutex_unlock(&accts[to].mtx);
pthread_mutex_unlock(&accts[from].mtx);

```

One tricky part is the call to ```sched_yield()```. Without it the loop will immediately try to grab the lock again, competing as hard as it can with other threads who could make more productive use of the lock. This causes **livelock**, where threads fight for access to the locks. The ```sched_yield()``` puts the calling thread to sleep and at the back of the scheduler’s run queue.

Despite its flexibility, backoff is definitely less efficient than a locking hierarchy because it can make wasted calls to lock and unlock mutexes. Try modifying the banker program with these approaches and measure how fast they run.


# Condition variables

After safely getting access to a shared variable with a mutex, a thread may discover that the value of the variable is not yet suitable for the thread to act upon. For instance, if the thread was looking for an item to process in a shared queue, but found the queue was empty. The thread could poll the value, but this is inefficient. Pthreads provides **condition variables** to allow threads to wait for events of interest or notify other threads when these events happen.

Condition variables are not themselves locks, nor do they hold any value of their own. They are merely events with a programmer-assigned meaning. For example, a structure representing a queue could have a mutex for safely accessing the data, plus some condition variables. One to represent the event of the queue becoming empty, and another to announce when a new item is added.

Before getting deeper into how condition variables work, let’s see one in action with our banker program. We’ll measure contention between the bankers. First we’ll increase the number of threads and accounts, and keep statistics about how many bankers manage to get inside the disburse() critical section at once. Any time the max score is broken, we’ll signal a condition variable. A dedicated thread will wait on it and update a scoreboard.

```c
/* banker_stats.c */

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>

/* increase the accounts and threads, but make sure there are
 * "too many" threads so they tend to block each other */
#define N_ACCOUNTS 50
#define N_THREADS  100
#define N_ROUNDS   10000

#define MIN(a,b) ((a) < (b) ? (a) : (b))
#define MAX(a,b) ((a) < (b) ? (b) : (a))

struct account
{
	long balance;
	pthread_mutex_t mtx;
} accts[N_ACCOUNTS];

int rand_range(int N)
{
	return (int)((double)rand() / ((double)RAND_MAX + 1) * N);
}

/* keep a special mutex and condition variable
 * reserved for just the stats */
pthread_mutex_t stats_mtx = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t  stats_cnd = PTHREAD_COND_INITIALIZER;
int stats_curr = 0, stats_best = 0;

/* use this interface to modify the stats */
void stats_change(int delta)
{
	pthread_mutex_lock(&stats_mtx);
	stats_curr += delta;
	if (stats_curr > stats_best)
	{
		stats_best = stats_curr;
		/* signal new high score */
		pthread_cond_broadcast(&stats_cnd);
	}
	pthread_mutex_unlock(&stats_mtx);
}

/* a dedicated thread to update the scoreboard UI */
void *stats_print(void *arg)
{
	int prev_best;

	(void)arg;

	/* we never return, nobody needs to
	 * pthread_join() with us */
	pthread_detach(pthread_self());

	while (1)
	{
		pthread_mutex_lock(&stats_mtx);

		prev_best = stats_best;
		/* go to sleep until stats change, and always
		 * check that they actually have changed */
		while (prev_best == stats_best)
			pthread_cond_wait(
				&stats_cnd, &stats_mtx);

		/* overwrite current line with new score */
		printf("\r%2d", stats_best);
		pthread_mutex_unlock(&stats_mtx);

		fflush(stdout);
	}
}

void *disburse(void *arg)
{
	size_t i, from, to;
	long payment;

	(void)arg;

	for (i = 0; i < N_ROUNDS; i++)
	{
		from = rand_range(N_ACCOUNTS);
		do {
			to = rand_range(N_ACCOUNTS);
		} while (to == from);

		pthread_mutex_lock(&accts[MIN(from, to)].mtx);
		pthread_mutex_lock(&accts[MAX(from, to)].mtx);

		/* notice we still have a lock hierarchy, because
		 * we call stats_change() after locking all account
		 * mutexes (stats_mtx comes last) */
		stats_change(1); /* another banker in crit sec */
		if (accts[from].balance > 0)
		{
			payment = 1 + rand_range(accts[from].balance);
			accts[from].balance -= payment;
			accts[to].balance   += payment;
		}
		stats_change(-1); /* leaving crit sec */

		pthread_mutex_unlock(&accts[MAX(from, to)].mtx);
		pthread_mutex_unlock(&accts[MIN(from, to)].mtx);
	}
	return NULL;
}

int main(void)
{
	size_t i;
	long total;
	pthread_t ts[N_THREADS], stats;

	srand(time(NULL));

	for (i = 0; i < N_ACCOUNTS; i++)
		accts[i] = (struct account)
			{100, PTHREAD_MUTEX_INITIALIZER};

	for (i = 0; i < N_THREADS; i++)
		pthread_create(&ts[i], NULL, disburse, NULL);

	/* start thread to update the user on how many bankers
	 * are in the disburse() critical section at once */
	pthread_create(&stats, NULL, stats_print, NULL);

	for (i = 0; i < N_THREADS; i++)
		pthread_join(ts[i], NULL);

	/* not joining with the thread running stats_print,
	 * we'll let it disappar when main exits */

	for (total = 0, i = 0; i < N_ACCOUNTS; i++)
		total += accts[i].balance;

	printf("\nTotal money in system: %ld\n", total);
}
```

With fifty accounts and a hundred threads, not all threads will be able to be in the critical section of ```disburse()``` at once. It varies between runs. Run the program and see how well it does on your machine. (One complication is that making all threads synchronize on ```stats_mtx``` may throw off the measurement, because there are threads who could have executed independently but now must interact.)

Let’s look at how to properly use condition variables. We notified threads of a new event with ```pthread_cond_broadcast(&stats_cnd)```. This function marks all threads waiting on ```state_cnd``` as ready to run.

Sometimes multiple threads are waiting on a single cond var. A broadcast will wake them all, but sometimes the event source knows that only one thread will be able to do any work. For instance if only one item is added to a shared queue. In that case the ```pthread_cond_signal``` function is better than ```pthread_cond_broadcast```. Unnecessarily waking multiple threads causes overhead. In our case we know that only one thread is waiting on the cond var, so it really makes no difference.

Remember that it’s never wrong to use a broadcast, whereas in some cases it might be wrong to use a signal. Signal is just an optimized broadcast.

The waiting side of a cond var ought always to have this pattern:

```c
pthread_mutex_lock(&mutex);
while (!PREDICATE)
	pthread_cond_wait(&cond_var, &mutex);
pthread_mutex_unlock(&mutex);
```

Condition variables are always associated with a predicate, and the association is implicit in the programmer’s head. You shouldn’t reuse a condition variable for multiple predicates. The intention is that code will signal the cond var when the predicate becomes true.

Before testing the predicate we lock a mutex that covers the data being tested. That way no other thread can change the data immediately after we test it (also pthread_cond_wait() requires a locked mutex). If the predicate is already true we needn’t wait on the cond var, so the loop falls through, otherwise the thread begins to wait.

Condition variables allow you to make this series of events atomic: unlock a mutex, register our interest in the event, and block. Without that atomicity another thread might awaken to take our lock and broadcast before we’ve registered ourselves as interested. Without the atomicity we could be blocked forever.

When pthread_cond_wait() returns, the calling thread awakens and atomically gets its mutex back. It’s all set to check the predicate again in the loop. But why check the predicate? Wasn’t the cond var signaled because the predicate was true, and isn’t the relevant data protected by a mutex? There are three reasons to check:

- If the condition variable had been broadcast, other threads might have been listening, and another might have been scheduled first and might have done our job. The loop tests for that interception.


- On some multiprocessor systems, making condition variable wakeup completely predictable might substantially slow down all cond var operations. Such systems allow **spurious wakeups**, and threads need to be prepared to check if they were woken appropriately.

- It can be convenient to signal on a loose predicate. Threads can signal the variables when the event seems `likely`, or even mistakenly signal, and the program will still work. For instance, we signal when when `stats_best` gets a new high score, but we could have chosen to signal at every invocation of `stats_change()`.

Given that we have to pass a locked mutex to `pthread_cond_wait()`, which we had to create, why don’t cond vars come with their own built-in mutex? The reason is flexibility. Although you should use only one mutex with a cond var, there can be multiple cond vars for the same mutex. Think of the example of the mutex protecting a queue, and the different events that can happen in the queue.

# Other synchronization primitives

## Barriers

It’s time to bid farewell to the banker programs, and turn to something more lively: Conway’s Game of Life! The game has a set of rules operating on a grid of cells that determines which cells live or die based on how many living neighbors each has.

The game can take advantage of multiple processors, using each processor to operate on a different part of the grid in parallel. It’s a so-called **embarrassingly parallel** problem because each section of the grid can be processed in isolation, without needing results from other sections.

Barriers ensure that all threads have reached a particular stage in a parallel computation before allowing any to proceed to the next stage. Each thread calls `pthread_barrier_wait()` to rendezvous with the others. One of the threads, chosen randomly, will see the `PTHREAD_BARRIER_SERIAL_THREAD` return value, which nominates that thread to do any cleanup or preparation between stages.

```c
/* life.c */

#include <assert.h>
#include <pthread.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

/* mandatory in POSIX.1-2008, but check laggards like macOS */
#include <unistd.h>
#if !defined(_POSIX_BARRIERS) || _POSIX_BARRIERS < 0
#error your OS lacks POSIX barrier support
#endif

/* dimensions of board */
#define ROWS 32
#define COLS 78
/* how long to pause between rounds */
#define FRAME_MS 100
#define THREADS 4

/* proper modulus (in C, '%' is merely remainder) */
#define MOD(x,N) (((x) < 0) ? ((x) % (N) + (N)) : ((x) % (N)))

bool alive[ROWS][COLS], alive_next[ROWS][COLS];
pthread_barrier_t tick;

/* Should a cell live or die? Using ssize_t because we have
   to deal with signed arithmetic like row-1 when row=0 */
bool fate(ssize_t row, ssize_t col)
{
	ssize_t i, j;
	short neighbors = 0;

	assert(0 <= row && row < ROWS);
	assert(0 <= col && col < COLS);

	/* joined edges form a torus */
	for (i = row-1; i <= row+1; i++)
		for (j = col-1; j <= col+1; j++)
			neighbors += alive[MOD(i, ROWS)][MOD(j, COLS)];
	/* don't count self as a neighbor */
	neighbors -= alive[row][col];

	return neighbors == 3 ||
		(neighbors == 2 && alive[row][col]);
}

/* overwrite the board on screen */
void draw(void)
{
	ssize_t i, j;

	/* clear screen (non portable, requires ANSI terminal) */
	fputs("\033[2J\033[1;1H", stdout);

	flockfile(stdout);
	for (i = 0; i < ROWS; i++)
	{
		/* putchar_unlocked is thread safe when stdout is locked,
		   and it's as fast as single-threaded putchar */
		for (j = 0; j < COLS; j++)
			putchar_unlocked(alive[i][j] ? 'X' : ' ');
		putchar_unlocked('\n');
	}
	funlockfile(stdout);
	fflush(stdout);
}

void *update_strip(void *arg)
{
	ssize_t offset = *(ssize_t*)arg, i, j;
	struct timespec t;

	t.tv_sec = 0;
	t.tv_nsec = FRAME_MS * 1000000;

	while (1)
	{
		if (pthread_barrier_wait(&tick) ==
			PTHREAD_BARRIER_SERIAL_THREAD)
		{
			/* we drew the short straw, so we're on graphics duty */

			/* could have used pointers to multidimensional
			 * arrays and swapped them rather than memcpy'ing
			 * the array contents, but it makes the code a
			 * little more complicated with dereferences */
			memcpy(alive, alive_next, sizeof alive);
			draw();
			nanosleep(&t, NULL);
		}

		/* rejoin at another barrier to avoid data race on
		   the game board while it's copied and drawn */
		pthread_barrier_wait(&tick);
		for (i = offset; i < offset + (ROWS / THREADS); i++)
			for (j = 0; j < COLS; j++)
				alive_next[i][j] = fate(i, j);
	}

	return NULL;
}

int main(void)
{
	pthread_t *workers;
	ssize_t *offsets;
	size_t i, j;

	assert(ROWS % THREADS == 0);
	/* main counts as a thread, so need only THREADS-1 more */
	workers = malloc(sizeof(*workers) * (THREADS-1));
	offsets = malloc(sizeof(*offsets) * ROWS / THREADS);

	srand(time(NULL));
	for (i = 0; i < ROWS; i++)
		for (j = 0; j < COLS; j++)
			alive_next[i][j] = rand() < (int)((RAND_MAX+1u) / 3);

	pthread_barrier_init(&tick, NULL, THREADS);
	for (i = 0; i < THREADS-1; i++)
	{
		offsets[i] = i * ROWS / THREADS;
		pthread_create(&workers[i], NULL, update_strip, &offsets[i]);
	}

	/* use current thread as a worker too */
	offsets[i] = i * ROWS / THREADS;
	update_strip(&offsets[i]);

	/* shouldn't ever get here */
	pthread_barrier_destroy(&tick);
	free(offsets);
	free(workers);
	return EXIT_SUCCESS;
}
```

It’s a fun example although slightly contrived. We’re adding a sleep between rounds to slow down the animation, so it’s unnecessary to chase parallelism. Also there’s a memoized algorithm called hashlife we should be using if pure speed is the goal. However our code illustrates a natural use for barriers.

Notice how we wait at the barrier twice in rapid succession. After emerging from the first barrier, one of the threads (chosen at random) copies the new state to the board and draws it. The other threads run ahead to the next barrier and wait there so they don’t cause a data race writing to the board. Once the drawing thread arrives at the barrier with them, then all can proceed to calculate cells’ fate for the next round.

Barriers are guaranteed to be present in POSIX.1-2008, but are optional in earlier versions of the standard. Notably macOS is stuck at an old version of POSIX. Presumably they’re too busy “innovating” with their keyboard touchbar to invest in operating system fundamentals.


## Spinlocks

Spinlocks are implementations of mutexes optimized for fine-grained locking. Often used in low level code like drivers or operating systems, spinlocks are designed to be the most primitive and fastest sync mechanism available. They’re generally not appropriate for application programming. They are only truly necessary for situations like interrupt handlers when a thread is not allowed to go to sleep for any reason.

Aside from that scenario, it’s better to just use a mutex, since mutexes are pretty efficient these days. Modern mutexes often try a short-lived internal spinlock and fall back to heavier techniques only as needed. Mutexes also sometimes use a wait queue called a **futex**, which can take a lock in user-space whenever there is no contention from another thread.

When attempting to lock a spinlock, a thread runs a tight loop repeatedly checking a value in shared memory for a sign it’s safe to proceed. Spinlock implementations use special atomic assembly language instructions to test that the value is unlocked and lock it. The particular instructions vary per architecture, and can be performed in user space to avoid the overhead of a system call.

The while waiting for a lock, the loop doesn’t block the thread, but instead continues running and burns CPU energy. The technique works only on true multi-processor systems or a uniprocessor system with preemption enabled. On a uniprocessor system with cooperative threading the loop could never be interrupted, and will livelock.

In POSIX.1-2008 spinlock support is mandatory. In previous versions the presence of this feature was indicated by the `_POSIX_SPIN_LOCKS` macro. Spinlock functions start with `pthread_spin_`.

## Reader-writer locks

Whereas a mutex enforces mutual exclusion, a **reader-writer lock** allows concurrent read access. Multiple threads can read in parallel, but all block when a thread takes the lock for writing. The increased concurrency can improve application performance. However, blindly replacing mutexes with reader-writer locks “for performance” doesn’t work. Our earlier banker program, for instance, could suffer from duplicate withdrawals if it allowed multiple readers in an account at once.

Below is an rwlock example. It’s a password cracker I call 5dm (md5 backwards). It aims for maximum parallelism searching for a preimage of an MD5 hash. Worker threads periodically poll whether one among them has found an answer, and they use a reader-writer lock to avoid blocking on each other when doing so.

The example is slightly contrived, in that the difficulty of brute forcing passwords increases exponentially with their length. Using multiple threads reduces the time by only a constant factor – but 4x faster is still 4x faster on a four core computer!


The example below uses MD5() from OpenSSL. To build it, include `pkg-config --cflags libcrypto` in the CFLAGS and `pkg-config --libs libcrypto` in LDFLAGS. To run it, pass in an MD5 hash and max preimage search length. Note the `-n` in echo to suppress the newline, since newline is not in our search alphabet:

```bash
$ time ./5dm $(echo -n 'fun' | md5) 5
fun

real  0m0.067s
user  0m0.205s
sys	  0m0.007s
```

Notice how 0.2 seconds of CPU time elapsed in parallel, but the user got their answer in 0.067 seconds.

On to the code:

```c
/* 5dm.c */

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <openssl/md5.h>
#include <pthread.h>

/* build arbitrary words from the ascii between ' ' and '~' */
#define ASCII_FIRST ' '
#define ASCII_LAST  '~'
#define N_ALPHA (1 + ASCII_LAST - ASCII_FIRST)
/* refuse to search beyond this astronomical length */
#define LONGEST_PREIMAGE 128

#define MAX(x,y) ((x)<(y) ? (y) : (x))

/* a fast way to enumerate words, operating on an array in-place */
unsigned word_advance(char *word, unsigned delta)
{
	if (delta == 0)
		return 0;
	if (*word == '\0')
	{
		*word++ = ASCII_FIRST + delta - 1;
		*word = '\0';
	}
	else
	{
		char c = *word - ASCII_FIRST;
		*word = ASCII_FIRST + ((c + delta) % N_ALPHA);
		if (c + delta >= N_ALPHA)
			return 1 + word_advance(word+1, 1 /* not delta */);
	}
	return 1;
}

/* pack each pair of ASCII hex digits into single bytes */
bool hex2md5(const char *hex, unsigned char *b)
{
	int offset = 0;
	if(strlen(hex) != MD5_DIGEST_LENGTH*2)
		return false;
	while (offset < MD5_DIGEST_LENGTH*2)
	{
		if (sscanf(hex+offset, "%2hhx", b++) == 1)
			offset += 2;
		else
			return false;
	}
	return true;
}

/* random things a worker will need, since thread
 * functions receive only one argument */
struct goal
{
	/* input */
	pthread_t *workers;
	size_t n_workers;
	size_t max_len;
	unsigned char hash[MD5_DIGEST_LENGTH];

	/* output */
	pthread_rwlock_t lock;
	char preimage[LONGEST_PREIMAGE];
	bool success;
};

/* custom starting word for each worker, but shared goal */
struct task
{
	struct goal *goal;
	char initial_preimage[LONGEST_PREIMAGE];
};

void *crack_thread(void *arg)
{
	struct task *t = arg;
	unsigned len, changed;
	unsigned char hashed[MD5_DIGEST_LENGTH];
	char preimage[LONGEST_PREIMAGE];
	int iterations = 0;

	strcpy(preimage, t->initial_preimage);
	len = strlen(preimage);

	while (len <= t->goal->max_len)
	{
		MD5((const unsigned char*)preimage, len, hashed);
		if (memcmp(hashed, t->goal->hash, MD5_DIGEST_LENGTH) == 0)
		{
			/* success -- tell others to call it off */
			pthread_rwlock_wrlock(&t->goal->lock);

			t->goal->success = true;
			strcpy(t->goal->preimage, preimage);

			pthread_rwlock_unlock(&t->goal->lock);
			return NULL;
		}
		/* each worker jumps ahead n_workers words, and all workers
		   started at an offset, so all words are covered */
		changed = word_advance(preimage, t->goal->n_workers);
		len = MAX(len, changed);

		/* check if another worker has succeeded, but only every
		   thousandth iteration, since taking the lock adds overhead */
		if (iterations++ % 1000 == 0)
		{
			/* in the overwhelming majority of cases workers only read,
			   so an rwlock allows them to continue in parallel */
			pthread_rwlock_rdlock(&t->goal->lock);
			int success = t->goal->success;
			pthread_rwlock_unlock(&t->goal->lock);
			if (success)
				return NULL;
		}
	}
	return NULL;
}

/* launch a parallel search for an md5 preimage */
bool crack(const unsigned char *md5, size_t max_len,
           unsigned threads, char *result)
{
	struct goal g =
	{
		.workers   = malloc(threads * sizeof(pthread_t)),
		.n_workers = threads,
		.max_len   = max_len,
		.success   = false,
		.lock      = PTHREAD_RWLOCK_INITIALIZER
	};
	memcpy(g.hash, md5, MD5_DIGEST_LENGTH);

	struct task *tasks = malloc(threads * sizeof(struct task));

	for (size_t i = 0; i < threads; i++)
	{
		tasks[i].goal = &g;
		tasks[i].initial_preimage[0] = '\0';
		/* offset the starting word for each worker by i */
		word_advance(tasks[i].initial_preimage, i);
		pthread_create(g.workers+i, NULL, crack_thread, tasks+i);
	}

	/* if one worker finds the answer, others will abort */
	for (size_t i = 0; i < threads; i++)
		pthread_join(g.workers[i], NULL);

	if (g.success)
		strcpy(result, g.preimage);

	free(tasks);
	free(g.workers);
	return g.success;
}

int main(int argc, char **argv)
{
	char preimage[LONGEST_PREIMAGE];
	int max_len = 4;
	unsigned char md5[MD5_DIGEST_LENGTH];

	if (argc != 2 && argc != 3)
	{
		fprintf(stderr,
		        "Usage: %s md5-string [search-depth]\n",
		        argv[0]);
		return EXIT_FAILURE;
	}

	if (!hex2md5(argv[1], md5))
	{
		fprintf(stderr,
		       "Could not parse as md5: %s\n", argv[1]);
		return EXIT_FAILURE;
	}

	if (argc > 2 && strtol(argv[2], NULL, 10))
		if ((max_len = strtol(argv[2], NULL, 10)) > LONGEST_PREIMAGE)
		{
			fprintf(stderr,
					"Preimages limited to %d characters\n",
					LONGEST_PREIMAGE);
			return EXIT_FAILURE;
		}

	if (crack(md5, max_len, 4, preimage))
	{
		puts(preimage);
		return EXIT_SUCCESS;
	}
	else
	{
		fprintf(stderr,
				"Could not find result in strings up to length %d\n",
		        max_len);
		return EXIT_FAILURE;
	}
}
```

Although read-write locks can be implemented in terms of mutexes and condition variables, such implementations are significantly less efficient than is possible. Therefore, this synchronization primitive is included in POSIX.1-2008 for the purpose of allowing more efficient implementations in multi-processor systems.

The final thing to be aware of is that an rwlock implementation can choose either reader-preference or writer-preference. When readers and writers are contending for a lock, the preference determines who gets to skip the queue and go first. When there is a lot of reader activity with a reader-preference, then a writer will continually get moved to the end of the line and experience starvation, where it never gets to write. I noticed writer **starvation** on Linux (glibc) when running four threads on a little 1-core virtual machine. Glibc provides the nonportable `pthread_rwlockattr_setkind_np()` function to specify a preference.

You may have noticed that workers in our password cracker use polling to see whether the solution has been found, and whether they should give up. We’ll examine a more explicit method of cancellation in a later section.

## Semaphores

Semaphores keep count of, in the abstract, an amount of resource “units” available. Threads can safely add or remove a unit without causing a data race. When a thread requests a unit but there are none, then the thread will block.

A semaphore is like a mix between a lock and a condition variable. Unlike mutexes, semaphores have no concept of an owner. Any thread may release threads blocked on a semaphore, whereas with a mutex the lock holder must unlock it. Unlike a condition variable, a semaphore operates independently of a predicate.

An example of a problem uniquely suited for semaphores would be to ensure that exactly two threads run at once on a task. You would initialize the semaphore to the value two, and allow a bunch of threads to wait on the semaphore. After two get past, the rest will block. When each thread is done, it posts one unit back to the semaphore, which allows another thread to take its place.

In reality, if you’ve got pthreads, you only need semaphores for asynchronous signal handlers. You can use them in other situations, but this is the only place they are needed. Mutexes aren’t async signal safe. Making them so would be much slower than an implementation that isn’t async signal safe, and would slow down ordinary mutex operation.

Here’s an example of posting a semaphore from a signal handler:

```c

/* sem_tickler.c */

#include <semaphore.h>
#include <signal.h>
#include <stdio.h>

#include <unistd.h>
#if !defined(_POSIX_SEMAPHORES) || _POSIX_SEMAPHORES < 0
#error your OS lacks POSIX semaphore support
#endif

sem_t tickler;

void int_catch(int sig)
{
	(void) sig;

	signal(SIGINT, &int_catch);
	sem_post(&tickler); /* async signal safe: */
}

int main(void)
{
	sem_init(&tickler, 0, 0);
	signal(SIGINT, &int_catch);

	for (int i = 0; i < 3; i++)
	{
		sem_wait(&tickler);
		puts("That tickles!");
	}
	puts("(Died from overtickling)");
	return 0;
}
```

So don’t feel dependent on semaphores. In fact your system may not have them. The POSIX semaphore API works with pthreads and is present in POSIX.1-2008, but is an optional part of POSIX.1b in earlier versions. Apple, for one, [decided](https://lists.apple.com/archives/darwin-kernel/2009/Apr/msg00010.html) to punt, so the semaphore functions on macOS are stubbed to return error codes.

# Cancellation

Thread cancellation is generally used when you have threads doing long-running tasks and there’s a way for a user to abort through the UI or console. Another common scenario is when multiple threads set off to explore a search space and one finds the answer first.

Our previous reader-writer lock example was the second scenario, where the threads explored a search space. It was an example of do-it-yourself cancellation through polling. However sometimes threads aren’t able to poll, such as when they are blocked on I/O or a lock. Pthreads offers an API to cancel threads even in those situations.

By default a cancelled thread isn’t immediately blown away, because it may have a mutex locked, be holding resources, or have a potentially broken invariant. The canceller wouldn’t know how to repair that invariant without some complicated logic. The thread to be canceled needs to be written to do cleanup and unlock mutexes.

For each thread, cancellation can be enabled or disabled, and if enabled, may be in deferred or asynchronous mode. The default is enabled and deferred, which allows a cancelled thread to survive until the next cancellation points, such as waiting on a condition variable or blocking on IO (see [full list](https://pubs.opengroup.org/onlinepubs/9699919799/functions/V2_chap02.html#tag_15_09_05_02)). In a purely computational section of code you can add your own cancellation points with `pthread_testcancel()`.

Let’s see how to modify our previous MD5 cracking example using standard pthread cancellation. Three of the functions are the same as before: ```word_advance()```, ```hex2md5()```, and ```main()```. But we now use a condition variable to alert ```crack()``` whenever a ```crack_thread()``` returns.

```c

/* 5dm-testcancel.c */

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <openssl/md5.h>
#include <pthread.h>

#define ASCII_FIRST ' '
#define ASCII_LAST  '~'
#define N_ALPHA (1 + ASCII_LAST - ASCII_FIRST)
#define LONGEST_PREIMAGE 128

#define MAX(x,y) ((x)<(y) ? (y) : (x))

unsigned word_advance(char *word, unsigned delta)
{
	if (delta == 0)
		return 0;
	if (*word == '\0')
	{
		*word++ = ASCII_FIRST + delta - 1;
		*word = '\0';
	}
	else
	{
		char c = *word - ASCII_FIRST;
		*word = ASCII_FIRST + ((c + delta) % N_ALPHA);
		if (c + delta >= N_ALPHA)
			return 1 + word_advance(word+1, 1 /* not delta */);
	}
	return 1;
}

bool hex2md5(const char *hex, unsigned char *b)
{
	int offset = 0;
	if(strlen(hex) != MD5_DIGEST_LENGTH*2)
		return false;
	while (offset < MD5_DIGEST_LENGTH*2)
	{
		if (sscanf(hex+offset, "%2hhx", b++) == 1)
			offset += 2;
		else
			return false;
	}
	return true;
}

struct goal
{
	/* input */
	pthread_t *workers;
	size_t n_workers;
	size_t max_len;
	unsigned char hash[MD5_DIGEST_LENGTH];

	/* output */
	pthread_mutex_t lock;
	pthread_cond_t returning;
	unsigned n_done;
	char preimage[LONGEST_PREIMAGE];
	bool success;
};

struct task
{
	struct goal *goal;
	char initial_preimage[LONGEST_PREIMAGE];
};

void *crack_thread(void *arg)
{
	struct task *t = arg;
	unsigned len, changed;
	unsigned char hashed[MD5_DIGEST_LENGTH];
	char preimage[LONGEST_PREIMAGE];
	int iterations = 0;

	strcpy(preimage, t->initial_preimage);
	len = strlen(preimage);

	while (len <= t->goal->max_len)
	{
		MD5((const unsigned char*)preimage, len, hashed);
		if (memcmp(hashed, t->goal->hash, MD5_DIGEST_LENGTH) == 0)
		{
			pthread_mutex_lock(&t->goal->lock);

			t->goal->success = true;
			strcpy(t->goal->preimage, preimage);
			t->goal->n_done++;

			/* alert the boss that another worker is done */
			pthread_cond_signal(&t->goal->returning);
			pthread_mutex_unlock(&t->goal->lock);
			return NULL;
		}
		changed = word_advance(preimage, t->goal->n_workers);
		len = MAX(len, changed);

		if (iterations++ % 1000 == 0)
			pthread_testcancel(); /* add a cancellation point */
	}

	pthread_mutex_lock(&t->goal->lock);
	t->goal->n_done++;
	/* alert the boss that another worker is done */
	pthread_cond_signal(&t->goal->returning);
	pthread_mutex_unlock(&t->goal->lock);
	return NULL;
}

/* cancellation cleanup function that we also call
 * during regular exit from the crack() function */
void crack_cleanup(void *arg)
{
	struct task *tasks = arg;
	struct goal *g = tasks[0].goal;

	/* this mutex unlock pairs with the lock in the crack() function */
	pthread_mutex_unlock(&g->lock);
	for (size_t i = 0; i < g->n_workers; i++)
	{
		pthread_cancel(g->workers[i]);
		/* must wait for each to terminate, so that freeing
		 * their shared memory is safe */
		pthread_join(g->workers[i], NULL);
	}
	/* now it's safe to free memory */
	free(g->workers);
	free(tasks);
}

bool crack(const unsigned char *md5, size_t max_len,
           unsigned threads, char *result)
{
	struct goal g =
	{
		.workers   = malloc(threads * sizeof(pthread_t)),
		.n_workers = threads,
		.max_len   = max_len,
		.success   = false,
		.n_done    = 0,
		.lock      = PTHREAD_MUTEX_INITIALIZER,
		.returning = PTHREAD_COND_INITIALIZER
	};
	memcpy(g.hash, md5, MD5_DIGEST_LENGTH);

	struct task *tasks = malloc(threads * sizeof(struct task));

	for (size_t i = 0; i < threads; i++)
	{
		tasks[i].goal = &g;
		tasks[i].initial_preimage[0] = '\0';
		word_advance(tasks[i].initial_preimage, i);
		pthread_create(g.workers+i, NULL, crack_thread, tasks+i);
	}

	/* coming up to cancellation points, so establish
	 * a cleanup handler */
	pthread_cleanup_push(crack_cleanup, tasks);

	pthread_mutex_lock(&g.lock);
	/* We can't join() on all the workers now because it's up to
	 * us to cancel them after one finds the answer. We have to
	 * remain responsive and not block on any particular worker */
	while (!g.success && g.n_done < threads)
		pthread_cond_wait(&g.returning, &g.lock);
	/* at this point either a thread succeeded or all have given up */
	if (g.success)
		strcpy(result, g.preimage);
	/* mutex unlocked in the cleanup handler */

	/* Use the same cleanup handler for normal exit too. The "1"
	 * argument says to execute the function we had previous pushed */
	pthread_cleanup_pop(1);
	return g.success;
}

int main(int argc, char **argv)
{
	char preimage[LONGEST_PREIMAGE];
	int max_len = 4;
	unsigned char md5[MD5_DIGEST_LENGTH];

	if (argc != 2 && argc != 3)
	{
		fprintf(stderr,
		        "Usage: %s md5-string [search-depth]\n",
		        argv[0]);
		return EXIT_FAILURE;
	}

	if (!hex2md5(argv[1], md5))
	{
		fprintf(stderr,
		       "Could not parse as md5: %s\n", argv[1]);
		return EXIT_FAILURE;
	}

	if (argc > 2 && strtol(argv[2], NULL, 10))
		if ((max_len = strtol(argv[2], NULL, 10)) > LONGEST_PREIMAGE)
		{
			fprintf(stderr,
					"Preimages limited to %d characters\n",
					LONGEST_PREIMAGE);
			return EXIT_FAILURE;
		}

	if (crack(md5, max_len, 4, preimage))
	{
		puts(preimage);
		return EXIT_SUCCESS;
	}
	else
	{
		fprintf(stderr,
				"Could not find result in strings up to length %d\n",
		        max_len);
		return EXIT_FAILURE;
	}
}

```

Using cancellation is actually a little more flexible than our rwlock implementation in 5dm. If the ```crack()``` function is running in its own thread, the whole thing can now be cancelled. The cancellation handler will “pass along” the cancellation to each of the worker threads.

Writing general purpose library code that works with threads requires some care. It should handle deferred cancellation gracefully, including disabling cancellation when appropriate and always using cleanup handlers.

For cleanup handlers, notice the pattern of how we ```pthread_cleanup_push()``` the cancellation handler, and later ```pthread_cleanup_pop()``` it for regular (non-cancel) cleanup too. Using the same cleanup procedure in all situations makes the code more reliable.

Also notice how the boss thread now cancels workers, rather than the winning worker cancelling the others. You can join a canceled thread, but you can’t cancel an already joined (or detached) thread. If you want to both cancel and join a thread it ought to be done in one place.

Let’s turn out attention to the new worker threads. They are still polling for cancellation, like they polled with the reader-writer locks, but in this case they do it with a new function:

```c
if (iterations++ % 1000 == 0)
	pthread_testcancel();
```


Admittedly it adds a little overhead to poll every thousandth loop, both with the rwlock, and with the testcancel. It also adds latency to the time between the cancellation request and the thread quitting, since the loop could run up to 999 times in between. A more efficient but dangerous method is to enable **asynchronous cancellation**, meaning the thread immediately dies when cancelled.

Async cancellation is dangerous because code is seldom async-cancel-safe. Anything that uses locks or works with shared state even slightly can break badly. Async-cancel-safe code can call very few functions, since those functions may not be safe. This includes calling libraries that use something as innocent as ```malloc()```, since stopping malloc part way through could corrupt the heap.

Our ```crack_thread()``` function should be async-cancel-safe, at least during its calculation and not when taking locks. The ```MD5()``` function from OpenSSL also appears to be safe. Here’s how we can rewrite our function (notice how we disable cancellation before taking a lock):

```c
/* rewritten to use async cancellation */

void *crack_thread(void *arg)
{
	struct task *t = arg;
	unsigned len, changed;
	unsigned char hashed[MD5_DIGEST_LENGTH];
	char preimage[LONGEST_PREIMAGE];
	int cancel_type, cancel_state;

	strcpy(preimage, t->initial_preimage);
	len = strlen(preimage);

	/* async so we don't have to pthread_testcancel() */
	pthread_setcanceltype(
			PTHREAD_CANCEL_ASYNCHRONOUS, &cancel_type);

	while (len <= t->goal->max_len)
	{
		MD5((const unsigned char*)preimage, len, hashed);
		if (memcmp(hashed, t->goal->hash, MD5_DIGEST_LENGTH) == 0)
		{
			/* protect the mutex against async cancellation */
			pthread_setcancelstate(
					PTHREAD_CANCEL_DISABLE, &cancel_state);
			pthread_mutex_lock(&t->goal->lock);

			t->goal->success = true;
			strcpy(t->goal->preimage, preimage);
			t->goal->n_done++;

			pthread_cond_signal(&t->goal->returning);
			pthread_mutex_unlock(&t->goal->lock);
			return NULL;
		}
		changed = word_advance(preimage, t->goal->n_workers);
		len = MAX(len, changed);
	}

	/* restore original cancellation type */
	pthread_setcanceltype(cancel_type, &cancel_type);

	pthread_mutex_lock(&t->goal->lock);
	t->goal->n_done++;
	pthread_cond_signal(&t->goal->returning);
	pthread_mutex_unlock(&t->goal->lock);
	return NULL;
}

```

# Development tools

## Valgrind DRD and helgrind

[DRD](https://valgrind.org/docs/manual/drd-manual.html) and [Helgrind](https://valgrind.org/docs/manual/hg-manual.html) are Valgrind tools for detecting errors in multithreaded C and C++ programs. The tools work for any program that uses the POSIX threading primitives or that uses threading concepts built on top of the POSIX threading primitives.

The tools have overlapping abilities like detecting data races and improper use of the pthreads API. Additionally, Helgrind can detect locking hierarchy violations, and DRD can alert when there is lock contention.

Both tools pinpoint the lines of code where problems arise. For example, we can run DRD on our first crazy bankers program:

```bash
valgrind --tool=drd ./banker
```

Here is a characteristic example of an error it emits:

```bash

==8524== Thread 3:
==8524== Conflicting load by thread 3 at 0x003090b0 size 8
==8524==    at 0x1088BD: disburse (banker.c:48)
==8524==    by 0x4C324F3: vgDrd_thread_wrapper (drd_pthread_intercepts.c:444)
==8524==    by 0x4E514A3: start_thread (pthread_create.c:456)
==8524== Allocation context: BSS section of /home/admin/banker
==8524== Other segment start (thread 2)
==8524==    at 0x514FD01: clone (clone.S:80)
==8524== Other segment end (thread 2)
==8524==    at 0x509D820: rand (rand.c:26)
==8524==    by 0x108857: rand_range (banker.c:26)
==8524==    by 0x1088A0: disburse (banker.c:42)
==8524==    by 0x4C324F3: vgDrd_thread_wrapper (drd_pthread_intercepts.c:444)
==8524==    by 0x4E514A3: start_thread (pthread_create.c:456)

```
It finds conflicting loads and stores from lines 48, 51, and 52.

```c

48: if (accts[from].balance > 0)
49: {
50:		payment = 1 + rand_range(accts[from].balance);
51:		accts[from].balance -= payment;
52:		accts[to].balance   += payment;
53: }

```

Helgrind can identify the lock hierarchy violation in our example of deadlocking bankers:

```bash
valgrind --tool=helgrind ./banker_lock
```

```bash
==8989== Thread #4: lock order "0x3091F8 before 0x3090D8" violated
==8989==
==8989== Observed (incorrect) order is: acquisition of lock at 0x3090D8
==8989==    at 0x4C3010C: mutex_lock_WRK (hg_intercepts.c:904)
==8989==    by 0x1089B9: disburse (banker_lock.c:38)
==8989==    by 0x4C32D06: mythread_wrapper (hg_intercepts.c:389)
==8989==    by 0x4E454A3: start_thread (pthread_create.c:456)
==8989==
==8989==  followed by a later acquisition of lock at 0x3091F8
==8989==    at 0x4C3010C: mutex_lock_WRK (hg_intercepts.c:904)
==8989==    by 0x1089D1: disburse (banker_lock.c:39)
==8989==    by 0x4C32D06: mythread_wrapper (hg_intercepts.c:389)
==8989==    by 0x4E454A3: start_thread (pthread_create.c:456)
```

To identify when there is too much contention for a lock, we can ask DRD to alert us when a thread blocks for more than n milliseconds on a mutex:

```
valgrind --tool=drd --exclusive-threshold=2 ./banker_lock_hierarchy
```

Since we throw too many threads at a small number of accounts, we see wait times that cross the threshold, like this one that waited seven ms:

```bash

==7565== Acquired at:
==7565==    at 0x483F428: pthread_mutex_lock_intercept (drd_pthread_intercepts.c:888)
==7565==    by 0x483F428: pthread_mutex_lock (drd_pthread_intercepts.c:898)
==7565==    by 0x109280: disburse (banker_lock_hierarchy.c:40)
==7565==    by 0x483C114: vgDrd_thread_wrapper (drd_pthread_intercepts.c:444)
==7565==    by 0x4863FA2: start_thread (pthread_create.c:486)
==7565==    by 0x49764CE: clone (clone.S:95)
==7565== Lock on mutex 0x10c258 was held during 7 ms (threshold: 2 ms).
==7565==    at 0x4840478: pthread_mutex_unlock_intercept (drd_pthread_intercepts.c:978)
==7565==    by 0x4840478: pthread_mutex_unlock (drd_pthread_intercepts.c:991)
==7565==    by 0x109395: disburse (banker_lock_hierarchy.c:47)
==7565==    by 0x483C114: vgDrd_thread_wrapper (drd_pthread_intercepts.c:444)
==7565==    by 0x4863FA2: start_thread (pthread_create.c:486)
==7565==    by 0x49764CE: clone (clone.S:95)
==7565== mutex 0x10c258 was first observed at:
==7565==    at 0x483F368: pthread_mutex_lock_intercept (drd_pthread_intercepts.c:885)
==7565==    by 0x483F368: pthread_mutex_lock (drd_pthread_intercepts.c:898)
==7565==    by 0x109280: disburse (banker_lock_hierarchy.c:40)
==7565==    by 0x483C114: vgDrd_thread_wrapper (drd_pthread_intercepts.c:444)
==7565==    by 0x4863FA2: start_thread (pthread_create.c:486)
==7565==    by 0x49764CE: clone (clone.S:95)

```

## Clang ThreadSanitizer (TSan)

ThreadSanitizer is a clang instrumentation module. To use it, choose CC = clang and add -fsanitize=thread to CFLAGS. Then when you build programs, they will be modified to detect data races and print statistics to stderr.

Here’s a portion of the output when running the bankers program:

```
WARNING: ThreadSanitizer: data race (pid=11312)
  Read of size 8 at 0x0000014aeeb0 by thread T2:
    #0 disburse /home/admin/banker.c:48 (banker+0x0000004a4372)

  Previous write of size 8 at 0x0000014aeeb0 by thread T1:
    #0 disburse /home/admin/banker.c:52 (banker+0x0000004a43ba)
```


TSan can also detect lock hierarchy violations, such as in banker_lock:

```
WARNING: ThreadSanitizer: lock-order-inversion (potential deadlock) (pid=10095)
  Cycle in lock order graph: M1 (0x0000014aef78) => M2 (0x0000014aeeb8) => M1

  Mutex M2 acquired here while holding mutex M1 in thread T1:
    #0 pthread_mutex_lock <null> (banker_lock+0x000000439a10)
    #1 disburse /home/admin/banker_lock.c:39 (banker_lock+0x0000004a4398)

    Hint: use TSAN_OPTIONS=second_deadlock_stack=1 to get more informative warning message

  Mutex M1 acquired here while holding mutex M2 in thread T9:
    #0 pthread_mutex_lock <null> (banker_lock+0x000000439a10)
    #1 disburse /home/admin/banker_lock.c:39 (banker_lock+0x0000004a4398)
```

##  Mutrace

While Valgrind DRD can identify highly contended locks, it virtualizes the execution of the program under test, and skews the numbers. Other utilities can use software probes to get this information from a test running at full speed. In BSD land there is the [plockstat](http://dtrace.org/guide/chp-plockstat.html) provider for DTrace, and on Linux there is the specially-written [mutrace](http://dtrace.org/guide/chp-plockstat.html). I had a lot of trouble trying to get plockstat to work on FreeBSD, so here’s an example of using mutrace to analyze our banker program.

```
mutrace ./banker_lock_hierarchy
```

```

mutrace: Showing 10 most contended mutexes:

 Mutex #   Locked  Changed    Cont. tot.Time[ms] avg.Time[ms] max.Time[ms]  Flags
       0   200211   153664    95985      991.349        0.005        0.267 M-.--.
       1   200552   142173    61902      641.963        0.003        0.170 M-.--.
       2   199657   140837    47723      476.737        0.002        0.125 M-.--.
       3   199566   140863    39268      371.451        0.002        0.108 M-.--.
       4   199936   141381    33243      295.909        0.001        0.090 M-.--.
       5   199548   141297    28193      232.647        0.001        0.084 M-.--.
       6   200329   142027    24230      183.301        0.001        0.066 M-.--.
       7   199951   142338    21018      142.494        0.001        0.057 M-.--.
       8   200145   142990    18201      107.692        0.001        0.052 M-.--.
       9   200105   143794    15713       76.231        0.000        0.028 M-.--.
                                                                           ||||||
                                                                           /|||||
          Object:                                     M = Mutex, W = RWLock /||||
           State:                                 x = dead, ! = inconsistent /|||
             Use:                                 R = used in realtime thread /||
      Mutex Type:                 r = RECURSIVE, e = ERRRORCHECK, a = ADAPTIVE /|
  Mutex Protocol:                                      i = INHERIT, p = PROTECT /
     RWLock Kind: r = PREFER_READER, w = PREFER_WRITER, W = PREFER_WRITER_NONREC

mutrace: Note that the flags column R is only valid in --track-rt mode!

mutrace: Total runtime is 1896.903 ms.

mutrace: Results for SMP with 4 processors.
```

## Off-CPU profiling

Typical profilers measure the amount of CPU time spent in each function. However when a thread is blocked by I/O, a lock, or a condition variable, then it isn’t using CPU time. To determine where functions spend the most “wall clock time,” we need to sample the call stack for all threads at intervals, and count how frequently we see each entry. When a thread is off-CPU its call stack stays unchanged.

The pstack program is traditionally the way to get a snapshot of a running program’s stack. It exists on old Unices, and used to be on Linux until Linux made a breaking change. The most portable way to get stack snapshots is using gdb with an awk wrapper, as documented in the [Poor Man’s Profiler](http://poormansprofiler.org/).

Remember our early condition variable example that measured how many threads entered the critical section in disburse() at once? We asked whether synchronization on stats_mtx threw off the measurement. With off-CPU profiling we can look for clues.

Here’s a script based on the Poor Man’s Profiler:

```bash

./banker_stats &
pid=$!

while kill -0 $pid
  do
    gdb -ex "set pagination 0" -ex "thread apply all bt" -batch -p $pid
  done | \
awk '
  BEGIN { s = ""; }
  /^Thread/ { print s; s = ""; }
  /^\#/ { if (s != "" ) { s = s "," $4} else { s = $4 } }
  END { print s }' | \
sort | uniq -c | sort -r -n -k 1,1

```


It outputs limited information, but we can see that waiting for locks in `disburse()` takes the majority of program time, being present in 872 of our samples. By contrast, waiting for the `stats_mtx` lock in `stats_update() `doesn’t appear in our sample at all. It must have had very little affect on our parallelism.

```
    872 at,__GI___pthread_mutex_lock,disburse,start_thread,clone
     11 at,__random,rand,rand_range,disburse,start_thread,clone
      9 expected=0,,mutex=0x562533c3f0c0,<stats_cnd>,,stats_print,start_thread,clone
      9 __GI___pthread_timedjoin_ex,main
      5 at,__pthread_mutex_unlock_usercnt,disburse,start_thread,clone
      1 at,__pthread_mutex_unlock_usercnt,stats_change,disburse,start_thread,clone
      1 at,__GI___pthread_mutex_lock,stats_change,disburse,start_thread,clone
      1 __random,rand,rand_range,disburse,start_thread,clone

```

## perf c2c

Perf is a Linux tool to measure hardware performance counters during the execution of a program. Joe Mario created a Perf feature called [c2c](https://joemario.github.io/blog/2016/09/01/c2c-blog/) which detects false sharing of variables between CPUs.

In a NUMA multi-core computer, each CPU has its own set of caches, and all CPUs share main memory. Memory is divided into fixed size blocks (often 64 bytes) called cache lines. Any time a CPU reads or writes memory, it must fetch or store the entire cache line surrounding the desired address. If one CPU has already cached a line, and another CPU writes to that area in memory, the system has to perform an expensive operation to make the caches coherent.

When two unrelated variables in a program are stored close enough together in memory to be in the same cache line, it can cause a performance problem in multi-threaded programs. If threads running on separate CPUs access the unrelated variables, it can cause a tug of war between their underlying cache line, which is called false sharing.

For instance, our Game of Life simulator could potentially have false sharing at the edges of each section of board accessed by each thread. To verify this, I attempted to run perf c2c on an Amazon EC2 instance (since I lack a physical computer running Linux), but got an error that memory events are not supported on the virtual machine. I was running kernel 4.19.0 on Intel Xeon Platinum 8124M CPUs, so I assume this was a security restriction from Amazon.

If you are able to run c2c, and detect false sharing in a multi-threaded program, the solution is to align the variables more aggressively. POSIX provides the [posix_memalign()](https://pubs.opengroup.org/onlinepubs/9699919799/functions/posix_memalign.html) function to allocate bytes aligned on a desired boundary. In our Life example, we could have used an array of pointers to dynamically allocated rows rather than a contiguous two-dimensional array.