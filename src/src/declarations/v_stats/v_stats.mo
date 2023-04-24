// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Date = Text;
  public type Property = { value : Value; name : Text };
  public type State = { canister_id : Principal };
  public type Stats = {
    active_players : Nat;
    cycles_burned : Nat;
    session_time_average : Nat;
    unique_players : Nat;
    hours_played : Nat;
    peak_concurrent_players : Nat;
    extras : ?[Property];
  };
  public type Value = {
    #Int : Int;
    #Nat : Nat;
    #Nat16 : Nat16;
    #Nat32 : Nat32;
    #Nat64 : Nat64;
    #Blob : [Nat8];
    #Bool : Bool;
    #Int8 : Int8;
    #Nat8 : Nat8;
    #Text : Text;
    #Bytes : [Nat8];
    #Int16 : Int16;
    #Int32 : Int32;
    #Int64 : Int64;
    #Option : ?Value;
    #Float : Float;
    #Principal : Principal;
    #Array : [Value];
    #Class : [Property];
  };
  public type Self = actor {
    add_game : shared State -> async ();
    get_all_game_stats : shared () -> async [Stats];
    get_all_game_stats_rels : shared () -> async [(Principal, Text)];
    get_all_games : shared () -> async [State];
    get_game : shared Principal -> async ?State;
    get_game_stats : shared Principal -> async [Stats];
    get_game_stats_by_date : shared (Principal, ?Date) -> async [Stats];
    init : shared () -> async ();
  }
}
