## EIP712例子

## 前置知识EIP712


EIP-712是一种更高级、更安全的交易签名方法。使用该标准不仅可以签署交易并且可以验证签名，而且可以将数据与签名一起传递到智能合约中，并且可以根据该数据验证签名以了解签名者是否是实际发送该签名的人要在交易中调用的数据。

EIP-712提出了数据的标准结构和从结构化消息生成散列的定义过程。然后使用此散列生成签名。通过这种方式，为发送交易生成的签名与为验证身份或任何其他目的生成的签名之间就有了明显的区别。EIP-712草案将签名方案背后的动机表述为:

提高链上使用的链下消息签名的可用性。我们看到越来越多的人采用链下消息签名，因为它节省了gas，减少了区块链上的交易数量。





在EIP-712下签名的每个数据必须有一个EIP712Domain和另一个数据。这两者的结构可以是任何东西，但必须在JS代码和SC代码上相同。

在前端使用`eth_signTypedData_v3`对数据进行签名，并将r、s和v发送给智能合约，智能合约中用`ecrecover`恢复签名者。当然还有其他的方法。这个例子使用`ecrecover`。如果恢复的signer和sender是同一个地址，则调用`set`设置参数。





## 搭建

### 1.部署合约

这里的节点使用ganache,用hardhat总是有问题。不太好用，所以只用hardhat跑部署脚本

这里hardhat.config.js这样配置
```
module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache1:{
      url:`http://127.0.0.1:7545`,
      chainId: 1337
    }
 }
};
```

chainId写成1337是解决metamask rpc的问题。取名为ganache1是避免和它自带的ganache冲突。


运行ganache节点之后，运行部署脚本

```
npx hardhat run --network ganache1 .\scripts\sample-script.js
```

得到合约地址`0xA4cb96f7586A646986aD5AfDAae68B9B2DCf3DEB`






### 2.运行前端

前端代码部署在client中，运行之前先将src/App.js中27，82行的合约地址改成上面得到的合约


```
npm install 
npm run start 

```


演示视频:

![]([EIP712Example/EIP712demo.mp4 at main · 9olidity/EIP712Example (github.com)](https://github.com/9olidity/EIP712Example/blob/main/EIP712demo.mp4)






参考:

https://github.com/apurbapokharel/EIP712Example

https://medium.com/coinmonks/eip712-a-full-stack-example-e12185b03d54

https://eips.ethereum.org/EIPS/eip-712