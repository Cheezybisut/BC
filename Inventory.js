var PlayerInventory = [];
var PlayerInventoryName = 0;
var PlayerInventoryQuantity = 1;
var PlayerLockedInventory = [];
var PlayerSavedInventory = [];

// Set up the player clothes
function PlayerClothes(NewCloth) {
	if (NewCloth == "Judo") Common_PlayerCostume = NewCloth;
	else Common_PlayerCostume = "";
	Common_PlayerClothed = ((NewCloth == "Clothed") || (NewCloth == "Judo"));
	Common_PlayerUnderwear = (NewCloth == "Underwear");
	Common_PlayerNaked = (NewCloth == "Naked");
}

// Set the restrained and gagged common variables, used by many scenes
function LoadRestrainStatus() {
	Common_PlayerRestrained = (PlayerHasLockedInventory("Cuffs") || PlayerHasLockedInventory("Rope"));
	Common_PlayerGagged = (PlayerHasLockedInventory("Ballgag") || PlayerHasLockedInventory("TapeGag"));
	Common_PlayerNotRestrained = !Common_PlayerRestrained;
	Common_PlayerNotGagged = !Common_PlayerGagged;
}

// Save the current full inventory for the player
function PlayerSaveAllInventory() {
	PlayerSavedInventory = PlayerInventory.slice();
}

// Restore the full saved inventory for the player, one item by item
function PlayerRestoreAllInventory() {
	for (var I = 0; I < PlayerSavedInventory.length; I++)
		PlayerAddInventory(PlayerSavedInventory[I][PlayerInventoryName], PlayerSavedInventory[I][PlayerInventoryQuantity]);
	PlayerSavedInventory = [];
}

// Add a new item to the locked inventory
function PlayerLockInventory(NewInventory) {

	// Check if the item is already locked before adding it
	for (var I = 0; I < PlayerLockedInventory.length; I++)
		if (PlayerLockedInventory[I] == NewInventory)
			return;		
	PlayerLockedInventory.push(NewInventory);
	LoadRestrainStatus();

}

// Remove an item from the locked inventory
function PlayerUnlockInventory(UnlockedInventory) {

	// Check if the item is already locked before adding it
	for (var I = 0; I < PlayerLockedInventory.length; I++)
		if (PlayerLockedInventory[I] == UnlockedInventory)
			PlayerLockedInventory.splice(I, 1);
	LoadRestrainStatus();

}

// Remove all items from the locked inventory except the egg
function PlayerUnlockAllInventory(UnlockedInventory) {
	var HadEgg = PlayerHasLockedInventory("VibratingEgg");
	while (PlayerLockedInventory.length > 0)
		PlayerLockedInventory.splice(0, 1);
	if (HadEgg) PlayerLockInventory("VibratingEgg");
	LoadRestrainStatus();
}

// Returns true if the player has the locked inventory
function PlayerHasLockedInventory(QueryInventory) {
	
	// Returns true if we find the locked inventory item
	for (var I = 0; I < PlayerLockedInventory.length; I++)
		if (QueryInventory == PlayerLockedInventory[I])
			return true;
	return false;
	
}

// Add a new item to the inventory if it's not already there
function PlayerAddInventory(NewInventory, NewQuantity) {

	// If inventory already exists, we add 1 quantity
	for (var I = 0; I < PlayerInventory.length; I++)
		if (NewInventory == PlayerInventory[I][PlayerInventoryName]) {
			PlayerInventory[I][PlayerInventoryQuantity] = PlayerInventory[I][PlayerInventoryQuantity] + NewQuantity;
			return;
		}
		
	// If not, we create the new inventory data
	PlayerInventory[PlayerInventory.length] = [NewInventory, NewQuantity];
	
}

