// Chapter 4 - Intro Load
function C004_ArtClass_Intro_Load() {

	// Time is always 9:15 on the intro, no timer
	StopTimer(9.25 * 60 * 60 * 1000);
	
	// Do not allow bondage when we begin
	Common_BondageAllowed = false;
	Common_SelfBondageAllowed = false;

}

// Chapter 4 - Intro Run
function C004_ArtClass_Intro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition(ctx);

	// Write the chapter introduction
	DrawText(ctx, GetText("Intro1"), 450, 100, "White");
	if (TextPhase >= 1) DrawText(ctx, GetText("Intro2"), 450, 200, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText("Intro3"), 450, 300, "White");
	if (TextPhase >= 3) DrawText(ctx, GetText("Intro4"), 450, 400, "White");
	if (TextPhase >= 4) DrawText(ctx, GetText("Intro5"), 450, 500, "White");

}

// Chapter 4 - Intro Click
function C004_ArtClass_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 5)
		SetScene(CurrentChapter, "Julia");
}