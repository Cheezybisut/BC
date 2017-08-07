var C001_BeforeClass_Outro_Mode = 0;

// Chapter 1 - Outro Load
function C001_BeforeClass_Outro_Load() {
	
	// Change the mode depending if there were girls left tied up
	if (!ActorSpecificHasInventory("Amanda", "Rope") && !ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 0;
	if (ActorSpecificHasInventory("Amanda", "Rope") && !ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 1;
	if (!ActorSpecificHasInventory("Amanda", "Rope") && ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 2;
	if (ActorSpecificHasInventory("Amanda", "Rope") && ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 3;
	
	// Save the player crime
	if (C001_BeforeClass_Outro_Mode >= 1) Common_PlayerCrime = "Bondage";
	
	// Time is always 8:00:00, no timer
	StopTimer(8 * 60 * 60 * 1000);
	ActorSpecificClearInventory("Sidney", false);
	ActorSpecificClearInventory("Amanda", false);

}

// Chapter 1 - Outro Run
function C001_BeforeClass_Outro_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 800, 0);
	
	// The text changes based on the trouble that was done
	if ((C001_BeforeClass_Outro_Mode == 0) && (TextPhase >= 0)) DrawText(ctx, "The bell rings and the remaining students come in.", 400, 100, "White");
	if ((C001_BeforeClass_Outro_Mode == 0) && (TextPhase >= 1)) DrawText(ctx, "Everyone takes their seat, some wave at you, some ignore you.", 400, 250, "White");
	if ((C001_BeforeClass_Outro_Mode == 0) && (TextPhase >= 2)) DrawText(ctx, "The teacher comes in and the first morning class begins.", 400, 400, "White");	
	if ((C001_BeforeClass_Outro_Mode >= 1) && (TextPhase >= 0)) DrawText(ctx, "The bell rings and the remaining students come in.", 400, 100, "White");
	if ((C001_BeforeClass_Outro_Mode == 1) && (TextPhase >= 1)) DrawText(ctx, "Everyone is surprised to see Amanda tied up in her underwear.", 400, 200, "White");
	if ((C001_BeforeClass_Outro_Mode == 2) && (TextPhase >= 1)) DrawText(ctx, "Everyone is surprised to see Sidney tied up in her underwear.", 400, 200, "White");
	if ((C001_BeforeClass_Outro_Mode == 3) && (TextPhase >= 1)) DrawText(ctx, "Everyone is surprised to see both girls tied up in their underwear.", 400, 200, "White");
	if ((C001_BeforeClass_Outro_Mode >= 1) && (TextPhase >= 2)) DrawText(ctx, "Some of the students turn away, some laugh and some take pictures.", 400, 300, "White");
	if ((C001_BeforeClass_Outro_Mode >= 1) && (TextPhase >= 3)) DrawText(ctx, "The teacher finally comes in and manages to control the situation.", 400, 400, "White");
	if ((C001_BeforeClass_Outro_Mode >= 1) && (TextPhase >= 4)) DrawText(ctx, "Since you caused trouble with Sidney's ropes, you both go to detention.", 400, 500, "White");
		
}

// Chapter 1 - Outro Click
function C001_BeforeClass_Outro_Click() {
	TextPhase++;
	if ((TextPhase >= 5) && (C001_BeforeClass_Outro_Mode >= 1)) SaveMenu("C003_MorningDetention", "Intro");
	if ((TextPhase >= 3) && (C001_BeforeClass_Outro_Mode < 1)) SaveMenu("C002_FirstClass", "Intro");			
}