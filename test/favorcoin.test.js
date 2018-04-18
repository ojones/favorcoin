var FavorCoin = artifacts.require("./FavorCoin.sol");

contract('FavorCoin test', function(accounts) {

  it("should create the first friend group", async () => {
    let instance = await FavorCoin.deployed();
    let result = await instance.createFriendGroup({from: accounts[0]});
    const groupNum = result.logs[0].args._friendGroup.c[0];
    assert.equal(groupNum, 1, "wrong first friend group");
  })

  it("should add friend", async () => {
    let instance = await FavorCoin.deployed();
    let result1 = await instance.addFriend(accounts[1], {from: accounts[0]});
    const groupNum = result1.logs[0].args._friendGroup.c[0];
    let result2 = await instance.groupMembers.call(groupNum, {from: accounts[0]});
    const numMembers = result2.c[0]
    assert.equal(numMembers, 2, "both members not found in group");
  })

  it("should log friend in event when adding friend", async () => {
    let instance = await FavorCoin.deployed();
    let result = await instance.addFriend(accounts[2], {from: accounts[0]});
    const groupNum = result.logs[0].args._friendGroup.c[0];
    const fiend = result.logs[0].args._friend;
    assert.equal(fiend, accounts[2], "wrong friend logged");
  })

  it("new accounts should have reputation balance of 0", async () => {
    let instance = await FavorCoin.deployed();
    let result = await instance.reputationBalanceOf.call(accounts[2], {from: accounts[0]});
    const balance = result.c[0]
    assert.equal(balance, 0, "wrong reputation balance for new account");
  })

  it("new accounts should have favor balance of 1", async () => {
    let instance = await FavorCoin.deployed();
    let result = await instance.favorBalanceOf.call(accounts[2], {from: accounts[0]});
    const balance = result.c[0]
    assert.equal(balance, 1, "wrong favor balance for new account");
  })

  it("should have favor balance of 0 after giving a favor coin", async () => {
    let instance = await FavorCoin.deployed();
    let result1 = await instance.giveFavorCoin(accounts[1], {from: accounts[0]});
    let result2 = await instance.favorBalanceOf.call(accounts[0], {from: accounts[0]});
    const balance = result2.c[0]
    assert.equal(balance, 0, "wrong favor balance for new account");
  })

  it("should log favor in event when giving favor", async () => {
    let instance = await FavorCoin.deployed();
    let result = await instance.giveFavorCoin(accounts[0], {from: accounts[2]});
    const favorTo = result.logs[0].args._to;
    assert.equal(favorTo, accounts[0], "wrong favor to logged");
  })

});
