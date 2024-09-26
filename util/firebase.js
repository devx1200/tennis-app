const MATCHES = [
  {
    name: 'Match Name',
    date: '2024 Championships',
    live: true,
    time: '7:25 PM',
    playerOneFirstName: 'Tommy',
    playerOneLastName: 'Paul',
    playerTwoFirstName: 'Jack',
    playerTwoLastName: 'Draper',
    playerOneCountry: 'England',
    playerTwoCountry: 'United States',
    location: 'Paris, France',
    category: 'Mens Double',
    round: 'Quarterfinal',
    court: 'Centre Court',
  },
];

const TOURNAMENTS = [
  {
    league: 0,
  },
];

const SCHOOLS = [
  {
    id: 0,
    name: 'Chelsea',
  },
  {
    id: 1,
    name: 'Albion',
  },
  {
    id: 2,
    name: 'Arsenal',
  },
  {
    id: 3,
    name: 'Stoke City',
  },
  {
    id: 4,
    name: 'Leicester City',
  },
  {
    id: 5,
    name: 'Man United',
  },
];

const db = {
  getHomeMatches: filter => {
    const matches = [];
    const tournaments = [];

    [...Array(10)].map((_, i) => {
      const match = {};
      match.id = Math.random();
      matches.push(match);
    });

    [...Array(10)].map((_, i) => {
      const tournament = {};
      tournament.id = Math.random();
      tournament.league = Math.floor(Math.random() * 7);
      tournaments.push(tournament);
    });

    return {
      main: matches,
      live: matches,
      tournaments,
      upcoming: matches,
      replays: matches,
      playoffs: matches,
    };
  },
  getLiveSections: filter => {
    const getMatches = () => {
      const matches = [];

      [...Array(10)].map((_, i) => {
        const match = {};
        match.id = Math.random();
        matches.push(match);
      });

      return matches;
    };

    const sections = [];

    [...Array(5)].map((_, i) => {
      const matches = getMatches();

      const section = {
        id: Math.random(),
        name: 'UIL',
        matches,
      };

      sections.push(section);
    });

    return sections;
  },
  getMatch: filter => {
    return MATCHES[0];
  },
  getMoreMatches: filter => {
    const matches = [];

    [...Array(10)].map((_, i) => {
      const match = JSON.parse(JSON.stringify(MATCHES[0]));
      match.id = Math.random();
      matches.push(match);
    });

    return matches;
  },
  getSchools: () => {
    return SCHOOLS;
  },
  getSchoolsFollowing: () => {
    const schools = [];

    [...Array(4)].map((_, i) => {
      const school = Math.floor(Math.random() * 6);
      schools.push(school);
    });

    return schools;
  },
};

const auth = {};

export {db, auth};
