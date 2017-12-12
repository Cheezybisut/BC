// Chapter 10 - Outro Load
function C010_Revenge_Outro_Load() {
	
	// Time is always 15:15:00 in the outro, reset the poses if needed
	StopTimer(15.25 * 60 * 60 * 1000);
	if (C010_Revenge_AmandaSarah_ItemStolen) PlayerRestoreAllInventory();
	PlayerClothes("Clothed");
	Common_PlayerPose = "";
	ActorSpecificSetPose("Amanda", "");
	ActorSpecificSetPose("Sarah", "");

}

// Chapter 10 - Outro Run
function C010_Revenge_Outro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	if (TextPhase >= 2) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
	
	// Text for Amanda & Sarah
	if ((Common_PlayerCrime == "AmandaStranded") || (Common_PlayerCrime == "SarahStranded")) {
		if (TextPhase < 2) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/AmandaSarah.jpg", 800, 0);
		DrawText(ctx, GetText("AmandaSarah1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(ctx, GetText("AmandaSarah2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("AmandaSarah3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("AmandaSarah4"), 400, 450, "White");
	}

}

// Chapter 10 - Outro Click
function C010_Revenge_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if (TextPhase >= 3) {
		//Common_PlayerCrime = "";
		//SaveMenu("C011", "Intro");
	}

}