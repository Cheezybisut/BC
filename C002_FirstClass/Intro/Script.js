// Chapter 2 - Intro Load
function C002_FirstClass_Intro_Load() {

	// Time is always 8:00 on the intro, no timer
	StopTimer(8 * 60 * 60 * 1000);

}

// Chapter 2 - Intro Run
function C002_FirstClass_Intro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

	// Write the chapter introduction
	DrawText(ctx, "Chapter 2 - First Class (Click to continue)", 600, 100, "White");
	if (TextPhase >= 1) DrawText(ctx, "Your first class today is math, from 8:00 to 9:00.", 600, 200, "White");
	if (TextPhase >= 2) DrawText(ctx, "The teacher enters, introducing herself has Mildred.", 600, 300, "White");
	if (TextPhase >= 3) DrawText(ctx, "She looks strict, holding some kind of crop in her hand.", 600, 400, "White");
	if (TextPhase >= 4) DrawText(ctx, "Everyone sits down, Mildred walks to you and address you.", 600, 500, "White");

}

// Chapter 2 - Intro Click
function C002_FirstClass_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 5)
		SetScene(CurrentChapter, "Mildred");
}