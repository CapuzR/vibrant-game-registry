# Milestones

 ~~1. Raw website with the Game Registry.~~
 2. Backend in Motoko with the Game Registry.
 ~~3. Deployment to the internet Computer~~

# ADD

```
dfx canister --network ic call v_registry update '( record {
        thumbnail = "https://pbs.twimg.com/profile_images/1451280165464645638/PXa4IWA0_400x400.jpg";
        name = "Plethora";
        frontend = null;
        description = "Plethora";
        principal_id = principal "wrcb3-5qaaa-aaaal-qaahq-cai";
        details = vec {
                record {
                        "Twitter";
                        variant {
                                Text = "https://twitter.com/PlethoraGame"
                        };
                };
                record {
                        "DSCVR";
                        variant {
                                Text = "https://dscvr.one/p/plethora-gaming"
                        };
                };
                record {
                        "Distrikt";
                        variant {
                                Text = "https://distrikt.app/u/plethora-gaming"
                        };
                };
                record {
                        "Founder/Studio";
                        variant {
                                Text = "Plethora"
                        };
                };
                record {
                        "URL";
                        variant {
                                Text = "https://plethora.game/"
                        };
                };
        };
}
)'
```

dfx canister call v_registry add '( record {
        thumbnail = "https://pbs.twimg.com/profile_images/1540103717311188992/waJsnPbN_400x400.jpg";
        name = "Faefolk";
        frontend = null;
        description = "FaeFolk Game";
        principal_id = principal "v6c7k-xaaaa-aaaag-qaxfa-cai";
        details = vec {
                record {
                        "Twitter";
                        variant {
                                Text = "https://twitter.com/_faefolk"
                        };
                };
                record {
                        "DSCVR";
                        variant {
                                Text = "https://dscvr.one/_faefolk"
                        };
                };
                record {
                        "Distrikt";
                        variant {
                                Text = "https://distrikt.app/_faefolk"
                        };
                };
                record {
                        "Founder/Studio";
                        variant {
                                Text = "Faefolk"
                        };
                };
                record {
                        "URL";
                        variant {
                                Text = "https://twitter.com/_faefolk"
                        };
                };
        };
}
)'

dfx canister call v_registry add '( record {
        thumbnail = "https://pbs.twimg.com/profile_images/1537681350064578560/ztbtYV6h_400x400.jpg";
        name = "Eimolad";
        frontend = null;
        description = "Eimolad";
        principal_id = principal "5qmpu-tyaaa-aaaan-qad4q-cai";
        details = vec {
                record {
                        "Twitter";
                        variant {
                                Text = "https://twitter.com/eimolad"
                        };
                };
                record {
                        "DSCVR";
                        variant {
                                Text = "https://dscvr.one/p/eimolad"
                        };
                };
                record {
                        "Distrikt";
                        variant {
                                Text = "https://distrikt.app/u/eimolad"
                        };
                };
                record {
                        "Founder/Studio";
                        variant {
                                Text = "Eimolad"
                        };
                };
                record {
                        "URL";
                        variant {
                                Text = "https://eimolad.com/"
                        };
                };
        };
}
)'

# Update

dfx canister call v_registry update '( record {
        thumbnail = "https://pbs.twimg.com/profile_images/1540103717311188992/waJsnPbN_400x400.jpg";
        name = "Faefolk";
        frontend = null;
        description = "FaeFolk Game";
        principal_id = principal "v6c7k-xaaaa-aaaag-qaxfa-cai";
        details = vec {
                record {
                        "Twitter";
                        variant {
                                Text = "https://twitter.com/_faefolk"
                        };
                };
                record {
                        "DSCVR";
                        variant {
                                Text = "https://dscvr.one/_faefolk"
                        };
                };
                record {
                        "Distrikt";
                        variant {
                                Text = "https://distrikt.app/_faefolk"
                        };
                };
                record {
                        "Founder/Studio";
                        variant {
                                Text = "Faefolk"
                        };
                };
                record {
                        "URL";
                        variant {
                                Text = "https://twitter.com/_faefolk"
                        };
                };
        };
}
)'

# GET

dfx canister call v_registry get '(principal "v6c7k-xaaaa-aaaag-qaxfa-cai")'