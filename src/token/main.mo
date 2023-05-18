import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    var owner : Principal = Principal.fromText("5rcdu-iow42-wf7jf-mh6vt-7prhi-d4pf3-wssid-svclc-pomvi-gnr3q-gqe");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DANG";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    // query balance
    public query func balanceOf(who : Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    // query token symbol
    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared (msg) func payOut() : async Text {
        // Debug.print(debug_show (msg.caller));
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            let balOfOwner: Nat = await balanceOf(owner);
            let newBalAfterPayout: Nat = balOfOwner - amount;
            balances.put(owner, newBalAfterPayout);
            balances.put(msg.caller, amount);

            return "Success";
        } else {
            return "Claimed";
        };
    };

    public shared (msg) func transferTo(to : Principal, amount : Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        Debug.print(debug_show (msg.caller));
        if (fromBalance > amount) {
            let finalFromBal : Nat = fromBalance - amount;
            balances.put(msg.caller, finalFromBal);
            let toBal = await balanceOf(to);
            let finalToBal : Nat = toBal + amount;
            balances.put(to, finalToBal);
            return "Success";
        } else {
            return "Insufficient Balance";
        };

    };
};
