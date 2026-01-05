import { ClassicLeagueResponse, BootstrapStaticResponse, ManagerPicksResponse, LiveEventResponse, ManagerHistoryResponse } from './types';

// FPL API often has CORS issues when called from browser directly.
// We will try to fetch via a proxy, but fallback to this mock data if it fails
// to ensure the UI can be demonstrated.
export const MOCK_LEAGUE_DATA: ClassicLeagueResponse = {
  new_entries: { has_next: false, page: 1, results: [] },
  last_updated_data: "2023-10-25T12:00:00Z",
  league: {
    id: 590736,
    name: "League 590736 (Offline Mode)",
    created: "2023-08-01",
    closed: false,
    max_entries: null,
    league_type: "x",
    scoring: "c",
    admin_entry: 12345,
    start_event: 1,
    code_privacy: "p",
    has_cup: true,
    cup_league: null,
    rank: null
  },
  standings: {
    has_next: false,
    page: 1,
    results: [
      {
        id: 101,
        event_total: 82,
        player_name: "John Doe",
        rank: 1,
        last_rank: 2,
        rank_sort: 1,
        total: 540,
        entry: 1001,
        entry_name: "Klopp's Kids"
      },
      {
        id: 102,
        event_total: 45,
        player_name: "Jane Smith",
        rank: 2,
        last_rank: 1,
        rank_sort: 2,
        total: 535,
        entry: 1002,
        entry_name: "Salah's Surprise"
      },
      {
        id: 103,
        event_total: 67,
        player_name: "Mike Johnson",
        rank: 3,
        last_rank: 3,
        rank_sort: 3,
        total: 510,
        entry: 1003,
        entry_name: "No Kane No Gain"
      },
      {
        id: 104,
        event_total: 95,
        player_name: "Sarah Williams",
        rank: 4,
        last_rank: 8,
        rank_sort: 4,
        total: 490,
        entry: 1004,
        entry_name: "Haaland Globetrotters"
      },
      {
        id: 105,
        event_total: 32,
        player_name: "David Brown",
        rank: 5,
        last_rank: 4,
        rank_sort: 5,
        total: 485,
        entry: 1005,
        entry_name: "Show Me The Mane"
      }
    ]
  }
};

export const MOCK_BOOTSTRAP_DATA: BootstrapStaticResponse = {
  events: [
    {
      id: 12,
      name: "Gameweek 12",
      deadline_time: "2023-11-11T11:00:00Z",
      average_entry_score: 50,
      finished: false,
      data_checked: false,
      highest_scoring_entry: null,
      deadline_time_epoch: 1699696800,
      deadline_time_game_offset: 0,
      highest_score: null,
      is_previous: false,
      is_current: true,
      is_next: false
    }
  ] as any[], 
  elements: [
    { id: 1, web_name: "Haaland", element_type: 4, team: 11, now_cost: 140, points_per_game: "8.5", selected_by_percent: "80.0", total_points: 100, first_name: "Erling", second_name: "Haaland" },
    { id: 2, web_name: "Salah", element_type: 3, team: 10, now_cost: 125, points_per_game: "7.8", selected_by_percent: "40.0", total_points: 95, first_name: "Mohamed", second_name: "Salah" },
    { id: 3, web_name: "Saka", element_type: 3, team: 1, now_cost: 85, points_per_game: "6.2", selected_by_percent: "55.0", total_points: 70, first_name: "Bukayo", second_name: "Saka" },
    { id: 4, web_name: "Trippier", element_type: 2, team: 12, now_cost: 70, points_per_game: "5.5", selected_by_percent: "35.0", total_points: 60, first_name: "Kieran", second_name: "Trippier" },
    { id: 5, web_name: "Alisson", element_type: 1, team: 10, now_cost: 55, points_per_game: "4.0", selected_by_percent: "15.0", total_points: 45, first_name: "Alisson", second_name: "Ramses Becker" }
  ],
  teams: [
    { id: 1, code: 3, name: "Arsenal", short_name: "ARS" },
    { id: 10, code: 14, name: "Liverpool", short_name: "LIV" },
    { id: 11, code: 43, name: "Man City", short_name: "MCI" },
    { id: 12, code: 4, name: "Newcastle", short_name: "NEW" }
  ]
};

