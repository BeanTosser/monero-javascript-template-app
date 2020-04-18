/**
 * This is a bare-bones monero-javascript web app. Its purpose is to 
 * provide a basic boilerplate template script on top of which developers
 * can quickly build their monero-javascript apps. 
 *
 * The script uses Monero-javascript's WASM functionality to create an
 * entirely client-side, offline wallet, and prints some of the wallet's
 * basic attributes to a web page.
 */
require("monero-javascript");

runMain();

/**
 * Main thread.
 */
async function runMain() {
  // load wasm module on main thread
  await MoneroUtils.loadKeysModule();

  // create a random keys-only wallet
  let walletKeys = await MoneroWalletKeys.createWalletRandom(MoneroNetworkType.STAGENET, "English");
  
  // Create a JSON object to hold select wallet attributes
  let walletInfoJson = {
	mnemonic: await(walletKeys.getMnemonic()),
	viewkey: await(walletKeys.getPrivateViewKey()),
	spendkey: await(walletKeys.getPrivateSpendKey()),
	address: await(walletKeys.getAddress(0,0))
  };

  // Convert walletInfoJson object to a string formatted to display
  // in a readable manner on the HTML page
  let walletAttributesString = "Keys-only wallet attributes: " + JSON.stringify(walletInfoJson, undefined, "<br/><br/>");

  // Print the wallet attributes to the page
  document.getElementById("messageSpace").innerHTML = walletAttributesString;
}
