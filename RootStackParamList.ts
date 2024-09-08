export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
};

export type BottomTabParamList = {
  JobStack: undefined;
  AppliedJobScreen: undefined;
  ProfileScreen: undefined;
};

export type JobStackParamList = {
  JobList: undefined;
  JobDetailScreen: {id: string | undefined};
  AppliedJobScreen: undefined;
};
