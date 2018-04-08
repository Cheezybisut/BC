// Chapter 8 - Drama Class Load
function C101_KinbakuClub_Intro_Load() {

	// Time is always 13:00 on the intro, no timer
	StopTimer(17.00 * 60 * 60 * 1000);
	
	// Removes the any chastity belts for now, maybe we will use them in a later version
	PlayerRemoveInventory("ChastityBelt", 99);
	PlayerRemoveInventory("Armbinder", 99);
	PlayerUnlockInventory("ChastityBelt");
	
}

// Chapter 8 - Drama Class Run
function C101_KinbakuClub_Intro_Run() {
	
	// Paints the background
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

	// Write the chapter introduction
	DrawText(GetText("Intro1"), 600, 150, "White");
	if (Common_ClubStatus == "ClubLunchVisited") {
		if (TextPhase >= 1) DrawText(GetText("Intro2"), 600, 250, "White");
		if (TextPhase >= 2) DrawText(GetText("Intro3"), 600, 350, "White");
		if (TextPhase >= 3) DrawText(GetText("Intro4"), 600, 450, "White");
	} else {
		if (TextPhase >= 1) DrawText(GetText("Intro2New"), 600, 250, "White");
		if (TextPhase >= 2) DrawText(GetText("Intro3New"), 600, 350, "White");
		if (TextPhase >= 3) DrawText(GetText("Intro4New"), 600, 450, "White");
	}
}

// Chapter 8 - Drama Class Click
function C101_KinbakuClub_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 4) SetScene(CurrentChapter, "JennaIntro");
}