// Remove an item from the player inventory
function PlayerRemoveInventory(RemInventory, RemQuantity) {
	
	// Search for current inventory and remove the item
	for (var I = 0; I < PlayerInventory.length; I++)
		if (RemInventory == PlayerInventory[I][PlayerInventoryName])
			if (RemQuantity >= PlayerInventory[I][PlayerInventoryQuantity])
				PlayerInventory.splice(I, 1);
			else
				PlayerInventory[I][PlayerInventoryQuantity] = PlayerInventory[I][PlayerInventoryQuantity] - RemQuantity;

}

// Remove all inventory from the player
function PlayerRemoveAllInventory() {
	while (PlayerInventory.length > 0)
		PlayerInventory.splice(0, 1);
}

// Returns true if the player has the queried inventory
function PlayerHasInventory(QueryInventory) {
	
	// Returns true if we find the inventory item
	for (var I = 0; I < PlayerInventory.length; I++)
		if (QueryInventory == PlayerInventory[I][PlayerInventoryName])
			return true;
	return false;
	
}

// Returns the name of the inventory item that was clicked in the bottom menu
function GetClickedInventory() {
	
	// Returns the item name based on the position of the mouse
	var Inv = "";
	if ((MouseX <= 975) && (MouseY >= 601) && (MouseY <= 674)) {

		// Check if the player icon was clicked
		if ((MouseX >= 1) && (MouseX <= 74))
			Inv = "Player";
	
		// Check in the regular inventory
		var I;
		if (Inv == "")
			for (I = 0; I < PlayerInventory.length; I++)	
				if ((MouseX >= 1 + (I + 1) * 75) && (MouseX <= 74 + (I + 1) * 75))
					Inv = PlayerInventory[I][PlayerInventoryName];
			
		// Check in the locked inventory
		if (Inv == "")
			for (var L = 0; L < PlayerLockedInventory.length; L++)	
				if ((MouseX >= 1 + (I + L + 1) * 75) && (MouseX <= 74 + (I + L + 1) * 75))
					Inv = "Locked_" + PlayerLockedInventory[L];

	}

	// Returns the inventory found
	return Inv;

}

// Activate a common scene from inventory
function InventoryCommonScene(SceneName, LChapter, LScreen) {	
	SetScene("C999_Common", SceneName);
	LeaveChapter = LChapter;
	LeaveScreen = LScreen;
}

// Regular event for inventory clicks
function InventoryClick(Inv, LChapter, LScreen) {

	// When the user clicks on the player icon or any regular inventory item, we launch the common chapter
	if (Inv == "Player") InventoryCommonScene("Player", LChapter, LScreen);
	if (Inv == "Crop") InventoryCommonScene("Crop", LChapter, LScreen);
	if (Inv == "CuffsKey") InventoryCommonScene("CuffsKey", LChapter, LScreen);
	if (Inv == "SleepingPill") InventoryCommonScene("SleepingPill", LChapter, LScreen);
	if (Inv == "RustyHook") InventoryCommonScene("RustyHook", LChapter, LScreen);
	if (Inv == "MetalSheet") InventoryCommonScene("MetalSheet", LChapter, LScreen);
	if ((Inv == "Collar") || (Inv == "Locked_Collar")) InventoryCommonScene("Collar", LChapter, LScreen);
	if ((Inv == "Cuffs") || (Inv == "Locked_Cuffs")) InventoryCommonScene("Cuffs", LChapter, LScreen);
	if ((Inv == "Rope") || (Inv == "Locked_Rope")) InventoryCommonScene("Rope", LChapter, LScreen);
	if ((Inv == "VibratingEgg") || (Inv == "Locked_VibratingEgg")) InventoryCommonScene("Egg", LChapter, LScreen);
	if ((Inv == "Ballgag") || (Inv == "Locked_Ballgag")) InventoryCommonScene("Ballgag", LChapter, LScreen);
	if ((Inv == "TapeGag") || (Inv == "Locked_TapeGag")) InventoryCommonScene("TapeGag", LChapter, LScreen);

}