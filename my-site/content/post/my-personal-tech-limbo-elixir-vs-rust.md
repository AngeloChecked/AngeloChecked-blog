---
title: My Personal Tech Limbo (and Elixir vs Rust)  
description: My corrupted state of mind by hype cycle, fomo, overchoice and information overload 
date: 2022-06-13T16:00:00.000Z
categories:
  - "Learning"
sidebar: false
thumbnail:
  src: "img/elixir_vs_rust_resized.jpeg"
  visibility:
    - "list"
toc: false 
tags:
  - "Elixir"
  - "Rust"
  - "Programming languages"
  - "Cognitive Bias"
  - "Information Overload"
  - "FOMO"
  - "Hype Cycle"
---


# Another programming language battle?
**Elixir vs Rust** 

*who will be the winner?*


![rust vs elixir](/img/elixir_vs_rust.jpeg)


### Why

I wanted to write this article because I need a place to release all my suppressed emotions. My brain is obsessed with programming languages. 
I'm in the [Tech Hype Cycle](https://t.co/8fNXpP7IkE) and instead of deep learning real stuff I'm procrastinating in a [paradox of choice](https://youtu.be/VO6XEQIsCoM), [information overload](https://youtu.be/Z0ztO86ImQg) and [FOMO](https://t.co/0TB2b20OX4) hell.
I want to pick a programming language to learn and focus on it. But I can't choose. 
This article is the sum of all my output considerations caused by my current state of mind.

#### **Why pick a new programming language**

I have always been a big fanatic about switching from different programming languages: Ruby, Java, Kotlin, JavaScript, TypeScript, Python, C#... In the end, I always thought that the language I use doesn't matter a lot, but this thinking changed when I discovered Scala and the functional programming paradigm. I fell in love with it. After that, I started an exploration into the most obscure areas of programming niches: Clojure, Haskell, Elm, Erlang, Elixir, F#, APL, Factor... and [many others](https://www.rosettacode.org/wiki/FizzBuzz). 

I have always dealt with these languages passively with the consideration I never used them. But the reality was that I was stuck in the hype cycle limbo: passing from language to language without learning anything.
The event that helped me to get out of this situation was joining a motivated Haskell meetup study group.

Learning the basics of Haskell was an extraordinary mind-blowing activity. The strange syntax and concepts behind Monoid, Applicative, Functors and Monad opened my mind to previously unimaginable solutions.

**Lessons learned**

1. It was thanks to skilled and motivated people that I was able to break my procrastination loop.
2. learning an alien programming language is a profound activity that can during more than a year and requires great focus and commitment.
3. sometimes absorbing new stuff requires unlearning and unlearning is way harder than learning: [What You Already Know Can Hurt You](https://www.exaptive.com/blog/einstellung-effect-0).
4. If in my day by day I'm not exposed to different solutions, I need to make effort to find them. Only learning different approaches is worth: [ learn to change the way you think](https://medium.com/hackernoon/dont-learn-a-syntax-learn-to-change-the-way-you-think-18436807012d).

---
### Today

I stop myself to learn Haskell, this programming language can be a tasty drug towards an infinite [internet rabbit hole](https://icebergcharts.com/i/Rabbit_Holes) but of esoteric math and category theory (I found it terrifying and interesting at the same time).

I want to learn something other, I'm looking for something more practical and similar to Haskell in the learning experience. 

The problem is that now I'm in the hype cycle hell again. The paradox of choice and procrastination makes me suffer and obsessed in find motivations to pick one or the other. I want to expel some here. 

---

### Rust

I note some similarities between Rust and Haskell (generics, traits, derve annotations). It takes inspiration from the most practical parts of functional programming, but it's definitively not a functional programming language. 

The main reason to pick Rust for a project is for dealing with performance and problems where you don't want a garbage collector. This characteristic makes the language in the same niche as C and C++ but with some differences:  the entire language design and compiler are architected in order to release the memory and avoid any memory issues (race conditions too) at compile time. 

Rust is a system programming language. It has been created by Mozilla with the goal to prevent issues in the domains of operative system and browser development. 

To achieve this goal the compiler is considered an extraordinary teacher but strict like Mormons. 

![rust developer compiler cycle](/img/rust_developer_compiler_cycle.jpeg)

The influence of ML-derived programming languages makes Rust extremely suitable for correctness. Rust programs do not compile if all compiler formal rules are satisfied. This feature is enormously powerful in order to prevent errors before going into production. 
Moreover, the design cover not only memory issues but the most common programming errors: 
- It avoids [the billion-dollar mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/) 
- It prevents function signatures from lying by avoiding crashes and exceptions.
- it embraces the philosophy of [Make illegal states unrepresentable](https://blog.janestreet.com/effective-ml-revisited/).

This can be a little bit frustrating, but compiler error messages are extremely user-friendly and well documented. 

**It is a system programming language, which means**

Concepts like lifetime, borrow checker, memory ownership, smart pointers... are permeant in the entire ecosystem. A good resume [here](https://medium.com/theburningmonk-com/rust-memory-safety-without-garbage-collector-d6a25b23c036) and  [here](https://cheats.rs/#memory-lifetimes).

Commonly, high-level programming languages are many times more focused on business logic by delegating tedious memory management tasks to the garbage collector. Rust is different from C and C++ because it is the compiler that does the garbage collector tasks for you. But all C, C++, and Rust require the developer to be aware of how memory is handled in the program.


**What are the memory awareness implications?**

[Many choices and a lot of different ways to do the same thing.](https://stackoverflow.com/questions/64769333/rust-used-to-have-a-ton-of-pointer-types-what-were-they-and-what-happened-to-e)

![rust choices](/img/rust_choices.jpeg)

I am not a system programmer... my languages are Kotlin and TypeScript. Mainly I develop web applications and microservices. In my day-by-day, it is very uncommon to think about what the garbage collector does for me. 

**It is what I want. Am I looking for something to destroy my normal way of thinking? Right?**

*But also I'm looking for something practical*

![rust risk learning curve](/img/learning_curve.jpg)

If I start learning Rust, I fear the [learning curve](https://endler.dev/2017/go-vs-rust/) will take me into another rabbit hole. Some super cool articles scared me:
- The Darklang compiler rewrite: [#1]( https://blog.darklang.com/new-backend-fsharp/) [#2](https://blog.darklang.com/leaving-ocaml/) [#3](https://blog.darklang.com/why-dark-didnt-choose-rust/)
- [Rust Is Hard, Or: The Misery of Mainstream Programming](https://hirrolot.github.io/posts/rust-is-hard-or-the-misery-of-mainstream-programming.html)
- [Murphy law](https://en.wikipedia.org/wiki/Murphy%27s_law) vs [uncle bob dark path](http://blog.cleancoder.com/uncle-bob/2017/01/11/TheDarkPath.html)

**Trends, ecosystem considerations, and opportunities**

I tried to follow the programming tends many times. I started to think that it was a pretty useless activity. Trends are unstable and hard to predict. When I follow trends, I become corrupted by information anxiety, which boosts my FOMO. It doesn't help me.

But in this obsessed state of mind, I collected a lot of sources of these useless trends: [google trends](https://trends.google.com/trends/explore?date=all&q=%2Fm%2F0pl075p,%2Fm%2F0dsbpg6)
[tiobe index](https://www.tiobe.com/tiobe-index)
[pypl index](https://pypl.github.io/PYPL.html)
[github stats](https://madnight.github.io/githut)
[stackoverflow](https://insights.stackoverflow.com/survey/2021#most-popular-technologies-language)
[hackernews jobs trends]( https://www.hntrends.com/2022/april.html)
[redmonk](https://redmonk.com/sogrady/2022/03/28/language-rankings-1-22/)

the language seems to be particularly loved, I don't know what its means, a lot of people are interested in it but I always considered this piece of information tricky and can be easily subjected to fluctuation.
Rust always ranks on average in the top 10-20 places in the most famous languages lists. However the most important factor here is not the ranking, but the incredible growth that rust has been having in recent times.  Rust is cited in a cool video about [OSS trends](https://www.youtube.com/watch?v=jtARZe1ioJU&t=6s) and the Crate package manager presents [an anomalously large number of libraries for the language age and learning curve](https://libraries.io/platforms). It was born in 2010.

A super interesting point of view is the [Jetbrain Survey](https://www.jetbrains.com/lp/devecosystem-2021/rust/). The language appears to be used primarily by hobbyists. But several articles "on the internet" (some: [1](https://twitter.com/oskargroth/status/1301502690409709568) [2](https://preettheman.medium.com/this-is-what-apple-uses-rust-for-37ddfb9e9237) [3](https://thenewstack.io/this-week-in-programming-microsoft-gets-rusty/) [4](https://twitter.com/theburningmonk/status/1334467949369896961)) write that even the big techs love Rust.

But what is the Rust niche? When we think about a DSL, the purpose of SQL is well defined. But what about Rust? 

What kind of software I should create with it? Complex command-line interface, compile-time-checked and safe software, embedded software and operative systems, cloud infrastructure (such as database, DNS...), low-level library wrappers, k8s microservices, game engines, desktop applications, heavy computation software, graphic, high-performant web server, high performant parsers, protocol, and network programming... some famous projects are AWS Firecracker, Mozilla Servo, Deno, Rust for Linux, Coreutils... why I do not choose something more mature? The [Lindy Effect](https://en.wikipedia.org/wiki/Lindy_effect) affects any new language or technology. Only if the technology is disruptive will it be chosen and used. 

Definitely, I think that the concrete purpose of the language is not well defined, the ecosystem is divided into many smaller and very different niches.


**The Rust trade-off**

Rust has a lot of interesting good characteristics: compiles to a single and distributable binary; it is inherently fast; it requires less memory and CPU than any other programming language; Cargo is a great package manager; the language design is modern and captures a lot of possible bugs at compile time. 

But some cons are: the environment tooling isn't mature as Java; the compile time is slow, any CI pipeline needs to be optimized very well and the day-by-day development feedback or feature iteration can be negatively affected. You need to think a lot about memory. The learning curve is high and it can be difficult for a team to both hire and train new developers. Libraries may be lacking or have some gaps in stability and [the concurrency is a very difficult and constantly evolving topic](https://www.reddit.com/r/rust/comments/v3cktw/rust_is_hard_or_the_misery_of_mainstream/ib0mp49/?utm_source=share&utm_medium=web2x&context=3).

---

### Elixir

The [Elixir design](https://joearms.github.io/#2013-05-31%20A%20week%20with%20Elixir) is the fusion between Erlang and Ruby. And I consider the Erlang design a fusion of Prolog and Haskell. 

The main reason to pick Elixir is that you know and want to take advantage of Beam the Erlang virtual machine. Fundamentally Erlang and Elixir are the same single thing. Elixir improves Erlang's syntax in order to make it a less niche language and more suitable for web development, giving it a better development experience and reliability to many more users.
Elixir is a functional programming language, but unlike the ML family, it is not typed and does not aim for absolute correctness or purity.

In 1986 Ericsson created Erlang with the pragmatic purpose of handling fault-tolerant and soft real-time telecommunications traffic. 
To achieve the goal of building fast, scalable, near-failure-tolerant network applications (see [uptime](https://en.wikipedia.org/wiki/Uptime)), the authors had to address the hard problems of [distributed systems](https://erlang.org/download/armstrong_thesis_2003.pdf) and enclose the solutions at the core of the Bream ([see the Erlang version of](http://erlang.org/pipermail/erlang-questions/2008-January/032226.html) [Greenspun's tenth rule](https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule)). 

Going deeper, an application written with this language is a kind of operating system that manages several distributed concurrent virtual processes that send messages to each other. These processes are lightweight, they can crash and restart in total isolation without knowing which machine is running the code or any impact on uptime. This particular architecture is called [Actor Model](https://en.wikipedia.org/wiki/Actor_model) and a particular set of libraries called [OTP](https://github.com/erlang/otp) give the language simple but powerful structures for developing distributed systems.

**is It what I want?**

![The 9th Circle of Erl](https://learnyousomeerlang.com/static/img/9-circles-of-erl.png)

[Reading about the Erlang community hype phase](https://ferd.ca/ten-years-of-erlang.html?utm_source=pocket_mylist) is common for people to come and go. The goal for me should be to learn something new and mind-blowing. But I'm afraid to go into a rabbit hole. What exactly is my goal? Should I reach the 5th step and move on or try to go deeper? What is the best balance between profit and investment?

**Trends, ecosystem considerations, and opportunities**

Again: [google trends](https://trends.google.com/trends/explore?date=all&q=%2Fm%2F0pl075p,%2Fm%2F0dsbpg6)
[tiobe index](https://www.tiobe.com/tiobe-index)
[pypl index](https://pypl.github.io/PYPL.html)
[github stats](https://madnight.github.io/githut)
[stackoverflow](https://insights.stackoverflow.com/survey/2021#most-popular-technologies-language)
[hackernews jobs trends]( https://www.hntrends.com/2022/april.html)
[redmonk](https://redmonk.com/sogrady/2022/03/28/language-rankings-1-22/)

Well, the conclusions of my pointless impressions of Elixir's panoramic trends are that Elixir is a smaller niche than Rust. This may be caused by Rust's mainstream momentum, but all the data gives me the impression that Rust has more opportunities to become a relevant language than Elixir.

But I want to put another point of view on the plate of the arguments. Erlang is less affected by the [Lindy Effect](https://en.wikipedia.org/wiki/Lindy_effect) than Rust. Erlang in its telecommunications super small niche has been a beast for more than 30 years ([Elixir is in stable mode](https://semaphoreci.com/blog/elixir-creator-jose-valim)). Elixir in web development is the new thing and web development is a saturated market of a lot of mature and effective tools. Elixir in web development is the newness and web development is a market saturated with many mature and effective tools. Once again: only if the technology is disruptive will it be chosen and used.

Personally, I think the main advantage of the Phoenix framework is the ability to be a classic MVC framework like Rails, Django, or Laravel but inherently functional and with the power of the Erlang ecosystem. This can open up a debate on the advantage of starting a project picking the functional programming paradigm, the advantage of starting day one with a less popular but potentially "easy-to-scale" application if I need it in the future... 

Unlike Rust, Elixir's community effort is much more focused than Rust's. Much effort has been devoted to the Phoenix framework and the improvement of the related ecosystem.

What kind of software I should create with it? Common web applications, distributed systems, microservices, where I need fault tolerance, soft-realtime, game servers, chat servers, and heavy concurrent systems. Erlang and Elixir are used in software like League of Legends, WhatsApp, Discord, and Plausible. Types of software that are quite closer to my day-to-day.

**The Elixir trade-off**

Elixir benefits from the functional programming paradigm; building an application means managing data by composing small and atomic functions together using expressions such as pipe operators and pattern matching.  Playing with the Actor Model is more or less like doing a system design simulation, but all in one application.  

Some cons are: again, the tools aren't as mature as the most popular programming languages; the lack of a strong-type system can be useful for prototyping, but in a long run it becomes difficult to maintain. The Elixir is a niche, libraries may be lacking and experts can be hard to find in the market. The language paradigm can initially discourage, however, once the initial barrier is overcome the learning curve of the basics is not so high.

### Conclusions
![tech hype cycle limbo](/img/tech_hype_cycle_limbo.jpeg)

My purpose here is not to choose the right tool for the right problem. But pick a topic worth exploring and studying. 

They are super different types of programming languages, both of which solve very different problems and can help to reason in different ways.

Data give us the situation about trends: 
- Elixir still remains a super cool small web dev niche.
- Rust is rising, big tech(for replacing legacy system code) and people love it. It seems to give it a lot of traction.

But trends don't matter. No matter what I choose, both are worth learning. I should just pick one and try it out. It takes less time to act than to decide between two niches that could die tomorrow. Learning does not mean that I have to become an expert in a particular technology. [I should learn enough to be satisfied](https://medium.com/hackernoon/learn-to-learn-286558241fd6). And put these tools in my toolbox and move on.

The book "Pragmatic Programmer" is a magic pearl about this topic, the chapter "Your Knowledge Portfolio" is without price. I absolutely recommend buying and reading it.


> YOUR KNOWLEDGE PORTFOLIO
> We like to think of all the facts programmers know about computing, the application domains they work in, and all their experience as their knowledge portfolios. Managing a knowledge portfolio is very similar to managing a financial portfolio:
> 
> Serious investors invest regularly—as a habit.
> Diversification is the key to long-term success.
> Smart investors balance their portfolios between conservative and high-risk, high-reward investments.
> Investors try to buy low and sell high for maximum return.
> Portfolios should be reviewed and rebalanced periodically.
> To be successful in your career, you must invest in your knowledge portfolio using these same guidelines.
> 
> The good news is that managing this kind of investment is a skill just like any other—it can be learned. The trick is to make yourself do it initially and form a habit. Develop a routine which you follow until your brain internalizes it. At that point, you’ll find yourself sucking up new knowledge automatically.


> It’s important to continue investing. Once you feel comfortable with some new language or bit of technology, move on. Learn another one.
> 
> It doesn’t matter whether you ever use any of these technologies on a project, or even whether you put them on your resume. The process of learning will expand your thinking, opening you to new possibilities and new ways of doing things. The cross-pollination of ideas is important; try to apply the lessons you’ve learned to your current project. Even if your project doesn’t use that technology, perhaps you can borrow some ideas. Get familiar with object orientation, for instance, and you’ll write procedural programs differently. Understand the functional programming paradigm and you’ll write object-oriented code differently, and so on.

**Now**

Now my goals have changed slightly, I stop looking for information to choose what to learn and just focus on learning that thing. I think I'll take the advice to [stop learning frameworks](https://sizovs.net/2018/12/17/stop-learning-frameworks/). I want to combine niche language learning with [evergreen developer skills](https://github.com/romenrg/evergreen-skills-developers) and [Leon and Joseph's evergreen developer skills](https://jcooney.net/post/2018/10/evergreen.html).

But above all else, it was very refreshing to write this post. it helped clear my mind and I think I will continue to do so.

### interesting Articles and Resources:
```
programming trends:
- packages number: https://libraries.io/platforms
- jetbrain survey: https://www.jetbrains.com/lp/devecosystem-2021/rust/
- google trends: https://trends.google.com/trends/explore?date=all&q=%2Fm%2F0pl075p,%2Fm%2F0dsbpg6
- tiobe index: https://www.tiobe.com/tiobe-index
- pypl index: https://pypl.github.io/PYPL.html
- github stats: https://madnight.github.io/githut
- stackoverflow: https://insights.stackoverflow.com/survey/2021#most-popular-technologies-language
- hackernews jobs trends: https://www.hntrends.com/2022/april.html
- redmonk: https://redmonk.com/sogrady/2022/03/28/language-rankings-1-22/
- OSS trends: https://www.youtube.com/watch?v=jtARZe1ioJU&t=6s

rust:
- https://endler.dev/2017/go-vs-rust/
- https://blog.darklang.com/new-backend-fsharp/
- https://blog.darklang.com/leaving-ocaml/
- https://blog.darklang.com/why-dark-didnt-choose-rust/
- https://hirrolot.github.io/posts/rust-is-hard-or-the-misery-of-mainstream-programming.html
- https://fuchsia.dev/fuchsia-src/contribute/governance/policy/programming_languages
- https://medium.com/theburningmonk-com/rust-memory-safety-without-garbage-collector-d6a25b23c036

elixir:
- https://medium.com/brexeng/building-backend-services-with-kotlin-7c8410795e4b
- https://elixirforum.com/t/what-to-learn-first-rust-or-elixir/34945
- https://joearms.github.io/#2013-05-31%20A%20week%20with%20Elixir
- http://erlang.org/pipermail/erlang-questions/2008-January/032226.html
- https://erlang.org/download/armstrong_thesis_2003.pdf
- https://ferd.ca/ten-years-of-erlang.html?utm_source=pocket_mylist
- https://learnyousomeerlang.com/relups#the-ninth-circle-of-erl
- https://semaphoreci.com/blog/elixir-creator-jose-valim

programming:
- the perfect language: https://youtu.be/yiiDFRs62lQ
- learn to change the way you think: https://medium.com/hackernoon/dont-learn-a-syntax-learn-to-change-the-way-you-think-18436807012d
- rosetta code: https://www.rosettacode.org/wiki/FizzBuzz
- billion dollar mistake: https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/
- Make illegal states unrepresentable: https://blog.janestreet.com/effective-ml-revisited/
- stop learning frameworks: https://sizovs.net/2018/12/17/stop-learning-frameworks/
- evergreen skills for developers: https://github.com/romenrg/evergreen-skills-developers
- evergreen skills for developers by Leon and Joseph: https://jcooney.net/post/2018/10/evergreen.html?utm_source=pocket_mylist
- bob the dark path: http://blog.cleancoder.com/uncle-bob/2017/01/11/TheDarkPath.html
- Greenspun's tenth rule: https://en.wikipedia.org/wiki/Greenspun%27s_tenth_rule

mind:
- hype cycle: https://youtu.be/9zc4DSTRGeM
- information anxiety: https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=3760&context=libphilprac
- the paradox of choice: https://youtu.be/VO6XEQIsCoM
- FOMO: https://dev.to/noriste/choose-what-not-to-study-and-focus-on-one-thing-at-a-time-3ben
- information overload: https://youtu.be/Z0ztO86ImQg
- what you already know can hurt you: https://www.exaptive.com/blog/einstellung-effect-0
- learn to learn:  https://medium.com/hackernoon/learn-to-learn-286558241fd6
```
