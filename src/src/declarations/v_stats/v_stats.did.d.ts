import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Date = string;
export interface Property { 'value' : Value, 'name' : string }
export interface State { 'canister_id' : Principal }
export interface Stats {
  'active_players' : bigint,
  'cycles_burned' : bigint,
  'session_time_average' : bigint,
  'unique_players' : bigint,
  'hours_played' : bigint,
  'peak_concurrent_players' : bigint,
  'extras' : [] | [Array<Property>],
}
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Nat16' : number } |
  { 'Nat32' : number } |
  { 'Nat64' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Bool' : boolean } |
  { 'Int8' : number } |
  { 'Nat8' : number } |
  { 'Text' : string } |
  { 'Bytes' : Uint8Array | number[] } |
  { 'Int16' : number } |
  { 'Int32' : number } |
  { 'Int64' : bigint } |
  { 'Option' : [] | [Value] } |
  { 'Float' : number } |
  { 'Principal' : Principal } |
  { 'Array' : Array<Value> } |
  { 'Class' : Array<Property> };
export interface _SERVICE {
  'add_game' : ActorMethod<[State], undefined>,
  'get_all_game_stats' : ActorMethod<[], Array<Stats>>,
  'get_all_game_stats_rels' : ActorMethod<[], Array<[Principal, string]>>,
  'get_all_games' : ActorMethod<[], Array<State>>,
  'get_game' : ActorMethod<[Principal], [] | [State]>,
  'get_game_stats' : ActorMethod<[Principal], Array<Stats>>,
  'get_game_stats_by_date' : ActorMethod<
    [Principal, [] | [Date]],
    Array<Stats>
  >,
  'init' : ActorMethod<[], undefined>,
}
