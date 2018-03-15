var C009_Library_Library_CurrentZone = "001";
var C009_Library_Library_JenniferGone = false;
var C009_Library_Library_BookProgress = 40;

// Chapter 9 - Library Load
function C009_Library_Library_Load() {

	// Set the timer limits at 15:25
	StartTimer(15.25 * 60 * 60 * 1000, "C009_Library", "Outro");
	LeaveIcon = "Wait";
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;
	
	// Makes sure the player is clothed when exploring
	if (!Common_PlayerRestrained) PlayerClothes("Clothed");
	
	// Jennifer can be gone from the start if chapter 10 was triggered for her or Sidney
	if ((Common_PlayerCrime == "JenniferStranded") || (Common_PlayerCrime == "SidneyStranded")) C009_Library_Library_JenniferGone = true;

}

// Draw the navigation arrows
function C009_Library_Library_Navigation(ctx, Zone, Direction, X, Y) {
	if (C009_Library_Library_CurrentZone == Zone) {
		var Active = false;
		if ((MouseX >= X) && (MouseX <= X + 200) && (MouseY >= Y) && (MouseY <= Y + 200)) Active = true;
		if ((Direction == "Up") && Active) DrawImage(ctx, Icons.Navigation.ArrowUpActive, X, Y);
		if ((Direction == "Up") && !Active) DrawImage(ctx, Icons.Navigation.ArrowUpInactive, X, Y);
		if ((Direction == "Down") && Active) DrawImage(ctx, Icons.Navigation.ArrowDownActive, X, Y);
		if ((Direction == "Down") && !Active) DrawImage(ctx, Icons.Navigation.ArrowDownInactive, X, Y);
		if ((Direction == "Left") && Active) DrawImage(ctx, Icons.Navigation.ArrowLeftActive, X, Y);
		if ((Direction == "Left") && !Active) DrawImage(ctx, Icons.Navigation.ArrowLeftInactive, X, Y);
		if ((Direction == "Right") && Active) DrawImage(ctx, Icons.Navigation.ArrowRightActive, X, Y);
		if ((Direction == "Right") && !Active) DrawImage(ctx, Icons.Navigation.ArrowRightInactive, X, Y);
	}
}

// Chapter 9 - Library Run
function C009_Library_Library_Run() {

	// Draw the background image 
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/" + C009_Library_Library_CurrentZone + ".jpg", 0, 0);
	
	// Draw the navigation arrows
	C009_Library_Library_Navigation(ctx, "001", "Left", 0, 400);
	C009_Library_Library_Navigation(ctx, "001", "Up", 500, 350);
	C009_Library_Library_Navigation(ctx, "001", "Right", 1000, 400);
	C009_Library_Library_Navigation(ctx, "002", "Up", 500, 200);
	C009_Library_Library_Navigation(ctx, "002", "Down", 500, 400);
	C009_Library_Library_Navigation(ctx, "002", "Left", 0, 400);
	C009_Library_Library_Navigation(ctx, "002", "Right", 1000, 400);
	C009_Library_Library_Navigation(ctx, "003", "Down", 500, 400);
	C009_Library_Library_Navigation(ctx, "004", "Up", 780, 150);
	C009_Library_Library_Navigation(ctx, "004", "Left", 80, 200);
	C009_Library_Library_Navigation(ctx, "004", "Left", 550, 150);
	C009_Library_Library_Navigation(ctx, "005", "Down", 500, 400);
	C009_Library_Library_Navigation(ctx, "006", "Right", 600, 200);
	C009_Library_Library_Navigation(ctx, "006", "Left", 400, 200);
	C009_Library_Library_Navigation(ctx, "006", "Down", 500, 400);
	C009_Library_Library_Navigation(ctx, "007", "Down", 500, 400);
	
	// TO REMOVE
	if ((C009_Library_Library_CurrentZone == "005") || (C009_Library_Library_CurrentZone == "007")) DrawText(ctx, "This zone will be available in another version", 600, 175, "white");

}

// Chapter 9 - Library Enter Search Mode
function C009_Library_Library_StartSearch(SearchStage) {
	CurrentTime = CurrentTime + 10000;
	C009_Library_Search_CurrentStage = SearchStage;
	SetScene(CurrentChapter, "Search");
	return false;
}

