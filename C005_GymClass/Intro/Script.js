// Chapter 5 - Intro Load
function C005_GymClass_Intro_Load() {

	// Time is always 10:30 on the intro, no timer
	StopTimer(10.5 * 60 * 60 * 1000);
	
	// Do not allow bondage when we begin
	Common_BondageAllowed = false;
	Common_SelfBondageAllowed = false;

}

// Chapter 5 - Intro Run
function C005_GymClass_Intro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

	// Write the chapter introduction
	DrawText(ctx, "Chapter 5 - Gym Class (Click to continue)", 600, 100, "White");
	if (TextPhase >= 1) DrawText(ctx, "Your third class is gym, from 10:30 to 11:30.", 600, 200, "White");
	if (TextPhase >= 2) DrawText(ctx, "You enter an old gymnasium covered with wrestling mats.", 600, 300, "White");
	if (TextPhase >= 3) DrawText(ctx, "They give you a judo outfit which doesn't fit very well.", 600, 400, "White");
	if (TextPhase >= 4) DrawText(ctx, "Everyone is already paired but Jennifer, you go see her.", 600, 500, "White");

}

// Chapter 5 - Intro Click
function C005_GymClass_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 5) {
		PlayerClothes("Judo");
		Common_SelfBondageAllowed = false;
		SetScene(CurrentChapter, "Jennifer");		
	}
}