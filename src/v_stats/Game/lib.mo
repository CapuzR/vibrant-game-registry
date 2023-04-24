
import StableTrieMap "mo:StableTrieMap";
import Principal "mo:base/Principal";
import GameRegistryIDL "../IDLs/v_registry";
import Iter "mo:base/Iter";

module {
    
    public type StableTrieMap<K, V> = StableTrieMap.StableTrieMap<K, V>;
    public type StateMap = StableTrieMap<Principal, State>;

    public type State = {
        canister_id : Principal;
    };

    public func init() : StateMap {

        let games : StateMap = StableTrieMap.new();

        games;
    };
    
    public func add ( id : Principal, game : State, games : StateMap ) : () {

        StableTrieMap.put(
            games,
            Principal.equal,
            Principal.hash,
            id,
            game
        );

        ();
    };

    public func get ( id : Principal, games : StateMap ) : ?State {
        StableTrieMap.get(
            games,
            Principal.equal,
            Principal.hash,
            id
        );
    };
    
    public func get_all ( games : StateMap ) : [State] {
        Iter.toArray(StableTrieMap.vals(games));
    };

    public func is_in (gameId : Principal, gameSTM : StateMap) : Bool {

        let game : ?State = get(gameId, gameSTM);

        switch (game) {
            case (null) {
                false
            };
            case (g) {
                true;
            };
        };

    };

    public func get_games_from_registry () : async [(Principal, GameRegistryIDL.Metadata)] {

        let GameRegistry : GameRegistryIDL.Self = actor ("t2gmx-myaaa-aaaan-qc4dq-cai");

        await GameRegistry.getAll();

    };

};