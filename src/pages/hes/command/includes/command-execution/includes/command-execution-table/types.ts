export type CommandExecutionTablePropsPSS = {
  pss_list: string[];
  meters: string[];
};

export type CommandExecutionTablePropsFeeder = {
  feeder_list: string[];
  meters: string[];
};

export type CommandExecutionTablePropsDTR = {
  dtr_list: string[];
  meters: string[];
};

export type CommandExecutionTableProps =
  | CommandExecutionTablePropsPSS
  | CommandExecutionTablePropsFeeder
  | CommandExecutionTablePropsDTR;
