// Chapter 6 - Intro Load
function C006_Isolation_Intro_Load() {

	// Time is always 10:30 on the intro, no timer
	StopTimer(10.5 * 60 * 60 * 1000);
	
	// Do not allow bondage when we begin
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;
	
	// If there's no crime, it means the player started on chapter 6, we pick a teacher at random
	if (Common_PlayerCrime == "") {
		if (Math.floor(Math.random() * 2) == 1) Common_PlayerCrime = "RestrainMildred";
		else Common_PlayerCrime = "DrugYuki";
	}

}

// Chapter 6 - Intro Run
function C006_Isolation_Intro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

	// Write the chapter introduction
	DrawText(ctx, "Chapter 6 - Isolation (Click to continue)", 600, 150, "White");
	if ((TextPhase >= 1) && (Common_PlayerCrime == "RestrainMildred")) DrawText(ctx, "Mildred silently drags you by the arm to the basement.", 600, 250, "White");
	if ((TextPhase >= 1) && (Common_PlayerCrime == "DrugYuki")) DrawText(ctx, "Yuki silently drags you by the arm to the basement.", 600, 250, "White");
	if (TextPhase >= 2) DrawText(ctx, "The place is gloomy, cold and without any windows.", 600, 350, "White");
	if (TextPhase >= 3) DrawText(ctx, "She pushes you in a brick room and finally speaks to you.", 600, 450, "White");

}

// Chapter 6 - Intro Click
function C006_Isolation_Intro_Click() {
	TextPhase++;
	if ((TextPhase >= 4) && (Common_PlayerCrime == "RestrainMildred")) SetScene(CurrentChapter, "Mildred");
	if ((TextPhase >= 4) && (Common_PlayerCrime == "DrugYuki")) SetScene(CurrentChapter, "Yuki");
}