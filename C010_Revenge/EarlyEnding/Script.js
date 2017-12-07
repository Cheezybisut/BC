var C010_Revenge_EarlyEnding_Type = "";

// Chapter 10 - Early Ending Load
function C010_Revenge_EarlyEnding_Load() {

	// Stop the timer for the transition
	StopTimer(CurrentTime);
	PlayerReleaseBondage();
	ActorSpecificClearInventory("Amanda", true);
	ActorSpecificClearInventory("Sarah", true);
	ActorSpecificSetPose("Amanda", "");
	ActorSpecificSetPose("Sarah", "");
	LeaveIcon = "";

}

// Chapter 10 - Early Ending Run
function C010_Revenge_EarlyEnding_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition(ctx);

	// Draw the outro text
	DrawText(ctx, GetText(C010_Revenge_EarlyEnding_Type + "1"), 450, 150, "White");
	if (TextPhase >= 1) DrawText(ctx, GetText(C010_Revenge_EarlyEnding_Type + "2"), 450, 250, "White");
	if (TextPhase >= 2) DrawText(ctx, GetText(C010_Revenge_EarlyEnding_Type + "3"), 450, 350, "White");
	if (TextPhase >= 3) DrawText(ctx, GetText(C010_Revenge_EarlyEnding_Type + "4"), 450, 450, "White");

}

// Chapter 10 - Early Ending Click
function C010_Revenge_EarlyEnding_Click() {

	// Jump to the next animation
	TextPhase++;
	//if (TextPhase >= 4) SetScene("C009_Library", "Intro");

}