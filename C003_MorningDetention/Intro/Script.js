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

	// Write the chapter introduction
	DrawText(ctx, "Chapter 3 - Morning Detention (Click to continue)", 600, 50, "White");
	if (TextPhase >= 1) DrawText(ctx, "For causing trouble, you and Sidney are sent to detention.", 600, 150, "White");
	if (TextPhase >= 2) DrawText(ctx, "The detention room is a meeting room, where a teacher is waiting.", 600, 250, "White");
	if (TextPhase >= 3) DrawText(ctx, "You're invited to sit at the desk and wait until detention is over.", 600, 350, "White");
	if (TextPhase >= 4) DrawText(ctx, "Sidney enters the room wearing handcuffs and sits in front on you.", 600, 450, "White");
	if (TextPhase >= 5) DrawText(ctx, "It's 8:20 and detention ends at 9:00, what will you do to kill time?", 600, 550, "White");
		
}

// Chapter 3 - Intro Click
function C003_MorningDetention_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 6)
		SetScene(CurrentChapter, "DetentionRoom");
}