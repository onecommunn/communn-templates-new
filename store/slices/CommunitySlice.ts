import { ICommunity } from '@/models/community.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ICommunityState {
  logo: any;
  selectedCommunity: ICommunity | undefined;
}

const initialState: ICommunityState = {
  selectedCommunity: undefined,
  logo: undefined,
};

const selectedCommunity = createSlice({
  name: 'selectedCommunity',
  initialState,
  reducers: {
    loadSelectedCommunity(state, action: PayloadAction<ICommunity>) {
      state.selectedCommunity = action.payload;
      localStorage.setItem('communityId', action?.payload?._id);
    },
    removeCommunity(state) {
      state.selectedCommunity = undefined;
    },
  },
});

interface ICommunitiesState {
  communities: ICommunity[] | [];
}

const communitiesState: ICommunitiesState = {
  communities: [],
};
const communities = createSlice({
  name: 'communities',
  initialState: communitiesState,
  reducers: {
    loadCommunities(state, action: PayloadAction<ICommunity[]>) {
      state.communities = action.payload;
    },
    removeCommunities(state) {
      state.communities = [];
    },
  },
});

export { selectedCommunity, communities };
export const { loadSelectedCommunity, removeCommunity } =
  selectedCommunity.actions;
export const { loadCommunities, removeCommunities } = communities.actions;
