// contracts/SnakeNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SnakeNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct SnakeAttributes {
        uint256 luck;
        uint256 rarity;
        string color;
    }

    mapping(uint256 => SnakeAttributes) public snakeAttributes;

    constructor() ERC721("SnakeNFT", "SNFT") {}

    function random(uint256 seed) private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))
            );
    }

    function randomColor(uint256 seed) private view returns (string memory) {
        string[5] memory colors = ["red", "blue", "green", "yellow", "purple"];
        return colors[random(seed) % colors.length];
    }

    function mintNFT(address recipient) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        uint256 luck = random(newItemId) % 100; // Tạo giá trị luck từ 0 đến 99
        uint256 rarity = (random(newItemId + 1) % 10) + 1; // Tạo giá trị rarity từ 1 đến 10
        string memory color = randomColor(newItemId + 2); // Tạo màu ngẫu nhiên

        _mint(recipient, newItemId);

        snakeAttributes[newItemId] = SnakeAttributes({
            luck: luck,
            rarity: rarity,
            color: color
        });

        return newItemId;
    }

    function getSnakeAttributes(
        uint256 tokenId
    ) public view returns (uint256, uint256, string memory) {
        SnakeAttributes memory attributes = snakeAttributes[tokenId];
        return (attributes.luck, attributes.rarity, attributes.color);
    }
}
