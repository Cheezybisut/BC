var C999_Common_Rope_CurrentStage = 0;

// Chapter Common - Rope Load
function C999_Common_Rope_Load() {
	
	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();
	
	// Set the correct starting stage
	if (PlayerHasLockedInventory("Rope") == true) C999_Common_Rope_CurrentStage = 10;
	else C999_Common_Rope_CurrentStage = 0;
	
}

// Chapter Common - Rope Run, we draw the regular player image if the item is on
function C999_Common_Rope_Run() {
	BuildInteraction(C999_Common_Rope_CurrentStage);
	if (PlayerHasLockedInventory("Rope")) DrawPlayerImage(150, 240);
}

// Chapter Common - Rope Click, allow regular interactions and clicking on another item
function C999_Common_Rope_Click() {
	ClickInteraction(C999_Common_Rope_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}