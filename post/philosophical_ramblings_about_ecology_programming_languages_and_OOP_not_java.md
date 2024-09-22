![too many oop languages](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/toomanyspiderman.png)

## Premise

I wanted to write this post to share, formalize, and expel my hopeless brain
reveries about programming languages. Sometimes, as a hobby, I explore
programming languages of different natures, and by doing this, I started to have
an ethereal vision of what programming languages are.

Keep in mind that I'm not an academic. My approach is pretty raw. I like to back
up my points with sources, but I can't promise 100% accuracy. Still, I hope to
convey the overall picture I have in mind.

I firmly believe that getting feedback from others is crucial for refining our
ideas.

I'm not 100% sure about this vision yet. I've put together my thoughts,
speculations, criticisms, controversial ideas, and perhaps not enough informed
musings to try and make sense of them. I've compiled them here in what I hope is
a coherent manner.

So, you don't expect to leave here satisfied, because I don't either.

## Fanciful comparison of programming languages with life, the universe, and everything: anthropology, sociology, economics, biology, ecology... music.

When I start thinking about "the evolution of programming languages," my mind
sails, travels, surpasses the sky, and crosses space... then a planet appears, a
planet of strange creatures...

![Programming Languages Logos](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/languages_logo.png)

This topic sparks my imagination. I ponder the vague similarities between PLs,
ecology, [food chain](https://en.wikipedia.org/wiki/Food_chain), and
[natural selection](https://en.wikipedia.org/wiki/Natural_selection).

But PLs are fundamentally human constructs; I've always considered them
influenced by the same social dynamics as other human creations. Therefore, the
animal analogy may not be entirely fitting.

I don't want to write the
[Brief, Incomplete, and Mostly Wrong History of Programming Languages](http://james-iry.blogspot.com/2009/05/)
again.

<a href="https://www.reddit.com/r/ClassicRock/comments/wtkumq/the_yardbirds_family_tree_how_all_these_bands_are">

![music bands evolution](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/bands_family_tree.webp)
</a>

The vision I'm trying to share here became more concrete when I saw
[a delightful analogy to the music together with the programming languages history.](https://www.youtube.com/watch?v=J3C79CDqeW4)

PLs, like natural languages, are the people who speak them. And they influence
their evolution. They are communities, cultures, and collective knowledge
transferred from user to user, depending on the use cases and problems the
language aims to solve.

I also argue that the concepts of software construction evolved similarly, often
in conjunction with the PL utilized. I believe that a form of
[Cargo Cult](https://en.wikipedia.org/wiki/Cargo_cult) revolves around PLs and
paradigms. People can have ideas and strong opinions based on their experiences
in jobs, school, hobbies, literature consumed, people encountered, good or bad
situations that happened, and emotions involved in doing something. Intriguing
visions are the
[three tribes of programming](https://josephg.com/blog/3-tribes/) and
[JavaScript tribalism](https://danthedev.com/javascripts-dependency-problem/#tribalism).

In essence, I think the users' beliefs found the evolution of PLs. So, today,
the programming languages we use reflect the beliefs of past users and creators,
shaping our software concepts. At this juncture, solving a particular use case
forces us to use a specific PL, which can sometimes lead us into what resembles
an [echo chamber](https://en.wikipedia.org/wiki/Echo_chamber_(media)).

![echo chambers in programming](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/chamber.png)

**Why did you start playing a particular instrument?**

**Which bands do you follow?**

**What is your favorite song genre? And why?**

If you're seeking a more profound insight into the evolution of programming
languages, you might find the following resources useful:

- [The Evolutionary Ecology of Technology: The Case of Programming
  Languages](https://www.dsi.unive.it/PhilCS2015/Slides/PhilCS_Crafa.pdf)
- [Modelling the Evolution of Programming Languages](https://www.researchgate.net/publication/282905754_Modelling_the_Evolution_of_Programming_Languages)
- [Programming Languages Genealogical Tree](https://github.com/stereobooster/programming-languages-genealogical-tree)

## Object-oriented programming is not so obvious!

![oop influences](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/oopinfluence.png)

Today, OOP is one of the most fanatical taboos in my small programming
experience.

I have mixed feelings about OOP. Don't get me wrong; I enjoy organizing my code
in an OO style, but I often find myself dissatisfied with my own design:
Sometimes, OOP feels unintuitive, paradoxically different from the real world,
easy to make wrong, boilerplate, overly subjective, and hammered. Too often, my
thoughts and discussions veer into philosophical territory. Sometimes, I believe
simple data and functions work better. Also, there are times when I think an
interface would be very appropriate, but others don't like using classes.

This is clearly a skill issue. I don't know enough about OOP. I can accept that,
but my frustration with OOP isn't just about my lack of skills. I consistently
struggle when discussing the well-known object-oriented programming paradigm
with others. Too often, discussions about OOP miss the mark, diverting around
interpretable principles, better naming, programming languages, language
features, and past ideas.

Few discussions and sources I have found on my path don't continue to leave me
unsatisfied and uncertain every time. I discover or re-discover something new
every year in my quest for understanding. Furthermore, The more I examine this
paradigm with people, the more I notice a common thread, but I also come across
numerous conflicting ideas and strong opinions.

### The Simula vs Smalltalk Diatribe

There's a narrative about the history of OOP, often revolving around Simula,
Smalltalk, and the ideas of Alan Kay. Beneficial resources on this topic:
[Wikipedia](https://en.wikipedia.org/wiki/Object-oriented_programming),
[Alan Kay Did Not Invent Objects](https://www.hillelwayne.com/post/alan-kay/)
and
[Alan Kay definition of Object Oriented](https://wiki.c2.com/?AlanKaysDefinitionOfObjectOriented),
after reading this material and other similar, I began to ponder whether was the
high-level vision of OOP in the past, the today's perspective differs once more.
[And, like natural languages, we can't control it.](https://smartergerman.com/blog/why-you-cant-and-shouldnt-control-language/)

Some high-level ideas I find are:

- [Objects are similar to experts and collaborators](https://www.edibleapple.com/2011/10/29/steve-jobs-explains-object-oriented-programming/)([*](https://www.youtube.com/watch?v=jO6Z3wOdfWc)) -
  I appreciate this definition because it emphasizes the concept of locality and
  encapsulation and is empirical rather than mathematical. Writing software is
  often like crafting rather than mathematics, but unfortunately, this vision
  complicates my hopeless pursuit of frame OOP.
- [OOP means only messaging](http://userpage.fu-berlin.de/~ram/pub/pub_jf47ht81Ht/doc_kay_oop_en) -
  Sometimes it's similar to the previous, but I'm not sure; here, Small Talk,
  [Erlang](https://www.youtube.com/watch?v=fhOHn9TClXY), Elixir, and the Actor
  Model are often mentioned.
- Model real-life things with Classes and Inheritance -
  [I don't entirely agree with this vision](https://johan.im/writings/object-oriented-programming-and-modeling-the-real-world/).
  I believe that OOP aims to model our business or real-world domain, but the
  real world is unrepresentable one-way, and inheritance is the worst tool for
  this task! Too many materials on the internet sponsor this vision
  ([1](https://logicmojo.com/inheritance-in-oops),
  [2](https://www.almabetter.com/bytes/articles/what-is-object-oriented-programming)...
  ).
- OOP is Clean Code - I've encountered situations where we changed code for OOP
  reasons. However, I thought the old way was more in line with my unsure
  perspective of OOP principles. Still, I liked the clarity of the new approach
  and supported using it.
- Java - Another perspective I've observed is that some equate OOP with Java. I
  don't think that Java represents the definitive OOP approach. PLs are human
  creations, tools, and technology at our disposal. They are agnostic to human
  philosophies or mental exercises. They're simply collections of isolable PL
  features that carry the biases of their creators and community. I'm saying
  that doing Java well simply means doing Java well. OOP can be used in many
  places; what distinguishes the OO approach in languages like
  [R](https://bookdown.org/rdpeng/RProgDA/object-oriented-programming.html),
  [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming),
  [Perl 6](https://docs.raku.org/language/objects),
  [Racket](https://docs.racket-lang.org/reference/mzlib_class.html), and
  [Lua](https://www.lua.org/pil/16.html)? Too often, I've encountered the
  misconception that true OOP is restricted solely to
  [static types and static classes](https://ovid.github.io/articles/what-to-know-before-debating-type-systems.html).
  But why? Is it to support the IDE's IntelliSense features?
- OOP is Design Patterns.
- Others? Mixes of the above?

### Liskov and Inheritance are contagious virus

There are many forms of
[polymorphism](http://lucacardelli.name/Papers/OnUnderstanding.A4.pdf); the most
known are:

- Ad-hoc polymorphism - often exemplified by
  [Haskell's type classes and overloading](https://wiki.haskell.org/Polymorphism),
  provides distinct function implementations for different types.
- Parametric polymorphism - often exemplified by generics, allows functions and
  types to work with other types without knowing them upfront.
- Subtype polymorphism - one type is substitutable with its subtypes. Subtype
  polymorphism is where OOP shines.
- Trivia: [Uiua](https://www.uiua.org/#true-arrays) has a super exciting form of
  polymorphism!

In my view, the difference between
[inheritance and interfaces](https://softwareengineering.stackexchange.com/questions/316893/if-i-implement-an-interface-is-it-called-an-inheritance)
is significant. While both involve subtyping, the distinction is profound for
me. Sometimes, I think about an alternative world where OOP avoided inheritance
altogether. My brain has a lot of problems with inheritance. Firstly, our human
[contextual hierarchical representation](https://www.youtube.com/watch?v=LNi0vy7GAaI)
of reality doesn't match the object-oriented representation. Secondly,
hierarchies can be overly situational. When they grow large, they become
complex, difficult to dismantle, and understanding what each parent class does
can be overwhelmed by cognitive load. Finally, even with basic interfaces, I
have a constant and subtle fear of breaking the
[Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle).
Yet, hierarchies compound this complexity by sharing data and behaviors,
potentially creating confusion with indirection between overridden methods in
child and parent classes, they add another level of entropy to this challenge.

_"Anything that can go wrong will go wrong."_, The
[Murphy's law](https://en.wikipedia.org/wiki/Murphy%27s_law) is so true. How
often have you encountered scenarios resembling the
[square/rettangle problem](https://softwareengineering.stackexchange.com/questions/238176/why-would-square-inheriting-from-rectangle-be-problematic-if-we-override-the-set)
or the
[penguin problem](https://www.tomdalling.com/blog/software-design/solid-class-design-the-liskov-substitution-principle/)?

I love simple interfaces.

**However, you're unable to achieve the same tasks without inheritance.**

**Why not?**

```js
// js with inheritance
class Father {
  constructor(aProperty) {
    this.aProperty = aProperty;
  }

  doFizz() {
    console.log("fizz");
  }
}

class Child extends Father {
  constructor(aProperty) {
    super(aProperty);
  }

  doBuzz() {
    super.doSomething();
    console.log("different");
  }
}
```

```js
// js with delegation
class Father {
  constructor(aProperty) {
    this.aProperty = aProperty;
  }

  doFizz() {
    console.log("fizz");
  }
}

class Child {
  constructor(father) {
    this.father = father;
  }

  doFizz() {
    this.father.doFizz();
  }

  doBuzz() {
    this.father.doFizz();
    console.log("different");
  }
}

const child = new Child(new Father("aProperty"));
child.doFizz();
child.doBuzz();
```

Yeah,
[delegation](https://www.jetbrains.com/help/idea/replace-inheritance-with-delegation.html#replace_inheritance_example)
can be quite tedious and repetitive. But, sometimes, it's simply a matter of
language capabilities. For instance, Go, Kotlin, Crystal, and Raku offer
intriguing approaches to delegation.

```crystal
# crystal with delegate
class Father
  getter a_property : String

  def initialize(a_property : String)
    @a_property = a_property
  end

  def do_fizz
    puts "fizz"
  end
end

class Child
  def initialize(@father : Father)
  end

  delegate :do_fizz, to @father

  def do_buzz
    do_fizz
    puts "different"
  end
end

child = Child.new(Father.new("value"))
child.do_fizz
child.do_buzz
```

```kotlin
// kotlin with 'by'
interface Fizzator {
    fun doFizz()
}

class Father(val aProperty: String) : Fizzator {
    override fun doFizz() {
        println("fizz")
    }
}

class Child(father: Father) : Fizzator by father {
    fun doBuzz() {
        doFizz()
        println("different")
    }
}

fun main() {
    val child = Child(Father("property"))
    child.doFizz()
    child.doBuzz()
}
```

```perl
# raku with 'handle'
class Father {
    has $.a-property;

    method do-fizz {
        say "fizz";
    }
}

class Child {
    has Father $.father handles <do-fizz>;
 
    method do-buzz {
        self.do-fizz;
        say "different";
    }
}

my $father = Father.new(:a-property("value"));
my $child = Child.new(:father($father));
$child.do-fizz;
$child.do-buzz;
```

```go
// golang with its interfaces
type Father struct {
    aProperty string
}

func (f *Father) doFizz() {
    fmt.Println("fizz")
}

type Child struct {
    Father
}

func (c *Child) doBuzz() {
    c.doFizz()
    fmt.Println("different")
}

func main() {
    child := Child{Father{aProperty: "value"}}

    child.doFizz()
    child.doBuzz()
}
```

Indeed, there's no
[silver bullet](https://en.wikipedia.org/wiki/No_Silver_Bullet), but as I carry
my beliefs, I harbor a strong bias against inheritance.

Also, the conventional viewpoint doesn't classify Golang as an OO language.
However, if "OOP is not so obvious," the Golang categorization is not so obvious
either.
[Does Go have subtyping?](https://journal.stuffwithstuff.com/2023/10/19/does-go-have-subtyping/)

### Guidelines for Addressing Entropy and Power

![coupling and cohesion](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/couplingcohesion.png)

[GRASP](https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)),
[SOLID](https://en.wikipedia.org/wiki/SOLID),
[Law of Delimiter](https://en.wikipedia.org/wiki/Law_of_Demeter),
[Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle),
[Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance),
[Abstraction Principle](https://www.cs.sjsu.edu/~pearce/modules/lectures/ood/principles/Abstraction.htm),
[Coupling and Cohesion](https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/),
[Leaky abstraction](https://en.wikipedia.org/wiki/Leaky_abstraction),
[Port and Adapters Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)),
[CQS](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation),
[Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html),
[DDD](https://en.wikipedia.org/wiki/Domain-driven_design)... I'm starting to see
OOP not as a precise manual but as a set of guidelines for navigating the
complexity of software development. Sometimes, ambiguity and interpretability,
as seen in legal matters, can actually be features that contribute to
flexibility.

#### Extendibility

As developers, we often work to ensure our code can quickly adapt to changes in
the real world. However, I feel that even when we prioritize maintainability and
extendibility, coding acts as a means to document and formalize our contextual
knowledge, enabling us to revisit and reactivate our understanding of the
problem in the future. Focusing solely on extending the code can sometimes lead
to a situation where everything is extendable. Still, we struggle to manage our
cognitive load caused by widespread context and excessive generalization. I
think this captures the essence of
[Cohesion](https://en.wikipedia.org/wiki/Cohesion_(computer_science)).

A Time ago, I was fascinated by an article titled
"[The Unreasonable Effectiveness of Julia](https://arstechnica.com/science/2020/10/the-unreasonable-effectiveness-of-the-julia-programming-language/),"
which introduced me to the
[Expression Problem](https://wiki.c2.com/?ExpressionProblem) that reminds me of
the
[Open-close-Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).
This article explored the challenge of extending a book of recipes and
ingredients, raising the question of how much of the book would need to be
modified when adding a new recipe or ingredient.

However, I lack sufficient experience with Julia and
[Multiple Dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch) to
comprehend its advantages fully. At times, I feel that the capabilities of a
language can surpass the limitations of other languages that lack those
features.

#### Performance

Also, I read that there are situations when OOP guidelines may not suit specific
domains that prioritize technical details over adaptability or
understandability. [Encapsulation](https://www.youtube.com/watch?v=QM1iUe6IofM)
and [Abstraction](https://bravenewgeek.com/abstraction-considered-harmful/)
might not work well in such cases, leading to a practice where code isn't viewed
as representative of the real-world domain. Instead, code and data are treated
merely for their capacity to manage bytes, cache, and cycles. This approach is
known as
[data-oriented design](https://gamesfromwithin.com/data-oriented-design).

[The first principle: Data is not the problem domain:](https://www.dataorienteddesign.com/dodmain/node3.html#SECTION00320000000000000000)

> For some, it would seem that data-oriented design is the antithesis of most
> other programming paradigms because data-oriented design is a technique that
> does not readily allow the problem domain to enter into the software so
> readily. It does not recognise the concept of an object in any way, as data is
> consistently without meaning, whereas the abstraction heavy paradigms try to
> pretend the computer and its data do not exist at every turn, abstracting away
> the idea that there are bytes, or CPU pipelines, or other hardware features.
> The data-oriented design approach doesn't build the real world problem into
> the code. This could be seen as a failing of the data-oriented approach by
> veteran object-oriented developers, as many examples of the success of
> object-oriented design come from being able to bring the human concepts to the
> machine, then in this middle ground, a solution can be written in this
> language that is understandable by both human and computer. The data-oriented
> approach gives up some of the human readability by leaving the problem domain
> in the design document, but stops the machine from having to handle human
> concepts at any level by just that same action.

#### Simple Data and Simple Functions

Additionally, sometimes, I feel that using simple data and simple functions,
organizing the problem domain within immutable data structures, and envisioning
our domain rules as data transformations can be more practical. I've often felt
too forced by OOP's inclination to link behavior and data, leading me to create
complex object chimeras influenced by my
[subjective view of the real world](https://www.youtube.com/watch?v=LNi0vy7GAaI)
when a simple dictionary would have enough.

[Principles of Data-Oriented Programming](https://blog.klipse.tech/dop/2022/06/22/principles-of-dop.html)
(to not confuse with data-oriented design)

I don't believe it's directly comparable to
[data-centric](https://www.schibsted.pl/blog/object-oriented-thinking-in-the-data-centric-world/),
or
[database-centric or data-driven architecture, or whatever you name it (why all this similar names?)](https://en.wikipedia.org/wiki/Database-centric_architecture).
I mean where interfaces and the entire software are derived and coupled to a
large data structure, such as the database schema. That poses challenges when we
must customize detailed implementations or change this structure, which can
significantly affect the whole system. However, I recognize that overuse of this
approach poses a dilemma for the
[Anemic Domain Model](https://martinfowler.com/bliki/AnemicDomainModel.html).

### ok

![object good part](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/objects_good_part.png)

I'm arguing that OOP is not as obvious. If I haven't convinced you try with:

- [People Don’t Understand OOP](https://blog.sigma-star.io/2024/01/people-dont-understand-oop/)
- [Why is Object-Oriented Programming Bad?](https://ovid.github.io/articles/why-is-object-oriented-programming-bad.html)
- [Why extends is evil](https://web.archive.org/web/20160305173913/https://www.javaworld.com/article/2073649/core-java/why-extends-is-evil.html)
- [Is Inheritance That Evil?](https://thevaluable.dev/guide-inheritance-oop/)
- [OOP vs. type classes - ideology](https://alexn.org/blog/2022/05/13/oop-vs-type-classes-part-1-ideology/)

## Functional programming is not so obvious, either!

![fp languages influence](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/langfamilyFP.png)

### Programming languages are experiments

After reading
[A decade of developing a programming language](https://yorickpeterse.com/articles/a-decade-of-developing-a-programming-language/),
I started pondering: programming languages are incredibly complex beasts that
evolve over time, carrying the weight of tough trade-offs and
[decisions](https://web.archive.org/web/20160305173913/https://www.javaworld.com/article/2073649/core-java/why-extends-is-evil.html)
made during their creation. Essentially, all the languages we use today are just
experiments by their creators.
[Even those creators can't fully foresee how their language design will impact the software made with it](https://graydon2.dreamwidth.org/307291.html).
And thanks to the [Lindy effect](https://en.wikipedia.org/wiki/Lindy_effect),
we're still dealing with tech from the '70s and '90s.

Today, mature programming languages can present subtle issues at their core,
such as
[null](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).

One day, while chatting with a friend who's really into functional programming,
we started talking about OOP. The conversation shifted toward OOP literature,
which mainly focuses on tackling the challenges and problems of OOP itself.
Several design patterns remedy absent
[language features](https://wiki.c2.com/?AreDesignPatternsMissingLanguageFeatures),
while its principles act to circumvent issues originating from OOP itself.

<a href="https://www.youtube.com/watch?v=srQt1NAHYC0">

![scott wlaschin about fp desing patterns](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/functional_design_patterns_scott_wlashchin.png)
</a>

I have mixed feelings about this statement and agree that OOP isn't so obvious
at times. To me, OOP provides guidelines for navigating an intrinsically
problematic territory. FP, instead, sets up a safe zone where problems like
[immutable rectangle/square](https://aip.vse.cz/pdfs/aip/2016/01/03.pdf),
unhandled exceptions, illegal state, global state... just do not exist. However,
many of these guidelines remain super valuable!

<a href="https://twitter.com/ID_AA_Carmack/status/989951283900514304">

![jose valim about polymorphism](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/josevalim_about_polymorphism.png)
</a>

### Functional Programming! what?

What exactly is
[functional programming](https://en.wikipedia.org/wiki/Functional_programming)?
I ask because numerous languages are labeled as "Functional," but their style
and developer experience vary significantly. I know little about Lisp, APL,
Haskell, OCaml, Prolog, Erlang...

It's interesting to learn about the perspective of a developer deeply familiar
with Haskell and how significant the differences were to them when encountering
OCaml, despite both languages sharing the same roots:
[8 months of OCaml after 8 years of Haskell in production](https://dev.to/chshersh/8-months-of-ocaml-after-8-years-of-haskell-in-production-h96).

So, what is functional programming?

I rely on the insights of Richard Felman, who has offered compelling arguments
on this matter.

[The Essence of Functional Programming by Richard Feldman](https://www.youtube.com/watch?v=l0ruvPCQh9I)

_"Maybe FP has always been vaguely shared understanding of relate ideas"_

This reminds me of my previous section about OOP. However, in the realm of FP,
in my experience, the emphasis often shifts towards language features rather
than what I would term "guidelines".

- ADT
- Filter, Map, Reduce
- Referential transparency
- (exhaustive) Pattern Matching
- "Function friendly" Language Ergonomics
- High order functions
- Recursion
- Type Classes
- Module Functors
- Immutability
- Managed Side Effect
- Pure function
- Category Theory
- Laziness
- Parametric Polymorphism and others
- Other?...

Richard argues that there are no mandatory features for FP, but the essence of
what he calls the functional style includes exclusively:

- Avoiding mutation
- Avoiding side effects

Learning a bit about Elm and Haskell broadened my perspective. I discovered
solutions and possibilities I had never encountered before, and I was fascinated
by the absence of problems that I frequently encountered when working with Java
and JavaScript.

I was once again surprised when I encountered the same sensation while
experimenting with Rust. But Rust is not an FP language.
([it's also debated whether Rust adheres to OOP, but it's better to keep this topic apart...](https://doc.rust-lang.org/book/ch17-00-oop.html)).

This Richard's talk helped me grasp and formalize this feeling better:

[Functional Programming for Pragmatists](https://www.youtube.com/watch?v=3n17wHe5wEw&t=220s)

Substantially,
[can limitations and restrictions be liberating?](https://www.presentationzen.com/presentationzen/2007/03/can_limitations.html)
FP style may restrict the power of the PL, like side effects and mutability, but
features commonly present in FP languages bring some perks like better tools,
easier testing, less thinking, and smoother refactorings. Constraining the
language simplifies software, especially when low-level control isn't required.
The trade-off is about adding little noise to simple tasks while facilitating
complex ones.

I like what Felman says in
"[Why Isn't Functional Programming the Norm?](https://www.youtube.com/watch?v=QyJZzq0v7Z4)"
Java didn't become popular just because it was OO; it was valuable at the
time(and a bit sponsored). FP isn't just about Haskell or Lisp... It's about how
programming languages naturally evolve by
[adding new features](https://magnemg.eu/features-of-a-dream-programming-language-3rd-draft)
and dropping the less valuable ones (like inheritance, maybe! :P).

## Conclusion: In the end it doesn't even matter

<iframe width="560" height="315" src="https://www.youtube.com/embed/eVTXPUF4Oz4?si=86BNhoI2MOcdIm6S" title="in the end - linking park" ></iframe>

So, programming languages are basically experiments influenced by what others
before us believed. Both object-oriented programming and functional programming
can be not so obvious.

In the end, the programming language we use doesn't really matter. We have
little control over most of the tools we use daily because we can't alter the
world's current trajectory, the software industry, or things like the
[lindy effect](https://en.wikipedia.org/wiki/Lindy_effect) or
[Jevons paradox](https://blog.nukemberg.com/post/the-fullstack-conundrum/) are
pretty inevitable.

<a href="https://twitter.com/ID_AA_Carmack/status/989951283900514304">

![Jhon Carmack about tools](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/johon_carmack_about_tooling.png)
</a>

In the end, what matters most is agreeing on what works for us and making
teamwork smooth. As people, we should focus on what we can control and find the
best solution for the job without getting too stuck on our own opinions.

I enjoy learning programming languages; each new thing gives me a fresh
perspective. But in the end, my goal is to deliver value to my users by creating
working software. What pays off is always collaboration, having a shared way of
communication with colleagues, simplicity, combating entropy, and avoiding
unnecessary solutions.
[Writing code is only one small part of our job](https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/).

<a href="https://twitter.com/isaac_abraham/status/1417122528607227906">

![years of programming and complexity](/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/compexity_and_years_of_programming.png)
</a>

[The perfect programming language doesn't exist](https://www.youtube.com/watch?v=yiiDFRs62lQ),
or if it does, in each case, we should be capable of using it with simplicity.

Writing this post gives me a similar feeling to when I watched these talks:

- [The Mess We Are in](https://www.youtube.com/watch?v=lKXe3HUG2l4&t=1925s)
- [Is Software Engineering Still an Oxymoron? • Alan Kay](https://www.youtube.com/watch?v=D43PlUr1x_E)

I attempted to articulate my vague thoughts here. Please give me feedback on
whether this post is coherent!

If you are interested, explore these particular programming languages:

- [Typst](https://typst.app/)
- [Nu](https://www.nushell.sh/)
- [Uiua](https://www.uiua.org/)
- [Inko](https://inko-lang.org/)
- [Roc](https://www.roc-lang.org/)

Bye!

#### interesting Articles and Resources:

```
Programming Languages Evolution:
- 3 tribes of programming: https://josephg.com/blog/3-tribes/
- JavaScript's Dependency Problem: https://danthedev.com/javascripts-dependency-problem/
- The Evolutionary Ecology of Technology: The Case of Programming Languages: https://www.dsi.unive.it/PhilCS2015/Slides/PhilCS_Crafa.pdf
- Modelling the Evolution of Programming Languages: https://www.researchgate.net/publication/282905754_Modelling_the_Evolution_of_Programming_Languages
- I made a family tree of all the world's languages: https://www.reddit.com/r/languagelearningjerk/comments/uppnpy/i_made_a_family_tree_of_all_the_worlds_languages/
- Band family trees: https://www.reddit.com/r/ClassicRock/comments/wtkumq/the_yardbirds_family_tree_how_all_these_bands_are
- A Brief, Incomplete, and Mostly Wrong History of Programming Languages: http://james-iry.blogspot.com/2009/05/brief-incomplete-and-mostly-wrong.html
- Sketchpad: A Man-Machine Graphical Communication System: http://www.bitsavers.org/pdf/mit/tx-2/Sketchpad_TR296_Jan63.pdf
- Towards a conceptual history of programming languages - Types: http://www.cs.unibo.it/~martini/TALKS/martini-LIP.pdf 
- The Next 700 Programming Language: https://www.cs.cmu.edu/~crary/819-f09/Landin66.pdf
- Guido van Rossum about biological systems metaphor of languages: https://youtu.be/-DVyjdw4t9I?t=1528
- Programming languages genealogical tree: https://github.com/stereobooster/programming-languages-genealogical-tree?tab=readme-ov-file
- Genealogical tree of programming languages by wikipedia: https://upload.wikimedia.org/wikipedia/commons/2/25/Genealogical_tree_of_programming_languages.svg
- A History of Programming Languages for 2 Voices(David Nolen and Michael Bernstein): https://www.youtube.com/watch?v=J3C79CDqeW4
- Dictionary of Programming Languages: http://cgibin.erols.com/ziring/cgi-bin/cep/cep.pl
 
Object Oriented Programming:
- A Solution to the Square-Rectangle Problem: https://aip.vse.cz/pdfs/aip/2016/01/03.pdf
- Object-Oriented Thinking in the Data-Centric World: https://www.schibsted.pl/blog/object-oriented-thinking-in-the-data-centric-world/
- Anemic Domain Model: https://martinfowler.com/bliki/AnemicDomainModel.html
- Abstraction Considered Harmful: https://bravenewgeek.com/abstraction-considered-harmful/
- Leaky abstraction: https://en.wikipedia.org/wiki/Leaky_abstraction
- Cohesion and Coupling - the difference: https://enterprisecraftsmanship.com/posts/cohesion-coupling-difference/
- Replace Delegation with Inheritance: https://refactoring.guru/replace-delegation-with-inheritance
- Categorisation, Comparison and Cases - Einar Høst - https://www.youtube.com/watch?v=LNi0vy7GAaI
- Polymorphism haskell wiki - https://wiki.haskell.org/Polymorphism
- "The Power of Abstraction" with Prof. Barbara Liskov - https://www.youtube.com/watch?v=dtZ-o96bH9A
- Why extends is evil - https://web.archive.org/web/20160305173913/https://www.javaworld.com/article/2073649/core-java/why-extends-is-evil.html
- If I implement an Interface, is it called an Inheritance? - https://softwareengineering.stackexchange.com/questions/316893/if-i-implement-an-interface-is-it-called-an-inheritance
- does go have subtyping?: https://journal.stuffwithstuff.com/2023/10/19/does-go-have-subtyping/
- Object-oriented Programming and Modeling the Real World - https://johan.im/writings/object-oriented-programming-and-modeling-the-real-world/
- Joe Armstrong interviews Alan Kay: https://www.youtube.com/watch?v=fhOHn9TClXY
- Why you Can't Control Language: https://smartergerman.com/blog/why-you-cant-and-shouldnt-control-language/
- L'arte perduta di pensare ad oggetti, by Matteo Vaccari: https://www.youtube.com/watch?v=jO6Z3wOdfWc
- Dr. Alan Kay on the Meaning of “Object-Oriented Programming”: https://www.purl.org/stefan_ram/pub/doc_kay_oop_en
- Open issues in OOP: https://pure.au.dk/ws/portalfiles/portal/22469430/OpenIssuesInOO.pdf
- The unreasonable effectiveness of the Julia programming language: https://arstechnica.com/science/2020/10/the-unreasonable-effectiveness-of-the-julia-programming-language/
- Extensibility for the Masses - https://www.cs.utexas.edu/~wcook/Drafts/2012/ecoop2012.pdf
- Expression problem: https://wiki.c2.com/?ExpressionProblem
- The Expression Problem and its solutions: https://eli.thegreenplace.net/2016/the-expression-problem-and-its-solutions/
- More thoughts on the Expression Problem in Haskell: https://eli.thegreenplace.net/2018/more-thoughts-on-the-expression-problem-in-haskell/
- Steve Jobs explains object-oriented programming: https://www.edibleapple.com/2011/10/29/steve-jobs-explains-object-oriented-programming/
- Introduction to Object Oriented Programming to https://www.cs.utexas.edu/users/mitra/csSpring2017/cs303/lectures/oop.html
- What To Know Before Debating Type Systems - https://ovid.github.io/articles/what-to-know-before-debating-type-systems.html
- Alan Kay Did Not Invent Objects: https://www.hillelwayne.com/post/alan-kay/
- Data Oriented Design, Data is not the problem domain: https://www.dataorienteddesign.com/dodmain/node3.html#SECTION00320000000000000000
- Principles of Data-Oriented Programming: https://blog.klipse.tech/dop/2022/06/22/principles-of-dop.html
- OOP Design Dilemma - Data and Beheviour: https://softwareengineering.stackexchange.com/questions/234527/zero-behavior-objects-in-oop-my-design-dilemma
- People Don’t Understand OOP - https://blog.sigma-star.io/2024/01/people-dont-understand-oop/
- Why is Object-Oriented Programming Bad? https://ovid.github.io/articles/why-is-object-oriented-programming-bad.html
- Object-Oriented Programming is Bad: https://www.youtube.com/watch?v=QM1iUe6IofM
- Is Inheritance That Evil?: https://thevaluable.dev/guide-inheritance-oop/ 

Functional Programming:
- Functional Design Patterns - Scott Wlaschin: https://www.youtube.com/watch?v=srQt1NAHYC0&t=251s 
- OOP vs Typeclasses - Ideology:  https://alexn.org/blog/2022/05/13/oop-vs-type-classes-part-1-ideology/
- 8 months of OCaml after 8 years of Haskell in production: https://dev.to/chshersh/8-months-of-ocaml-after-8-years-of-haskell-in-production-h96
- The essence of functional programming by Richard Feldman: https://www.youtube.com/watch?v=l0ruvPCQh9I
- The Roc Programming Language with Richard Feldman (and what FP is) - https://adspthepodcast.com/2023/11/24/Episode-157.html
- Why Isn't Functional Programming the Norm? – Richard Feldman: https://www.youtube.com/watch?v=QyJZzq0v7Z4
- Are Design Patterns Missing Language Features: https://wiki.c2.com/?AreDesignPatternsMissingLanguageFeatures 

Other:
- The Rust I Wanted Had No Future - https://graydon2.dreamwidth.org/307291.html
- A decade of developing a programming language: https://yorickpeterse.com/articles/a-decade-of-developing-a-programming-language/ 
- The Mess We Are n: https://www.youtube.com/watch?v=lKXe3HUG2l4&t=1925s 
- Is Software Engineering Still an Oxymoron? • Alan Kay: https://www.youtube.com/watch?v=D43PlUr1x_E 
- Features of a dream programming language: https://magnemg.eu/features-of-a-dream-programming-language-3rd-draft
- The World's Most Maintainable Programming Language: http://lambda-the-ultimate.org/node/1483#comment-17093
- The Perfect Programming Language: https://www.youtube.com/watch?v=yiiDFRs62lQ
- Four Stages of Competence: https://en.wikipedia.org/wiki/Four_stages_of_competence
- The Fullstack conundrum and the commoditization of web development: https://blog.nukemberg.com/post/the-fullstack-conundrum/

Object in various languages:
- Classes and object in Racket: https://docs.racket-lang.org/guide/classes.html
- Subtype in Racket: https://docs.racket-lang.org/ts-guide/types.html#%28part._.Subtyping%29
- Objects in ocaml: https://v2.ocaml.org/manual/objectexamples.html, https://ocaml.org/docs/objects
- When should objects be used in OCaml?: https://stackoverflow.com/questions/10779283/when-should-objects-be-used-in-ocaml
- Objects in Raku: https://docs.raku.org/language/objects
- Objects in Simula: https://courses.cs.washington.edu/courses/cse505/97au/oo/simula.html
- Effiel Type System: https://staffwww.dcs.shef.ac.uk/people/A.Simons/research/papers/eiffeltype.pdf
- About Eiffel origins: https://news.ycombinator.com/item?id=22282160
- Objects in squeak: https://web.archive.org/web/20230503063351/https://web.cecs.pdx.edu/~harry/musings/SmalltalkOverview.html#Basic%20OOP%20Concepts%20and%20Terminology
```
