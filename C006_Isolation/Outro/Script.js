var C006_Isolation_Outro_EarlyRelease = false;
var C006_Isolation_Outro_EarlyEscape = false;
var C006_Isolation_Outro_StuckPillory = false;
var C006_Isolation_Outro_StuckCross = false;

// Chapter 6 - Outro Load
function C006_Isolation_Outro_Load() {
	
	// If there was an early escape
	if ((CurrentTime < 11.5 * 60 * 60 * 1000) && !C006_Isolation_Outro_EarlyRelease) {
		C006_Isolation_Outro_EarlyEscape = true;
		PlayerAddInventory("Rope", 1);
		PlayerAddInventory("BallGag", 1);
		PlayerAddSkill("RopeMastery", 1);
		if (C006_Isolation_CellGround_CollarAvail) PlayerAddInventory("Collar", 1);
		if (C006_Isolation_CellGround_RopeAvail) PlayerAddInventory("Rope", 1);
	}
	
	// Time is always 11:30:00 in the outro, unlock if needed
	StopTimer(11.5 * 60 * 60 * 1000);
	PlayerUnlockAllInventory();
	PlayerClothes("Clothed");

}

// Chapter 6 - Outro Run
function C006_Isolation_Outro_Run() {

	// Gets the teacher name
	var Teacher = "Mildred";
	if (Common_PlayerCrime == "DrugYuki") Teacher = "Yuki";

	// Paints the background	
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");	
	if (C006_Isolation_Outro_EarlyEscape) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Player.jpg", 800, 0);
	if (!C006_Isolation_Outro_EarlyEscape && (Common_PlayerCrime == "RestrainMildred")) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Mildred.jpg", 800, 0);
	if (!C006_Isolation_Outro_EarlyEscape && (Common_PlayerCrime == "DrugYuki")) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Yuki.jpg", 800, 0);

	// Draw the outro text
	if (!C006_Isolation_Outro_EarlyRelease && !C006_Isolation_Outro_EarlyEscape) {
		if (C006_Isolation_IsolationRoom_Stage <= 1) DrawText(ctx, GetText("Outro1A"), 400, 150, "White");
		if (C006_Isolation_IsolationRoom_Stage == 2) DrawText(ctx, GetText("Outro1B"), 400, 150, "White");
		if ((C006_Isolation_IsolationRoom_Stage == 3) && !C006_Isolation_Outro_StuckPillory && !C006_Isolation_Outro_StuckCross) DrawText(ctx, GetText("Outro1C"), 400, 150, "White");
		if ((C006_Isolation_IsolationRoom_Stage == 3) && C006_Isolation_Outro_StuckPillory && !C006_Isolation_Outro_StuckCross) DrawText(ctx, GetText("Outro1D"), 400, 150, "White");
		if ((C006_Isolation_IsolationRoom_Stage == 3) && !C006_Isolation_Outro_StuckPillory && C006_Isolation_Outro_StuckCross) DrawText(ctx, GetText("Outro1E"), 400, 150, "White");
	}
	if (C006_Isolation_Outro_EarlyRelease) DrawText(ctx, GetText("Outro1F"), 400, 150, "White");
	if (C006_Isolation_Outro_EarlyEscape) DrawText(ctx, GetText("Outro1G"), 400, 150, "White");
	if (TextPhase >= 1) DrawText(ctx, GetText("Outro2"), 400, 300, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText("Outro3"), 400, 450, "White");

}

// Chapter 5 - Outro Click
function C006_Isolation_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	
	// Restore the player inventory on phase 2
	if (TextPhase == 1)
		PlayerRestoreAllInventory();
		
	// Jump to lunch on phase 3
	if (TextPhase >= 3) {
		Common_PlayerCrime = "";
		SaveMenu("C007_LunchBreak", "Intro");
	}

}