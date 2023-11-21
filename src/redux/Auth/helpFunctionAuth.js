export const onPending = state => {
  state.isRefreshing = true;
};

export const onRejected = state => {
  state.isRefreshing = false;
};

export const onFulfilledRegisterLogin = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLogged = true;
};
export const onFulfilledLogOut = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLogged = false;
};
export const onFulfilledRefresh = (state, { payload }) => {
  state.user = payload;
  state.isLogged = true;
  state.isRefreshing = false;
};
