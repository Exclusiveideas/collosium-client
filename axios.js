import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://collosium-server.onrender.com/api/",
});


export const fetchAllMatches = (updateBookiesMatches) => {
  let allBookies = [
    "onexbet",
    // "parimatch",
    "betway",
    // "sportybet",
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
