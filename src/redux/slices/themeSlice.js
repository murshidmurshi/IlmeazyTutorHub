import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Theme_key = "@app_theme";

const initialState = {
    theme: null, // Start with the system theme
};

export const loadTheme = createAsyncThunk(
    "theme/loadTheme",
    async () => {
        // set the theme and save to asyncStorage
        const storedTheme = await AsyncStorage.getItem(Theme_key);
        //if no theme is saved then fall back to system theme
        return storedTheme || Appearance.getColorScheme() || 'light';
    }
);

const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            // Save the theme to asyncStorage
            state.theme = action.payload;
            console.log("Saving theme ...");
            AsyncStorage.setItem(Theme_key, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadTheme.fulfilled, (state, action) => {
            state.theme = action.payload;
        });
    }
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
