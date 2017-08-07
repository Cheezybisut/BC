var C999_Common_TapeGag_CurrentStage = 0;

// Chapter Common - TapeGag Load
function C999_Common_TapeGag_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();
	
	// Set the correct starting stage
	if (PlayerHasLockedInventory("TapeGag") == true) C999_Common_TapeGag_CurrentStage = 10;
	else C999_Common_TapeGag_CurrentStage = 0;

}

// Chapter Common - Tapegag Run, we draw the regular player image if the item is on
function C999_Common_TapeGag_Run() {
	BuildInteraction(C999_Common_TapeGag_CurrentStage);
	if (PlayerHasLockedInventory("Tapegag")) DrawPlayerImage(150, 0);
}

// Chapter Common - TapeGag Click, allow regular interactions and clicking on another item
function C999_Common_TapeGag_Click() {
	ClickInteraction(C999_Common_TapeGag_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Self TapeGag
function C999_Common_TapeGag_SelfGag() {
	if ((Common_BondageAllowed) && (Common_SelfBondageAllowed)) {
		if (PlayerHasLockedInventory("Ballgag")) {
			PlayerUnlockInventory("Ballgag");
			PlayerAddInventory("Ballgag");
		} 
		PlayerRemoveInventory("TapeGag", 1);
		PlayerLockInventory("TapeGag");
	} else {
		OveridenIntroText = "You fantasizes about being gagged but realize that|it might not be the best time to gag yourself.";
		C999_Common_TapeGag_CurrentStage = 0;
	}
}

// Chapter Common - Self Ungag, leave the screen if no tape is left
function C999_Common_TapeGag_SelfUngag() {
	PlayerUnlockInventory("TapeGag");
	if (!PlayerHasInventory("TapeGag")) SetScene(LeaveChapter, LeaveScreen);
}
