var C999_Common_Egg_CurrentStage = 0;
var C999_Common_Egg_HasLooseEgg = false;
var C999_Common_Egg_ConfirmInsert = false;

// Chapter Common - Egg Load
function C999_Common_Egg_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();
	
	// Set the correct stage
	C999_Common_Egg_ConfirmInsert = false;
	C999_Common_Egg_CurrentStage = 0;
	if (PlayerHasLockedInventory("VibratingEgg")) C999_Common_Egg_CurrentStage = 10;
	if ((PlayerHasLockedInventory("VibratingEgg")) && Common_PlayerRestrained) C999_Common_Egg_CurrentStage = 20;

	// If the player has a loose egg
	C999_Common_Egg_HasLooseEgg = PlayerHasInventory("VibratingEgg");

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

// Chapter Common - Egg Insert, it doesn't work with a chastity belt and the player must confirm
function C999_Common_Egg_Insert() {
	if (!Common_PlayerChaste) {
		if (!C999_Common_Egg_ConfirmInsert) {
			C999_Common_Egg_ConfirmInsert = true;
			OveridenIntroText = GetText("ConfirmInsert");
		} else {
			PlayerRemoveInventory("VibratingEgg", 1);
			PlayerLockInventory("VibratingEgg");
			C999_Common_Egg_CurrentStage = 10;			
			C999_Common_Egg_HasLooseEgg = PlayerHasInventory("VibratingEgg");
		}		
	} else {
		OveridenIntroText = GetText("ChastityBelt");
	}
}

// Chapter Common - Show the item image
function C999_Common_Egg_ShowImage() {
	OveridenIntroImage = "Egg.jpg";
}