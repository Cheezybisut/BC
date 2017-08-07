// Chapter 1 - Intro Load
function C001_BeforeClass_Intro_Load() {

	// Time is always 7:40 on the intro, no timer
	StopTimer(7.66666667 * 60 * 60 * 1000);
	
}

// Chapter 1 - Intro Run
function C001_BeforeClass_Intro_Run() {
	
	// Draw the background and player
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	if (TextPhase <= 2) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background1.jpg", -150, 0);
	else DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background2.jpg", -150, 0);
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Player.jpg", 900, 0);
		
	// Introduce chapter 1 with each clicks
	DrawText(ctx, "Chapter 1 - Before Class (Click to continue)", 450, 50, "White");
	if (TextPhase >= 1) DrawText(ctx, "This is your first day in a new school.  It's both thrilling and kind of scary.", 450, 150, "White");
	if (TextPhase >= 2) DrawText(ctx, "This is no ordinary college.  It's an all-girl academy renowned for its strictness.", 450, 250, "White");
	if (TextPhase >= 3) DrawText(ctx, "You enter the austere building, it's outdated and cold, some windows have bars.", 450, 350, "White");
	if (TextPhase >= 4) DrawText(ctx, "Every student is wearing the same skirt and tie, uniforms are mandatory.", 450, 450, "White");
	if (TextPhase >= 5) DrawText(ctx, "It's 7:40 and class starts at 8:00, you take a seat behind a black haired girl.", 450, 550, "White");

}

// Chapter 1 - Intro Click
function C001_BeforeClass_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 6)
		SetScene(CurrentChapter, "Classroom");
}