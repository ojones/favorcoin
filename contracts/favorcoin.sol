pragma solidity ^0.4.17;

import "./safemath.sol";

contract FavorCoin {

  using SafeMath for uint256;

  event NewFriendGroup(uint _friendGroup, address _owner);
  event NewFriend(uint _friendGroup, address _friend);
  event NewFavor(uint _friendGroup, address _from, address _to);

  struct FavorAcct {
    bool exists;
    uint friendGroup;
    uint favorBalance;
    uint reputationBalance;
  }
  
  mapping (address => FavorAcct) public accounts;
  uint private groupCount = 0;
  mapping (address => uint) ownerToGroup;
  mapping (address => uint) friendToGroup;
  mapping (uint => address[]) groupToFriends;

  function createFriendGroup() public {
    groupCount++;
    ownerToGroup[msg.sender] = groupCount;
    friendToGroup[msg.sender] = groupCount;
    _newFavorAcct(msg.sender);
    NewFriendGroup(groupCount, msg.sender);
  }

  function addFriend(address _friend) public groupOwner {
    if (friendToGroup[msg.sender] == 0) { revert(); }
    uint friendGroup = friendToGroup[msg.sender];
    friendToGroup[_friend] = friendGroup;
    _newFavorAcct(_friend);
    NewFriend(friendGroup, msg.sender);
  }

  function _newFavorAcct(address _owner) private {
    if (!accounts[_owner].exists) { revert(); }
    uint friendGroup = friendToGroup[_owner];
    uint favorBalance = 1;
    uint reputationBalance = 0;
    accounts[_owner] = FavorAcct(true, friendGroup, favorBalance, reputationBalance);
    groupToFriends[friendGroup].push(_owner);
  }

  function giveFavorCoin(address _to) public {
    if (friendToGroup[msg.sender] == 0) { revert(); }
    if (friendToGroup[_to] == 0) { revert(); }
    if (friendToGroup[msg.sender] != friendToGroup[_to]) { revert(); }
    if (accounts[msg.sender].favorBalance > 0) { revert(); }
    _giveFavorCoin(msg.sender, _to);
  }

  function _giveFavorCoin(address _from, address _to) private {
    uint friendGroup = friendToGroup[_from];
    accounts[_from].favorBalance--;
    accounts[_to].reputationBalance++;
    NewFavor(friendGroup, _from, _to);
  }

  function balanceOf(address _owner) public view returns (FavorAcct) {
    return accounts[_owner];
  }

  function friends() public view returns (address[]) {
    return _friendsOf(msg.sender);
  }

  function _friendsOf(address _owner) private view returns (address[]) {
    uint friendGroup = friendToGroup[_owner];
    return groupToFriends[friendGroup];
  }

  modifier groupOwner() {
    require(ownerToGroup[msg.sender] != 0);
    _;
  }

}