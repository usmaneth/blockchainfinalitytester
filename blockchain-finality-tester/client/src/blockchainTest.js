import Web3 from 'web3';

const sendWave = async (blockchain, recipientAddress, message) => {
  let web3;
  let network;
  
  const networkConfig = {
    'ethereum': 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    'avalanche': 'https://api.avax.network/ext/bc/C/rpc', // Update with your Avalanche endpoint
    'polygon': 'https://polygon-rpc.com/', // Update with your Polygon endpoint
    'optimism': 'https://mainnet.optimism.io/', // Update with your Optimism endpoint
    'arbitrum': 'https://arb1.arbitrum.io/rpc' // Update with your Arbitrum endpoint
  };

  if (blockchain in networkConfig) {
    // Connect to the blockchain network
    network = networkConfig[blockchain];
    web3 = new Web3(new Web3.providers.HttpProvider(network));

    try {
      // Request account access
      await window.ethereum.enable();

      // Get the first account from the wallet
      const accounts = await web3.eth.getAccounts();

      // Create a transaction
      const tx = {
        from: accounts[0],
        to: recipientAddress,
        value: web3.utils.toWei('0.001', 'ether'), // Example value
        gas: 21000, // Gas limit for a simple transaction
        data: web3.utils.toHex(message), // Convert the message to hex
      };

      // Estimate the gas price
      const gasPrice = await web3.eth.getGasPrice();
      tx.gasPrice = gasPrice;

      // Sign the transaction
      const signedTx = await web3.eth.accounts.signTransaction(tx, accounts[0]);

      // Send the transaction and measure the time
      const start = Date.now();
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      const end = Date.now();

      // Return the result
      return {
        blockchain,
        time: (end - start) / 1000, // Convert time to seconds
      };
    } catch (error) {
      // Handle any errors that occur while interacting with MetaMask
      console.error(`Failed to send wave on ${blockchain}`, error);
    }
  } else {
    console.log(`Unsupported blockchain: ${blockchain}`);
  }
};

export default sendWave;
