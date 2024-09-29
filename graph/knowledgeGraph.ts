export const learningTag: GraphNode = {
  type: "tag",
  id: "learning",
  data: {
    name: "Learning",
    description: "topics related to the activity of learning in general",
  },
};

export const cognitiveBiasTag: GraphNode = {
  type: "tag",
  id: "cognitive-bias",
  data: {
    name: "Cognitive Bias",
    description: "Topics regarding the human mind and its functioning.",
  },
};

export const programmingLanguagesTag: GraphNode = {
  type: "tag",
  id: "programming-languages",
  data: {
    name: "Programming Languages",
    description: "topics related to programming languages.",
  },
};

export const rustLanguageTag: GraphNode = {
  type: "tag",
  id: "rust-language",
  data: {
    name: "The Rust Programming Language",
    description:
      "Topics specifically pertaining to the Rust programming language.",
    website: "https://www.rust-lang.org/",
  },
};

export const zigLanguageTag: GraphNode = {
  type: "tag",
  id: "zig-language",
  data: {
    name: "The Zig Programming Language",
    description:
      "Topics specifically pertaining to the Zig programming language.",
    website: "https://ziglang.org/",
  },
};

export const softwareDeveloperCareersTag: GraphNode = {
  type: "tag",
  id: "software-developer-careers",
  data: {
    name: "Software Developer Careers",
    description: "Values, practices, career advice... for software developers.",
  },
};

export const programmingTag: GraphNode = {
  type: "tag",
  id: "programming",
  data: {
    name: "Programming",
    description:
      "Ideas and reflections on programming: algorithms, design, patterns, anti-patterns, and various programming techniques.",
  },
};

export const dataOrientedDesignTag: GraphNode = {
  type: "tag",
  id: "data-oriented-design",
  data: {
    name: "Data Oriented Design",
    description:
      "I'm not a huge fan of prioritizing performance in my software, but exploring Data-Oriented Design, born in game development, intrigues me because it offers a different perspective on programming paradigms, above all, compared to Object-Oriented Design ideas.",
    url: "https://en.wikipedia.org/wiki/Data-oriented_design",
  },
};

export const gameDevelopmentTag: GraphNode = {
  type: "tag",
  id: "game-development",
  data: {
    name: "Game Development",
    description: "Topics related to Game Development.",
  },
};

export const artificialIntelligenceTag: GraphNode = {
  type: "tag",
  id: "artificial-intelligence",
  data: {
    name: "Artificial Intelligence",
    description: "Topics related to Artificial Intelligence.",
  },
};

export const objectOrientedProgrammingTag: GraphNode = {
  type: "tag",
  id: "object-oriented-programming",
  data: {
    name: "Object Oriented Programming",
    description: "Topics related to Object Oriented Programming.",
  },
};

export const functionalProgrammingTag: GraphNode = {
  type: "tag",
  id: "functional-programming",
  data: {
    name: "Functional Programming",
    description: "Topics related to Functional Programming.",
  },
};

export const yanCuiAuthor: GraphNode = {
  type: "author",
  id: "yan-cui",
  tagId: [
    programmingLanguagesTag.id,
    learningTag.id,
    softwareDeveloperCareersTag.id,
  ],
  data: {
    name: "Yan Cui",
    description:
      "An estimator of programming languages such as Erlang and F#. Serverless Hero now. I thoroughly enjoyed many of their insightful blog posts and resources.",
    website: "https://theburningmonk.com/",
    github: "https://github.com/theburningmonk",
  },
};

export const angeloCeccatoAuthor: GraphNode = {
  type: "author",
  id: "angelo-ceccato",
  tagId: [programmingLanguagesTag.id, cognitiveBiasTag.id],
  data: {
    name: "Angelo Ceccato (AngeloChecked)",
    description:
      "Angelo Ceccato’s also known as AngeloChecked is a developer like make random stuff.",
    website: "https://angeloceccato.it",
    github: "https://github.com/AngeloChecked",
  },
};

