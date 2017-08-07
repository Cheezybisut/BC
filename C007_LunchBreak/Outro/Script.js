// Chapter 7 - Lunch Break Load
function C007_LunchBreak_Outro_Load() {
	
	// Time is always 12:45:00 in the outro, unlock if needed
	StopTimer(12.75 * 60 * 60 * 1000, CurrentChapter, "Outro");
	PlayerUnlockAllInventory();
	PlayerClothes("Clothed");
	ActorSpecificClearInventory("Amanda", true);
	ActorSpecificClearInventory("Sarah", true);
	ActorSpecificClearInventory("Sidney", true);
	ActorSpecificClearInventory("Jennifer", true);

}

// Chapter 7 - Lunch Break  Run
function C007_LunchBreak_Outro_Run() {

	// Paints the background	
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");	
	if (C007_LunchBreak_ActorSelect_Actor == "") DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/EatAlone.jpg", 800, 0);
	else DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);

	// Text for eating alone
	if ((C007_LunchBreak_ActorSelect_Actor == "") && (TextPhase >= 0)) DrawText(ctx, "Unable or too shy to find a friend, you eat lunch alone.", 400, 150, "White");
	if ((C007_LunchBreak_ActorSelect_Actor == "") && (TextPhase >= 1)) DrawText(ctx, "You find a restaurant near the school and sit by yourself.", 400, 250, "White");
	if ((C007_LunchBreak_ActorSelect_Actor == "") && (TextPhase >= 2)) DrawText(ctx, "Once your meal is over, you head back for your next class.", 400, 350, "White");
	if ((C007_LunchBreak_ActorSelect_Actor == "") && (TextPhase >= 3)) DrawText(ctx, "The next class will be available in another version.", 400, 450, "White");

	// Text for eating with someone
	if ((C007_LunchBreak_ActorSelect_Actor != "") && (TextPhase >= 0)) DrawText(ctx, "The bell rings, you and " + C007_LunchBreak_ActorSelect_Actor + " go back to school.", 400, 150, "White");
	if ((C007_LunchBreak_ActorSelect_Actor != "") && (TextPhase >= 1) && C007_LunchBreak_ActorSelect_BonusDone) DrawText(ctx, "Right before splitting, she blows you a sweet kiss.", 400, 250, "White");
	if ((C007_LunchBreak_ActorSelect_Actor != "") && (TextPhase >= 1) && !C007_LunchBreak_ActorSelect_BonusDone) DrawText(ctx, "You wave each other goodbye and go to the lockers.", 400, 250, "White");
	if ((C007_LunchBreak_ActorSelect_Actor != "") && (TextPhase >= 2)) DrawText(ctx, "Hurry up!  Better not be late for your next class.", 400, 350, "White");
	if ((C007_LunchBreak_ActorSelect_Actor != "") && (TextPhase >= 3)) DrawText(ctx, "The next class will be available in another version.", 400, 450, "White");
	
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