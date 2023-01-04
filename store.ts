import create from "zustand";

interface IBookies {
  onexbet: [
    {
      team1: string;
      team2: string;
      homeOdd: number;
      drawOdd: number;
      awayOdd: number;
      timeOfMatch?: string;
      tournament?: string;
    }
  ];
  betway: [
    {
      team1: string;
      team2: string;
      homeOdd: number;
      drawOdd: number;
      awayOdd: number;
      timeOfMatch?: string;
      tournament?: string;
    }
  ];
  betking: [
    {
      team1: string;
      team2: string;
      homeOdd: number;
      drawOdd: number;
      awayOdd: number;
      timeOfMatch?: string;
      tournament?: string;
    }
  ];
  parimatch: [
    {
      team1: string;
      team2: string;
      homeOdd: number;
      drawOdd: number;
      awayOdd: number;
      timeOfMatch?: string;
      tournament?: string;
    }
  ];
  // betnaija: [
  //   {
  //     team1: string;
  //     team2: string;
  //     homeOdd: number;
  //     drawOdd: number;
  //     awayOdd: number;
  //     timeOfMatch?: string;
  //     tournament?: string;
  //   }
  // ];
  updateBookiesMatches: (matchesData: Array<{}>, bookie: any) => void;
}

export const useBookiesStore = create<IBookies>((set) => ({
  onexbet: [
    {
      team1: "",
      team2: "",
      homeOdd: 0,
      drawOdd: 0,
      awayOdd: 0,
    },
  ],
  betway: [
    {
      team1: "",
      team2: "",
      homeOdd: 0,
      drawOdd: 0,
      awayOdd: 0,
    },
  ],
  betking: [
    {
      team1: "",
      team2: "",
      homeOdd: 0,
      drawOdd: 0,
      awayOdd: 0,
    },
  ],
  parimatch: [
    {
      team1: "",
      team2: "",
      homeOdd: 0,
      drawOdd: 0,
      awayOdd: 0,
    },
  ],
  // betnaija: [
  //   {
  //     team1: "",
  //     team2: "",
  //     homeOdd: 0,
  //     drawOdd: 0,
  //     awayOdd: 0,
  //   },
  // ],
  updateBookiesMatches: (matchesData: Array<{}>, bookie: any) =>
    set((state) => ({ ...state, [bookie]: matchesData })),
}));
