import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOrdinalSuffix = num => {
  if (num > 3 && num < 21) return num + 'th'; // Covers 11th to 19th (special case)
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = num % 10;
  return num + (suffixes[v] || 'th');
};

export const getStoredcredential = createAsyncThunk(
  'auth/getStoredcredential',
  async (_, {dispatch}) => {
    const storedDetail = await AsyncStorage.getItem('credentialDetail');
    let parsedDetail = storedDetail ? JSON.parse(storedDetail) : null;
    if (parsedDetail) {
      // Set token in Redux first
      dispatch(setToken(parsedDetail));
      // dispatch(getUserDetails(parsedDetail)); // Now fetch user details after setting the token
    }
    return parsedDetail;
  },
);

const initialState = {
  token: null,
  tokenStatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const normalSlice = createSlice({
  name: 'normal',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: state => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStoredcredential.pending, state => {
        state.tokenStatus = 'loading';
      })
      .addCase(getStoredcredential.fulfilled, (state, action) => {
        state.tokenStatus = 'succeeded';
        state.token = action.payload;
        console.log('Token in store:', state.token); // Log the token in store
      })
      .addCase(getStoredcredential.rejected, (state, action) => {
        state.tokenStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions from slice
export const {setToken, logout} = normalSlice.actions;
// Export the reducer
export default normalSlice.reducer;
