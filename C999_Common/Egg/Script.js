var C999_Common_Egg_CurrentStage = 0;

// Chapter Common - Egg Load
function C999_Common_Egg_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();
	
	// Set the correct stage
	C999_Common_Egg_CurrentStage = 0;
	if (PlayerHasLockedInventory("VibratingEgg")) C999_Common_Egg_CurrentStage = 10;
	if ((PlayerHasLockedInventory("VibratingEgg")) && Common_PlayerRestrained) C999_Common_Egg_CurrentStage = 20;

}

// Chapter Common - Egg Run, we draw the regular player image if the item is on
function C999_Common_Egg_Run() {
	BuildInteraction(C999_Common_Egg_CurrentStage);
	if (PlayerHasLockedInventory("VibratingEgg")) DrawPlayerImage(0, 0);
}

// Chapter Common - Egg Click, allow regular interactions and clicking on another item
function C999_Common_Egg_Click() {
	ClickInteraction(C999_Common_Egg_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Egg Insert
function C999_Common_Egg_Insert() {
	PlayerRemoveInventory("VibratingEgg", 1);
	PlayerLockInventory("VibratingEgg");
}