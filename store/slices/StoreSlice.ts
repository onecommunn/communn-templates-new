import { IUser } from '@/models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserState {
    user: IUser | null
  }
  
  const initialState: IUserState = {
    user: null,
  };

const loggedInUser = createSlice({
name: 'user',
initialState,
reducers: {
    loginUser(state,action:PayloadAction<IUser>){
        state.user = action.payload;
    },
    logoutUser(state){
      state.user = null;
  }
}
});

// console.log(loggedInUser.actions)
export default loggedInUser.reducer
export const { loginUser ,logoutUser} = loggedInUser.actions;