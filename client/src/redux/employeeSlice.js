import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employeeS",
  initialState: {
    name: "",
    role: "",
    email: "",
    image: "",
    address: "",
    phone:"",
    department: "",
    tags: [],
    date: new Date().toUTCString(),
  },
  reducers: {
      add:(state) => {
         console.log('state',state)   
      }
  },
});

export default employeeSlice.reducer;

export const { add } = employeeSlice.actions;
