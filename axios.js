import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://collosium-server.onrender.com/api/",
});


export const fetchAllMatches = (updateBookiesMatches) => {
  fetchOnexbet(updateBookiesMatches);
  fetchBetking(updateBookiesMatches);
  fetchBetway(updateBookiesMatches);
  fetchParimatch(updateBookiesMatches);
};

const fetchOnexbet = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/onexbet");
    res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "onexbet");
  } catch (err) {
    console.log("error fetching from 1xbet: ", err);
  }
};

const fetchBetNaija = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/betnaija");
    res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "betnaija");
  } catch (err) {
    console.log("error fetching from betnaija: ", err);
  }
};

const fetchParimatch = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/parimatch");
    res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "parimatch");
  } catch (err) {
    console.log("error fetching from parimatch: ", err);
  }
};

const fetchBetking = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/betking");
    res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "betking");
  } catch (err) {
    console.log("error fetching from betking: ", err);
  }
};

const fetchBetway = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/betway");
    res?.data?.Matches && updateBookiesMatches(res?.data?.Matches, "betway");
  } catch (err) {
    console.log("error fetching from betway: ", err);
  }
};
