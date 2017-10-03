// Chapter 8 - Outro Load
function C008_DramaClass_Outro_Load() {
	
	// Time is always 14:00:00 in the outro, unlock if needed
	StopTimer(14 * 60 * 60 * 1000);
	PlayerUnlockAllInventory();
	ActorSpecificClearInventory("Amanda", true);
	ActorSpecificClearInventory("Sarah", true);
	ActorSpecificClearInventory("Julia", true);
	PlayerClothes("Clothed");

}

// Chapter 8 - Outro Run
function C008_DramaClass_Outro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		
	// Draw the outro text
	DrawText(ctx, GetText("Outro1"), 400, 150, "White");
	if (TextPhase >= 1) DrawText(ctx, GetText("Outro2"), 400, 300, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText("Outro3"), 400, 450, "White");

}

// Chapter 8 - Outro Click
function C008_DramaClass_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	//if (TextPhase >= 3) SaveMenu("C009", "Intro");

}