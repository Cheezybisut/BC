var C003_MorningDetention_Outro_EscapedDetention = false;

// Chapter 3 - Outro Load
function C003_MorningDetention_Outro_Load() {
	
	// Time is always 9:15:00 in the outro
	C003_MorningDetention_Outro_EscapedDetention = (CurrentTime < 9 * 60 * 60 * 1000);
	StopTimer(9 * 60 * 60 * 1000);
	PlayerUnlockAllInventory();
	ActorSpecificClearInventory("Sidney", false);
	ActorSpecificClearInventory("Yuki", false);

}

// Chapter 3 - Outro Run
function C003_MorningDetention_Outro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 800, 0);
			
	// Write the chapter outro
	if (C003_MorningDetention_Outro_EscapedDetention == false) DrawText(ctx, "You've waited patiently in detention and served your time.", 400, 150, "White");
	if (C003_MorningDetention_Outro_EscapedDetention == true) DrawText(ctx, "Having skipped detention early, you explore the school a little.", 400, 150, "White");
	if (TextPhase >= 1) DrawText(ctx, "Your next class starts at 9:15, better not be late.", 400, 300, "White");
	if (TextPhase >= 2) DrawText(ctx, "You walk in the halls, look around and find the classroom.", 400, 450, "White");

}

// Chapter 3 - Outro Click
function C003_MorningDetention_Outro_Click() {
	TextPhase++;
	if (TextPhase >= 3)
		SaveMenu("C004_ArtClass", "Intro");
}