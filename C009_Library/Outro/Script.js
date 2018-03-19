// Chapter 9 - Outro Load
function C009_Library_Outro_Load() {
	
	// Time is always 15:15:00 in the outro, unlock if needed
	StopTimer(15.25 * 60 * 60 * 1000);
	PlayerReleaseBondage();
	PlayerUnlockAllInventory();
	ActorSpecificClearInventory("Jennifer", false);
	ActorSpecificSetPose("Jennifer", "");
	Common_PlayerCrime = "";

}

// Chapter 9 - Outro Run
function C009_Library_Outro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
	
	// Draw the outro text to lead to chapter 12
	DrawText(ctx, GetText("Outro1"), 400, 150, "White");
	if (TextPhase >= 1) DrawText(ctx, GetText("Outro2"), 400, 300, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText("Outro3"), 400, 450, "White");

}

// Chapter 9 - Outro Click
function C009_Library_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if (TextPhase >= 3) SaveMenu("C101_KinbakuClub", "Intro");

}
