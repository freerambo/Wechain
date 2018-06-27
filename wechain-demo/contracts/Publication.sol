pragma solidity ^0.4.4;

contract Publication {
    /**
     * NOTES
     *
     * "author" is the person creating Publication.
     */

    /**
      * Publication Events
      */
    event _PublicationCreated(uint indexed id);
    event _PublicationUpdated(uint indexed id);

    struct PublicationPost {
      uint id;
      address author;
      string ipfsHash;
      address[] mySubscriber;
    }

    /**
      * publications map
      *
      * structure
      * publications[author][id] => ipfs hash
      *
      * example
      * publications[0x123...abc][1] => Qm123...abc
      */
    mapping (uint => PublicationPost) publications;

    /**
      * Latest sequential meetup ID
      */
    uint public seqId = 0;

    /**
      * Contract owner
      */
    address owner;

    /**
      * Constructor
      */
    function Publication() {
        owner = msg.sender;
    }

    /**
      * Change contract owner
      */
    function changeOwner(address newOwner) external {
        if (msg.sender == owner) {
            owner = newOwner;
        }
    }

    /**
      * Create a new Publication  delete ?= new address[](0)
      */
    function createPublication(
      string ipfsHash
    ) external {
        address author = msg.sender;
        address[]  mySubscriber;
        seqId = seqId + 1;
        publications[seqId] = PublicationPost(seqId, author, ipfsHash, mySubscriber);

        _PublicationCreated(seqId);
    }

    /**
      * Edit ipfs hash of a post
      */
    function editPublication(
        uint id,
        string ipfsHash
    ) external {
        address author = msg.sender;

        PublicationPost storage meetup = publications[id];
        require(meetup.author == author);
        publications[id].ipfsHash = ipfsHash;

        _PublicationUpdated(id);
    }

    /**
      * Retrieve a meetup post by ID
      */
    function getPublication(uint id) external constant returns (uint, address, string, address[]) {
      PublicationPost storage publication = publications[id];

      return (publication.id, publication.author, publication.ipfsHash, publication.mySubscriber);
    }

     function subscribe(uint seqId) public payable {
        require(msg.value > .01 ether);
        publications[seqId].mySubscriber.push(msg.sender);
        publications[seqId].author.transfer(this.balance);
    }
}