export const MOCK_PICKS_DATA: ManagerPicksResponse = {
  active_chip: null,
  automatic_subs: [],
  entry_history: {
    event: 12,
    points: 75,
    total_points: 600,
    rank: 150000,
    rank_sort: 150000,
    overall_rank: 150000,
    bank: 15,
    value: 1015,
    event_transfers: 1,
    event_transfers_cost: 0,
    points_on_bench: 12
  },
  picks: [
    { element: 5, position: 1, multiplier: 1, is_captain: false, is_vice_captain: false },
    { element: 4, position: 2, multiplier: 1, is_captain: false, is_vice_captain: false },
    { element: 2, position: 3, multiplier: 1, is_captain: false, is_vice_captain: true },
    { element: 3, position: 4, multiplier: 1, is_captain: false, is_vice_captain: false },
    { element: 1, position: 5, multiplier: 2, is_captain: true, is_vice_captain: false }
  ]
};

export const MOCK_HISTORY_DATA: ManagerHistoryResponse = {
    current: [
        {
            event: 1, points: 70, total_points: 70, rank: 1000, rank_sort: 1000, overall_rank: 1000,
            bank: 0, value: 1000, event_transfers: 0, event_transfers_cost: 0, points_on_bench: 0
        },
        {
            event: 2, points: 65, total_points: 135, rank: 2000, rank_sort: 2000, overall_rank: 1500,
            bank: 0, value: 1001, event_transfers: 1, event_transfers_cost: 0, points_on_bench: 4
        }
    ],
    past: [],
    chips: []
};

export const MOCK_LIVE_DATA: LiveEventResponse = {
  elements: [
    { 
      id: 1, 
      stats: { 
        total_points: 12, minutes: 90, goals_scored: 2, assists: 0, clean_sheets: 0, 
        goals_conceded: 1, own_goals: 0, penalties_saved: 0, penalties_missed: 0, 
        yellow_cards: 0, red_cards: 0, saves: 0, bonus: 3, bps: 45 
      },
      explain: []
    },
    { 
      id: 2, 
      stats: { 
        total_points: 8, minutes: 90, goals_scored: 1, assists: 0, clean_sheets: 0, 
        goals_conceded: 1, own_goals: 0, penalties_saved: 0, penalties_missed: 0, 
        yellow_cards: 0, red_cards: 0, saves: 0, bonus: 2, bps: 32 
      },
      explain: []
    },
    { 
      id: 3, 
      stats: { 
        total_points: 5, minutes: 90, goals_scored: 0, assists: 1, clean_sheets: 0, 
        goals_conceded: 2, own_goals: 0, penalties_saved: 0, penalties_missed: 0, 
        yellow_cards: 0, red_cards: 0, saves: 0, bonus: 0, bps: 15 
      },
      explain: []
    },
    { 
      id: 4, 
      stats: { 
        total_points: 2, minutes: 90, goals_scored: 0, assists: 0, clean_sheets: 0, 
        goals_conceded: 2, own_goals: 0, penalties_saved: 0, penalties_missed: 0, 
        yellow_cards: 0, red_cards: 0, saves: 0, bonus: 0, bps: 10 
      },
      explain: []
    },
    { 
      id: 5, 
      stats: { 
        total_points: 6, minutes: 90, goals_scored: 0, assists: 0, clean_sheets: 1, 
        goals_conceded: 0, own_goals: 0, penalties_saved: 0, penalties_missed: 0, 
        yellow_cards: 0, red_cards: 0, saves: 3, bonus: 0, bps: 25 
      },
      explain: []
    }
  ]
};