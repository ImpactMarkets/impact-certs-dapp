//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity >=0.7.0 <0.9.0;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


// This is the main building block for smart contracts.
contract RatchetAuction is IERC721Receiver {
    // NFT -> Payout address
    mapping(address => address) public issuer;
    // The minimum percent increase in price to ratchet the auction
    mapping(address => uint16) public minPercentRaise; // decimal 3, 1000 -> 1%
    // The percent of the purchase that goes to the previous owner
    mapping(address => uint16) public ownerFee; // decimal 3, 1000 -> 1%
    // The erc20 that must be paid to purchase from this auction
    mapping(address => IERC20) public auctionToken;
    // The nft being sold
    mapping(address => bool) public nftReceived;

    mapping(address => address) public owner; // The current owner of the NFT in the auction
    mapping(address => address) public initiator; // The address that deposited the NFT and started the auction

    mapping(address => uint256) public lastPrice; // The last price paid by the buyer

    /**
     * Contract initialization.
     *
     * The `constructor` is executed only once when the contract is created.
     * The `public` modifier makes a function callable from outside the contract.
     */
    constructor(address _issuer, uint16 _minPercentRaise, uint16 _ownerFee, address _auctionToken, uint256 _minBid ) {
        // The totalSupply is assigned to transaction sender, which is the account
        // that is deploying the contract.
        issuer = _issuer;
        minPercentRaise = _minPercentRaise;
        ownerFee = _ownerFee;
        auctionToken = IERC20(_auctionToken);
        lastPrice = _minBid;
        initiator = msg.sender;
    }

    /**
     * Read only function to check if the owner is the sending account
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function isOwner(address account) external view returns (bool) {
        return owner == account;
    }

    /**
     * Buyer calls this function to buy the NFT in the auction
     */
    function buy(uint256 bid) external {
        require(nftReceived, "The auction did not start yet");
        uint256 minBid = lastPrice + lastPrice * minPercentRaise / 100000;
        require(bid >= minBid, "Bid must be higher than the last price + minimum raise");
        require(auctionToken.allowance(msg.sender, address(this)) >= bid, "Buyer allowance too low");
        uint256 amount = bid;
        if (owner != address(0x0)) {
            uint256 ownerShare = 0;
            if (ownerFee > 0) {
                ownerShare = (bid - lastPrice) * ownerFee / 100000; // TODO: Safe Math
            }
            _safeTransferFrom(auctionToken, msg.sender, owner, lastPrice + ownerShare);
            amount = bid - lastPrice - ownerShare;
        }
        _safeTransferFrom(auctionToken, msg.sender, issuer, amount);
        owner = msg.sender;
        lastPrice = bid;
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }

    function start(address _nft, uint256 tokenId) public {
        require(msg.sender == initiator, "Only initiator can start the auction");
        IERC721 nft = IERC721(_nft);
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
    }

    /**
     * This gets called when a ERC721 is received by the contract
     */
    function onERC721Received( address, address from, uint256, bytes calldata) external returns (bytes4) {
        require(!nftReceived, "The auction must not have started");
        require(from == initiator, "Only the initiator should send NFTs to this contract");
        nftReceived = true;
        console.log("onERC721Received");
        return IERC721Receiver.onERC721Received.selector;
    }
}
