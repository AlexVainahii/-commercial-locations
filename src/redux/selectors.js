export const selectCommerces = state => state.commerces.commerces;

export const selectIsLoading = state => state.commerces.isLoading;

export const selectError = state => state.commerces.error;

export const selectFilter = state => state.filter;

export const selectUser = state => state.auth.user;

export const selectIsLogged = state => state.auth.isLogged;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectMapType = state => state.map.mapType;
