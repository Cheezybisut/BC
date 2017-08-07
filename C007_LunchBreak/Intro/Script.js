// Chapter 7 - Lunch Break Load
function C007_LunchBreak_Intro_Load() {

	// Time is always 11:45 on the intro, no timer
	StopTimer(11.75 * 60 * 60 * 1000);

}

// Chapter 7 - Lunch Break Run
function C007_LunchBreak_Intro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

	// Write the chapter introduction
	DrawText(ctx, "Chapter 7 - Lunch Break (Click to continue)", 600, 150, "White");
	if (TextPhase >= 1) DrawText(ctx, "The morning classes are over.  It's time to go eat.", 600, 250, "White");
	if (TextPhase >= 2) DrawText(ctx, "It's a good time to socialize and meet new friends.", 600, 350, "White");
	if (TextPhase >= 3) DrawText(ctx, "You can try to invite someone to get lunch with you.", 600, 450, "White");

}

// Chapter 7 - Lunch Break Click
function C007_LunchBreak_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 4) SetScene(CurrentChapter, "ActorSelect");
}