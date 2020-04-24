---
layout: post
title: I am Jürgen Schmidhuber, AMA!
categories: [articles]
tags: [cs]
---

[Ir](https://www.reddit.com/r/MachineLearning/comments/2xcyrl/i_am_j%C3%BCrgen_schmidhuber_ama/){:target="_blank"}

I am Jürgen Schmidhuber (pronounce: You_again Shmidhoobuh) and I will be here to answer your questions on 4th March 2015, 10 AM EST. You can post questions in this thread in the meantime. Below you can find a short introduction about me from my website (you can read more about my lab’s work at people.idsia.ch/~juergen/).
<!--more-->

Since age 15 or so, Jürgen Schmidhuber's main scientific ambition has been to build an optimal scientist through self-improving Artificial Intelligence (AI), then retire. He has pioneered self-improving general problem solvers since 1987, and Deep Learning Neural Networks (NNs) since 1991. The recurrent NNs (RNNs) developed by his research groups at the Swiss AI Lab IDSIA (USI & SUPSI) & TU Munich were the first RNNs to win official international contests. They recently helped to improve connected handwriting recognition, speech recognition, machine translation, optical character recognition, image caption generation, and are now in use at Google, Microsoft, IBM, Baidu, and many other companies. IDSIA's Deep Learners were also the first to win object detection and image segmentation contests, and achieved the world's first superhuman visual classification results, winning nine international competitions in machine learning & pattern recognition (more than any other team). They also were the first to learn control policies directly from high-dimensional sensory input using reinforcement learning. His research group also established the field of mathematically rigorous universal AI and optimal universal problem solvers. His formal theory of creativity & curiosity & fun explains art, science, music, and humor. He also generalized algorithmic information theory and the many-worlds theory of physics, and introduced the concept of Low-Complexity Art, the information age's extreme form of minimal art. Since 2009 he has been member of the European Academy of Sciences and Arts. He has published 333 peer-reviewed papers, earned seven best paper/best video awards, and is recipient of the 2013 Helmholtz Award of the International Neural Networks Society.

## What's something that's true, but almost nobody agrees with you on?

That’s a great question indeed! Let me offer just two items from my long list of “truths” many disagree with.

- Many think that intelligence is this awesome, infinitely complex thing. I think it is just the product of a few principles that will be considered very simple in hindsight, so simple that even kids will be able to understand and build intelligent, continually learning, more and more general problem solvers. Partial justification of this belief: (a) there already exist blueprints of universal problem solvers developed in my lab, in the new millennium, which are theoretically optimal in some abstract sense although they consist of just a few formulas ([http://people.idsia.ch/~juergen/unilearn.html](http://people.idsia.ch/~juergen/unilearn.html), [http://people.idsia.ch/~juergen/goedelmachine.html](http://people.idsia.ch/~juergen/goedelmachine.html)). (b) The principles of our less universal, but still rather general, very practical, program-learning recurrent neural networks can also be described by just a few lines of pseudo-code, e.g., [http://people.idsia.ch/~juergen/rnn.html](http://people.idsia.ch/~juergen/rnn.html), [http://people.idsia.ch/~juergen/compressednetworksearch.html](http://people.idsia.ch/~juergen/compressednetworksearch.html)

- General purpose quantum computation won’t work (my prediction of 15 years ago is still standing). Related: The universe is deterministic, and the most efficient program that computes its entire history is short and fast, which means there is little room for true randomness, which is very expensive to compute. What looks random must be pseudorandom, like the decimal expansion of Pi, which is computable by a short program. Many physicists disagree, but Einstein was right: no dice. There is no physical evidence to the contrary [http://people.idsia.ch/~juergen/randomness.html](http://people.idsia.ch/~juergen/randomness.html). For example, Bell’s theorem does not contradict this. And any efficient search in program space for the solution to a sufficiently complex problem will create many deterministic universes like ours as a by-product. Think about this. More here [http://people.idsia.ch/~juergen/computeruniverse.html](http://people.idsia.ch/~juergen/computeruniverse.html) and here [http://www.kurzweilai.net/in-the-beginning-was-the-code](http://www.kurzweilai.net/in-the-beginning-was-the-code)

## I love this. Creation could then be the inverse function of Compression, starting from a minimal set.

Indeed.

## What do you think about learning selective attention with recurrent neural networks? What do you think are the promising methods in this area?

I think it is a fascinating topic. Humans and other biological systems use sequential gaze shifts to detect and recognize patterns. This can be much more efficient than fully parallel approaches to pattern recognition. To my knowledge, a quarter-century ago we had the first neural network trained with reinforcement learning (RL) to sequentially attend to relevant regions of an input image, with an adaptive attention mechanism to decide where to focus. The system used a recurrent NN-based method to learn to find target inputs through sequences of fovea saccades or “glimpses” [1,2]. (Only toy experiments - computers were a million times slower back then.) We kept working on this. For example, recently Marijn Stollenga and Jonathan Masci programmed a CNN with feedback connections that learned to control an internal spotlight of attention. Univ. Toronto and DeepMind also had recent papers on attentive NNs [4,5]. And of course, RL RNNs in partially observable environments with raw high-dimensional visual input streams learn visual attention as a by-product [6]. I like the generality of the approach in [6], and we may see many extensions of this in the future.

[1] J. Schmidhuber and R. Huber. Learning to generate focus trajectories for attentive vision. TR FKI-128-90, TUM, 1990. Images: http://people.idsia.ch/~juergen/attentive.html

[2] J. Schmidhuber and R. Huber. Learning to generate artificial fovea trajectories for target detection. International Journal of Neural Systems, 2(1 & 2):135-141, 1991

[3] M. Stollenga, J. Masci, F. Gomez, J. Schmidhuber. Deep Networks with Internal Selective Attention through Feedback Connections. NIPS 2014

[4] V. Mnih, N. Heess, A. Graves, K. Kavukcuoglu. Recurrent Models of Visual Attention. NIPS 2014.

[5] H. Larochelle and G. Hinton. Learning to combine foveal glimpses with a third-order Boltzmann machine. NIPS 2010.

[6] J. Koutnik, G. Cuccu, J. Schmidhuber, F. Gomez. Evolving Large-Scale Neural Networks for Vision-Based Reinforcement Learning. In Proc. GECCO, Amsterdam, July 2013. [http://people.idsia.ch/~juergen/compressednetworksearch.html](http://people.idsia.ch/~juergen/compressednetworksearch.html)

## Why doesn't your group post its code online for reproducing the results of competitions you've won, such as the ISBI Brain Segmentation Contest? Your results are impressive, but almost always not helpful for pushing the research forward.

We did publish lots of open source code. Our PyBrain Machine learning library [http://pybrain.org/](http://pybrain.org/) is public and widely used, thanks to the efforts of Tom Schaul, Justin Bayer, Daan Wierstra, Sun Yi, Martin Felder, Frank Sehnke, Thomas Rückstiess.

Here is the already mentioned code [http://sourceforge.net/projects/rnnl/](http://sourceforge.net/projects/rnnl/) of the first competition-winning RNNs (2009) by my former PhD student and then postdoc Alex Graves. Many are using that.

It is true though that we don’t publish all our code right away. In fact, some of our code gets tied up in industrial projects which make it hard to release.

Nevertheless, especially recently, we published less code than we could have. I am a big fan of the open source movement, and we've already concluded internally to contribute more to it. Not long ago, thanks to the work of Klaus Greff, we open-sourced Python-based [Sacred](https://github.com/IDSIA/sacred): an infrastructure framework to organize our experiments and to keep the results reproducible. Unfortunately, it’s a bit hard to find, because it turns out there already exists a famous “sacred python.”

There are also plans to release more of our recent recurrent network code soon. In particular, there are plans for a new open source library, a successor of PyBrain.

## Do you plan on delivering an online course (e.g. on coursera) for RNNs? I for one would be really excited to do the course!!

Thanks - I should! I’ve been thinking about this for years. But it takes time, and there are so many other things in the pipeline …

## What are the next big things that you a) want to or b) will happen in the world of recurrent neural nets?

The world of RNNs is such a big world because RNNs (the deepest of all NNs) are general computers, and because efficient computing hardware in general is becoming more and more RNN-like, as dictated by physics: lots of processors connected through many short and few long wires. It does not take a genius to predict that in the near future, both supervised learning RNNs and reinforcement learning RNNs will be greatly scaled up. Current large, supervised LSTM RNNs have on the order of a billion connections; soon that will be a trillion, at the same price. (Human brains have maybe a thousand trillion, much slower, connections - to match this economically may require another decade of hardware development or so). In the supervised learning department, many tasks in natural language processing, speech recognition, automatic video analysis and combinations of all three will perhaps soon become trivial through large RNNs (the vision part augmented by CNN front-ends). The commercially less advanced but more general reinforcement learning department will see significant progress in RNN-driven adaptive robots in partially observable environments. Perhaps much of this won’t really mean breakthroughs in the scientific sense, because many of the basic methods already exist. However, much of this will SEEM like a big thing for those who focus on applications. (It also seemed like a big thing when in 2011 our team achieved the first superhuman visual classification performance in a controlled contest, although none of the basic algorithms was younger than two decades: [http://people.idsia.ch/~juergen/superhumanpatternrecognition.html](http://people.idsia.ch/~juergen/superhumanpatternrecognition.html))

So what will be the real big thing? I like to believe that it will be self-referential general purpose learning algorithms that improve not only some system’s performance in a given domain, but also the way they learn, and the way they learn the way they learn, etc., limited only by the fundamental limits of computability. I have been dreaming about and working on this all-encompassing stuff since my 1987 diploma thesis on this topic, but now I can see how it is starting to become a practical reality. Previous work on this is collected here: [http://people.idsia.ch/~juergen/metalearner.html](http://people.idsia.ch/~juergen/metalearner.html)

## How on earth did you and Hochreiter come up with LSTM units? They seem radically more complicated than any other "neuron" structure I've seen, and everytime I see the figure, I'm shocked that you're able to train them. What was the insight that led to this?

In my first Deep Learning project ever, Sepp Hochreiter (1991) analysed the vanishing gradient problem [http://people.idsia.ch/~juergen/fundamentaldeeplearningproblem.html](http://people.idsia.ch/~juergen/fundamentaldeeplearningproblem.html). LSTM falls out of this almost naturally :-)

P.S.: the original LSTM did not have forget gates, which were introduced by my former PhD student Felix Gers in 1999. The forget gates (which are [fast weights](ftp://ftp.idsia.ch/pub/juergen/fastweights.pdf)) are very important for modern LSTM.

## Do you have a favorite Theory Of Consciousness (TOC)? What do you think of Guilio Tononi's Integrated Information Theory? What implications - if any - do you think "TOC" has for AGI?

Karl Popper famously said: “All life is problem solving.” No theory of consciousness is necessary to define the objectives of a general problem solver. From an AGI point of view, consciousness is at best a by-product of a general problem solving procedure.

I must admit that I am not a big fan of Tononi's theory. The following may represent a simpler and more general view of consciousness. Where do the symbols and self-symbols underlying consciousness and sentience come from? I think they come from data compression during problem solving. Let me plagiarize what I wrote earlier [1,2]:

While a problem solver is interacting with the world, it should store the entire raw history of actions and sensory observations including reward signals. The data is ‘holy’ as it is the only basis of all that can be known about the world. If you can store the data, do not throw it away! Brains may have enough storage capacity to store 100 years of lifetime at reasonable resolution [1].

As we interact with the world to achieve goals, we are constructing internal models of the world, predicting and thus partially compressing the data history we are observing. If the predictor/compressor is a biological or artificial recurrent neural network (RNN), it will automatically create feature hierarchies, lower level neurons corresponding to simple feature detectors similar to those found in human brains, higher layer neurons typically corresponding to more abstract features, but fine-grained where necessary. Like any good compressor, the RNN will learn to identify shared regularities among different already existing internal data structures, and generate prototype encodings (across neuron populations) or symbols for frequently occurring observation sub-sequences, to shrink the storage space needed for the whole (we see this in our artificial RNNs all the time). Self-symbols may be viewed as a by-product of this, since there is one thing that is involved in all actions and sensory inputs of the agent, namely, the agent itself. To efficiently encode the entire data history through predictive coding, it will profit from creating some sort of internal prototype symbol or code (e. g. a neural activity pattern) representing itself [1,2]. Whenever this representation becomes activated above a certain threshold, say, by activating the corresponding neurons through new incoming sensory inputs or an internal ‘search light’ or otherwise, the agent could be called self-aware. No need to see this as a mysterious process — it is just a natural by-product of partially compressing the observation history by efficiently encoding frequent observations.

[1] Schmidhuber, J. (2009a) Simple algorithmic theory of subjective beauty, novelty, surprise, interestingness, attention, curiosity, creativity, art, science, music, jokes. SICE Journal of the Society of Instrument and Control Engineers, 48 (1), pp. 21–32.

[2] J. Schmidhuber. Philosophers & Futurists, Catch Up! Response to The Singularity. Journal of Consciousness Studies, Volume 19, Numbers 1-2, pp. 173-182(10), 2012.

## In the community I sense sort of a conflict between the connectionists and 'Bayesians'. Their main critique to neural networks is that the inference one does is inconsistent because of lack of formulation in terms of prior and likelihood. Do you think NNs are a transient tool until there are tools that are as efficent and usable as NNs but consistent in a Bayesian framework? 

## Compared to 'symbolic AI' it is nearly impossible to find out what a 'subsymbolic' learning system such as a neural network actually has learned after training. Isn't this a big problem, when for example large amounts of stock market trading is done by such systems today? If crashes or other singularities happen we have no idea how they emerged.

You are welcome, sssub! The most general Bayesian framework for AI is Marcus Hutter’s [AIXI model](http://people.idsia.ch/~juergen/unilearn.html) based on [Ray Solomonoff](http://people.idsia.ch/~juergen/ray.html)’s universal prior. But it is practically infeasible. However, downscaled versions thereof are feasible to an extent. And in fact, there has been a long tradition of applying Bayesian frameworks to NNs (e.g., MacKay, 1992; Buntine and Weigend, 1991; Neal, 1995; De Freitas, 2003) - precise references in the [survey](http://people.idsia.ch/~juergen/deep-learning-overview.html). Connectionists and Bayesians are not incompatible. They love each other.

Regarding the second question, there also has been lots of work on extracting rules from opaque NNs, even recurrent ones, e.g.: Omlin, C. and Giles, C. L. (1996). Extraction of rules from discrete-time recurrent neural networks. Neural Networks, 9(1):41–52.

I do share your concerns about flash trading etc. by opaque methods!

## Do you have any thoughts on promising directions for long term memory, and inference using this long term memory? What do you think of the Neural Turing Machine and Memory Networks?

It is nice to see a resurgence of methods with non-standard differentiable long-term memories, such as the Neural Turing Machine and Memory Networks. In the 1990s and 2000s, there was a lot of related work. For example:

Differentiable push and pop actions for alternative memory networks called neural stack machines, which are universal computers, too, at least in principle:

S. Das, C.L. Giles, G.Z. Sun, "Learning Context Free Grammars: Limitations of a Recurrent Neural Network with an External Stack Memory," Proc. 14th Annual Conf. of the Cog. Sci. Soc., p. 79, 1992.

Mozer, M. C., & Das, S. (1993). A connectionist symbol manipulator that discovers the structure of context-free languages. NIPS 5 (pp. 863-870).

Memory networks where the control network's external differentiable storage is in the fast weights of another network:

J. Schmidhuber. Learning to control fast-weight memories: An alternative to recurrent nets. Neural Computation, 4(1):131-139, 1992

The LSTM forget gates are related to this:

F. Gers, N. Schraudolph, J. Schmidhuber. Learning precise timing with LSTM recurrent networks. JMLR 3:115-143, 2002.

“Self-referential" RNNs with special output units for addressing and rapidly manipulating each of the RNN's own weights in differentiable fashion (so the external storage is actually internal):

J. Schmidhuber. An introspective network that can learn to run its own weight change algorithm. In Proc. of the Intl. Conf. on Artificial Neural Networks, Brighton, pages 191-195. IEE, 1993.

A related LSTM RNN-based system that really learned a learning algorithm in practice:

Hochreiter, Sepp; Younger, A. Steven; Conwell, Peter R. (2001). "Learning to Learn Using Gradient Descent". ICANN 2001, 2130: 87–94.

BTW, when the latter came out, it knocked my socks off. Sepp trained LSTM networks with roughly 5000 weights to METALEARN fast online learning algorithms for nontrivial classes of functions, such as all quadratic functions of two variables. LSTM is necessary because metalearning typically involves huge time lags between important events, and standard RNNs cannot deal with these. After a month of metalearning on a slow PC of 15 years ago, all weights are frozen, then the frozen net is used as follows: some new function f is selected, then a sequence of random training exemplars of the form ...data/target/data/target/data... is fed into the INPUT units, one sequence element at a time. After about 30 exemplars the frozen recurrent net correctly predicts target inputs before it sees them. No weight changes! How is this possible? After metalearning the frozen net implements a sequential learning algorithm which apparently computes something like error signals from data inputs and target inputs and translates them into changes of internal estimates of f. Parameters of f, errors, temporary variables, counters, computations of f and of parameter updates are all somehow represented in form of circulating activations. Remarkably, the new - and quite opaque - online learning algorithm running on the frozen network is much faster than standard backprop with optimal learning rate. This indicates that one can use gradient descent to metalearn learning algorithms that outperform gradient descent. Furthermore, the metalearning procedure automatically avoids overfitting in a principled way, since it punishes overfitting online learners just like it punishes slow ones, simply because overfitters and slow learners cause more cumulative errors during metalearning.

P.S.: I self-plagiarized most of the text above from [here](http://people.idsia.ch/~juergen/metalearner.html).

## What is hot now in applying learning-as-compression as per say Vitanyi to ANNs? Will this study gain more momentum? And what about the RNN book, will it make us wait still too much :-)?

From my biased perspective, [Compressed Network Search](http://people.idsia.ch/~juergen/compressednetworksearch.html) is hot.

Regarding the [RNN book](http://people.idsia.ch/~juergen/rnnbook.html): please bear with us, and let me offer a partial excuse for the delay, namely, that the field is moving so quickly right now! In the meantime, please make do with the [Deep Learning overview](http://people.idsia.ch/~juergen/deep-learning-overview.html) which also is an RNN survey.

## Do you have any interesting sources of inspiration (art, nature, other scientific fields other then obviously neuroscience) that have helped you think differently about approaches, methodology, and solutions to your work?

In my spare time, I am trying to compose music, and create visual art.

And while I am doing this, it seems obvious to me that art and science and music are driven by the same basic principle.

I think the basic motivation (objective function) of artists and scientists and comedians is data compression progress, that is, the first derivative of data compression performance on the observed history. [I have published extensively about this](http://people.idsia.ch/~juergen/creativity.html).

A physicist gets intrinsic reward for creating an experiment leading to observations obeying a previously unpublished physical law that allows for better compressing the data.

A composer gets intrinsic reward for creating a new but non-random, non-arbitrary melody with novel, unexpected but regular harmonies that also permit compression progress of the learning data encoder.

A comedian gets intrinsic reward for inventing a novel joke with an unexpected punch line, related to the beginning of his story in an initially unexpected but quickly learnable way that also allows for better compression of the perceived data.

In a social context, all of them may later get additional extrinsic rewards, e.g., through awards or ticket sales.

## How do you recognize a promising machine learning phd student?

I am privileged because I have been able to attract and work with several truly outstanding students. But how to quickly recognize a promising student when you first meet her? There is no recipe, because they are all different! In fact, sometimes it takes a while to recognize someone’s brilliance. In hindsight, however, they all have something in common: successful students are not only smart but also tenacious. While trying to solve a challenging problem, they run into a dead end, and backtrack. Another dead end, another backtrack. But they don’t give up. And suddenly there is this little insight into the problem which changes everything. And suddenly they are world experts in a particular aspect of the field, and then find it easy to churn out one paper after another, and create a great PhD thesis.

After these abstract musings, some more concrete advice. In interviews with applicants, members of my lab tend to pose a few little problems, to see how the candidate approaches them.

## What do you think of the idea of the neocortex being a large hierarchical recurrent predictive autoencoder? It seems to be a sort of predictive architecture (I can't find the post, but Yann Lecun talked about this somewhere). Recurrent autoencoders can be used quite trivially for reinforcement learning as well (by only learning to predict with TD error is positive). Numenta's HTM is basically such a recurrent autoencoder if you really distill it down, do you think this is the right approach to AGI?

Hello CireNeikual! I like the idea of a hierarchical recurrent predictive autoencoder so much that we have [implemented it a quarter-century](http://people.idsia.ch/~juergen/firstdeeplearner.html) ago as a stack of predictive RNNs. There is also a more recent paper (Gisslen et al, 2011) on “Sequential Constant Size Compressors for Reinforcement Learning”, based on a sequential Recurrent Auto-Associative Memory (RAAM, Pollack, 1990).

Generally speaking, when it comes to Reinforcement Learning, it is indeed a good idea to train a recurrent neural network (RNN) called M to become a predictive model of the world, and use M to train a separate controller network C which is supposed to generate reward-maximising action sequences.

To my knowledge, the first such CM system with an RNN C and an RNN M dates back to 1990 (e.g., Schmidhuber, 1990d, 1991c). It builds on earlier work where C and M are feedforward NNs (e.g., Werbos, 1981, 1987; Munro, 1987; Jordan, 1988; Werbos, 1989b,a; Nguyen and Widrow, 1989; Jordan and Rumelhart, 1990). M is used to compute a gradient for the parameters of C. Details and more references can be found in Sec. 6.1 of the [survey](http://people.idsia.ch/~juergen/deep-learning-overview.html).

So does this have anything to do with AGI? Yes, it does: Marcus Hutter’s mathematically optimal [universal AIXI](http://people.idsia.ch/~juergen/unilearn.html) also has a predictive world model M, and a controller C that uses M to maximise expected reward. Ignoring limited storage size, RNNs are general computers just like your laptop. That is, AIXI’s M is related to the RNN-based M above in the sense that both consider a very general space of predictive programs. AIXI’s M, however, really looks at all those programs simultaneously, while the RNN-based M uses a limited local search method such as gradient descent in program space (also known as backprop through time) to find a single reasonable predictive program (an RNN weight matrix). AIXI’s C always picks the action that starts the action sequence that yields maximal predicted reward, given the current M, which in a Bayes-optimal way reflects all the observations so far. The RNN-based C, however, uses a local search method (backprop through time) to optimise its program or weight matrix, using gradients derived from M.

So in a way, the old RNN-based CM system of 1990 may be viewed as a limited, downscaled, sub-optimal, but at least computationally feasible approximation of AIXI.

So in a way, the old RNN-based CM system of 1990 may be viewed as a limited, downscaled, sub-optimal, but at least computationally feasible approximation of AIXI.

## Do you know of any labs doing biotech/bioinformatics that you think are worth exploring?

I know a great biotech/bioinformatics lab for this: the one of  [Deep Learning pioneer](http://people.idsia.ch/~juergen/fundamentaldeeplearningproblem.html) Sepp Hochreiter in Linz.

Sepp is back in the NN game, and his team promptly won nine out of 15 challenges in the Tox21 data challenge, including the Grand Challenge, the nuclear receptor panel, the stress response panel. Check out the [NIH (NCATS) announcement of the winners](http://www.ncats.nih.gov/news-and-events/features/tox21-challenge-winners.html) and the [leaderboard](https://tripod.nih.gov/tox21/challenge/leaderboard.jsp).

Sepp's Deep Learning approach DeepTox is described [here](http://www.bioinf.jku.at/research/DeepTox/).

## What's your opinion about Google's deepmind last publication in Nature, about AI agent which can learn to play any game?

DeepMind’s interesting system [2] essentially uses feedforward networks and other techniques from over two decades ago, namely, CNNs [5,6], experience replay [7], and temporal difference-based game playing like in the famous self-teaching backgammon player [8], which 20 years ago already achieved the level of human world champions (while the Nature paper [2] reports "more than 75% of the human score on more than half of the games"). I like the fact that they evaluate their system on a whole variety of different Atari video games.

However, I am not pleased with DeepMind's paper [2], because it claims: "While reinforcement learning agents have achieved some successes in a variety of domains, their applicability has previously been limited to domains in which useful features can be handcrafted, or to domains with fully observed, low-dimensional state spaces.” It also claims to bridge "the divide between high-dimensional sensory inputs and actions.” Similarly, the first sentence of the abstract of the earlier tech report version [1] of the article [2] claims to "present the first deep learning model to successfully learn control policies directly from high-dimensional sensory input using reinforcement learning.”

However, the first such system [3] was created earlier at my lab, the former affiliation of three authors of the Nature paper [2], two of them among the first four DeepMinders. The earlier system [3] uses recent compressed recurrent neural networks [4] to deal with sequential video inputs in partially observable environments. After minimal preprocessing in both cases [3]2, the input to both learning systems [2,3] is still high-dimensional.

The earlier system [3] indeed was able to "learn successful policies directly from high-dimensional sensory inputs using end-to-end reinforcement learning” (quote from the abstract [2]), without any unsupervised pre-training. It was successfully applied to various problems such as video game-based race car driving from high-dimensional visual input streams.

Back in 2013, neuroevolution-based reinforcement learning also successfully learned to play Atari games [9]. I fail to understand why [9] is cited in [1] but not in [2]. Numerous additional relevant references on "Deep Reinforcement Learning” can be found in Sec. 6 of a recent survey [10].

BTW, I self-plagiarised this answer from my [little web site on this](http://people.idsia.ch/~juergen/naturedeepmind.html).

References

[1] V. Mnih, K. Kavukcuoglu, D. Silver, A. Graves, I. Antonoglou, D. Wierstra, M. Riedmiller. Playing Atari with Deep Reinforcement Learning. Tech Report, 19 Dec. 2013. Link

[2] V. Mnih, K. Kavukcuoglu, D. Silver, A. A. Rusu, J. Veness, M. G. Bellemare, A. Graves, M. Riedmiller, A. K. Fidjeland, G. Ostrovski, S. Petersen, C. Beattie, A. Sadik, I. Antonoglou, H. King, D. Kumaran, D. Wierstra, S. Legg, D. Hassabis. Human-level control through deep reinforcement learning. Nature, vol. 518, p 1529, 26 Feb. 2015. Link

[3] J. Koutnik, G. Cuccu, J. Schmidhuber, F. Gomez. Evolving Large-Scale Neural Networks for Vision-Based Reinforcement Learning. In Proc. Genetic and Evolutionary Computation Conference (GECCO), Amsterdam, July 2013. [http://people.idsia.ch/~juergen/gecco2013torcs.pdf](http://people.idsia.ch/~juergen/gecco2013torcs.pdf). Overview

[4] J. Koutnik, F. Gomez, J. Schmidhuber. Evolving Neural Networks in Compressed Weight Space. In Proc. Genetic and Evolutionary Computation Conference (GECCO-2010), Portland, 2010. [PDF](http://people.idsia.ch/~juergen/gecco2010koutnik.pdf)

[5] K. Fukushima, K. (1979). Neural network model for a mechanism of pattern recognition unaffected by shift in position - Neocognitron. Trans. IECE, J62-A(10):658-665.

[6] Y. LeCun, B. Boser, J. S. Denker, D. Henderson, R. E. Howard, W. Hubbard, L. D. Jackel. Back-propagation applied to handwritten zip code recognition. Neural Computation, 1(4):541-551, 1989

[7] L. Lin. Reinforcement Learning for Robots Using Neural Networks. PhD thesis, Carnegie Mellon University, Pittsburgh, 1993.

[8] G. Tesauro. TD-gammon, a self-teaching backgammon program, achieves master-level play. Neural Computation, 6(2):215-219, 1994.

[9] M. Hausknecht, J. Lehman, R. Miikkulainen, P. Stone. A Neuroevolution Approach to General Atari Game Playing. IEEE Transactions on Computational Intelligence and AI in Games, 16 Dec. 2013.

[10] J. Schmidhuber. Deep Learning in Neural Networks: An Overview. Neural Networks, vol. 61, 85-117, 2015 (888 references, published online in 2014). [Link](http://people.idsia.ch/~juergen/deep-learning-overview.html)

## In what field do you think machine learning will make the biggest impact in the next ~5 years?

I think it depends a bit on what you mean by "impact". Commercial impact? If so, in a related answer I write: Both supervised learning recurrent neural networks (RNNs) and reinforcement learning RNNs will be greatly scaled up. In the commercially relevant supervised department, many tasks such as natural language processing, speech recognition, automatic video analysis and combinations of all three will perhaps soon become trivial through large RNNs (the vision part augmented by CNN front-ends).

“Symbol grounding” will be a natural by-product of this. For example, the speech or text-processing units of the RNN will be connected to its video-processing units, and the RNN will learn the visual meaning of sentences such as “the cat in the video fell from the tree”. Such RNNs should have many commercial applications.

I am not so sure when we will see the first serious applications of reinforcement learning RNNs to real world robots, but it might also happen within the next 5 years.

## AIXI has MC-AIXI1. Is there, or will there be something like that for Gödel Machines

What are some of the best achievements of artificial creativity, in your mind, both in the academic and commercial fields ?

## What do you see as your most significant work/contribution to the domain of machine learning?
## And will we get something better wrt training set size/time than backprop optimizer any time soon?

You are welcome, sorm20. I like various ways of searching the program space of general computers, including supervised, unsupervised, and reinforcement learning recurrent neural networks, whose programs are weight matrices. I like the simple formal theory of fun. I like the work on self-referential, self-modifying programs that improve themselves and the way they improve themselves, etc. Your second question is partially answered by the last paragraph of a previous reply, which mentions a system that uses backprop to meta-learn a new learning algorithm that is faster than standard backprop with optimal learning rate, at least for the limited domain of quadratic functions.

## What's something exciting you're working on right now, if it's okay to be specific?

Among other things, we are working on the “RNNAIssance” - the birth of a Recurrent Neural Network-based Artificial Intelligence (RNNAI). This is about a reinforcement learning, RNN-based, increasingly general problem solver.

## Why has there been such little work on more complicated activation functions like polynomials, exponentials, etc. (the only paper I saw was a cubic activation for NN for dependency parsing). Is the training too difficult or are those types of functions generally not that useful?

In fact, the Deep Learning (DL) models of the first DL pioneer Ivakhnenko did use more complicated activation functions. His networks trained by the Group Method of Data Handling (GMDH, Ivakhnenko and Lapa, 1965; Ivakhnenko et al., 1967; Ivakhnenko, 1968, 1971) were perhaps the first DL systems of the Feedforward Multilayer Perceptron type. A paper from 1971 already described a deep GMDH network with 8 layers (Ivakhnenko, 1971). The units of GMDH nets may have polynomial activation functions implementing Kolmogorov-Gabor polynomials. There have been numerous applications of GMDH-style nets, e.g. (Ikeda et al., 1976; Farlow, 1984; Madala and Ivakhnenko, 1994; Ivakhnenko, 1995; Kondo, 1998; Kordik et al., 2003; Witczak et al., 2006; Kondo and Ueno, 2008). See Sec. 5.3 of the [survey](http://people.idsia.ch/~juergen/deep-learning-overview.html) for precise references.

Many later models combine additions and multiplications in locally more limited ways, often using multiplicative gates. One of my personal favourites is LSTM with multiplicative forget gates (Gers et al., 2000).

## What do you think a small research institute (in Germany) can do to improve changes for funding of their projects?

I only have a trivial suggestion: publish some promising results! When my co-director Luca Maria Gambardella and myself took over IDSIA in 1995, it was just a small outfit with a handful of researchers. With Marco Dorigo and others, Luca started publishing papers on Swarm Intelligence and Ant Colony Optimization. Today this stuff is famous, but back then it was not immediately obvious that this would become such an important field. Nevertheless, the early work helped to acquire grants and grow the institute. Similarly for the neural network research done in my group. Back then computers were 10,000 times slower than today, and we had to resort to toy experiments to show the advantages of our (recurrent) neural networks over previous methods. It certainly was not obvious to all reviewers that this would result in huge commercial hits two decades later. But the early work was promising enough to acquire grants and push this research further.

## Do you mostly agree with Ray Kurzweil's point of view (predictions...)?

I guess this is related to my previous answer regarding Science Fiction (SF). Ray Kurzweil is promoting the idea of a “technological singularity” - compare the books of Frank Tipler (1986-) and Hans Moravec (1988).

I first became aware of the idea in the 1980s, through Vernor Vinge’s first SF novels about the technological singularity, e.g., “The Peace War” (1984). Later I learned that the concept goes back at least to Stanislaw Ulam in the 1950s. Today, however, I prefer to call the singularity “Omega,” because that’s what Teilhard de Chardin called it 100 years ago, and because it sounds so much like “Oh my God.”

Are 40,000 years of human-dominated history about to converge in an Omega point within the next few decades? In 2006 I described a historic pattern that seems to confirm this. Essential historic developments (that is, the subjects of major chapters in many history textbooks) match a binary scale marking exponentially declining temporal intervals, each half the size of the previous one and equal to a power of 2 times a human lifetime (roughly 80 years - throughout recorded history many individuals have reached this age). It seems that history itself is about to converge around 2040 in some sort of Omega point; compare this TEDx talk transcript.

However, I also wrote that one should take this with a ton of salt. Is this impression of acceleration just a by-product of the way humans allocate memory space to past events? Maybe there is a general rule for both the individual memory of individual humans and the collective memory of entire societies and their history books: constant amounts of memory space get allocated to exponentially larger, adjacent time intervals deeper and deeper in the past. For example, events that happened between 2 and 4 lifetimes ago get roughly as much memory space as events in the previous interval of twice the size. Presumably only a few "important" memories will survive the necessary compression. Maybe that's why there has never been a shortage of prophets predicting that the end is near - the important events according to one's own view of the past always seem to accelerate exponentially.

Now look at TIME LIFE magazine's 1999 list of the “most important events of the past millennium:”

1 Printing Press (1444)

2 Last Discovery of America (1492)

3 Protestantism, only major new religious movement of the past millennium (1517)

I guess the singularitarians of the year 1525 felt inclined to predict a convergence of history around 1540, deriving this date from an exponential speedup of recent breakthroughs such as Western bookprint (1444), the re-discovery of America (48 years later), the Reformation (again 24 years later - see the pattern?), and other events they deemed important although today they are mostly forgotten.

Anyway, for the sheer fun of it, here is an incredibly precise exponential acceleration pattern that reaches back all the way to the Big Bang. It’s a history of the perhaps most important events from a human perspective. The error bars on most dates below seem less than 10% or so :-)

Ω = 2040-2050 or so

|Ω|- 13.8 B years:|Big Bang|
|Ω - 1/4 of this time:|Ω - 3.5|B years: first life on Earth|
|Ω - 1/4 of this time:|Ω - 0.9|B years: first animal-like life|
|Ω - 1/4 of this time:|Ω - 220|M years: first mammals|
|Ω - 1/4 of this time:|Ω - 55|M years: first primates|
|Ω - 1/4 of this time:|Ω - 13|M years: first hominids|
|Ω - 1/4 of this time:|Ω - 3.5|M years: first stone tools|
|Ω - 1/4 of this time:|Ω - 850|K years: first controlled fire|
|Ω - 1/4 of this time:|Ω - 210|K years: first anatomically modern man|
|Ω - 1/4 of this time:|Ω - 50|K years: first behaviorally modern man|
|Ω - 1/4 of this time:|Ω - 13|K years: first civilisation, neolithic revolution|
|Ω - 1/4 of this time:|Ω - 3.3|K years: iron age|
|Ω - 1/4 of this time:|Ω - 800|years: first guns & rockets (in China)|
|Ω - 1/4 of this time:|Ω - 200| years: industrial revolution|
|Ω - 1/4 of this time:|Ω - 50|years: digital nervous system, WWW, cell phones for all|
|Ω - 1/4 of this time:|Ω - 12|years: small computers with 1 brain power?|
|Ω - 1/4 of this time:|Ω - 3|years: ??|
|Ω - 1/4 of this time:|Ω - 9|months:????|
|Ω - 1/4 of this time:|Ω - 2|months:????????|
|Ω - 1/4 of this time:|Ω - 2|weeks: ????????????????|


I first talked about this ultimate long-term trend at the trendforum 2014. No idea why it keeps hitting 1/4 points so precisely :-)

## How do we get from supervised learning to fully unsupervised learning

When we started explicit Deep Learning research in the early 1990s, we actually went the other way round, from unsupervised learning (UL) to supervised learning (SL)! To overcome the [vanishing gradient problem](http://people.idsia.ch/~juergen/fundamentaldeeplearningproblem.html), I proposed a generative model, namely, an [unsupervised stack of RNNs](ftp://ftp.idsia.ch/pub/juergen/chunker.pdf) (1992). The first RNN uses UL to predict its next input. Each higher level RNN tries to learn a compressed representation of the info in the RNN below, trying to minimise the description length (or negative log probability) of the data. The top RNN may then find it easy to classify the data by supervised learning. One can also “distill” a higher RNN (the teacher) into a lower RNN (the student) by forcing the lower RNN to predict the hidden units of the higher one (another form of unsupervised learning). Such systems could solve previously unsolvable deep learning tasks.

However, then came supervised [LSTM](http://people.idsia.ch/~juergen/rnn.html), and that worked so well in so many applications that we shifted focus to that. On the other hand, LSTM can still be used in unsupervised mode as part of an RNN stack like above. This illustrates that the boundary between supervised and unsupervised learning is blurry. Often gradient-based methods such as backpropagation are used to optimize objective functions for both types of learning.

So how do we get back to fully unsupervised learning? First of all, what does that mean? The most general type of unsupervised learning comes up in the general reinforcement learning (RL) case. Which unsupervised experiments should an agent's RL controller C conduct to collect data that quickly improves its predictive world model M, which could be an unsupervised RNN trained on the history of actions and observations so far? The simple [formal theory of curiosity and creativity](http://people.idsia.ch/~juergen/creativity.html) says: Use the learning progress of M (typically compression progress in the MDL sense) as the intrinsic reward or fun of C. I believe this general principle of active unsupervised learning explains all kinds of curious and creative behaviour in art and science, and we have built simple [artificial "scientists”](http://people.idsia.ch/~juergen/interest.html) based on approximations thereof, using (un)supervised gradient-based learners as sub-modules.

## Where do you see the field of machine learning 5, 10, and 20 years from now?

Even (minor extensions of) existing machine learning and neural network algorithms will achieve many important superhuman feats. I guess we are witnessing the ignition phase of the field’s explosion. But how to predict turbulent details of an explosion from within?

Earlier I tried to reply to questions about the next 5 years. You are also asking about the next 10 years. In 10 years we’ll have 2025. That’s an interesting date, the centennial of the first transistor, patented by Julius Lilienfeld in 1925. But let me skip the 10 year question, which I find very difficult, and immediately address the 20 year question, which I find even much, much more difficult.

We are talking about 2035, which also is an interesting date, a century or so after modern theoretical computer science was created by [Goedel](http://people.idsia.ch/~juergen/goedel.html) (1931) & Church/[Turing](http://people.idsia.ch/~juergen/turing.html)/Post (1936), and the patent application for the first working general program-controlled computer was filed by [Zuse](http://people.idsia.ch/~juergen/zuse.html) (1936). Assuming Moore’s law will hold up, in 2035 computers will be more than 10,000 times faster than today, at the same price. This sounds more or less like a human brain power in a small portable device. Or the human brain power of a city in a larger computer.

Given such raw computational power, I expect huge (by today’s standards) [recurrent neural networks](http://people.idsia.ch/~juergen/rnn.html) on dedicated hardware to simultaneously perceive and analyse an immense number of multimodal data streams (speech, texts, video, many other modalities) from many sources, learning to correlate all those inputs and use the extracted information to achieve a myriad of commercial and non-commercial goals. Those RNNs will continually and quickly learn new skills on top of those they already know. This should have innumerable applications, although I am not even sure whether the word “application” still makes sense here.

This will change society in innumerable ways. What will be the cumulative effect of all those mutually interacting changes on our civilisation, which will depend on machine learning in so many ways? [In 2012](http://people.idsia.ch/~juergen/newmillenniumai2012.pdf), I tried to illustrate how hard it is to answer such questions: A single human predicting the future of humankind is like a single neuron predicting what its brain will do.

I am supposed to be an expert, but my imagination is so biased and limited - I must admit that I have no idea what is going to happen. It just seems clear that everything will change. Sorry for completely failing to answer your question.

## I am starting a CS Bachelor this September at ETH. Primarily because I want to get into AI/ML/NN research and creation. It simply is the most important thing there is:D What should i do to be able to join your group in Lugano, what are you looking for in your research assistants? Thanks and cheers

Thanks a lot for your interest! We’d like to see: mathematical skills, programming skills, willingness to work with others, creativity, dedication, enthusiasm (you seem to have enough of that :-)

## Do you think that some of the well-working deep learning models that are around at the moment could tell us something about the brain, e.g. about the visual or auditory system? I am wondering about how to investigate this.

I tried to answer a related question in a [recent interview](https://innsbigdata.wordpress.com/2015/02/09/interview-with-juergen-schmidhuber/).

Artificial NNs (ANNs) can help to better understand biological NNs (BNNs) in at least two ways. One is to use ANNs as tools for analyzing BNN data. For example, given electron microscopy images of stacks of thin slices of animal brains, an important goal of neuroscientists is to build a detailed 3D model of the brain’s neurons and dendrites. However, human experts need many weeks to annotate the images: Which parts depict neuronal membranes? Which parts are irrelevant background? This needs to be automated (e.g., Turaga et al., 2010). Our team with Dan Ciresan and Alessandro Giusti used ensembles of deep GPU-based max-pooling (MP) convolutional networks (CNNs) to solve this task through experience with many training images, and won the [ISBI 2012 brain image segmentation contest](http://people.idsia.ch/~juergen/deeplearningwinsbraincontest.html).

Another way of using ANNs to better understand BNNs is the following. The feature detectors learned by single-layer visual ANNs are similar to those found in early visual processing stages of BNNs. Likewise, the feature detectors learned in deep layers of visual ANNs should be highly predictive of what neuroscientists will find in deep layers of BNNs. While the visual cortex of BNNs may use quite different learning algorithms, its objective function to be minimized may be rather similar to the one of visual ANNs. In fact, results obtained with relatively deep artificial NNs (Lee et al., 2008, Yamins et al., 2013) seem compatible with insights about the visual pathway in the primate cerebral cortex, which has been studied for many decades. More reference details on this in the [survey](http://people.idsia.ch/~juergen/deep-learning-overview.html).

## Do you think that recurrent neural networks will take over speech recognition?

Absolutely! In fact, they already did. 20 years ago many thought I am crazy to predict that RNNs will eventually replace traditional speech recognisers. But now, with much faster computers, this has become a practical and commercial reality.

A first breakthrough of deep RNNs for speech recognition came in 2007, when stacks of [LSTM RNNs](http://people.idsia.ch/~juergen/rnn.html) outperformed traditional systems in limited domains, e.g., (Fernandez et al., IJCAI 2007). By 2013, LSTM achieved best known results on the famous TIMIT phoneme recognition benchmark (Graves et al., ICASSP 2013).

Major industrial applications came in 2014, first in form of an LSTM front end combined with the traditional approach. That's how Google improved large-vocabulary speech recognition [(Sak et al., 2014a)](https://arxiv.org/abs/1402.1128).

Now it seems likely though that the traditional GMM/HMM approach will be entirely abandoned in favor of purely RNN-based, end-to-end speech recognition. For example, a team at Baidu [(Hannun et al, 2014)](https://arxiv.org/abs/1412.5567) in Andrew Ng's group trained RNNs by Connectionist Temporal Classification (CTC) (Graves et al., ICML 2006), and broke a famous speech recognition benchmark record. They also made a [big announcement](https://www.forbes.com/sites/roberthof/2014/12/18/baidu-announces-breakthrough-in-speech-recognition-claiming-to-top-google-and-apple/) on this in Forbes magazine.

Also, have a look at the recent [Interspeech 2014](http://www.interspeech2014.org/public.php?page=program_details.html). Many papers there were on LSTM RNNs.

## I just took my first machine learning course and I'm interested in learning more about the field. Where do you recommend I start? Do you have any books, tutorials, tips to recommend?

Here is a very biased list of books and links that I found useful for students entering our lab (other labs may emphasize different aspects though):

- Sipser’s broad [Introduction to the Theory of Computation](http://www.cs.virginia.edu/~robins/Sipser_2006_Second_Edition_Problems.pdf)
- [A comprehensive Survey of Deep Learning](http://people.idsia.ch/~juergen/deep-learning-overview.html)
- [Bishop's Pattern Recognition and Machine Learning](http://research.microsoft.com/en-us/um/people/cmbishop/prml/) (bible of traditional machine learning, probabilistic view)
- Thesis of Graves (ex-IDSIA) on [Supervised Sequence Labelling with Recurrent Networks](https://www.cs.toronto.edu/~graves/preprint.pdf) (RNNs, not much of this in Bishop's book)
- Overview of [recurrent neural networks](http://people.idsia.ch/~juergen/rnn.html) with lots of papers
- State of the art [pattern recognition with deep neural nets](http://www.idsia.ch/~juergen/deeplearning.html) on GPUs (lots of recent papers)
- Sutton & Barto's [Introduction to Reinforcement Learning](http://www.cs.ualberta.ca/~sutton/book/the-book.html)(survey of traditional RL)
- Kaelbling et al.s [Broader Survey of Reinforcement Learning](http://www.cs.cmu.edu/afs/cs/project/jair/pub/volume4/kaelbling96a.pdf)
- Papers on [CoSyNe and Natural Evolution Strategies](http://people.idsia.ch/~juergen/evolution.html)
- Other recent papers on [RNNs that learn control without teachers](http://people.idsia.ch/~juergen/rl.html), by Gomez, Koutnik, Wierstra, Schaul, Sehnke, Peters, Osendorfer, Rueckstiess, Foerster, Togelius, Srivastava, and others
- [Compressed Network Search](http://people.idsia.ch/~juergen/compressednetworksearch.html)
- Overviews of artificial [curiosity](http://people.idsia.ch/~juergen/interest.html) and [creativity](http://people.idsia.ch/~juergen/creativity.html)

Theoretically optimal universal stuff:

- M. Hutter (ex-IDSIA): [Universal Artificial Intelligence](http://www.hutter1.net/). THE book on mathematically optimal universal AI / general problem solvers / universal reinforcement learners (goes far beyond traditional RL and previous AI methods)
- Overview sites on [universal RL/AI](http://people.idsia.ch/~juergen/unilearn.html) and [Goedel machine](http://people.idsia.ch/~juergen/goedelmachine.html) and [optimal program search](http://people.idsia.ch/~juergen/optimalsearch.html) and [incremental search in program space](http://www.idsia.ch/~juergen/oops.html)
- M. Li and P. M. B. Vitanyi. An Introduction to Kolmogorov Complexity and its Applications (2nd edition). Springer, 1997. THE survey of algorithmic information theory, based on the original work by Kolmogorov and Solomonoff. Foundation of universal optimal predictors and compressors and general inductive inference machines.

## What are some of the most exciting papers that you have read (or written) in the past year?

 Last year I got excited about industrial breakthroughs of our recurrent neural networks. They are now helping to revolutionize speech processing and other sequence learning domains, especially the [Long Short-Term Memory (LSTM)](http://people.idsia.ch/~juergen/rnn.html) developed in my research groups in the 1990s and 2000s (main PhD theses by Sepp Hochreiter 1999, Felix Gers 2001, Alex Graves 2008, main postdoc contributors: Fred Cummins, Santiago Fernandez, Faustino Gomez). Here some recent benchmark records achieved with LSTM, often at big IT companies:

- Text-to-speech synthesis (Fan et al., Microsoft, Interspeech 2014)
- Language identification (Gonzalez-Dominguez et al., Google, Interspeech 2014)
- Large vocabulary speech recognition (Sak et al., Google, Interspeech 2014)
- Prosody contour prediction (Fernandez et al., IBM, Interspeech 2014)
- Medium vocabulary speech recognition (Geiger et al., Interspeech 2014)
- English to French translation (Sutskever et al., Google, NIPS 2014)
- Audio onset detection (Marchi et al., ICASSP 2014)
- Social signal classification (Brueckner & Schulter, ICASSP 2014)
- Arabic handwriting recognition (Bluche et al., DAS 2014)
- TIMIT phoneme recognition (Graves et al., ICASSP 2013)
- Optical character recognition (Breuel et al., ICDAR 2013)
- Image caption generation (Vinyals et al., Google, 2014)
- Video to textual description (Donahue et al., 2014)
- Photo-real talking heads (Soong and Wang, Microsoft, 2014).
- Semantic Representations (Kai Sheng Tai et al., 2015)
- Learning Video Representations (Srivastava et al., 2015)
- Video Description Generation (Li Yao et al., 2015)

Also check out recent end-to-end speech recognition (Hannun et al., Baidu, 2014) with our CTC-based RNNs (Graves et al., 2006), without any HMMs etc.

Many of the references above can be found in my recent[] Deep Learning survey](http://people.idsia.ch/~juergen/deep-learning-overview.html), whose write-up consumed quite some time, because I wanted to get the history right: who started Deep Learning, [who invented backpropagation](http://people.idsia.ch/~juergen/who-invented-backpropagation.html), what has been going on in Deep Reinforcement Learning, etc, etc. In the end I had 888 references on 88 pages.