export const alexandruNedelcuAuthor: GraphNode = {
  type: "author",
  id: "alexandru-nedelcu",
  tagId: [programmingLanguagesTag.id],
  data: {
    name: "Alexandru Nedelcu",
    description:
      "I became acquainted with him through his remarkable blog, which covers topics ranging from Scala, Kotlin, and JVM to various tech stacks and more. Absolutely impressive!",
    website: "https://alexn.org/",
    github: "https://github.com/alexandru",
  },
};

export const alexKladovAuthor: GraphNode = {
  type: "author",
  id: "alex-kladov",
  tagId: [programmingLanguagesTag.id, zigLanguageTag.id, rustLanguageTag.id],
  data: {
    name: "Alex Kladov",
    description:
      "Alex inspired me with his blog, where he shares insightful ideas about Rust, Zig, and a data-driven blog approach.",
    website: "https://matklad.github.io/",
    github: "https://github.com/matklad",
  },
};

export const noelLlopisAuthor: GraphNode = {
  type: "author",
  id: "noel-llopis",
  tagId: [
    programmingTag.id,
    softwareDeveloperCareersTag.id,
    dataOrientedDesignTag.id,
    gameDevelopmentTag.id,
  ],
  data: {
    name: "Noel Llopis",
    description:
      "A game developer who began discussing about Data-Oriented Design, I appreciate him for his intriguing perspectives on pair programming and other programming practices.",
    website: "https://gamesfromwithin.com/",
    github: "https://github.com/llopis",
  },
};

export const yehonathanSharvitAuthor: GraphNode = {
  type: "author",
  id: "yehonathan-sharvit",
  tagId: [programmingTag.id],
  data: {
    name: "Yehonathan Sharvit",
    description:
      "Intriguing individual writing about Data-Oriented Programming.",
    website: "https://blog.klipse.tech/",
    github: "https://github.com/viebel",
  },
};

export const richardFeldmanAuthor: GraphNode = {
  type: "author",
  id: "richard-feldman",
  tagId: [programmingTag.id, programmingLanguagesTag.id],
  data: {
    name: "Richard Feldman",
    description:
      "I'm acquainted with Richard through his presentations on functional programming and his insightful reflections on the evolution of programming languages and paradigms. He is an advocate of Elm, Rust, and Zig, have created Roc a programming language with the aim of replicating the ergonomic features of Elm while extending its capabilities to problem domains beyond web development, drawing inspiration from various programming ecosystems..",
    github: "https://github.com/rtfeldman",
  },
};

export const patrickMcKenzieAuthor: GraphNode = {
  type: "author",
  id: "patrick-mckenzie",
  tagId: [softwareDeveloperCareersTag.id],
  data: {
    name: "Patrick McKenzie",
    description:
      "An intriguing developer who possesses a visionary perspective on business software, offering exceptionally insightful and valuable advice.",
    github: "https://github.com/patio11",
    website: "https://www.kalzumeus.com/",
  },
};

export const henrikKnibergAuthor: GraphNode = {
  type: "author",
  id: "henrik-kniberg",
  tagId: [softwareDeveloperCareersTag.id, artificialIntelligenceTag.id],
  data: {
    name: "Henrik Kniberg",
    description:
      "Agile Coach, game designer, and developer. I came across him when I watched his video titled 'Product Ownership in a nutshell'. Ultimatly he's writing intriguing insight about artificial intelligence and generative AI.",
    github: "https://github.com/hkniberg",
    website: "https://www.crisp.se/en/consultants/henrik-kniberg",
  },
};

export const brianWillAuthor: GraphNode = {
  type: "author",
  id: "brian-will",
  tagId: [programmingTag.id, programmingLanguagesTag.id],
  data: {
    name: "Brian Will",
    description:
      "Interesting guy with super interesting ideas about programming and super opinionated to OOP.",
    github: "https://github.com/BrianWill",
    website: "https://www.youtube.com/@briantwill",
  },
};

export const oliverPowellAuthor: GraphNode = {
  type: "author",
  id: "oliver-powell",
  tagId: [programmingTag.id, programmingLanguagesTag.id],
  data: {
    name: "Oliver Powell",
    description:
      "I met him because of his post about resources that changes his way of thinking about programming.",
    website: "http://www.opowell.com/",
  },
};

