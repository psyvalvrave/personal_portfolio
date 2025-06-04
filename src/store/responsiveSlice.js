import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMobile: null,
};

const responsiveSlice = createSlice({
    name: 'responsive',
    initialState,
    reducers: {
        setIsMobile(state, action) {
        state.isMobile = action.payload;
        },
    },
});

export const { setIsMobile } = responsiveSlice.actions;
export default responsiveSlice.reducer;
