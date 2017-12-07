var C003_MorningDetention_Intro_Fighting = false;

// Chapter 3 - Intro Load
function C003_MorningDetention_Intro_Load() {
	
	// Time is always 8:20 on the intro + remove any remaining rope
	StopTimer(8.33333334 * 60 * 60 * 1000);
	PlayerRemoveAllInventory();
	
	// Set the crime variables
	if (Common_PlayerCrime == "Fighting") C003_MorningDetention_Intro_Fighting = true;
	Common_PlayerCrime = "";

}

// Chapter 3 - Intro Run
function C003_MorningDetention_Intro_Run() {

	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition(ctx);

	// Write the chapter introduction
	DrawText(ctx, GetText("Intro1"), 450, 50, "White");
	if (TextPhase >= 1) DrawText(ctx, GetText("Intro2"), 450, 150, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText("Intro3"), 450, 250, "White");
	if (TextPhase >= 3) DrawText(ctx, GetText("Intro4"), 450, 350, "White");
	if (TextPhase >= 4) DrawText(ctx, GetText("Intro5"), 450, 450, "White");
	if (TextPhase >= 5) DrawText(ctx, GetText("Intro6"), 450, 550, "White");
		
}

// Chapter 3 - Intro Click
function C003_MorningDetention_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 6)
		SetScene(CurrentChapter, "DetentionRoom");
}