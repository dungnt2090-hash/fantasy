export interface LeagueInfo {
  id: number;
  name: string;
  created: string;
  closed: boolean;
  max_entries: number | null;
  league_type: string;
  scoring: string;
  admin_entry: number | null;
  start_event: number;
  code_privacy: string;
  has_cup: boolean;
  cup_league: number | null;
  rank: number | null;
}

export interface StandingResult {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
  calculated_gw_rank?: number; // Added for frontend logic
}

export interface Standings {
  has_next: boolean;
  page: number;
  results: StandingResult[];
}

export interface ClassicLeagueResponse {
  new_entries: {
    has_next: boolean;
    page: number;
    results: any[];
  };
  last_updated_data: string;
  league: LeagueInfo;
  standings: Standings;
}

// Bootstrap Static Types
export interface FPLPlayer {
  id: number;
  first_name: string;
  second_name: string;
  web_name: string;
  element_type: number; // 1=GKP, 2=DEF, 3=MID, 4=FWD
  team: number;
  now_cost: number;
  points_per_game: string;
  selected_by_percent: string;
  total_points: number;
}

export interface FPLEvent {
  id: number;
  name: string;
  deadline_time: string;
  average_entry_score: number;
  finished: boolean;
  data_checked: boolean;
  highest_scoring_entry: number | null;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  highest_score: number | null;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
}

export interface FPLTeam {
  id: number;
  code: number; // Added for shirt images
  name: string;
  short_name: string;
}

export interface BootstrapStaticResponse {
  events: FPLEvent[];
  elements: FPLPlayer[];
  teams: FPLTeam[];
}

// Manager Picks Types
export interface Pick {
  element: number;
  position: number;
  multiplier: number;
  is_captain: boolean;
  is_vice_captain: boolean;
}

export interface ManagerPicksResponse {
  active_chip: string | null;
  automatic_subs: any[];
  entry_history: {
    event: number;
    points: number;
    total_points: number;
    rank: number;
    rank_sort: number;
    overall_rank: number;
    bank: number;
    value: number;
    event_transfers: number;
    event_transfers_cost: number;
    points_on_bench: number;
  };
  picks: Pick[];
}

// History Types
export interface PastGameweek {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
}

export interface ManagerHistoryResponse {
  current: PastGameweek[];
  past: any[];
  chips: any[];
}

// Live Data Types
export interface LiveElementStats {
  total_points: number;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
}

export interface LiveElement {
  id: number;
  stats: LiveElementStats;
  explain: any[];
}

export interface LiveEventResponse {
  elements: LiveElement[];
}

// Sorting
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}