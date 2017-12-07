// Chapter 10 - Revenge Load
function C010_Revenge_Intro_Load() {

	// If there's no crime, it means the player started on chapter 6, we pick a teacher at random
	if (Common_PlayerCrime == "") {
		if (Math.floor(Math.random() * 2) == 1) Common_PlayerCrime = "AmandaStranded";
		else Common_PlayerCrime = "SarahStranded";
	}

	// Time is always 14:15 on the intro, no timer
	StopTimer(14.25 * 60 * 60 * 1000);
	
}

// Chapter 10 - Revenge Run
function C010_Revenge_Intro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition(ctx);

	// Amanda or Sarah intro
	if ((Common_PlayerCrime == "AmandaStranded") || (Common_PlayerCrime == "SarahStranded")) {
		DrawText(ctx, GetText("AmandaSarah1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(ctx, GetText("AmandaSarah2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("AmandaSarah3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("AmandaSarah4"), 400, 450, "White");
	}
	
	// Sidney or Jennifer intro	
	if ((Common_PlayerCrime == "SidneyStranded") || (Common_PlayerCrime == "JenniferStranded")) {
		DrawText(ctx, GetText("SidneyJennifer1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(ctx, GetText("SidneyJennifer2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("SidneyJennifer3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("SidneyJennifer4"), 400, 450, "White");		
	}

}

// Chapter 10 - Revenge Click
function C010_Revenge_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 4) SetScene(CurrentChapter, "AmandaSarah");
}