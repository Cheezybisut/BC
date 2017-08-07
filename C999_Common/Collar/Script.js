var C999_Common_Collar_CurrentStage = 0;

// Chapter Common - Collar Load
function C999_Common_Collar_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();

	// Set the correct stage
	if (PlayerHasLockedInventory("Collar") == true) C999_Common_Collar_CurrentStage = 10;
	else C999_Common_Collar_CurrentStage = 0;

}

// Chapter Common - Collar Run, we draw the regular player image if the item is on
function C999_Common_Collar_Run() {
	BuildInteraction(C999_Common_Collar_CurrentStage);
	if (PlayerHasLockedInventory("Collar")) DrawPlayerImage(150, 50);
}

// Chapter Common - Collar Click, allow regular interactions and clicking on another item
function C999_Common_Collar_Click() {
	ClickInteraction(C999_Common_Collar_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Self Collar
function C999_Common_Collar_SelfCollar() {
	if ((Common_BondageAllowed) && (Common_SelfBondageAllowed)) {
		PlayerRemoveInventory("Collar", 1);
		PlayerLockInventory("Collar");
	} else {
		OveridenIntroText = "You fantasizes about being collared but realize that|it might not be the best time to collar yourself.";
		C999_Common_Collar_CurrentStage = 0;
	}
}

// Chapter Common - Self Uncollar
function C999_Common_Collar_SelfUncollar() {
	PlayerUnlockInventory("Collar");
	PlayerAddInventory("Collar", 1);
}