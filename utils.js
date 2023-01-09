

export const fetchFromBookie = (bookie, teams, bookieName) => {
  let matchName = [];

  for (let i = 0; i < bookie.length; i++) {
    const simteam1 = Math.round(
      similarity(bookie[i]?.team1, teams?.team1) * 100
    );
    const simteam2 = Math.round(
      similarity(bookie[i]?.team2, teams?.team2) * 100
    );
    if (simteam1 > 40 && simteam2 > 40) {
      matchName.push({ bookie: bookieName, info: bookie[i] });
      break;
    }
  }

  return matchName;
}


// export function fetchFromOnexbet(onexbet, teams) {
//   let matchName = [];
  
//   for (let i = 0; i < onexbet.length; i++) {
//     const simteam1 = Math.round(
//       similarity(onexbet[i]?.team1, teams?.team1) * 100
//     );
//     const simteam2 = Math.round(
//       similarity(onexbet[i]?.team2, teams?.team2) * 100
//     );
//     if (simteam1 > 40 && simteam2 > 40) {
//       matchName.push({ bookie: "1xbet", info: onexbet[i] });
//       break;
//     }
//   }

//   return matchName;
// };

// export function fetchFromBetnaija(betnaija, teams) {
//   let matchName = [];

//   for (let i = 0; i < betnaija.length; i++) {
//     const simteam1 = Math.round(
//       similarity(betnaija[i]?.team1, teams?.team1) * 100
//     );
//     const simteam2 = Math.round(
//       similarity(betnaija[i]?.team2, teams?.team2) * 100
//     );
//     if (simteam1 > 40 && simteam2 > 40) {
//       matchName.push({ bookie: "Betnaija", info: betnaija[i] });
//       break;
//     }
//   }
//   return matchName;
// };

// export function fetchFromBetway(betway, teams) {
//   let matchName = [];

//   for (let i = 0; i < betway.length; i++) {
//     const simteam1 = Math.round(
//       similarity(betway[i]?.team1, teams?.team1) * 100
//     );
//     const simteam2 = Math.round(
//       similarity(betway[i]?.team2, teams?.team2) * 100
//     );
//     if (simteam1 > 40 && simteam2 > 40) {
//       matchName.push({ bookie: "Betway", info: betway[i] });
//       break;
//     }
//   }

//   return matchName;
// };

// export function fetchFromParimatch(parimatch, teams) {
//   let matchName = [];

//   for (let i = 0; i < parimatch.length; i++) {
//     const simteam1 = Math.round(
//       similarity(parimatch[i]?.team1, teams?.team1) *
//         100
//     );
//     const simteam2 = Math.round(
//       similarity(parimatch[i]?.team2, teams?.team2) *
//         100
//     );
//     if (simteam1 > 40 && simteam2 > 40) {
//       matchName.push({ bookie: "Parimatch", info: parimatch[i] });
//       break;
//     }
//   }

//   return matchName;
// };

// export function fetchFromBetking(betking, teams) {
//   let matchName = [];

//   for (let i = 0; i < betking.length; i++) {
//     const simteam1 = Math.round(
//       similarity(betking[i]?.team1, teams?.team1) * 100
//     );
//     const simteam2 = Math.round(
//       similarity(betking[i]?.team2, teams?.team2) * 100
//     );
    
//     if (simteam1 > 40 && simteam2 > 40) {
//       matchName.push({ bookie: "Betking", info: betking[i] });
//       break;
//     }
//   }

//   return matchName;
// };

// export const fetchFromSportyBet = () => {

// }



// Unbiased func

export const calculateBiasedArbitrage = (rows, stakeVal) => {

  const { highestHomeOdd, highestHomeBookie, highestAwayOdd, highestAwayBookie } = calculateHighestVals(rows);

  let probHomeWin = 0;
  let probAwayWin = 0;

  if(highestHomeOdd < highestAwayOdd) {
    probHomeWin = ((1 / highestHomeOdd).toFixed(2) * 100);
    probAwayWin = 100 - probHomeWin;
  } else {
    probAwayWin = ((1 / highestAwayOdd).toFixed(2) * 100);
    probHomeWin = 100 - probAwayWin;
  }

  let homeStake = (((probHomeWin * stakeVal) / 100).toFixed(0)) * 1;
  let awayStake = (((probAwayWin * stakeVal) / 100).toFixed(0)) * 1;

  const { homeWin, awayWin} = calculateProfit(highestHomeOdd, highestAwayOdd, homeStake, awayStake);

  let response = {
    homeStake: parseInt(homeStake.toFixed(0)).toLocaleString("en-US"),
    homeWin: parseInt(homeWin.toFixed(0)).toLocaleString("en-US"),
    homeBookie: highestHomeBookie,
    homeOdd: highestHomeOdd,
    awayStake: parseInt(awayStake.toFixed(0)).toLocaleString("en-US"),
    awayWin: parseInt(awayWin.toFixed(0)).toLocaleString("en-US"),
    awayBookie: highestAwayBookie,
    awayOdd: highestAwayOdd
  }

  return response;
};

