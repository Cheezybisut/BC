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
	DrawPlayerTransition(ctx);

	// Write the chapter introduction
	DrawText(ctx, GetText("Intro1"), 450, 150, "White");
	if ((TextPhase >= 1) && (Common_PlayerCrime == "RestrainMildred")) DrawText(ctx, GetText("Intro2Mildred"), 450, 250, "White");
	if ((TextPhase >= 1) && (Common_PlayerCrime == "DrugYuki")) DrawText(ctx, GetText("Intro2Yuki"), 450, 250, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText("Intro3"), 450, 350, "White");
	if (TextPhase >= 3) DrawText(ctx, GetText("Intro4"), 450, 450, "White");

}

// Chapter 6 - Intro Click
function C006_Isolation_Intro_Click() {
	TextPhase++;
	if ((TextPhase >= 4) && (Common_PlayerCrime == "RestrainMildred")) SetScene(CurrentChapter, "Mildred");
	if ((TextPhase >= 4) && (Common_PlayerCrime == "DrugYuki")) SetScene(CurrentChapter, "Yuki");
}