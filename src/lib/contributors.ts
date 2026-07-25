export enum ContributorRole {
  Founder = "founder",
  Programmer = "programmer",
  Translator = "translator"
}

export interface Contributor {
  id?: string;
  name?: string;
  roles?: ContributorRole[];
  github: {
    username: string,
    id: string
  },
  quote?: string;
}

const people = {
  rayne: {
    id: "0w1bcb00925be5d2",
    name: "Rayne D.",
    roles: [ContributorRole.Founder, ContributorRole.Programmer],
    github: {
      username: "raynepaws",
      id: "129226914"
    },
    quote: "wethmercor"
  },
  tally: {
    id: "1w053d3942035cb9",
    name: "tally",
    roles: [ContributorRole.Translator],
    github: {
      username: "tallypaws",
      id: "113806118"
    },
    quote: "bleps at u"
  },
  dde: {
    name: "ddededodediamante",
    roles: [ContributorRole.Translator],
    github: {
      username: "ddededodediamante",
      id: "111385835"
    },
    quote: "I'm ddededodediamante!"
  },
  vuie: {
    name: "vuie",
    roles: [ContributorRole.Translator],
    github: {
      username: "vuie68",
      id: "234969917"
    },
    quote: "hello there, person who is reading this piece of text right now"
  },
  noodles: {
    name: "noodles",
    roles: [ContributorRole.Translator],
    github: {
      username: "windynoodles",
      id: "155268413"
    },
    quote: "wood fired pizza? how's pizza gonna get a job now"
  }
};

export const team = Object.freeze<Contributor[]>([
  people.rayne,
  people.tally,
  people.dde,
  people.vuie,
  people.noodles
]);

export const contributors = Object.freeze<Contributor[]>([
  people.tally
]);
