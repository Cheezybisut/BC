var C004_ArtClass_Outro_Restrained = false;

// Chapter 4 - Outro Load
function C004_ArtClass_Outro_Load() {
	
	// Time is always 10:15:00 in the outro
	StopTimer(10.25 * 60 * 60 * 1000);
	C004_ArtClass_Outro_Restrained = Common_PlayerRestrained;
	ActorSpecificClearInventory("Jennifer", false);
	ActorSpecificClearInventory("Julia", false);
	ActorSpecificClearInventory("Sarah", false);

}

// Chapter 4 - Outro Run
function C004_ArtClass_Outro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
		
	// Write the chapter outro
	if (Common_PlayerCrime == "") {

		// No crime outro
		DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		DrawText(ctx, GetText("NoCrime1"), 400, 150, "White");
		if ((TextPhase >= 1) && C004_ArtClass_Outro_Restrained) DrawText(ctx, GetText("NoCrime2A"), 400, 300, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel == "Player")) DrawText(ctx, GetText("NoCrime2B"), 400, 300, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel != "Player")) DrawText(ctx, GetText("NoCrime2C"), 400, 300, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("NoCrime3"), 400, 450, "White");
		
	} else {

		// Crime outro
		if (TextPhase <= 1) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		if ((TextPhase >= 2) && (Common_PlayerCrime == "RestrainMildred")) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Mildred.jpg", 800, 0);
		if ((TextPhase >= 2) && (Common_PlayerCrime == "DrugYuki")) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Yuki.jpg", 800, 0);
		DrawText(ctx, GetText("Crime1"), 400, 100, "White");
		if ((TextPhase >= 1) && C004_ArtClass_Outro_Restrained) DrawText(ctx, GetText("Crime2A"), 400, 200, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel == "Player")) DrawText(ctx, GetText("Crime2B"), 400, 200, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel != "Player")) DrawText(ctx, GetText("Crime2C"), 400, 200, "White");
		if ((TextPhase >= 2) && (Common_PlayerCrime == "RestrainMildred")) DrawText(ctx, GetText("Crime3A"), 400, 300, "White");
		if ((TextPhase >= 2) && (Common_PlayerCrime == "DrugYuki")) DrawText(ctx, GetText("Crime3B"), 400, 300, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("Crime4"), 400, 400, "White");
		if (TextPhase >= 4) DrawText(ctx, GetText("Crime5"), 400, 500, "White");

	}

}

// Chapter 4 - Outro Click
function C004_ArtClass_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if ((TextPhase >= 3) && (Common_PlayerCrime == "")) SaveMenu("C005_GymClass", "Intro");
	if ((TextPhase >= 5) && (Common_PlayerCrime != "")) SaveMenu("C006_Isolation", "Intro");

	// Release the player on phase 2
	if (TextPhase == 2) {

		// if cuffed, unlock it
		if (PlayerHasLockedInventory("Rope")) {
			PlayerUnlockInventory("Rope");
			PlayerAddInventory("Rope", 1);
		}

		// if gagged, unlock it	
		if (PlayerHasLockedInventory("Ballgag")) {
			PlayerUnlockInventory("Ballgag");
			PlayerAddInventory("Ballgag", 1);
		}
		PlayerUnlockInventory("TapeGag");
		
	}

}