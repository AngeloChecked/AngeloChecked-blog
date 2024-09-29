import type { GraphNode } from "../graph/knowledgeGraph.ts";

import {
  dontLearnASyntaxLearnToChangeTheWayYouThinkLink,
  learnToLearnLink,
  programmingLanguagesTag,
  rustLanguageTag,
  cognitiveBiasTag,
  learningTag,
  angeloCeccatoAuthor,
} from "../graph/knowledgeGraph.ts";

export const myPersonalTechLimboElixirVsRustPost: GraphNode = {
  type: "post",
  id: "my-personal-tech-limbo-elixir-vs-rust",
  tagId: [
    learningTag.id,
    programmingLanguagesTag.id,
    cognitiveBiasTag.id,
    rustLanguageTag.id,
  ],
  authorId: angeloCeccatoAuthor.id,
  linkId: [
    learnToLearnLink.id,
    dontLearnASyntaxLearnToChangeTheWayYouThinkLink.id,
  ],
  data: {
    title: "My Personal Tech Limbo (and Elixir vs Rust)",
    description:
      "My corrupted state of mind by hype cycle, fomo, overchoice and information overload",
    searchTags: [
      "Elixir",
      "Rust",
      "Programming languages",
      "Cognitive Bias",
      "Information Overload",
      "FOMO",
      "Hype Cycle",
    ],
    date: "2022-06-13T16:00:00.000Z",
    thumbnail: { src: "/img/elixir_vs_rust_resized.webp" },
  },
};
