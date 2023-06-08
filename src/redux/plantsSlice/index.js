import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plant: {},
    history: [],
    logTableData: []
  },
  reducers: {
    updateMostRecentPlantData(state, action){
      state.plant = action.payload;
    },
    updatePlantHistory(state, action){
      let sortedHistory = action.payload.map(item => moment(item).format("ddd, MMM D YYYY"))
      sortedHistory.sort((a, b) => {
        if (a < b){
          return 1
        }
        else if (a > b){
          return -1
        }
        else return 0
      });
      
      state.history = sortedHistory;
    },
    updateLogTableData(state, action){
      let sortedLogData = action.payload.sort((a, b) => {
        if (a.timeStamp < b.timeStamp){
          return -1
        }
        else if (a.timeStamp > b.timeStamp){
          return 1
        }
        else return 0
      })
      state.logTableData = sortedLogData;
    }
  }
})

export default plantsSlice;