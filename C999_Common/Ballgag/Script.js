var C999_Common_Ballgag_CurrentStage = 0;

// Chapter Common - Ballgag Load
function C999_Common_Ballgag_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();

	// Set the correct stage
	if (PlayerHasLockedInventory("Ballgag") == true) C999_Common_Ballgag_CurrentStage = 10;
	else C999_Common_Ballgag_CurrentStage = 0;

}

// Chapter Common - Ballgag Run, we draw the regular player image if the item is on
function C999_Common_Ballgag_Run() {
	BuildInteraction(C999_Common_Ballgag_CurrentStage);
	if (PlayerHasLockedInventory("Ballgag")) DrawPlayerImage(150, 0);
}

// Chapter Common - Ballgag Click, allow regular interactions and clicking on another item
function C999_Common_Ballgag_Click() {
	ClickInteraction(C999_Common_Ballgag_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Self Ballgag
function C999_Common_Ballgag_SelfGag() {
	if ((Common_BondageAllowed) && (Common_SelfBondageAllowed)) {
		PlayerUnlockInventory("TapeGag");
		PlayerRemoveInventory("Ballgag", 1);
		PlayerLockInventory("Ballgag");
	} else {
		OveridenIntroText = "You fantasizes about being gagged but realize that|it might not be the best time to gag yourself.";
		C999_Common_Ballgag_CurrentStage = 0;
	}
}

// Chapter Common - Self Ung«g
function C999_Common_Ballgag_SelfUngag() {
	PlayerUnlockInventory("Ballgag");
	PlayerAddInventory("Ballgag", 1);
}