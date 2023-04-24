

actor {
    
    public type Stats = {
        active_players : Nat;
        unique_players : Nat;
        peak_concurrent_players : Nat;
        hours_played : Nat;
        cycles_burned : Nat;
        session_time_average : Nat;
        extras : ?[Property];
    };

    type Property = {
        name : Text; 
        value : Value
    };

    type Value = {
        #Array : [Value];
        #Principal : Principal;
        #Class : [Property];
        #Option : ?Value;
        #Bytes : [Nat8];

        #Nat : Nat;
        #Nat8 : Nat8;
        #Nat16 : Nat16;
        #Nat32 : Nat32;
        #Nat64 : Nat64;
    
        #Int : Int;
        #Int8 : Int8;
        #Int16 : Int16;
        #Int32 : Int32;
        #Int64 : Int64;

        #Blob : Blob;
        #Bool : Bool;
        #Text : Text;
        #Float : Float;
    };

    type RangeRequested = {
        #StartDate : Int;
        #EndDate : Int;
    };

    stable var stats : Stats = {
        active_players : Nat = 1200;
        unique_players : Nat = 5000;
        peak_concurrent_players : Nat = 2000;
        hours_played : Nat = 10000000;
        cycles_burned : Nat = 3000;
        session_time_average : Nat = 30000000000;
        extras : ?[Property] = null;
    };

    public shared ({caller}) func icrc14_get_game_stats ( range : ?RangeRequested) : async Stats {

        stats;

    };



};