var FavorCoin = artifacts.require("./FavorCoin.sol");

contract('FavorCoin test', function(accounts) {

  it("should create the first friend group", async () => {
    let instance = await FavorCoin.deployed();
    let result = await instance.createFriendGroup({from: accounts[0]});
    const groupNum = result.logs[0].args._friendGroup.s;
    assert.equal(groupNum, 1, "wrong first friend group");
  })

  it("should add friend", async () => {
    let instance = await FavorCoin.deployed();
    let result1 = await instance.addFriend(accounts[1], {from: accounts[0]});
    const groupNum = result1.logs[0].args._friendGroup.c[0];
    const fiend = result1.logs[0].args._friend;
    assert.equal(fiend, accounts[1], "wrong friend");
    let result2 = await instance.groupMembers.call(groupNum, {from: accounts[0]});
    assert.equal(result2.c[0], 2, "both members not found in group");
  })

});
