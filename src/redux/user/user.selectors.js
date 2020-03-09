import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const sellectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
