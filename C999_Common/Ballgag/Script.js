var C999_Common_Ballgag_CurrentStage = 0;
var C999_Common_Ballgag_HasLooseBallgag = false;

// Chapter Common - Ballgag Load
function C999_Common_Ballgag_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();

	// Set the correct stage
	if (PlayerHasLockedInventory("Ballgag")) C999_Common_Ballgag_CurrentStage = 10;
	else C999_Common_Ballgag_CurrentStage = 0;

	// If the player has a loose ballgag
	C999_Common_Ballgag_HasLooseBallgag = PlayerHasInventory("Ballgag");

}

// Chapter Common - Ballgag Run, we draw the regular player image if the item is on
function C999_Common_Ballgag_Run() {
	BuildInteraction(C999_Common_Ballgag_CurrentStage);
	if (PlayerHasLockedInventory("Ballgag") && (OveridenIntroImage == "")) DrawPlayerImage(150, 0);
}

// Chapter Common - Ballgag Click, allow regular interactions and clicking on another item
function C999_Common_Ballgag_Click() {
	OveridenIntroImage = "";
	ClickInteraction(C999_Common_Ballgag_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Self Ballgag
function C999_Common_Ballgag_SelfGag() {
	if ((Common_BondageAllowed) && (Common_SelfBondageAllowed)) {
		PlayerUngag();
		PlayerRemoveInventory("Ballgag", 1);
		PlayerLockInventory("Ballgag");
		C999_Common_Ballgag_HasLooseBallgag = PlayerHasInventory("Ballgag");
	} else {
		OveridenIntroText = GetText("BadTiming");
		C999_Common_Ballgag_CurrentStage = 0;
	}
}

// Chapter Common - Self Ungag
function C999_Common_Ballgag_SelfUngag() {
	PlayerUnlockInventory("Ballgag");
	PlayerAddInventory("Ballgag", 1);
}

// Chapter Common - Show the item image
function C999_Common_Ballgag_ShowImage() {
	OveridenIntroImage = "Ballgag.jpg";
}