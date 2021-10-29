import { createSlice } from "@reduxjs/toolkit";

import { initialUserState } from "../misc/initialData";

// Create user slice
export const userSlice = createSlice({
	name: "user",
	initialState: { value: initialUserState },
	reducers: {
		setUser: (state, action) => {
			state.value = action.payload.user;
		},
	},
});

// Export actions
export const { setUser } = userSlice.actions;

// Export user reducer
export default userSlice.reducer;
