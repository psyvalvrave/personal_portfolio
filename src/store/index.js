//src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import responsiveReducer from './responsiveSlice';

export const store = configureStore({
    reducer: {
        responsive: responsiveReducer,
    },
});
