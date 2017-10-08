// Chapter 7 - Lunch Break Load
function C007_LunchBreak_Outro_Load() {
	
	// Time is always 12:45:00 in the outro, unlock if needed
	StopTimer(12.75 * 60 * 60 * 1000, CurrentChapter, "Outro");
	PlayerUnlockAllInventory();
	PlayerClothes("Clothed");
	ActorSpecificClearInventory("Amanda", !C007_LunchBreak_ActorSelect_EvilEnding);
	ActorSpecificClearInventory("Sarah", !C007_LunchBreak_ActorSelect_EvilEnding);
	ActorSpecificClearInventory("Sidney", !C007_LunchBreak_ActorSelect_EvilEnding);
	ActorSpecificClearInventory("Jennifer", !C007_LunchBreak_ActorSelect_EvilEnding);

}

// Chapter 7 - Lunch Break  Run
function C007_LunchBreak_Outro_Run() {

	// Paints the background	
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");	
	if (C007_LunchBreak_ActorSelect_Actor == "") DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/EatAlone.jpg", 800, 0);
	else DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);

	// Text for eating alone
	if (C007_LunchBreak_ActorSelect_Actor == "") {
		if (TextPhase >= 0) DrawText(ctx, GetText("EatAlone1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(ctx, GetText("EatAlone2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("EatAlone3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("EatAlone4"), 400, 450, "White");
	}

	// Text for no food leave
	if ((C007_LunchBreak_ActorSelect_Actor != "") && C007_LunchBreak_ActorSelect_NoFood) {
		if (TextPhase >= 0) DrawText(ctx, GetText("NoFood1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(ctx, GetText("NoFood2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("NoFood3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("NoFood4"), 400, 450, "White");
	}

	// Text for early/evil leave
	if ((C007_LunchBreak_ActorSelect_Actor != "") && (C007_LunchBreak_ActorSelect_EarlyLeave || C007_LunchBreak_ActorSelect_EvilEnding) && !C007_LunchBreak_ActorSelect_NoFood) {
		if ((TextPhase >= 0) && !C007_LunchBreak_ActorSelect_EvilEnding) DrawText(ctx, GetText("Early1"), 400, 150, "White");
		if ((TextPhase >= 0) && C007_LunchBreak_ActorSelect_EvilEnding) DrawText(ctx, GetText("Evil1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(ctx, GetText("EvilEarly2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("EvilEarly3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("EvilEarly4"), 400, 450, "White");
	}

	// Text for eating with someone
    if ((C007_LunchBreak_ActorSelect_Actor != "") && !C007_LunchBreak_ActorSelect_EarlyLeave && !C007_LunchBreak_ActorSelect_EvilEnding && !C007_LunchBreak_ActorSelect_NoFood && !C007_LunchBreak_ActorSelect_Kinbaku) {
		if (TextPhase >= 0) DrawText(ctx, GetText("RegularBonus1"), 400, 150, "White");
		if ((TextPhase >= 1) && C007_LunchBreak_ActorSelect_BonusDone) DrawText(ctx, GetText("Bonus2"), 400, 250, "White");
		if ((TextPhase >= 1) && !C007_LunchBreak_ActorSelect_BonusDone) DrawText(ctx, GetText("Regular2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("RegularBonus3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(ctx, GetText("RegularBonus4"), 400, 450, "White");
	}

    // Text for eating with the kinbaku club
    if ((C007_LunchBreak_ActorSelect_Actor != "") && C007_LunchBreak_ActorSelect_Kinbaku) {
        if (TextPhase >= 0) DrawText(ctx, GetText("Kinbaku1"), 400, 150, "White");
        if (TextPhase >= 1) DrawText(ctx, GetText("Kinbaku2"), 400, 250, "White");
        if (TextPhase >= 2) DrawText(ctx, GetText("Kinbaku3"), 400, 350, "White");
        if (TextPhase >= 3) DrawText(ctx, GetText("Kinbaku4"), 400, 450, "White");
    }
}

// Chapter 7 - Lunch Break  Click
function C007_LunchBreak_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
			
	// Jump to lunch on phase 3
	if (TextPhase >= 4) {
		//SaveMenu("C008", "Intro");
	}

}