export const sigmaStartAuthor: GraphNode = {
  type: "author",
  id: "sigma-star",
  tagId: [programmingTag.id, programmingLanguagesTag.id],
  data: {
    name: "Florian Buchberger",
    description:
      "I believe the author remains anonymous(not sure about the name). They craft exceptional posts on programming languages, and I was captivated when I read their piece on OOP.",
    website: "https://blog.sigma-star.io/",
  },
};

export const jamieBrandonAuthor: GraphNode = {
  type: "author",
  id: "jamie-brandon",
  tagId: [programmingTag.id, programmingLanguagesTag.id],
  data: {
    name: "jamie Brandon",
    description:
      "I discovered him searching about rust and zig. Very good thinking about programming.",
    website: "https://www.scattered-thoughts.net/",
  },
};

export const myAdviceToJuniorDevelopersLink: GraphNode = {
  type: "link",
  id: "my-advice-to-junior-developers",
  authorId: yanCuiAuthor.id,
  tagId: [learningTag.id, softwareDeveloperCareersTag.id],
  data: {
    name: "My Advice to Junior Developers",
    url: "https://cult.honeypot.io/reads/advice-to-junior-developers/",
    description: "A great read exploring junior roles and software career.",
  },
};

export const learnToLearnLink: GraphNode = {
  type: "link",
  id: "learn-to-learn-link",
  authorId: yanCuiAuthor.id,
  tagId: [learningTag.id],
  data: {
    name: "Learn to Learn",
    url: "https://medium.com/hackernoon/learn-to-learn-286558241fd6",
    description:
      "A fascinating article by Yan Cui delves into the art of learning, deliberate practice, and the concept of diminishing returns...",
  },
};

export const aTourOfTheLanguageLandscapeLink: GraphNode = {
  type: "link",
  id: "a-tour-of-the-language-landscape-link",
  authorId: yanCuiAuthor.id,
  tagId: [learningTag.id, programmingLanguagesTag.id, rustLanguageTag.id],
  data: {
    name: "A tour of the language landscape",
    url: "https://av.tib.eu/media/50231",
    description: "Many paradigms, mental shift, amazing talk!",
  },
};

export const dontLearnASyntaxLearnToChangeTheWayYouThinkLink: GraphNode = {
  type: "link",
  id: "dont-learn-a-syntax-learn-to-change-the-way-you-think-link",
  authorId: yanCuiAuthor.id,
  tagId: [learningTag.id],
  data: {
    name: "Don’t learn a syntax, learn to change the way you think",
    url: "https://medium.com/hackernoon/dont-learn-a-syntax-learn-to-change-the-way-you-think-18436807012d",
    description:
      "Interesting article about learning and programming languages, how progamming affect the way we reason about problems?",
  },
};

export const dontbreakprodWebsiteLink: GraphNode = {
  type: "link",
  id: "dont-break-prod-com-link",
  tagId: [learningTag.id],
  data: {
    name: "https://dontbreakprod.com/",
    url: "https://dontbreakprod.com/",
    description:
      "Interesting blog with a collection of interesting development values and practices. The author is anonimous.",
  },
};

export const dataOrientedDesignLink: GraphNode = {
  type: "link",
  id: "data-oriented-desing-link",
  authorId: noelLlopisAuthor.id,
  tagId: [programmingTag.id, dataOrientedDesignTag.id],
  data: {
    name: "Data-Oriented Design (Or Why You Might Be Shooting Yourself in The Foot With OOP)",
    url: "https://gamesfromwithin.com/data-oriented-design",
    description:
      "Amazing blogpost about Data-Oriented Design. Possible the first One?",
  },
};

export const dataOrientedDesignBookLink: GraphNode = {
  type: "link",
  id: "data-oriented-desing-book-link",
  tagId: [programmingTag.id, dataOrientedDesignTag.id],
  data: {
    name: "Data-Oriented Design Book",
    url: "https://www.dataorienteddesign.com/dodmain/",
    description: "A online book about Data-Oriented Design",
  },
};

