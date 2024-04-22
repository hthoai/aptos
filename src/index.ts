import { AptosAccount, AptosClient, FaucetClient, TokenClient } from "aptos";

async function main() {
  // Connect to Aptos devnet
  const nodeUrl = "https://fullnode.devnet.aptoslabs.com";
  const client = new AptosClient(nodeUrl);

  // Create a new account
  const account = new AptosAccount();
  console.log(`Account address: ${account.address()}`);

  // Fund the account with test coins from the faucet
  const faucetClient = new FaucetClient(nodeUrl, "https://faucet.devnet.aptoslabs.com");
  await faucetClient.fundAccount(account.address(), 100_000_000);

  /// Get the account resources
  const resources = await client.getAccountResources(account.address());
  const accountResource = resources.find((r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
  
  const balance = BigInt((accountResource?.data as any)?.coin?.value ?? 0);
  console.log(`Account balance: ${balance}`);

  // Create a TokenClient instance
  const tokenClient = new TokenClient(client);

  // Get the token balance
  const tokenBalance = await tokenClient.getToken(
    account.address(),
    "0x1::aptos_coin::AptosCoin",
    "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
  );
  console.log(`Token balance: ${tokenBalance?.amount}`);
}

main().catch(console.error);