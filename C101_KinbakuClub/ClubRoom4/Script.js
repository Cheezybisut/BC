// Chapter 101 - Club Room 3 Load
function C101_KinbakuClub_ClubRoom4_Load() {
	if (PlayerHasLockedInventory("Blindfold")) SetScene(CurrentChapter, "BlindMansBuff");
	LeaveIcon = "Wait";
}

// Chapter  101 - Club Room 4 Run
function C101_KinbakuClub_ClubRoom4_Run() {

	// Draw the background image 
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/ClubRoom4Arrows.jpg", 0, 0);
	
		
	// Draw CardGamers
	//DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/CardGamers1.jpg", 570, 130);
	
}

// Chapter 101 - Club Room 4 Click
function C101_KinbakuClub_ClubRoom4_Click() {

	// When the user clicks on any character (screen is divided in 4, 3rd can be the player)
	if ((MouseX >= 15) && (MouseX <= 115) && (MouseY >= 520) && (MouseY <= 580)) SetScene(CurrentChapter, "ClubRoom2");
	if ((MouseX >= 1085) && (MouseX <= 1185) && (MouseY >= 520) && (MouseY <= 580)) SetScene(CurrentChapter, "ClubRoom3");
	

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C101_KinbakuClub", "ClubRoom4");

}