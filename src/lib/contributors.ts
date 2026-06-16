export interface Contributor {
  id?: string;
  name?: string;
  github: {
    username: string,
    id: string
  },
  quote?: string;
}

export const contributors: readonly Contributor[] = Object.freeze([
  {
    id: "0w1bcb00925be5d2",
    name: "Rayne D.",
    github: {
      username: "raynepaws",
      id: "129226914"
    },
    quote: "but we've been born anew, so perfectly askew..."
  },
  {
    id: "1w053d3942035cb9",
    name: "tally",
    github: {
      username: "tallypaws",
      id: "113806118"
    },
    quote: "bleps at u"
  },
  {
    id: "0w049c240cf19df5",
    name: "Kat M.",
    github: {
      username: "thekathere",
      id: "100965627"
    },
    quote: "Celeste: Ferrous Well (1971)"
  }
]);
