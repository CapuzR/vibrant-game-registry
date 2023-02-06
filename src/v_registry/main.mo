import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Types "./types";

actor {
    type Metadata = Types.Metadata;
    type Error = Types.Error;

    stable var games : Trie.Trie<Principal, Metadata> = Trie.empty();
    stable var registryName : Text = "Game registry";
    stable var admins = ["ircn7-g7maa-v2zab-fgz7m-ofkss-eeskj-msyir-alras-riu7w-k5wrm-xqe"]; 

    public query func name() : async Text {
        return registryName;
    };

    public query func get(principal : Principal) : async ?Metadata {

        Trie.find(
            games,
            key(principal),
            Principal.equal
        );
        
    };

    public query func getAll() : async [(Principal,Metadata)] {

        if (Trie.size(games) == 0) {
            return [];
        };
        Iter.toArray(Trie.iter(games));
        
    };

    public shared({caller}) func add(metadata : Metadata) : async Result.Result<(), Error> {

        if(Principal.notEqual(caller, Principal.fromText(admins[0]))) {
            return #err(#NotAuthorized);
        };

        let game: Metadata = metadata;

        let (newGames, existing) = Trie.put(
            games,
            key(game.principal_id),
            Principal.equal,
            game
        );

        switch(existing) {
            case null {
                games := newGames;
                #ok(());
            };
            case (? v) {
                #err(#Unknown("Already exist"));
            };
        };
    };

    public shared({caller}) func update(metadata : Metadata) : async Result.Result<(), Error> {

        if(Principal.notEqual(caller, Principal.fromText(admins[0]))) {
            return #err(#NotAuthorized);
        };

        let game: Metadata = metadata;

        let (newGames, existing) = Trie.put(
            games,
            key(game.principal_id),
            Principal.equal,
            game
        );

        switch(existing) {
            case null {
                #err(#Unknown("Doesn't exist"));
            };
            case (? v) {
                games := newGames;
                #ok(());
            };
        };
    };

    public shared({caller}) func remove(principal: Principal) : async Result.Result<(), Error> {

        if(Principal.notEqual(caller, Principal.fromText(admins[0]))) {
            return #err(#NotAuthorized);
        };

        let result = Trie.find(
            games,
            key(principal),
            Principal.equal,
        );

        switch(result) {
            // No matches
            case null {
                #err(#NonExistentItem);
            };
            case (? v) {
                games := Trie.replace(
                    games,           // Target trie
                    key(principal),     // Key
                    Principal.equal,   // Equality checker
                    null
                ).0;
                #ok(());
            };
        };
    };

    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };
};