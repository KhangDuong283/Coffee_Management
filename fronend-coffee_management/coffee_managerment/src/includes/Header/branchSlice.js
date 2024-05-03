import { createSlice } from '@reduxjs/toolkit';

const branchSlice = createSlice({
    name: 'branch',
    initialState: null,
    reducers: {
        selectBranch: (state, action) => {
            // return brancn_id
            return action.payload;
        },
    },
});

const { actions, reducer } = branchSlice;
export const { selectBranch } = actions;

export default reducer;