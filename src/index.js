/**
 * Sample browser application which uses a JavaScript library to interact
 * with a Monero daemon using RPC and a Monero wallet using RPC and WASM
 * bindings.
 */
require("monero-javascript");

runMain();

/**
 * Main thread.
 */
async function runMain() {
  let browserMessageSpace = document.getElementById("messageSpace");

  console.log("RUN MAIN");
  
  // load wasm module on main thread
  console.log("Loading wasm module on main thread...");
  await MoneroUtils.loadKeysModule();
  console.log("done loading module");
  
  // create a random keys-only wallet
  let walletKeys = await MoneroWalletKeys.createWalletRandom(MoneroNetworkType.STAGENET, "English");
  console.log("Keys-only wallet random mnemonic: " + await walletKeys.getMnemonic());
  
  // print wallet attributes
  let walletInfoJson = {
	viewkey: await(walletKeys.getPrivateViewKey()),
	spendkey: await(walletKeys.getPrivateSpendKey()),
	address: await(walletKeys.getAddress(0,0))
  };

  let walletAttributes = "Keys-only wallet attributes: " + JSON.stringify(walletInfoJson, undefined, 2);
  browserMessageSpace = document.getElementById("messageSpace"); 
  browserMessageSpace.innerHTML = walletAttributes;
  console.log(walletAttributes);

  console.log("EXIT MAIN");
}
