const aptos = new Aptos(); // default to devnet

// with custom configuration
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

const ledgerInfo = await aptos.getLedgerInfo();
const modules = await aptos.getAccountModules({ accountAddress: "0x123" });
const tokens = await aptos.getAccountOwnedTokens({ accountAddress: "0x123" });

// Get account balance
const accountBalance = await aptos.getAccountBalance({ accountAddress: "0x123" });
console.log(`Account balance: ${accountBalance}`);
