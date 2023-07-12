import React, { useState } from 'react';
import sendWave from './BlockchainTest';

const App = () => {
  const [selectedBlockchains, setSelectedBlockchains] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [waveMessage, setWaveMessage] = useState('');

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setSelectedBlockchains((prevSelectedBlockchains) => {
      if (checked) {
        // Add the selected blockchain to the array
        return [...prevSelectedBlockchains, name];
      } else {
        // Remove the selected blockchain from the array
        return prevSelectedBlockchains.filter(blockchain => blockchain !== name);
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a wave on each selected blockchain
    for (const blockchain of selectedBlockchains) {
      const result = await sendWave(blockchain, recipientAddress, waveMessage);
      console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="checkbox"
          name="ethereum"
          checked={selectedBlockchains.includes('ethereum')}
          onChange={handleCheckboxChange}
        />
        Ethereum Mainnet
      </label>
      <label>
        <input
          type="checkbox"
          name="avalanche"
          checked={selectedBlockchains.includes('avalanche')}
          onChange={handleCheckboxChange}
        />
        Avalanche C-Chain
      </label>
      <label>
        <input
          type="checkbox"
          name="polygon"
          checked={selectedBlockchains.includes('polygon')}
          onChange={handleCheckboxChange}
        />
        Polygon Mainnet
      </label>
      <label>
        <input
          type="checkbox"
          name="optimism"
          checked={selectedBlockchains.includes('optimism')}
          onChange={handleCheckboxChange}
        />
        Optimism L2
      </label>
      <label>
        <input
          type="checkbox"
          name="arbitrum"
          checked={selectedBlockchains.includes('arbitrum')}
          onChange={handleCheckboxChange}
        />
        Arbitrum L2
      </label>
      <input
        type="text"
        value={recipientAddress}
        onChange={(event) => setRecipientAddress(event.target.value)}
        placeholder="Recipient Address"
        required
      />
      <input
        type="text"
        value={waveMessage}
        onChange={(event) => setWaveMessage(event.target.value)}
        placeholder="Wave Message"
      />
      <button type="submit">Send Wave</button>
    </form>
  );
};

export default App;
