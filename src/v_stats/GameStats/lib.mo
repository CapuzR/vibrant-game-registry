
import StableTrieMap "mo:StableTrieMap";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Debug "mo:base/Debug";

import Game "../Game";
import GameRegistryIDL "../IDLs/v_registry";
import Rel "../StableRel";

import Source "mo:uuid.mo/async/SourceV4";
import UUID "mo:uuid.mo/UUID";
import DateTime "mo:motoko-datetime/DateTime";

module {
    
    public type StableTrieMap<K, V> = StableTrieMap.StableTrieMap<K, V>;
    public type StateMap = StableTrieMap<Text, Stats>;

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

    public type Date = Text;

    type Format = {
        #Year;
        #Month;
        #Day;
    };

    type Range = {
        #StartDate : Nat;
        #EndDate : Nat;
    };

    public type State = {
        var stats : StateMap;
        var rel : Rel.Rel<Principal, Text>;
        // var yearIndex : Rel.Rel<Text, Text>;
        // var monthIndex : Rel.Rel<Text, Text>;
        var dayIndex : Rel.Rel<Text, Text>;
    };

    public func init() : State {
        {
            var stats : StateMap = StableTrieMap.new();
            var rel : Rel.Rel<Principal, Text> = Rel.empty<Principal, Text>();
            // var yearIndex : Rel.Rel<Text, Text> = Rel.empty<Text, Text>(); //YY in NS Unix epoch
            // var monthIndex : Rel.Rel<Text, Text> = Rel.empty<Text, Text>(); //YYMM in NS Unix epoch
            var dayIndex : Rel.Rel<Text, Text> = Rel.empty<Text, Text>(); //YYMMDD in NS Unix epoch
        };
    };
    
    public func add ( id : Text, game_id : Principal, game_stats : Stats, gamesStats : State ) : () {

        StableTrieMap.put(
            gamesStats.stats,
            Text.equal,
            Text.hash,
            id,
            game_stats
        );

        let now = DateTime.now();
        // let year = Nat.toText(now.getYear());
        // let yearMonth = Nat.toText(now.getYear()) # Nat.toText(now.getMonth());
        let yearMonthDay = Nat.toText(now.getYear()) # Nat.toText(now.getMonth()) # Nat.toText(now.getDay());


        
        gamesStats.rel := Rel.put<Principal, Text>(
            gamesStats.rel,
            (game_id, id), 
            { x = Principal.equal; y = Text.equal },
            { x = Principal.hash; y = Text.hash }
        );
        
        // gamesStats.yearIndex := Rel.put<Text, Text>(
        //     gamesStats.yearIndex,
        //     (year, id),
        //     { x = Text.equal; y = Text.equal },
        //     { x = Text.hash; y = Text.hash }
        // );

        // gamesStats.monthIndex := Rel.put<Text, Text>(
        //     gamesStats.monthIndex,
        //     (yearMonth, id),
        //     { x = Text.equal; y = Text.equal },
        //     { x = Text.hash; y = Text.hash }
        // );

        gamesStats.dayIndex := Rel.put<Text, Text>(
            gamesStats.dayIndex,
            (yearMonthDay, id),
            { x = Text.equal; y = Text.equal },
            { x = Text.hash; y = Text.hash }
        );

        ();
    };

    public func get_by_game ( game_id : Principal, gamesStats : State ) : [Stats] {

        let game_stats_ids = Rel.getY(
            gamesStats.rel, 
            game_id, 
            { x = Principal.equal; y = Text.equal },
            { x = Principal.hash; y = Text.hash }
        );
        let game_stats_Buff : Buffer.Buffer<Stats> = Buffer.Buffer(1);

        for (id in game_stats_ids) {
            switch (get(id, gamesStats.stats)) {
                case (null) { };
                case (?stat) {
                    game_stats_Buff.add(stat);
                };
            };
        };

        Buffer.toArray(game_stats_Buff);
    };
    
    public func get_by_game_by_date ( game_id : Principal, date : ?Date, gamesStats : State ) : [Stats] {

        var confirmed_date = "";
        switch(date) { case (null) {  }; case (?d) { confirmed_date := d }; };

        let game_stats_ids = Iter.toArray(Rel.getY(
            gamesStats.rel, 
            game_id, 
            { x = Principal.equal; y = Text.equal },
            { x = Principal.hash; y = Text.hash }
        ));

        let game_stats_Buff : Buffer.Buffer<Stats> = Buffer.Buffer(1);

        for (id in game_stats_ids.vals()) {
            
            let dates = Iter.toArray(Rel.getX(
                gamesStats.dayIndex, 
                id,
                { x = Text.equal; y = Text.equal },
                { x = Text.hash; y = Text.hash }
            ));
            
            if (dates[0] == confirmed_date) {            
                switch (get(id, gamesStats.stats)) {
                    case (null) { };
                    case (?stat) {
                        game_stats_Buff.add(stat);
                    };
                };
            };
        };

        Buffer.toArray(game_stats_Buff);
    };
    
    public func get ( id : Text, gamesStats : StateMap ) : ?Stats {
        StableTrieMap.get(
            gamesStats,
            Text.equal,
            Text.hash,
            id
        );
    };
    
    public func get_all_game_stats_rels ( gamesStats : State ) : [(Principal, Text)] {
        Rel.getAllRelated(gamesStats.rel);
    };

    public func get_all ( gamesStats : StateMap ) : [Stats] {
        Iter.toArray(StableTrieMap.vals(gamesStats));
    };

    public func refresh_stats ( all_games_from_stats : Game.StateMap, gamesStats : State ) : async () {
        let all_registry_games : [(Principal, GameRegistryIDL.Metadata)] = await Game.get_games_from_registry();

        for (g in all_registry_games.vals()) {
            if (not Game.is_in(g.0, all_games_from_stats)) {
                Game.add(g.0, { canister_id = g.0 }, all_games_from_stats);
            };
        };

        await register_stats(all_games_from_stats, gamesStats);

    };

    func register_stats ( games : Game.StateMap, gamesStats : State ) : async () {

        let buff : Buffer.Buffer<Stats> = Buffer.Buffer(1);

        for (g in StableTrieMap.vals(games)) {
            let GameActor : actor {
                icrc14_get_game_stats : shared (?Range) -> async Stats;
            } = actor (Principal.toText(g.canister_id));

            let source = Source.Source();
            let gameStatsId = UUID.toText(await source.new());

            add(gameStatsId, g.canister_id, await GameActor.icrc14_get_game_stats(null), gamesStats);
        };
        
    };
};