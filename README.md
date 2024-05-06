# Token Dapp project

This project demonstrates a basic ERC20 token deploymenyt and sending Tokens . To deply token first go to MyToken.sol file present in contracts folder .
paste your wallet address in below manner .
```
        balances[<Your wallet address>]=_totalSupply;
        emit Transfer(address(0), <Your wallet address> , _totalSupply);
```
Create a .env file in that past below code 
```
MORPH_TESTNET_URL = "https://rpc-testnet.morphl2.io"
PRIVATE_KEY = <Your Account's Private Key>
```

Try running the following tasks:

```shell
npx hardhat compile
npx hardhat run scripts/deploy.ts --network morphTestnet
```
After deploying contract it log's contract address 
paste that contract address at contract address in App.tsx file present at front_face folder .
```
let contractAddres = <contract address>
```
Now , cd into front_face and run 
```
npm run
```
Now start exploring the app .

