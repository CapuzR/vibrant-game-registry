// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type DetailValue = {
    #I64 : Int64;
    #U64 : Nat64;
    #Vec : [DetailValue];
    #Slice : [Nat8];
    #Text : Text;
    #True;
    #False;
    #Float : Float;
    #Principal : Principal;
  };
  public type Error = {
    #NotAuthorized;
    #BadParameters;
    #Unknown : Text;
    #NonExistentItem;
  };
  public type Metadata = {
    thumbnail : Text;
    name : Text;
    frontend : ?[Text];
    description : Text;
    details : [(Text, DetailValue)];
    principal_id : Principal;
  };
  public type Result = { #ok; #err : Error };
  public type Result_1 = { #ok : [Principal]; #err : Error };
  public type Self = actor {
    add : shared Metadata -> async Result;
    addNewAdmin : shared [Principal] -> async Result;
    get : shared query Principal -> async ?Metadata;
    getAdmins : shared query () -> async Result_1;
    getAll : shared () -> async [(Principal, Metadata)];
    name : shared query () -> async Text;
    remove : shared Principal -> async Result;
    update : shared Metadata -> async Result;
  }
}
