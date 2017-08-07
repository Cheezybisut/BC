// Struggle parameters
var StruggleType = "";
var StruggleDifficulty = ""; // Easy, Normal, Hard, Impossible
var StruggleMessage = "";
var StruggleDoneMessage = "";
var StruggleX = 0;
var StruggleY = 0;
var StruggleRadius = 0;
var StruggleProgress = 0; // 0 - Not started, 100 - Done
var StruggleNextTick = 0;
var StruggleDone = false;
var StruggleImageFrame = 0;
var StruggleImageFrameMax = 1;
var StruggleImageFrameTime = 0;

// The next tick to lower the struggle time comes faster with harder levels
function StruggleGetNextTick() {
	if ((StruggleDifficulty == "Easy") && (StruggleProgress <= 33)) StruggleNextTick = CurrentTime + 1000;
	if ((StruggleDifficulty == "Easy") && (StruggleProgress > 33) && (StruggleProgress <= 66)) StruggleNextTick = CurrentTime + 800;
	if ((StruggleDifficulty == "Easy") && (StruggleProgress > 66)) StruggleNextTick = CurrentTime + 600;
	if ((StruggleDifficulty == "Normal") && (StruggleProgress <= 33)) StruggleNextTick = CurrentTime + 800;
	if ((StruggleDifficulty == "Normal") && (StruggleProgress > 33) && (StruggleProgress <= 66)) StruggleNextTick = CurrentTime + 650;
	if ((StruggleDifficulty == "Normal") && (StruggleProgress > 66)) StruggleNextTick = CurrentTime + 500;
	if ((StruggleDifficulty == "Hard") && (StruggleProgress <= 33)) StruggleNextTick = CurrentTime + 650;
	if ((StruggleDifficulty == "Hard") && (StruggleProgress > 33) && (StruggleProgress <= 66)) StruggleNextTick = CurrentTime + 500;
	if ((StruggleDifficulty == "Hard") && (StruggleProgress > 66)) StruggleNextTick = CurrentTime + 350;
	if ((StruggleDifficulty == "Impossible") && (StruggleProgress <= 33)) StruggleNextTick = CurrentTime + 500;
	if ((StruggleDifficulty == "Impossible") && (StruggleProgress > 33) && (StruggleProgress <= 66)) StruggleNextTick = CurrentTime + 250;
	if ((StruggleDifficulty == "Impossible") && (StruggleProgress > 66)) StruggleNextTick = CurrentTime + 10;
}

// When the user clicks to struggle
function StruggleClick(SType, SDifficulty, SMessage, SDoneMessage, SX, SY, SRadius) {

	// If the user clicked on a struggling point
	if ((MouseX >= SX - SRadius) && (MouseX <= SX + SRadius) && (MouseY >= SY - SRadius) && (MouseY <= SY + SRadius)) {

		// If we must start a new struggling
		if (SType != StruggleType) {
			StruggleType = SType;
			StruggleDifficulty = SDifficulty;
			StruggleMessage = SMessage;
			StruggleDoneMessage = SDoneMessage;
			StruggleX = SX;
			StruggleY = SY;
			StruggleRadius = SRadius;
			StruggleProgress = 0;	
			StruggleDone = false;
			StruggleGetNextTick();
		}
		
		// Raise the progress, 100 is done
		if (StruggleProgress <= 0) StruggleProgress = 5;
		StruggleProgress++;
		if (StruggleProgress >= 100) {
			StruggleProgress = 100;
			StruggleDone = true;
			StruggleNextTick = CurrentTime + 6000;
		}
	
	}
	
}

// Return the correct background image related to the player's progress
function StruggleGetImage(StruggleStage) {

	// The frame of the image changes faster when progress is higher
	if (StruggleImageFrameTime < CurrentTime) {
		if (StruggleProgress <= 0) StruggleImageFrameTime = CurrentTime + 3000;
		if ((StruggleProgress > 0) && (StruggleProgress <= 33)) StruggleImageFrameTime = CurrentTime + 2000;
		if ((StruggleProgress > 33) && (StruggleProgress <= 66)) StruggleImageFrameTime = CurrentTime + 1300;
		if ((StruggleProgress > 66) && (StruggleProgress < 100)) StruggleImageFrameTime = CurrentTime + 800;
		StruggleImageFrame++;
		if (StruggleImageFrame > StruggleImageFrameMax) StruggleImageFrame = 0;
	}	
	if (StruggleProgress >= 100) StruggleImageFrame = StruggleImageFrameMax + 1;

	// Returns the correct image file
	if (StruggleProgress <= 0) return CurrentChapter + "/" + CurrentScreen + "/Idle_" + StruggleStage.toString() + "_" + StruggleImageFrame.toString() + ".jpg";
	else return CurrentChapter + "/" + CurrentScreen + "/" + StruggleType + "_" + StruggleStage.toString() + "_" + StruggleImageFrame.toString() + ".jpg";

}

// Draw the fight progress in the bottom of the fight scene
function StruggleDraw(NoStruggleMessage, StruggleStage) {
	
	// Draw the background image
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawImage(ctx, StruggleGetImage(StruggleStage), 0, 0);

	// Draw the struggle text on top
	if (StruggleProgress <= 0) DrawText(ctx, NoStruggleMessage, 600, 30, "white");
	if (StruggleProgress >= 100) DrawText(ctx, StruggleDoneMessage, 600, 30, "white");
	if ((StruggleProgress > 0) && (StruggleProgress < 100)) { DrawText(ctx, StruggleMessage, 600, 30, "white"); DrawCircle(ctx, StruggleX, StruggleY, StruggleRadius + 4, 4, "white"); }
	if ((StruggleProgress > 50) && (StruggleProgress < 100)) DrawText(ctx, StruggleDifficulty, StruggleX, StruggleY + StruggleRadius + 30, "white");

	// Draw the progress meter
	DrawRect(ctx, 399, 579, 402, 12, "white");
	DrawRect(ctx, 400, 580, StruggleProgress * 4, 10, "#66FF66");
	DrawRect(ctx, 400 + (StruggleProgress * 4), 580, (100 - StruggleProgress) * 4, 10, "red");

}

// When the struggle timer runs
function StruggleRun(NoStruggleMessage, StruggleStage) {

	// When the struggle timer ticks
	if (StruggleNextTick <= CurrentTime) {
		
		// If it's done, we call the done procedure from the calling module, if not we lower the struggle progress
		if (StruggleDone) {
			DynamicFunction(CurrentChapter + "_" + CurrentScreen + "_StruggleDone()");
			StruggleDone = false;
			StruggleProgress = "";
			StruggleType = "";
		} else {
			StruggleProgress--;
			if (StruggleProgress < 0) StruggleProgress = 0;
			StruggleGetNextTick();
		}
		
	}

	// Draw the struggle scene
	StruggleDraw(NoStruggleMessage, StruggleStage);
	
}