export const principlesOfdataOrientedProgrammingLink: GraphNode = {
  type: "link",
  id: "principles-of-data-oriented-programming-link",
  authorId: yehonathanSharvitAuthor.id,
  tagId: [programmingTag.id],
  data: {
    name: "Principles of Data-Oriented Programming",
    url: "https://blog.klipse.tech/dop/2022/06/22/principles-of-dop.html",
    description: "article about Data-Oriented Programming by the book author.",
  },
};

export const dontCallYourselfAProgrammerAndOtherCareerAdviceLink: GraphNode = {
  type: "link",
  id: "dont-call-yourself-a-programmer-and-other-career-advice-link",
  authorId: patrickMcKenzieAuthor.id,
  tagId: [programmingTag.id],
  data: {
    name: "Don't Call Yourself A Programmer, And Other Career Advice",
    url: "https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/",
    description:
      "A remarkable and valuable perspective on software development and the identity of programmers. It emphasizes that we work for creating business value, programming is portrayed as an intricate business activity that goes beyond being a simple tool.",
  },
};

export const complexityBiasLink: GraphNode = {
  type: "link",
  id: "complexity-bias-why-we-prefer-complicated-to-simple-link",
  tagId: [softwareDeveloperCareersTag.id, cognitiveBiasTag.id],
  data: {
    name: "Complexity bias",
    url: "https://fs.blog/complexity-bias/",
    description:
      "Humans tend to appreciate and study complex phenomena, yet often the most effective solutions are found in simpler approaches, which make up 99% of the better solutions.",
  },
};

export const agileProductOwnershipInANutshellLink: GraphNode = {
  type: "link",
  id: "agile-product-ownership-in-a-nutshell-link",
  authorId: henrikKnibergAuthor.id,
  tagId: [softwareDeveloperCareersTag.id],
  data: {
    name: "Agile Product Ownership in a Nutshell",
    url: "https://www.youtube.com/watch?v=502ILHjX9EE",
    description:
      "An incredibly succinct definition of agile and product ownership; I've never come across a more concise explanation.",
  },
};

export const generativeAIInANutshellHowToSurviveAndThriveInTheAgeOfAILink: GraphNode =
  {
    type: "link",
    id: "generative-ai-ina-nutshell-how-to-survive-and-thrive-in-the-age-of-ai-link",
    authorId: henrikKnibergAuthor.id,
    tagId: [softwareDeveloperCareersTag.id, artificialIntelligenceTag.id],
    data: {
      name: "Generative AI in a Nutshell - how to survive and thrive in the age of AI",
      url: "https://www.youtube.com/watch?v=2IK3DFHRFfw",
      description: "Concise introduction the the world of generative AI.",
    },
  };

export const areDevelopersNeededUnTheAgeOfAiLink: GraphNode = {
  type: "link",
  id: "are-developers-needed-in-the-age-of-ai-link",
  authorId: henrikKnibergAuthor.id,
  tagId: [softwareDeveloperCareersTag.id, artificialIntelligenceTag.id],
  data: {
    name: "Are developers needed in the age of AI?",
    url: "https://hups.com/blog/are-developers-needed-in-the-age-of-ai",
    description:
      "Fascinating read on the role of developers and the transformative impact of AI technologies on job evolution.",
  },
};

export const objectOrientedProgrammingisBadLink: GraphNode = {
  type: "link",
  id: "object-oriented-programming-is-bad-link",
  authorId: brianWillAuthor.id,
  tagId: [programmingTag.id, objectOrientedProgrammingTag.id],
  data: {
    name: "Object Oriented Programming is Bad",
    url: "https://www.youtube.com/watch?v=QM1iUe6IofM",
    description: "Good points against OOP.",
  },
};

export const talksThatChangedTheWayIThinkAboutProgrammingLink: GraphNode = {
  type: "link",
  id: "talks-that-changed-the-way-i-think-about-programming-link",
  authorId: oliverPowellAuthor.id,
  tagId: [programmingTag.id],
  data: {
    name: "Talks that changed the way I think about programming",
    url: "http://www.opowell.com/post/talks-that-changed-the-way-i-think-about-programming/",
    description: "Incredible set of resources about programming!",
  },
};

