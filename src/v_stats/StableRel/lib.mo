import Buffer "mo:base/Buffer";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Prelude "mo:base/Prelude";
import Text "mo:base/Text";
import Trie "mo:base/Trie";

/// As base CanCan Rel lib by DFINITY is used: https://github.com/dfinity/cancan/blob/main/backend/Rel.mo

module {

  public type HashPair<X, Y> = {
    x : X -> Hash.Hash;
    y : Y -> Hash.Hash;
  };

  public type EqualPair<X, Y> = {
    x : (X, X) -> Bool;
    y : (Y, Y) -> Bool;
  };

  public func empty<X, Y>() : Rel<X, Y> {
    {
      forw = Trie.empty();
      back = Trie.empty();
    }
  };

  public type Rel<X, Y> = {
    forw : Trie.Trie2D<X, Y, ()> ;
    back : Trie.Trie2D<Y, X, ()> ;
  };

  public func keyX<X, Y>( rel : Rel<X, Y>,  x : X, hash : HashPair<X,Y>) : Trie.Key<X> {
    { key = x ; hash = hash.x(x) }
  };

  public func keyY<X, Y>( rel : Rel<X, Y>,  y : Y, hash : HashPair<X,Y>) : Trie.Key<Y> {
    { key = y ; hash = hash.y(y) }
  };

  public func key<X, Y>( 
    rel : Rel<X, Y>, 
    p : (X, Y),
    hash : HashPair<X,Y>
    )
    : (Trie.Key<X>, Trie.Key<Y>)
  {
    (keyX(rel, p.0, hash),
     keyY(rel, p.1, hash))
  };

  public func isIn<X, Y>(
    rel : Rel<X, Y>, 
    x : X, 
    y : Y,
    equal : EqualPair<X, Y>,
    hash : HashPair<X,Y>   
    ) : Bool {
    switch (Trie.find<X, Trie.Trie<Y, ()>>(rel.forw, keyX(rel, x, hash), equal.x)) {
    case null false;
    case (?t) {
           switch (Trie.find<Y, ()>(t, keyY(rel, y, hash), equal.y)) {
           case null false;
           case _ true;
           }
         };
    }
  };

  public func getY<X, Y>(
    rel : Rel<X, Y>,
    x : X,
    equal : EqualPair<X, Y>,
    hash : HashPair<X,Y>
  ) : Iter.Iter<Y> {
    let t = Trie.find<X, Trie.Trie<Y, ()>>(rel.forw, keyX(rel, x, hash), equal.x);
    switch t {
      case null { object { public func next() : ?Y { null } } };
      case (?t) { iterAll(t) };
    }
  };

  public func getX<X, Y>(
    rel : Rel<X, Y>, 
    y : Y,
    equal : EqualPair<X, Y>,
    hash : HashPair<X,Y>
    ) : Iter.Iter<X> {
    let t = Trie.find(rel.back, keyY(rel, y, hash), equal.y);
    switch t {
      case null { object { public func next() : ?X { null } } };
      case (?t) { iterAll(t) };
    }
  };

  public func put<X, Y>(
    rel : Rel<X, Y>, 
    p : (X, Y),
    equal : EqualPair<X, Y>,
    hash : HashPair<X,Y>
    ) : Rel<X, Y> {
    let k = key(rel, p, hash);
    {
      forw = Trie.put2D(rel.forw, k.0, equal.x, k.1, equal.y, ()) ;
      back = Trie.put2D(rel.back, k.1, equal.y, k.0, equal.x, ()) ;
    }
  };

  public func delete<X, Y>( 
    rel : Rel<X, Y>, 
    p : (X, Y),
    equal : EqualPair<X, Y>,
    hash : HashPair<X,Y>
    ) : Rel<X, Y> {
    let k = (keyX(rel, p.0, hash), keyY(rel, p.1, hash));
    {
      forw = Trie.remove2D(rel.forw, k.0, equal.x, k.1, equal.y).0 ;
      back = Trie.remove2D(rel.back, k.1, equal.y, k.0, equal.x).0 ;
    }
  };

  public func getAllRelated<X,Y,Z>( rel : Rel<X, Y> ) : [(X, Y)] {
    
    let iterX : Iter.Iter<(X,Trie.Trie<Y,()>)> = Trie.iter(rel.forw);
    let buff : Buffer.Buffer<(X, Y)> = Buffer.Buffer(1);
    
    for (xV in iterX) {
      let iterY : Iter.Iter<(Y,())> = Trie.iter(xV.1);
      for (yV in iterY) {
        buff.add(
          xV.0,
          yV.0
        );
      };
    };

    Buffer.toArray(buff);
  };

  func iterAll<K>(t : Trie.Trie<K, ()>)
    : Iter.Iter<K>
    =
    object {
    var stack = ?(t, null) : List.List<Trie.Trie<K, ()>>;
    public func next() : ?K {
      switch stack {
      case null { null };
      case (?(trie, stack2)) {
             switch trie {
             case (#empty) {
                    stack := stack2;
                    next()
                  };
             case (#leaf({keyvals=null})) {
                    stack := stack2;
                    next()
                  };
             case (#leaf({size=c; keyvals=?((k2, _), kvs)})) {
                    stack := ?(#leaf({size=c-1; keyvals=kvs}), stack2);
                    ?k2.key
                  };
             case (#branch(br)) {
                    stack := ?(br.left, ?(br.right, stack2));
                    next()
                  };
             }
           }
      }
    }
  };


}