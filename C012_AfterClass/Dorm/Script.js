// Chapter 12 - After Class Dorm Load
function C012_AfterClass_Dorm_Load() {
	
	// Set the timer limits
	StartTimer(24 * 60 * 60 * 1000, "C012_AfterClass", "Outro");
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;
	
}

// Chapter 12 - After Class Dorm Run
function C012_AfterClass_Dorm_Run() {
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawTransparentPlayerImage(390, 0, 0.6667);		
}

// Chapter 12 - After Class Dorm Click
function C012_AfterClass_Dorm_Click() {

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), CurrentChapter, CurrentScreen);

}