var C999_Common_TapeGag_CurrentStage = 0;
var C999_Common_TapeGag_HasLooseTape = false;

// Chapter Common - TapeGag Load
function C999_Common_TapeGag_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();
	
	// Set the correct starting stage
	if (PlayerHasLockedInventory("TapeGag") == true) C999_Common_TapeGag_CurrentStage = 10;
	else C999_Common_TapeGag_CurrentStage = 0;

	// If the player has some loose tape
	C999_Common_TapeGag_HasLooseTape = PlayerHasInventory("TapeGag");

}

// Chapter Common - Tapegag Run, we draw the regular player image if the item is on
function C999_Common_TapeGag_Run() {
	BuildInteraction(C999_Common_TapeGag_CurrentStage);
	if (PlayerHasLockedInventory("TapeGag") && (OveridenIntroImage == "")) DrawPlayerImage(150, 0);
}

// Chapter Common - TapeGag Click, allow regular interactions and clicking on another item
function C999_Common_TapeGag_Click() {
	OveridenIntroImage = "";
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
		C999_Common_TapeGag_HasLooseTape = PlayerHasInventory("TapeGag");
	} else {
		OveridenIntroText = GetText("BadTiming");
		C999_Common_TapeGag_CurrentStage = 0;
	}
}

// Chapter Common - Self Ungag, leave the screen if no tape is left
function C999_Common_TapeGag_SelfUngag() {
	PlayerUnlockInventory("TapeGag");
	if (!PlayerHasInventory("TapeGag")) SetScene(LeaveChapter, LeaveScreen);
}

// Chapter Common - Show the item image
function C999_Common_TapeGag_ShowImage() {
	OveridenIntroImage = "Tape.jpg";
}