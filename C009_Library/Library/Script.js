var C009_Library_Library_CurrentZone = "001";

// Chapter 9 - Library Load
function C009_Library_Library_Load() {

	// Set the timer limits at 15:25
	StartTimer(15.25 * 60 * 60 * 1000, "C009_Library", "Outro");
	LeaveIcon = "Wait";
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;

}

// Chapter 9 - Library Run
function C009_Library_Library_Run() {

	// Draw the background image 
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/" + C009_Library_Library_CurrentZone + ".jpg", 0, 0);

}

// Chapter 9 - Library Click
function C009_Library_Library_Click() {

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C009_Library", "Library");
	
	// In Zone 1, the player can go to 2, 3 or 4
	if ((C009_Library_Library_CurrentZone == "001") && (MouseX >= 0) && (MouseX <= 200) && (MouseY >= 400) && (MouseY <= 600)) C009_Library_Library_CurrentZone = "002";
	if ((C009_Library_Library_CurrentZone == "001") && (MouseX >= 1000) && (MouseX <= 1200) && (MouseY >= 400) && (MouseY <= 600)) C009_Library_Library_CurrentZone = "003";
	if ((C009_Library_Library_CurrentZone == "001") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 200) && (MouseY <= 400)) C009_Library_Library_CurrentZone = "004";

	// In Zone 2, the player can go to 1 or search the books
	if ((C009_Library_Library_CurrentZone == "002") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) C009_Library_Library_CurrentZone = "001";
	if ((C009_Library_Library_CurrentZone == "002") && (MouseX >= 0) && (MouseX <= 300) && (MouseY >= 50) && (MouseY <= 350)) SetScene(CurrentChapter, "Search" + C009_Library_Library_CurrentZone + "A");
	if ((C009_Library_Library_CurrentZone == "002") && (MouseX >= 900) && (MouseX <= 1200) && (MouseY >= 50) && (MouseY <= 350)) SetScene(CurrentChapter, "Search" + C009_Library_Library_CurrentZone + "B");

}