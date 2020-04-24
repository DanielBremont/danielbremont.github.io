---
layout: post
title: System Scalability
categories: [articles]
---

<!--more-->

# Scalable System Design
[Ir](http://horicky.blogspot.com/2008/02/scalable-system-design.html){:target="_blank"}

Building scalable system is becoming a hotter and hotter topic. Mainly because more and more people are using computer these days, both the transaction volume and their performance expectation has grown tremendously.

This one covers general considerations. I have another blogs with more specific coverage on DB scalability as well as Web site scalability.

## General Principles

*"Scalability" is not equivalent to "Raw Performance"*

- Scalability is about reducing the adverse impact due to growth on performance, cost, maintainability and many other aspects
- e.g. Running every components in one box will have higher performance when the load is small. But it is not scalable because performance

*Understand environmental workload conditions that the system is design for*

- Dimension of growth and growth rate: e.g. Number of users, Transaction volume, Data volume
- Measurement and their target: e.g. Response time, Throughput

*Understand who is your priority customers*

- Rank the importance of traffic so you know what to sacrifice in case you cannot handle all of them

*Scale out and Not scale up*

- Scale the system horizontally (adding more cheap machine), but not vertically (upgrade to a more powerful machine)

*Keep your code modular and simple*

- The ability to swap out old code and replace with new code without worries of breaking other parts of the system allows you to experiment different ways of optimization quickly
- Never sacrifice code modularity for any (including performance-related) reasons

*Don't guess the bottleneck, Measure it*

- Bottlenecks are slow code which are frequently executed. Don't optimize slow code if they are rarely executed
- Write performance unit test so you can collect fine grain performance data at the component level
- Setup a performance lab so you can conduct end-to-end performance improvement measurement easily

*Plan for growth*

- Do regular capacity planning. Collect usage statistics, predict the growth rate

## Common Techniques

*Server Farm (real time access)*

- If there is a large number of independent (potentially concurrent) request, then you can use a server farm which is basically a set of identically configured machine, frontend by a load balancer.
- The application itself need to be stateless so the request can be dispatched purely based on load conditions and not other factors.
- Incoming requests will be dispatched by the load balancer to different machines and hence the workload is spread and shared across the servers in the farm.
- The architecture allows horizontal growth so when the workload increases, you can just add more server instances into the farm.
- This strategy is even more effective when combining with Cloud computing as adding more VM instances into the farm is just an API call.

*Data Partitioning*

- Spread your data into multiple DB so that data access workload can be distributed across multiple servers
- By nature, data is stateful. So there must be a deterministic mechanism to dispatch data request to the server that host the data
- Data partitioning mechanism also need to take into considerations the data access pattern. Data that need to be accessed together should be staying in the same server. A more sophisticated approach can migrate data continuously according to data access pattern shift.
- Most distributed key/value store do this

*Map / Reduce (Batch Parallel Processing)*

- The algorithm itself need to be parallelizable. This usually mean the steps of execution should be relatively independent of each other.
- Google's Map/Reduce is a good framework for this model. There is also an open source Java framework Hadoop as well.

*Content Delivery Network (Static Cache)*

- This is common for static media content. The idea is to create many copies of contents that are distributed geographically across servers.
- User request will be routed to the server replica with close proxmity

*Cache Engine (Dynamic Cache)*

- This is a time vs space tradeoff. Some executions may use the same set of input parameters over and over again. Therefore, instead of redo the same execution for same input parameters, we can remember the previous execution's result.
- This is typically implemented as a lookup cache.
- Memcached and EHCache are some of the popular caching packages

*Resources Pool*

- DBSession and TCP connection are expensive to create, so reuse them across multiple requests

*Calculate an approximate result*

- Instead of calculate an accurate answer, see if you can tradeoff some accuracy for speed.
- If real life, usually some degree of inaccuracy is tolerable

*Filtering at the source*

- Try to do more processing upstream (where data get generated) than downstream because it reduce the amount of data being propagated

*Asynchronous Processing*

- You make a call which returns a result. But you don't need to use the result until at a much later stage of your process. Therefore, you don't need to wait immediately after making the call., instead you can proceed to do other things until you reach the point where you need to use the result.

- In additional, the waiting thread is idle but consume system resources. For high transaction volume, the number of idle threads is (arrival_rate * processing_time) which can be a very big number if the arrival_rate is high. The system is running under a very ineffective mode

- The service call in this example is better handled using an asynchronous processing model. This is typically done in 2 ways: Callback and Polling

- In callback mode, the caller need to provide a response handler when making the call. The call itself will return immediately before the actually work is done at the server side. When the work is done later, response will be coming back as a separate thread which will execute the previous registered response handler. Some kind of co-ordination may be required between the calling thread and the callback thread.

- In polling mode, the call itself will return a "future" handle immediately. The caller can go off doing other things and later poll the "future" handle to see if the response if ready. In this model, there is no extra thread being created so no extra thread co-ordination is needed.

*Implementation design considerations*

- Use efficient algorithms and data structure. Analyze the time (CPU) and space (memory) complexity for logic that are execute frequently (ie: hot spots). For example, carefully decide if hash table or binary tree should be use for lookup.

- Analyze your concurrent access scenarios when multiple threads accessing shared data. Carefully analyze the synchronization scenario and make sure the locking is fine-grain enough. Also watch for any possibility of deadlock situation and how you detect or prevent them. A wrong concurrent access model can have huge impact in your system's scalability. Also consider using Lock-Free data structure (e.g. Java's Concurrent Package have a couple of them)

