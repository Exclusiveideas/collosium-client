import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://collosium-server.onrender.com/api/",
});


export const fetchAllMatches = (updateBookiesMatches) => {
  let allBookies = [
    "onexbet",
    "parimatch",
    "betway",
    "sportybet",
  ];

  for(const bookieName of allBookies) {
    fetchBookieApi(updateBookiesMatches, bookieName);
  }
};

const fetchBookieApi = async (updateBookiesMatches, bookieName) => {

  try {
    const res = await axiosInstance.get(`/${bookieName}`);
    res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, bookieName);
  } catch (err) {
    console.log(`error fetching from ${bookieName}:  ${err}`);
  }
}

export const fetchBetking = async (teams) => {
  try {
    const res = await axiosInstance.get(`/betking?team1=${teams?.team1}&team2=${teams?.team2}`);
    return res?.data?.matchInfo
  } catch (err) {
    console.log("error fetching from betking: ", err);
  }
};

// const fetchOnexbet = async (updateBookiesMatches) => {
//   try {
//     const res = await axiosInstance.get("/onexbet");
//     res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "onexbet");
//   } catch (err) {
//     console.log("error fetching from 1xbet: ", err);
//   }
// };

// const fetchBetNaija = async (updateBookiesMatches) => {
//   try {
//     const res = await axiosInstance.get("/betnaija");
//     res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "betnaija");
//   } catch (err) {
//     console.log("error fetching from betnaija: ", err);
//   }
// };

// const fetchParimatch = async (updateBookiesMatches) => {
//   try {
//     const res = await axiosInstance.get("/parimatch");
//     res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "parimatch");
//   } catch (err) {
//     console.log("error fetching from parimatch: ", err);
//   }
// };



// const fetchBetway = async (updateBookiesMatches) => {
//   try {
//     const res = await axiosInstance.get("/betway");
//     res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "betway");
//   } catch (err) {
//     console.log("error fetching from betway: ", err);
//   }
// };


// const fetchSportyBet = async (updateBookiesMatches) => {
//   try {
//     const res = await axiosInstance.get("/sportybet");
//     res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "sportybet");
//   } catch (err) {
//     console.log("error fetching from sportybet: ", err);
//   }
// };
