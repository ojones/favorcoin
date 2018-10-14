>Smart contracts for reputation assets

# Favor Coin
   * [Install](#install)
   * [Personal Note](#personal-note)

These smart contracts were made to support experiments in reputation accounting. The notion is that we currently have few means for quantifiably accounting for social reputation.

Put another way, it's hard to measure the most important things in life.

# Install

Requires truffle to compile and run tests:
```
npm install -g truffle
npm install
```

Run tests:
```
truffle test --network develop
```

# Personal Note

I've been thinking about blockchain transactions differently ever since reading [this book on time](https://www.goodreads.com/book/show/36442813-the-order-of-time). The world is not made up of objects and relationships. Those are abstractions for what are ultimately events.

Digital transactions are bad at representing long term state. They are perfect for events.

Just like time, friendship is a nostalgic blurring of discrete events.