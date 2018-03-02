// Chapter 9 - Library Main Load
function C009_Library_LibraryMain_Load() {

	// Set the timer limits at 15:25
	StartTimer(15.25 * 60 * 60 * 1000, "C009_Library", "Outro");
	LeaveIcon = "Wait";
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;

}

// Chapter 9 - Library Main Run
function C009_Library_LibraryMain_Run() {

	// Draw the background image 
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

}

// Chapter 9 - Library Main Click
function C009_Library_LibraryMain_Click() {

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C009_Library", "LibraryMain");

}