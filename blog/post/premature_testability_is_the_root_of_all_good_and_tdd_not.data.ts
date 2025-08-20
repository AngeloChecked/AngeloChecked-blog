import type { GraphNode } from "../graph/knowledgeGraph.ts";

import {
  programmingLanguagesTag,
  cognitiveBiasTag,
  learningTag,
  angeloCeccatoAuthor,
} from "../graph/knowledgeGraph.ts";

export const prematureTestabilityIsTheRootOfAllGoodAndTddNotPost: GraphNode = {
  type: "post",
  id: "premature-testability-is-the-root-of-all-good-and-tdd-not",
  tagId: [learningTag.id, programmingLanguagesTag.id, cognitiveBiasTag.id],
  authorId: angeloCeccatoAuthor.id,
  linkId: [],
  data: {
    deactivated: true,
    title: "Premature Testability is the Root of All Good (and TDD not)",
    description:
      "my reflection about testable design and why i think it's important",
    searchTags: ["Programming languages"],
    date: "2025-07-13T16:00:00.000Z",
    thumbnail: {
      src: "img/premature_testability_is_the_root_of_all_good_and_tdd_not/i_just_wanted_to_test_it.webp",
    },
  },
};
