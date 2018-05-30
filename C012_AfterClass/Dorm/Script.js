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
	if ((MouseX >= 0) && (MouseX <= 200) && (MouseY >= 0) && (MouseY <= 600)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Wardrobe_Active.png", 50, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Wardrobe_Inactive.png", 50, 0);
	if ((MouseX >= 200) && (MouseX <= 400) && (MouseY >= 0) && (MouseY <= 600)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bed_Active.png", 250, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bed_Inactive.png", 250, 0);
	if ((MouseX >= 800) && (MouseX <= 1000) && (MouseY >= 0) && (MouseY <= 600)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Save_Active.png", 850, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Save_Inactive.png", 850, 0);
}

// Chapter 12 - After Class Dorm Click
function C012_AfterClass_Dorm_Click() {

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), CurrentChapter, CurrentScreen);
	
	// Opens the other screens of the dorm
	if ((MouseX >= 0) && (MouseX <= 200) && (MouseY >= 0) && (MouseY <= 600)) SetScene(CurrentChapter, "Wardrobe");
	if ((MouseX >= 200) && (MouseX <= 400) && (MouseY >= 0) && (MouseY <= 600)) SetScene(CurrentChapter, "Bed");
	if ((MouseX >= 500) && (MouseX <= 700) && (MouseY >= 0) && (MouseY <= 600)) InventoryClick("Player", CurrentChapter, CurrentScreen);
	if ((MouseX >= 800) && (MouseX <= 1000) && (MouseY >= 0) && (MouseY <= 600)) SaveMenu("C012_AfterClass", "Dorm");

}