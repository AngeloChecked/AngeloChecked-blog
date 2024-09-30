import { fromGraphToPost } from "../_includes/utils.ts";
import {
  dontLearnASyntaxLearnToChangeTheWayYouThinkLink,
  functionalProgrammingTag,
  Graph,
  objectOrientedProgrammingisBadLink,
  objectOrientedProgrammingTag,
  peopleDontUnderstandOOPLink,
  programmingLanguagesTag,
} from "../graph/pages.page.ts";
import { cognitiveBiasTag } from "../graph/pages.page.ts";
import { learningTag } from "../graph/pages.page.ts";
import { angeloCeccatoAuthor } from "../graph/pages.page.ts";

export const philosophicalRamblingsAboutEcologyProgrammingLanguagesAndOOPNotJava: Graph = {
  type: "post",
  id: "philosophical-ramblings-about-ecology-programming-languages-and-OOP-not-java",
  tagId: [learningTag.id, programmingLanguagesTag.id, cognitiveBiasTag.id, objectOrientedProgrammingTag.id, functionalProgrammingTag.id],
  authorId: angeloCeccatoAuthor.id,
  linkId: [
    peopleDontUnderstandOOPLink.id,
    objectOrientedProgrammingisBadLink.id
  ],
  data: {
    name: "My useless philosophical ramblings about the ecology of programming languages (and OOP is not Java)",
    description:
      "Futile theories of programming languages and paradigms",
    searchTags: [
      "Programming languages",
      "Cognitive Bias",
      "Object Oriented Programming",
      "Functional Programming",
    ],
    date: "2024-04-13T13:00:00.000Z",
    thumbnail: { src: "/img/philosophical_ramblings_about_ecology_programming_languages_and_OOP_not_java/toomanyspiderman.small.png" },
  },
};

export default fromGraphToPost(philosophicalRamblingsAboutEcologyProgrammingLanguagesAndOOPNotJava);