// Chapter 9 - Library Enter Zone
function C009_Library_Library_EnterZone(NewZone) {
	CurrentTime = CurrentTime + 10000;
	C009_Library_Library_CurrentZone = NewZone;
	return false;
}

// Chapter 9 - Library Load Jennifer
function C009_Library_Library_LoadJennifer() {
	CurrentTime = CurrentTime + 10000;
	SetScene(CurrentChapter, "Jennifer");
	return false;
}

// Chapter 9 - Library Click
function C009_Library_Library_Click() {

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C009_Library", "Library");
	
	// In Zone 1, the player can search (left), zone 2 (up) or zone 3 (right)
	var E = true;
	if (E && (C009_Library_Library_CurrentZone == "001") && (MouseX >= 0) && (MouseX <= 200) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_StartSearch(10);
	if (E && (C009_Library_Library_CurrentZone == "001") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 350) && (MouseY <= 550)) E = C009_Library_Library_EnterZone("002");
	if (E && (C009_Library_Library_CurrentZone == "001") && (MouseX >= 1000) && (MouseX <= 1200) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("003");

	// In Zone 2, the player can search/meet zone 1 (down), zone 4 (up), zone 5 (right), zone 6 (left)
	if (E && (C009_Library_Library_CurrentZone == "002") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("001");
	if (E && (C009_Library_Library_CurrentZone == "002") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 200) && (MouseY <= 400)) E = C009_Library_Library_EnterZone("004");
	if (E && (C009_Library_Library_CurrentZone == "002") && (MouseX >= 1000) && (MouseX <= 1200) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("005");
	if (E && (C009_Library_Library_CurrentZone == "002") && (MouseX >= 0) && (MouseX <= 200) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("006");

	// In Zone 3, the player can go to zone 1 (down) or search in three spots
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("001");
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 0) && (MouseX <= 400) && (MouseY >= 100) && (MouseY <= 500)) E = C009_Library_Library_StartSearch(30);
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 450) && (MouseX <= 750) && (MouseY >= 100) && (MouseY <= 400)) E = C009_Library_Library_StartSearch(31);
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 800) && (MouseX <= 1200) && (MouseY >= 100) && (MouseY <= 500)) E = C009_Library_Library_StartSearch(32);

	// In Zone 4, the player can go to zone 2 (down), zone 7 (down left), zone 8 (top left)
	if (E && (C009_Library_Library_CurrentZone == "004") && (MouseX >= 780) && (MouseX <= 980) && (MouseY >= 150) && (MouseY <= 350)) E = C009_Library_Library_EnterZone("002");
	if (E && (C009_Library_Library_CurrentZone == "004") && (MouseX >= 80) && (MouseX <= 280) && (MouseY >= 200) && (MouseY <= 400)) E = C009_Library_Library_EnterZone("007");
	if (E && (C009_Library_Library_CurrentZone == "004") && (MouseX >= 550) && (MouseX <= 750) && (MouseY >= 150) && (MouseY <= 350)) E = C009_Library_Library_StartSearch(C009_Library_Library_BookProgress);

	// In Zone 5, the player can go to zone 2 (down)
	if (E && (C009_Library_Library_CurrentZone == "005") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("002");

	// In Zone 6, the player can go to zone 2 (down), meet Jennifer (left), or search in books (right)
	if (E && (C009_Library_Library_CurrentZone == "006") && (MouseX >= 400) && (MouseX <= 600) && (MouseY >= 200) && (MouseY <= 400)) E = C009_Library_Library_StartSearch(61);
	if (E && (C009_Library_Library_CurrentZone == "006") && (MouseX >= 600) && (MouseX <= 800) && (MouseY >= 200) && (MouseY <= 400) && C009_Library_Library_JenniferGone) E = C009_Library_Library_StartSearch(60);
	if (E && (C009_Library_Library_CurrentZone == "006") && (MouseX >= 600) && (MouseX <= 800) && (MouseY >= 200) && (MouseY <= 400) && !C009_Library_Library_JenniferGone) E = C009_Library_Library_LoadJennifer();
	if (E && (C009_Library_Library_CurrentZone == "006") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("002");

	// In Zone 7, the player can go to zone 4 (down)
	if (E && (C009_Library_Library_CurrentZone == "007") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("004");
	
}