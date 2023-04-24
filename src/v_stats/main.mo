
// import IT "./initTypes";
// import OT "./opsTypes";
// import Rels "./Rels/Rels";
// import ST "./stableTypes";
// import U "./utils";

import Game "./Game";
import GameStats "./GameStats";
import Rel "./StableRel";
import GameRegistryIDL "./IDLs/v_registry";

import Timer "mo:base/Timer";
import Debug "mo:base/Debug";

actor {
    
    stable let games : Game.StateMap = Game.init();
    stable var gamesStats : GameStats.State = GameStats.init();

    stable var isInit : Bool = false;

    public func init() : async () {

        if (not isInit) {
            let aDay = 1_000_000_000 * 60 * 60 * 24;
            // let aMinute = 1_000_000_000 * 60 * 1;
            ignore Timer.recurringTimer(#nanoseconds(aDay), refresh_stats);
            isInit := true;
        };

    };

    public func add_game ( value : Game.State ) : async () {
        Game.add(value.canister_id, value, games);
    };

    public func get_game ( id : Principal ) : async ?Game.State {
        Game.get(id, games);
    };
    
    public func get_all_games () : async [Game.State] {
        Game.get_all(games);
    };
    
    public func get_game_stats ( id : Principal ) : async [GameStats.Stats] {
        GameStats.get_by_game(id, gamesStats);
    };

    public func get_game_stats_by_date ( id : Principal, dateRange : ?GameStats.Date ) : async [GameStats.Stats] {
        GameStats.get_by_game_by_date(id, dateRange, gamesStats);
    };

    public func get_all_game_stats () : async [GameStats.Stats] {
        GameStats.get_all(gamesStats.stats);
    };

    public func get_all_game_stats_rels () : async [(Principal, Text)] {
        GameStats.get_all_game_stats_rels(gamesStats);
    };

    func refresh_stats () : async () {
        let all_games_from_stats : Game.StateMap = games;
        
        await GameStats.refresh_stats(all_games_from_stats, gamesStats);

    };
    
}