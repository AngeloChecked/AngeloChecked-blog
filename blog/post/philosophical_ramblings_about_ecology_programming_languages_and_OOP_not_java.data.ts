import type { GraphNode } from "../graph/knowledgeGraph.ts";

import {
  functionalProgrammingTag,
  objectOrientedProgrammingisBadLink,
  objectOrientedProgrammingTag,
  peopleDontUnderstandOOPLink,
  programmingLanguagesTag,
  cognitiveBiasTag,
  learningTag,
  angeloCeccatoAuthor,
} from "../graph/knowledgeGraph.ts";

export const philosophicalRamblingsAboutEcologyProgrammingLanguagesAndOOPNotJava: GraphNode =
  {
    type: "post",
    id: "philosophical-ramblings-about-ecology-programming-languages-and-OOP-not-java",
    tagId: [
      learningTag.id,
      programmingLanguagesTag.id,
      cognitiveBiasTag.id,
      objectOrientedProgrammingTag.id,
      functionalProgrammingTag.id,
    ],
    authorId: angeloCeccatoAuthor.id,
    linkId: [
      peopleDontUnderstandOOPLink.id,
      objectOrientedProgrammingisBadLink.id,
    ],
    data: {
      title:
        "My useless philosophical ramblings about the ecology of programming languages (and OOP is not Java)",
      description: "Futile theories of programming languages and paradigms",
      searchTags: [
        "Programming languages",
        "Cognitive Bias",
        "Object Oriented Programming",
        "Functional Programming",
      ],
      date: "2024-04-13T13:00:00.000Z",
      thumbnail: {
        src: "/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/toomanyspiderman.480x240.small.webp",
      },
    },
  };
