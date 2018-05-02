// Chapter 11 - Outro Load
function C011_LiteratureClass_Outro_Load() {
	
	// Time is always 16:30:00 in the outro, reset the poses if needed
	StopTimer(16.5 * 60 * 60 * 1000);
	PlayerReleaseBondage();
	PlayerClothes("Clothed");
	ActorSpecificClearInventory("Sidney", true);
	ActorSpecificClearInventory("Mildred", true);
	ActorSpecificSetPose("Sidney", "");
	ActorSpecificSetPose("Mildred", "");
	Common_PlayerPose = "";

}

// Chapter 11 - Outro Run
function C011_LiteratureClass_Outro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	
	// Draw the background image
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
	
	// Shows the text
	DrawText(GetText("Outro1"), 400, 150, "White");
	if (TextPhase >= 1) DrawText(GetText("Outro2"), 400, 300, "White");
	if (TextPhase >= 2) DrawText(GetText("Outro3"), 400, 450, "White");

}

// Chapter 11 - Outro Click
function C011_LiteratureClass_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if (TextPhase >= 3) SaveMenu("C101_KinbakuClub", "Intro");

}
