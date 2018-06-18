var C012_AfterClass_Dorm_Guest = [];
var C012_AfterClass_Dorm_PlayerPos = 0;

// Chapter 12 - After Class Dorm Load
function C012_AfterClass_Dorm_Load() {
	
	// Set the timer limits
	StartTimer(24 * 60 * 60 * 1000, "C012_AfterClass", "Outro");
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;
	
	// Resets the other locations from the Dorm
	C012_AfterClass_Pub_CurrentStage = 0;
	C012_AfterClass_Roommates_CurrentStage = 0;
	
	// Set the guest list in the dorm
	C012_AfterClass_Dorm_Guest = [];
	if (GameLogQuery(CurrentChapter, "Sidney", "EnterDormFromPub") && (CurrentTime <= 20 * 60 * 60 * 1000)) C012_AfterClass_Dorm_Guest.push("Sidney");
	C012_AfterClass_Dorm_PlayerPos = 600 - C012_AfterClass_Dorm_Guest.length * 100;

}

// Chapter 12 - After Class Dorm Run
function C012_AfterClass_Dorm_Run() {
	
	// Draw the background and the actors
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawTransparentPlayerImage(C012_AfterClass_Dorm_PlayerPos - 210, 0, 0.6667);
	for (var A = 0; A < C012_AfterClass_Dorm_Guest.length; A++)
		DrawActor(C012_AfterClass_Dorm_Guest[A], C012_AfterClass_Dorm_PlayerPos - 10 + A * 200, 0, 0.6667);
	
	// Draw the room icons
	if ((MouseX >= 0) && (MouseX < 150) && (MouseY >= 0) && (MouseY <= 600)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Wardrobe_Active.png", 25, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Wardrobe_Inactive.png", 25, 0);
	if ((MouseX >= 150) && (MouseX < 300) && (MouseY >= 0) && (MouseY <= 600)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bed_Active.png", 175, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bed_Inactive.png", 175, 0);
	if ((MouseX >= 900) && (MouseX < 1050) && (MouseY >= 0) && (MouseY <= 600)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Save_Active.png", 925, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Save_Inactive.png", 925, 0);
	if ((MouseX >= 1050) && (MouseX < 1200) && (MouseY >= 0) && (MouseY <= 600)) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Exit_Active.png", 1075, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Exit_Inactive.png", 1075, 0);
	
}

// Chapter 12 - After Class Dorm Click
function C012_AfterClass_Dorm_Click() {

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), CurrentChapter, CurrentScreen);
	
	// Opens the other screens of the dorm
	if ((MouseX >= 0) && (MouseX < 150) && (MouseY >= 0) && (MouseY <= 600)) SetScene(CurrentChapter, "Wardrobe");
	if ((MouseX >= 150) && (MouseX < 300) && (MouseY >= 0) && (MouseY <= 600)) SetScene(CurrentChapter, "Bed");
	if ((MouseX >= 900) && (MouseX < 1050) && (MouseY >= 0) && (MouseY <= 600)) SaveMenu("C012_AfterClass", "Dorm");
	if ((MouseX >= 1050) && (MouseX < 1200) && (MouseY >= 0) && (MouseY <= 600)) SetScene(CurrentChapter, "DormExit");

	// Loads the player or other actors
	if ((MouseX >= C012_AfterClass_Dorm_PlayerPos - 100) && (MouseX < C012_AfterClass_Dorm_PlayerPos + 100) && (MouseY >= 0) && (MouseY <= 600)) InventoryClick("Player", CurrentChapter, CurrentScreen);
	if ((MouseX >= C012_AfterClass_Dorm_PlayerPos + 100) && (MouseX < C012_AfterClass_Dorm_PlayerPos + 300) && (MouseY >= 0) && (MouseY <= 600) && (C012_AfterClass_Dorm_Guest.length >= 1)) SetScene(CurrentChapter, C012_AfterClass_Dorm_Guest[0]);
	if ((MouseX >= C012_AfterClass_Dorm_PlayerPos + 300) && (MouseX < C012_AfterClass_Dorm_PlayerPos + 500) && (MouseY >= 0) && (MouseY <= 600) && (C012_AfterClass_Dorm_Guest.length >= 2)) SetScene(CurrentChapter, C012_AfterClass_Dorm_Guest[1]);
	
}