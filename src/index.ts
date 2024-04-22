import { AptosClient } from "aptos";

const client = new AptosClient("https://fullnode.devnet.aptoslabs.com/v1");

async function main() {
  const ledgerInfo = await client.getLedgerInfo();
  console.log("Ledger version:", ledgerInfo.ledger_version);
}

main().catch(console.error);
