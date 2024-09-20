export type ServerActionsResponse =
  | {
      success: false;
      error: {
        message: string;
      };
    }
  | {
      success: true;
      message: string;
    };
