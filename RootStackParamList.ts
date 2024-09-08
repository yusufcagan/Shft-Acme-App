export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
};

export type BottomTabParamList = {
  JobStac: undefined;
  AppliedJobScreen: undefined;
  ProgileScreen: undefined;
};

export type JobStackParamList = {
  JobList: undefined;
  JobDetailScreen: {id: string | undefined};
  AppliedJobScreen: undefined;
};
