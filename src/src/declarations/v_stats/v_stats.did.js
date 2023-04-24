export const idlFactory = ({ IDL }) => {
  const Property = IDL.Rec();
  const Value = IDL.Rec();
  const State = IDL.Record({ 'canister_id' : IDL.Principal });
  Value.fill(
    IDL.Variant({
      'Int' : IDL.Int,
      'Nat' : IDL.Nat,
      'Nat16' : IDL.Nat16,
      'Nat32' : IDL.Nat32,
      'Nat64' : IDL.Nat64,
      'Blob' : IDL.Vec(IDL.Nat8),
      'Bool' : IDL.Bool,
      'Int8' : IDL.Int8,
      'Nat8' : IDL.Nat8,
      'Text' : IDL.Text,
      'Bytes' : IDL.Vec(IDL.Nat8),
      'Int16' : IDL.Int16,
      'Int32' : IDL.Int32,
      'Int64' : IDL.Int64,
      'Option' : IDL.Opt(Value),
      'Float' : IDL.Float64,
      'Principal' : IDL.Principal,
      'Array' : IDL.Vec(Value),
      'Class' : IDL.Vec(Property),
    })
  );
  Property.fill(IDL.Record({ 'value' : Value, 'name' : IDL.Text }));
  const Stats = IDL.Record({
    'active_players' : IDL.Nat,
    'cycles_burned' : IDL.Nat,
    'session_time_average' : IDL.Nat,
    'unique_players' : IDL.Nat,
    'hours_played' : IDL.Nat,
    'peak_concurrent_players' : IDL.Nat,
    'extras' : IDL.Opt(IDL.Vec(Property)),
  });
  const Date = IDL.Text;
  return IDL.Service({
    'add_game' : IDL.Func([State], [], []),
    'get_all_game_stats' : IDL.Func([], [IDL.Vec(Stats)], []),
    'get_all_game_stats_rels' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text))],
        [],
      ),
    'get_all_games' : IDL.Func([], [IDL.Vec(State)], []),
    'get_game' : IDL.Func([IDL.Principal], [IDL.Opt(State)], []),
    'get_game_stats' : IDL.Func([IDL.Principal], [IDL.Vec(Stats)], []),
    'get_game_stats_by_date' : IDL.Func(
        [IDL.Principal, IDL.Opt(Date)],
        [IDL.Vec(Stats)],
        [],
      ),
    'init' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
