App = {
    web3Provider: null,
    contracts: {},

    createPublication: function(name) {
        // event.preventDefault();

        var tId = 100 /*parseInt($(event.target).data('id'))*/;

        var topicInstance;

        // 获取用户账号
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            App.contracts.Publication.deployed().then(function(instance) {
                adoptionInstance = instance;
                // 发送交易领养宠物
                return adoptionInstance.createPublication(name, {from: account});
            }).then(function(result) {
                return App.markAdopted();
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },


    subscrible: function(id) {
        event.preventDefault();


        alert("in subscrible");
        var tId = id /*parseInt($(event.target).data('id'))*/;

        var topicInstance;

        // 获取用户账号
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];

            App.contracts.Publication.deployed().then(function(instance) {
                adoptionInstance = instance;
                // 发送交易领养宠物
                return adoptionInstance.subscrible(tId, {from: account});
            }).then(function(result) {
                return App.markAdopted();
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },



    initWeb3: function() {

        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function() {

        $.getJSON('/public/Publication.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var PublicationArtifact = data;
            App.contracts.Publication = TruffleContract(PublicationArtifact);

            // Set the provider for our contract
            App.contracts.Publication.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            // return App.markAdopted();
            // search from server
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $("button").on("click", function(){

            if(confirm("Are you sure to but this content?")){
                id = Math.floor(Math.random()*10000)+1;
                App.createPublication("Trade" + id);
            }
        });


    }
};

/* , bindEvents: function() {
     $("button").on("click", function(){

         if(confirm("Are you sure to but this content?")){
             // var value = $(this).parent().prev().prev().text();
             id = Math.floor(Math.random()*10000)+1;
             App.createPublication("Trade" + id);
             // App.createPublication("Trade" + id);
/!*                var eth_amount = 5;
             var amount = web3.toWei(eth_amount, 'ether');
             var sender = web3.eth.accounts[0];*!/
            /!* var newContract = App.subscrible.new()(id,{data:bytecode, from:sender, value:amount},function(err,result){
                 if(!err){
                     console.log(newContract);
                     if(!result.address) {
                         console.log(result.transactionHash); // The hash of the transaction, which deploys the contract
                         // check address on the second call (contract deployed)
                     } else {
                         var addr = result.address;
                         console.log(addr);
                         /!* web3.eth.getBalance(receiver, function(error,result){
                         if(!error){
                             console.log('After transfer:' + result);
                             instance.end_balance.set(web3.fromWei(result, 'ether'));
                         }else{
                             console.log(error);
                         }
                     });*!/
         }

 });
}

*/
