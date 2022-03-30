const { assert } = require('chai');

const EthSwap = artifacts.require('EthSwap');
const Token = artifacts.require('Token');

require(`chai`).use(require(`chai-as-promised`)).should();

contract(`EthSwap`, ([deployer, investor]) => {
  let token, ethSwap;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);

    await token.transfer(ethSwap.address, tokens(`1000000`));
  });

  describe(`Token Deployment`, async () => {
    it(`contract has a name`, async () => {
      const tokenName = await token.name();
      assert.equal(tokenName, `DApp Token`);
    });
  });

  describe(`EthSwap Deployment`, async () => {
    it(`contract has a name`, async () => {
      const name = await ethSwap.name();
      assert.equal(name, `EthSwap Instant Exchange`);
    });
    it(`contract has tokens`, async () => {
      const balance = await token.balanceOf(ethSwap.address);

      assert.equal(balance.toString(), tokens(`1000000`));
    });
  });

  describe(`buyTokens`, async () => {
    let result;
    before(async () => {
      result = await ethSwap.buyTokens({
        from: investor,
        value: tokens(`1`),
      });
    });
    it(`Allows user to instantly purchase tokens from ethswap for a ficed price`, async () => {
      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens(`100`));
    });
  });
});

function tokens(n) {
  return `${n}${'0'.repeat(18)}`;
}