export const theLanguageNightmaresAreProgrammedInLink: GraphNode = {
  type: "link",
  id: "the-language-nightmares-are-programmedin-link",
  authorId: sigmaStartAuthor.id,
  tagId: [programmingLanguagesTag.id],
  data: {
    name: "The Language Nightmares Are Programmed In",
    url: "https://blog.sigma-star.io/2022/11/php-sucks/",
    description: "funny real experience of php consistence.",
  },
};

export const okayButWhatAreMonadsLink: GraphNode = {
  type: "link",
  id: "what-are-monads-link",
  authorId: sigmaStartAuthor.id,
  tagId: [programmingTag.id],
  data: {
    name: "Okay, but what ARE Monads?",
    url: "https://blog.sigma-star.io/2023/05/what-are-monads/",
    description: "Interesting metaphors about monads.",
  },
};

export const peopleDontUnderstandOOPLink: GraphNode = {
  type: "link",
  id: "people-dont-understand-oop-link",
  authorId: sigmaStartAuthor.id,
  tagId: [
    programmingTag.id,
    programmingLanguagesTag.id,
    objectOrientedProgrammingTag.id,
  ],
  data: {
    name: "People Don’t Understand OOP",
    url: "https://blog.sigma-star.io/2024/01/people-dont-understand-oop/",
    description:
      "Better explanation and complaining at the same time about OOP I never experienced.",
  },
};

export const assortedThoughtsOnZigAandRustLink: GraphNode = {
  type: "link",
  id: "assorted-thoughts-on-zig-and-rust-link",
  authorId: jamieBrandonAuthor.id,
  tagId: [
    programmingTag.id,
    zigLanguageTag.id,
    rustLanguageTag.id,
    programmingLanguagesTag.id,
  ],
  data: {
    name: "Assorted thoughts on zig (and rust)",
    url: "https://www.scattered-thoughts.net/writing/assorted-thoughts-on-zig-and-rust/",
    description: "Zig and Rust thoughts/qualities very well explained!",
  },
};

export type GraphNode = {
  type: string;
  id: string;
  authorId?: string;
  tagId?: string[];
  data: {
    description: string;
    name: string;
    url?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export const graphNodes: GraphNode[] = [
  yanCuiAuthor,
  angeloCeccatoAuthor,
  alexandruNedelcuAuthor,
  alexKladovAuthor,
  noelLlopisAuthor,
  yehonathanSharvitAuthor,
  richardFeldmanAuthor,
  patrickMcKenzieAuthor,
  henrikKnibergAuthor,
  brianWillAuthor,
  oliverPowellAuthor,
  sigmaStartAuthor,
  jamieBrandonAuthor,

  learningTag,
  cognitiveBiasTag,
  programmingLanguagesTag,
  zigLanguageTag,
  rustLanguageTag,
  softwareDeveloperCareersTag,
  dataOrientedDesignTag,
  programmingTag,
  gameDevelopmentTag,
  objectOrientedProgrammingTag,
  functionalProgrammingTag,
  artificialIntelligenceTag,

  myAdviceToJuniorDevelopersLink,
  learnToLearnLink,
  aTourOfTheLanguageLandscapeLink,
  dontLearnASyntaxLearnToChangeTheWayYouThinkLink,
  dontbreakprodWebsiteLink,
  dataOrientedDesignLink,
  dataOrientedDesignBookLink,
  dontCallYourselfAProgrammerAndOtherCareerAdviceLink,
  complexityBiasLink,
  principlesOfdataOrientedProgrammingLink,
  agileProductOwnershipInANutshellLink,
  generativeAIInANutshellHowToSurviveAndThriveInTheAgeOfAILink,
  areDevelopersNeededUnTheAgeOfAiLink,
  objectOrientedProgrammingisBadLink,
  talksThatChangedTheWayIThinkAboutProgrammingLink,
  theLanguageNightmaresAreProgrammedInLink,
  okayButWhatAreMonadsLink,
  peopleDontUnderstandOOPLink,
  assortedThoughtsOnZigAandRustLink,
];
