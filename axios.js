import axios from "axios";
import { useBookiesStore } from "./store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});


export const fetchAllMatches = (updateBookiesMatches) => {
  let min = 1
  // const setInterval(() => {
  //   console.log("minute passed: ", min)
  //   min++
  // }, 60000);

  fetchOnexbet(updateBookiesMatches);
  fetchBetking(updateBookiesMatches);
  fetchBetway(updateBookiesMatches);
  fetchParimatch(updateBookiesMatches);
  fetchBetNaija(updateBookiesMatches);
};

const fetchOnexbet = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/onexbet");
    // console.log("length 1x: ", res?.data?.length)
    updateBookiesMatches(res?.data?.Matches, "onexbet");
  } catch (err) {
    console.log("error fetching from 1xbet: ", err);
  }
};

const fetchBetNaija = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/betnaija");
    // console.log("length naija: ", res?.data?.length)
    updateBookiesMatches(res?.data?.Matches, "betnaija");
  } catch (err) {
    console.log("error fetching from betnaija: ", err);
  }
};

const fetchParimatch = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/parimatch");
    // console.log("length pari: ", res?.data?.length)
    updateBookiesMatches(res?.data?.Matches, "parimatch");
  } catch (err) {
    console.log("error fetching from parimatch: ", err);
  }
};

const fetchBetking = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/betking");
    // console.log("length king: ", res?.data?.length);
    updateBookiesMatches(res?.data?.Matches, "betking");
  } catch (err) {
    console.log("error fetching from betking: ", err);
  }
};

const fetchBetway = async (updateBookiesMatches) => {
  try {
    const res = await axiosInstance.get("/betway");
    // console.log("length way: ", res?.data?.length)
    updateBookiesMatches(res?.data?.Matches, "betway");
  } catch (err) {
    console.log("error fetching from betway: ", err);
  }
};
