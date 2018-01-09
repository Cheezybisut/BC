// Chapter 101 - Club Room 1 Load
function C101_KinbakuClub_ClubRoom1_Load() {
	if (PlayerHasLockedInventory("Blindfold")) SetScene(CurrentChapter, "BlindMansBuff");
	LeaveIcon = "Wait";
}

// Chapter  101 - Club Room 1 Run
function C101_KinbakuClub_ClubRoom1_Run() {

	// Draw the background image 
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/ClubRoom1Arrows.jpg", 0, 0);
	
	// Draw proposed layout
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Plan1.png", 0, 0);

}

// Chapter 101 - Club Room 1 Click
function C101_KinbakuClub_ClubRoom1_Click() {

	// When the user clicks on any character (screen is divided in 4, 3rd can be the player)
	if ((MouseX >= 15) && (MouseX <= 115) && (MouseY >= 520) && (MouseY <= 580)) SetScene(CurrentChapter, "ClubRoom3");
	if ((MouseX >= 1085) && (MouseX <= 1185) && (MouseY >= 520) && (MouseY <= 580)) SetScene(CurrentChapter, "ClubRoom2");
	if ((MouseX >= 0) && (MouseX <= 215) && (MouseY >= 45) && (MouseY <= 350)) SetScene(CurrentChapter, "Door");

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C101_KinbakuClub", "ClubRoom1");

}