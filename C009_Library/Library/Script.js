var C009_Library_Library_CurrentZone = "001";

// Chapter 9 - Library Load
function C009_Library_Library_Load() {

	// Set the timer limits at 15:25
	StartTimer(15.25 * 60 * 60 * 1000, "C009_Library", "Outro");
	LeaveIcon = "Wait";
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;

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

}

// Chapter 9 - Library Enter Search Mode
function C009_Library_Library_StartSearch(SearchStage) {
	C009_Library_Search_CurrentStage = SearchStage;
	SetScene(CurrentChapter, "Search");
	return false;
}

// Chapter 9 - Library Enter New Zone
function C009_Library_Library_EnterZone(NewZone) {
	C009_Library_Library_CurrentZone = NewZone;
	return false;
}

// Chapter 9 - Library Click
function C009_Library_Library_Click() {

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C009_Library", "Library");
	
	// In Zone 1, the player can go to zone 2 or 3 or search once
	var E = true;
	if (E && (C009_Library_Library_CurrentZone == "001") && (MouseX >= 0) && (MouseX <= 200) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_StartSearch(10);
	if (E && (C009_Library_Library_CurrentZone == "001") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 350) && (MouseY <= 550)) E = C009_Library_Library_EnterZone("002");
	if (E && (C009_Library_Library_CurrentZone == "001") && (MouseX >= 1000) && (MouseX <= 1200) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("003");

	// In Zone 2, the player can go to zone 1, 4 or 5
	if (E && (C009_Library_Library_CurrentZone == "002") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("001");

	// In Zone 3, the player can to to zone 1 or search twice
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 500) && (MouseX <= 700) && (MouseY >= 400) && (MouseY <= 600)) E = C009_Library_Library_EnterZone("001");
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 0) && (MouseX <= 400) && (MouseY >= 100) && (MouseY <= 500)) E = C009_Library_Library_StartSearch(30);
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 450) && (MouseX <= 750) && (MouseY >= 100) && (MouseY <= 400)) E = C009_Library_Library_StartSearch(31);
	if (E && (C009_Library_Library_CurrentZone == "003") && (MouseX >= 800) && (MouseX <= 1200) && (MouseY >= 100) && (MouseY <= 500)) E = C009_Library_Library_StartSearch(32);

}