import { createSlice } from "@reduxjs/toolkit";

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    allPlants: [],
    activePlant: {},
  },
  reducers: {
    updateAllPlants(state, action){
      console.log('PLANTS SLICE REDUCER: ', action.payload)
      state.allPlants = action.payload;
    },
    setActivePlant(state, action){
      if (action.payload.humidity && action.payload.temperature){
        action.payload.humidity = action.payload.humidity?.toFixed(2);
        action.payload.temperature = action.payload.temperature?.toFixed(2);        
      }
      state.activePlant = action.payload;
    }
  }
})

export default plantsSlice;