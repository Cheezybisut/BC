// Chapter 101 - Kinbaku Club Load
function C101_KinbakuClub_Discipline_Load() {
	
	// Time is always 17:25:00 in the outro, unlock if needed
	StopTimer(17.25 * 60 * 60 * 1000, CurrentChapter, "Discipline");
}

// Chapter 7 - Kinbaku Club Run
function C101_KinbakuClub_Discipline_Run() {

	// Paints the background	
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");	
	if (TextPhase >= 0) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
	if (TextPhase >= 1) DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/BagBlack.jpg", 800, 0);

	// Dialog depending on the outro situation
	if (TextPhase >= 0) DrawText(ctx, GetText("Discipline1"), 400, 150, "White");
    if (TextPhase >= 1) DrawText(ctx, GetText("Discipline2"), 400, 300, "White");
    if (TextPhase >= 2) DrawText(ctx, GetText("Discipline3"), 400, 450, "White");
}

// Chapter 101 - Kinbaku Club  Click
function C101_KinbakuClub_Discipline_Click() {

	// Jump to the next animation
	TextPhase++;
			
	// Jump to lunch on phase 3
	if (TextPhase >= 3) {
		SaveMenu("C102_KinbakuDiscipline", "Intro");
	}

}
