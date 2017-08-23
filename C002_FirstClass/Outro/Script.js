var C002_FirstClass_Outro_Restrained = false;

// Chapter 2 - Outro Load
function C002_FirstClass_Outro_Load() {
	
	// Time is always 9:15:00 in the outro
	StopTimer(9 * 60 * 60 * 1000);
	C002_FirstClass_Outro_Restrained = Common_PlayerRestrained;
	ActorSpecificClearInventory("Sidney", false);
	ActorSpecificClearInventory("Amanda", false);
	ActorSpecificClearInventory("Sarah", false);
	ActorSpecificClearInventory("Mildred", false);

}

// Chapter 2 - Outro Run
function C002_FirstClass_Outro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 800, 0);
		
	// Write the chapter outro
	DrawText(ctx, GetText("Intro1"), 400, 150, "White");
	if ((TextPhase >= 1) && (C002_FirstClass_Classroom_MildredSubdueSuccess == false) && (C002_FirstClass_Classroom_MildredSubdueFailed == false)) DrawText(ctx, GetText("Intro2A"), 400, 250, "White");
	if ((TextPhase >= 1) && (C002_FirstClass_Classroom_MildredSubdueSuccess == true) && (C002_FirstClass_Classroom_MildredSubdueFailed == false) && (!C002_FirstClass_Outro_Restrained)) DrawText(ctx, GetText("Intro2B"), 400, 250, "White");
	if ((TextPhase >= 1) && (C002_FirstClass_Classroom_MildredSubdueSuccess == true) && (C002_FirstClass_Classroom_MildredSubdueFailed == false) && (C002_FirstClass_Outro_Restrained)) DrawText(ctx, GetText("Intro2C"), 400, 250, "White");
	if ((TextPhase >= 1) && (C002_FirstClass_Classroom_MildredSubdueFailed == true)) DrawText(ctx, GetText("Intro2D"), 400, 250, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText("Intro3"), 400, 350, "White");
	if (TextPhase >= 3) DrawText(ctx, GetText("Intro4"), 400, 450, "White");

}

// Chapter 2 - Outro Click
function C002_FirstClass_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if (TextPhase >= 4)
		SaveMenu("C004_ArtClass", "Intro");
	
	// Release the player on phase 2
	if (TextPhase == 2) {

		// Remove all inventory if subdue has failed
		if (C002_FirstClass_Classroom_MildredSubdueFailed == true) {
			PlayerUnlockAllInventory();
			PlayerRemoveAllInventory();
		}

		// if cuffed, unlock it
		if (Common_PlayerRestrained) {
			PlayerUnlockInventory("Cuffs");
			PlayerAddInventory("Cuffs", 1);
		}

		// if gagged, unlock it	
		if (Common_PlayerGagged) {
			PlayerUnlockInventory("Ballgag");
			PlayerAddInventory("Ballgag", 1);
		}

	}

}