// end of biased func


// Unbiased func

let totalUnbiasedHomeStake = 0;
let totalUnbiasedAwayStake = 0;

export const calculateUnbiasedArbitrage = (rows, stakeVal) => {
  totalUnbiasedHomeStake = 0; // reset their values.
  totalUnbiasedAwayStake = 0; // reset their values.

  const { highestHomeOdd, highestHomeBookie, highestAwayOdd, highestAwayBookie } = calculateHighestVals(rows);


  let probHomeWin = ((1 / highestHomeOdd).toFixed(2) * 100);
  let probAwayWin = ((1 / highestAwayOdd).toFixed(2) * 100);

  if(probHomeWin + probAwayWin >= 100) return; // stop calculating if its not suitable for arbitrage betting.

  unbiasedCalc(probHomeWin, probAwayWin, stakeVal);
  const { homeWin, awayWin} = calculateProfit(highestHomeOdd, highestAwayOdd, totalUnbiasedHomeStake, totalUnbiasedAwayStake);

  let response = {
    homeStake: parseInt(totalUnbiasedHomeStake.toFixed(0)).toLocaleString("en-US"),
    homeWin: parseInt(homeWin.toFixed(0)).toLocaleString("en-US"),
    homeBookie: highestHomeBookie,
    homeOdd: highestHomeOdd,
    awayStake: parseInt(totalUnbiasedAwayStake.toFixed(0)).toLocaleString("en-US"),
    awayWin: parseInt(awayWin.toFixed(0)).toLocaleString("en-US"),
    awayBookie: highestAwayBookie,
    awayOdd: highestAwayOdd
  }

  return response;
}


const unbiasedCalc = (probHomeWin, probAwayWin, stakeVal) => {
  if(stakeVal < 1) return "complete";

  let homeStake = 0;
  let awayStake = 0;
  let remnant = 0;

  homeStake = (((probHomeWin * stakeVal) / 100).toFixed(2)) * 1;
  awayStake = (((probAwayWin * stakeVal) / 100).toFixed(2)) * 1;
  remnant = stakeVal - (homeStake + awayStake);

  totalUnbiasedHomeStake += homeStake;
  totalUnbiasedAwayStake += awayStake;
  return unbiasedCalc(probHomeWin, probAwayWin, remnant);
}

// end of unbiased func



// general func

const calculateHighestVals = (rows) => {
  let highestHomeOdd = 0;
  let highestHomeBookie = "";
  let highestAwayOdd = 0;
  let highestAwayBookie = "";

  for(const row of rows) {
    if(row.info?.homeOdd > highestHomeOdd) {
      highestHomeOdd = row.info?.homeOdd
      highestHomeBookie = row.bookie
    }
    if(row.info?.awayOdd > highestAwayOdd) {
      highestAwayOdd = row.info?.awayOdd
      highestAwayBookie = row.bookie
    }
  }

  if(highestHomeBookie == highestAwayBookie) {
    
    if(highestHomeOdd > highestAwayOdd) {
      highestAwayOdd = 0;

      for(const row of rows) {
        if(row.info?.awayOdd > highestAwayOdd && row.bookie != highestAwayBookie) {
          highestAwayOdd = row.info?.awayOdd
          highestAwayBookie = row.bookie
        }
      }
    }
    else {
      highestHomeOdd = 0;

      for(const row of rows) {
        if(row.info?.homeOdd > highestHomeOdd && row.bookie != highestHomeBookie) {
          highestHomeOdd = row.info?.homeOdd
          highestHomeBookie = row.bookie
        }
      }
    }
  }

  return { highestHomeOdd, highestHomeBookie, highestAwayOdd, highestAwayBookie}
}

const calculateProfit = (homeOdd, awayOdd, homeStake, awayStake) => {
  let homeWin = (homeStake * (homeOdd - 1)) - awayStake;
  let awayWin = (awayStake * (awayOdd - 1)) - homeStake;

  return { homeWin, awayWin }
}


// calculate string simialrity

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};