- Analyze the memory usage patterns in your logic. Determine where new objects are created and where they are eligible for garbage collection. Be aware of the creation of a lot of short-lived temporary objects as they will put a high load on the Garbage Collector.

- However, never trade off code readability for performance. (e.g. Don't try to bundle too much logic into a single method). Let the VM handle this execution for you.


# Web Site Scalability
[Ir](http://horicky.blogspot.com/2008/03/web-site-scalability.html){:target="_blank"}

A classical large scale web site typically have multiple data centers in geographically distributed locations. Each data center will typically have the following tiers in its architecture

- Web tier : Serving static contents (static pages, photos, videos)
- App tier : Serving dynamic contents and execute the application logic (dynamic pages, order processing, transaction processing)
- Data tier: Storing persistent states (Databases, Filesystems)

![system](http://2.bp.blogspot.com/_j6mB7TMmJJY/R9F3_4qXpgI/AAAAAAAAAAs/-qYU9ZKhEpo/s1600-h/scalable.png "system")

## Content Delivery

**Dynamic Content**

- Most of the content display is dynamic content. Some application logic will be executed at the web server which generate an HTML for the client browser. The efficiency of application logic will have a huge impact on the overall site's scalability. This is our main topic here.
- Sometimes it is possible to pre-generate dynamic content and store it as static content. When the real request comes in, instead of re-running the application logic to generate the page, we just need to lookup the pre-generated page, which can be much faster

**Static Content**

- Static content are typically the images, videos embedded inside the dynamic pages.

- A typical HTML pages typically contains many static contents where the browser will make additional HTTP network round trips to fetch. So fetching static content efficiency also has a big impact to the overall response of dynamic page

- Content Delivery Network is an effective solution for delivering static contents. CDN provider will cache the static content in their network and will return the cached copy for subsequent HTTP fetch request. This reduce the overall hits to your web site as well as improving the user's response time (because their cache is in closer proximity to the user)

## Request dispatching and Load balancing

There are 2 layers of dispatching for a Client who is making an HTTP request to reach the application server

**DNS Resolution based on user proximity**

- Depends on the location of the client (derived from the IP address), the DNS server can return an ordered list of sites according to the proximity measurement. Therefore client request will be routed to the data center closest to him/her
- After that, the client browser will cache the server IP

**Load balancer**

- Load balancer (hardware-based or software-based) will be sitting in front of a pool of homogeneous servers which provide same application services. The load balancer's job is to decide which member of the pool should handle the request
- The decision can be based on various strategy, simple one include round robin or random, more sophisticated one involves tracking the workload of each member (e.g. by measuring their response time) and dispatch request to the least busy one
- Members of the pool can also monitor its own workload and mark itself down (by not responding to the ping request of the load balancer)

##  Client communication

This is concerned about designing an effective mechanism to communicate with the client, which is typically the browser making some HTTP call (maybe AJAX as well)

**Designing the granularity of service call**

- Reduce the number of round trips by using a coarse grain API model so your client is making one call rather than many small calls
- Don't send back more data than your client need
- Consider using an incremental processing model. Just send back sufficient result for the first page. Use a cursor model to compute more result for subsequent pages in case the client needs it. But it is good to calculate an estimation of the total matched result to return to the client.

**Designing message format**

-- If you have control on the client side (e.g. I provide the JavaScript library which is making the request), then you can choose a more compact encoding scheme and not worry about compatibility.
- If not, you have to use a standard encoding mechanism such as XML. You also need to publish the XML schema of the message (the contract is the message format)

**Consider data compression**

- If the message size is big, then we can apply compression technique (e.g. gzip) to the message before sending it.
- You are trading off CPU for bandwidth savings, better to measure whether this is a gain first

**Asynchronous communication**

- AJAX fits very well here. User can proceed to do other things while the server is working on the request
- Consider not sending the result at all. Rather than sending the final order status to the client who is sending an order placement request, consider sending an email acknowledgment.

## Session state handling

Typical web transaction involves multiple steps. Session state need to be maintained across multiple interactions

**Memory-based session state with Load balancer affinity**

- One way is to store the state in the App Server's local memory. But we need to make sure subsequent request land on the same App Server instance otherwise it cannot access the previous stored session state
- Load balancer affinity need to be turned on. Typically request with the same cookie will be routed to the same app server

**Memory replication session state across App servers**

- Another way to have the App server sharing a global session state by replicating its changes to each other
- Double check the latency of replication so we can make sure there is enough time for the replication to complete before subsequent request is made

**Persist session state to a DB**

- Store the session state into a DB which can be accessed by any App Server inside the pool

**On-demand session state migration**

- Under this model, the cookie will be used to store the IP address of the last app server who process the client request
- When the next request comes in, the dispatcher is free to forward to any members of the pool. The app server which receive this request will examine the IP address of the last server and pull over the session state from there.

**Embed session state inside cookies**

- If the session state is small, you don't need to store at the server side at all. You can just embed all information inside a cookie and send back to the client.
- You need to digitally sign the cookie so that modification cannot happen

## Caching

Remember the previous result can reuse them for future request can drastically reduce the workload of the system. But don't cache request which modifies the backend state

# Database Scalability
[Ir](http://horicky.blogspot.com/2008/03/database-scalability.html){:target="_blank"}

Database is typically the last piece of the puzzle of the scalability problem. There are some common techniques to scale the DB tire

## Indexing

Make sure appropriate indexes is built for fast access. Analyze the frequently-used queries and examine the query plan when it is executed (e.g. use "explain" for MySQL). Check whether appropriate index exist and being used.

## Data De-normalization

Table join is an expensive operation and should be reduced as much as possible. One technique is to de-normalize the data such that certain information is repeated in different tables.

## DB Replication

For typical web application where the read/write ratio is high, it will be useful to maintain multiple read-only replicas so that read access workload can be spread across. For example, in a 1 master/N slaves case, all update goes to master DB which send a change log to the replicas. However, there will be a time lag for replication.

## Table Partitioning

You can partition vertically or horizontally.

Vertical partitioning is about putting different DB tables into different machines or moving some columns (rarely access attributes) to a different table. Of course, for query performance reason, tables that are joined together inside a query need to reside in the same DB.

Horizontally partitioning is about moving different rows within a table into a separated DB. For example, we can partition the rows according to user id. Locality of reference is very important, we should put the rows (from different tables) of the same user together in the same machine if these information will be access together.

## Transaction Processing

Avoid mixing OLAP (query intensive) and OLTP (update intensive) operations within the same DB. In the OLTP system, avoid using long running database transaction and choose the isolation level appropriately. A typical technique is to use optimistic business transaction. Under this scheme, a long running business transaction is executed outside a database transaction. Data containing a version stamp is read outside the database trsnaction. When the user commits the business transaction, a database transaction is started at that time, the lastest version stamp of the corresponding records is re-read from the DB to make sure it is the same as the previous read (which means the data is not modified since the last read). Is so, the changes is pushed to the DB and transaction is commited (with the version stamp advanced). In case the version stamp is mismatched, the DB transaction as well as the business transaction is aborted.

## Object / Relational Mapping

Although O/R mapping layer is useful to simplify persistent logic, it is usually not friendly to scalability. Consider the performance overhead carefully when deciding to use O/R mapping.

There are many tuning parameters in O/R mapping. Consider these ...

- When an object is dereferenced, how deep the object will be retrieved
- If a collection is dereferenced, does the O/R mapper retrieve all the object contained in the collection ?
- When an object is expanded, choose carefully between multiple "single-join" queries and single "multiple join" query
