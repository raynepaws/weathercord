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

export const team = Object.freeze<Contributor[]>([
  {
    id: "0w1bcb00925be5d2",
    name: "Rayne D.",
    roles: [ContributorRole.Founder, ContributorRole.Programmer],
    github: {
      username: "raynepaws",
      id: "129226914"
    },
    quote: "i love tally"
  },
  {
    id: "1w053d3942035cb9",
    name: "tally",
    roles: [ContributorRole.Translator],
    github: {
      username: "tallypaws",
      id: "113806118"
    },
    quote: "bleps at u"
  },
  {
    name: "ddededodediamante",
    roles: [ContributorRole.Translator],
    github: {
      username: "ddededodediamante",
      id: "111385835"
    },
    quote: "I'm ddededodediamante!"
  }
]);

export const contributors = Object.freeze<Contributor[]>([]);
