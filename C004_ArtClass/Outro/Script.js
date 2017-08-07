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
		DrawText(ctx, "The bell rings again, the art class is over.", 400, 150, "White");
		if ((TextPhase >= 1) && C004_ArtClass_Outro_Restrained) DrawText(ctx, "You're finally released and dress back up.", 400, 300, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel == "Player")) DrawText(ctx, "You stop posing and sit down to relax quickly.", 400, 300, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel != "Player")) DrawText(ctx, "You finish your painting and give it to Julia.", 400, 300, "White");
		if (TextPhase >= 2) DrawText(ctx, "Your next class starts at 10:30, better not be late.", 400, 450, "White");
		
	} else {

		// Crime outro
		if (TextPhase <= 1) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		if ((TextPhase >= 2) && (Common_PlayerCrime == "RestrainMildred")) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Mildred.jpg", 800, 0);
		if ((TextPhase >= 2) && (Common_PlayerCrime == "DrugYuki")) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Yuki.jpg", 800, 0);
		DrawText(ctx, "The bell rings again, the art class is over.", 400, 100, "White");
		if ((TextPhase >= 1) && C004_ArtClass_Outro_Restrained) DrawText(ctx, "You're finally released and dress back up.", 400, 200, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel == "Player")) DrawText(ctx, "You stop posing and sit down to relax quickly.", 400, 200, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel != "Player")) DrawText(ctx, "You finish your painting and give it to Julia.", 400, 200, "White");
		if ((TextPhase >= 2) && (Common_PlayerCrime == "RestrainMildred")) DrawText(ctx, "When you exit the class, Mildred is waiting for you.", 400, 300, "White");
		if ((TextPhase >= 2) && (Common_PlayerCrime == "DrugYuki")) DrawText(ctx, "When you exit the class, Yuki is waiting for you.", 400, 300, "White");
		if (TextPhase >= 3) DrawText(ctx, "Furious, she stays silent but grips your arm firmly.", 400, 400, "White");
		if (TextPhase >= 4) DrawText(ctx, "She drags you down to the basement, where no one goes.", 400, 500, "White");

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