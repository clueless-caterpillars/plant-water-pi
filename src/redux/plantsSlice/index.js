import { createSlice } from "@reduxjs/toolkit";

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plant: {},
    history: [],
    logTableData: []
  },
  reducers: {
    updateMostRecentPlantData(state, action){
      // console.log('REDUCER STATE: ', action.payload)
      state.plant = action.payload;
    },
    updatePlantHistory(state, action){
      let sortedHistory = action.payload.sort((a, b) => {
        if (a < b){
          return 1
        }
        else if (a > b){
          return -1
        }
        else return 0
      })
      state.history = sortedHistory;
    },
    updateLogTableData(state, action){
      state.logTableData = action.payload;
    }
  }
})

export default plantsSlice;