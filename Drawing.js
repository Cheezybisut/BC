// Draw an image from a file to the canvas
function DrawImage(ctx, Source, X, Y) {

	// The image is created dynamically every time
	var img = new Image;
	img.src = Source;
	ctx.drawImage(img, X, Y);
	
}

// Draw a text in the canvas
function DrawText(ctx, Text, X, Y, Color) {

	// Font is fixed for now, color can be set
	ctx.font = "24px Arial";
	ctx.fillStyle = Color;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	// Split the text if there's a |
	if (Text.indexOf("|") == -1)
		ctx.fillText(Text, X, Y);
	else {
		ctx.fillText(Text.substring(0, Text.indexOf("|")), X, Y - 19);
		ctx.fillText(Text.substring(Text.indexOf("|") + 1, 1000), X, Y + 19);
	}					

}

// Draw a button
function DrawButton(ctx, Left, Top, Width, Height, Label) {

	// Draw the button rectangle
	ctx.beginPath();
	ctx.rect(Left, Top, Width, Height);
    ctx.fillStyle = 'white'; 
    ctx.fillRect(Left, Top, Width, Height);
	ctx.fill();	
	ctx.lineWidth = '2';
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.closePath();
	
	// Draw the text
	DrawText(ctx, Label, Left + Width / 2, Top + Height / 2, "black");
	
}

// Draw a basic rectangle
function DrawRect(ctx, Left, Top, Width, Height, Color) {
	ctx.beginPath();
	ctx.rect(Left, Top, Width, Height);
    ctx.fillStyle = Color; 
    ctx.fillRect(Left, Top, Width, Height);
	ctx.fill();	
	ctx.closePath();		
}

// Draw a basic circle
function DrawCircle(ctx, CenterX, CenterY, Radius, LineWidth, LineColor) {
	ctx.beginPath();
	ctx.arc(CenterX, CenterY, Radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = LineWidth;
	ctx.strokeStyle = LineColor;
	ctx.stroke();	
}

// Draw --- if zero, +value in green if positive, -value in red if negative
function DrawPosNegValue(ctx, Value, X, Y) {	
	if (Value == 0) DrawText(ctx, "---", X, Y, "black");
	if (Value > 0) DrawText(ctx, "+" + Value.toString(), X, Y, "#00BB00");
	if (Value < 0) DrawText(ctx, Value.toString(), X, Y, "#BB0000");	
}

// Draw the current actor stats toward the player
function DrawActorStats(ctx, Left, Top) {
	
	// Draw the actor name and icon
	DrawText(ctx, CurrentActor, Left - 200, Top + 17, "black");
	DrawImage(ctx, "Icons/Heart.png", Left - 110, Top);
	DrawImage(ctx, "Icons/Submission.png", Left - 10, Top);
	DrawImage(ctx, "Icons/Orgasm.png", Left + 90, Top);
	DrawImage(ctx, "Icons/Bondage.png", Left + 190, Top);
	DrawPosNegValue(ctx, ActorGetValue(ActorLove), Left - 50, Top + 17);
	DrawPosNegValue(ctx, ActorGetValue(ActorSubmission), Left + 50, Top + 17);
	DrawText(ctx, ActorGetValue(ActorOrgasmCount).toString(), Left + 150, Top + 17, "black");
	DrawText(ctx, ActorGetValue(ActorBondageCount).toString(), Left + 250, Top + 17, "black");

}

// Draw the intro box
function DrawIntro(ctx, Intro, CurrentStagePosition, LoveLevel, SubLevel) {

	// Draw the top box and stats
	DrawRect(ctx, 0, 0, 599, 150, "White");	
	if (CurrentActor != "") {
		DrawRect(ctx, 30, 60, 539, 1, "Black");
		DrawActorStats(ctx, 300, 15);
	}
	
	// Find the correct intro text
	var ShowText = "";
	if (OveridenIntroText != "")
		ShowText = OveridenIntroText
	else
		for (var I = 0; I < Intro.length; I++)
			if (Intro[I][IntroStage] == CurrentStagePosition)
				if (ActorInteractionAvailable(Intro[I][IntroLoveReq], Intro[I][IntroSubReq], Intro[I][IntroVarReq], Intro[I][IntroText], true))
					ShowText = Intro[I][IntroText];

	// Draw the intro
	if (CurrentActor != "") DrawText(ctx, ShowText, 300, 105, "black");
	else DrawText(ctx, ShowText, 300, 75, "black");
				
}

// Draw a selectable option on the screen
function DrawOption(ctx, OptionText, Left, Top) {

	// Draw the rectangle and text
	if (OptionText.substr(0, 1) == "@") OptionText = OptionText.substr(1);
	DrawRect(ctx, Left, Top, 299, 89, "White");	
	if ((MouseX >= Left) && (MouseX <= Left + 299) && (MouseY >= Top) && (MouseY <= Top + 89) && !IsMobile) DrawText(ctx, OptionText, Left + 150, Top + 45, "#00BB00");
	else DrawText(ctx, OptionText, Left + 150, Top + 45, "#BB0000");	
	
}

// Draw all the possible interactions 
function DrawInteraction(ctx, Stage, CurrentStagePosition, LoveLevel, SubLevel) {

	// Find all the correct interactions for the current stage
	var Pos = 0;
	for (var S = 0; S < Stage.length; S++)
		if (Stage[S][StageNumber] == CurrentStagePosition) 
			if (ActorInteractionAvailable(Stage[S][StageLoveReq], Stage[S][StageSubReq], Stage[S][StageVarReq], Stage[S][StageInteractionText], false)) {
				
				// Draw the box and interaction
				DrawOption(ctx, Stage[S][StageInteractionText], (Pos % 2) * 300, 151 + (Math.round((Pos - 1) / 2) * 90));
				Pos = Pos + 1;			
				
			}
		
}

// Find the current image file 
function FindImage(Intro, CurrentStagePosition) {
	
	// The image file is a column in the intro CSV file
	var ImageName = "";
	if (OveridenIntroImage != "")
		ImageName = OveridenIntroImage;
	else
		for (var I = 0; I < Intro.length; I++)
			if (Intro[I][IntroStage] == CurrentStagePosition)
				if (ActorInteractionAvailable(Intro[I][IntroLoveReq], Intro[I][IntroSubReq], Intro[I][IntroVarReq], Intro[I][IntroText], true))
					ImageName = Intro[I][IntroImage];
	return ImageName;

}

// Build the full character / object interaction screen
function BuildInteraction(CurrentStagePosition) {

	// Make sure the CSV files for interactions are loaded
	if ((CurrentIntro != null) && (CurrentStage != null)) {

		// Paints the background depending on the current stage
		var ctx = document.getElementById("MainCanvas").getContext("2d");
		DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/" + FindImage(CurrentIntro, CurrentStagePosition), 600, 0);
		DrawRect(ctx, 0, 0, 600, 600, "Black");

		// Build all the options for interaction
		DrawIntro(ctx, CurrentIntro, CurrentStagePosition, 0, 0);
		DrawInteraction(ctx, CurrentStage, CurrentStagePosition, 0, 0);

	}

}

// Get the player image file name
function GetPlayerIconImage() {

	// The file name changes if the player is gagged or blinks at specified intervals
	var Image = "Player";
	var seconds = new Date().getTime();
	if (PlayerHasLockedInventory("Ballgag") == true) Image = Image + "_Ballgag";
	if (PlayerHasLockedInventory("TapeGag") == true) Image = Image + "_TapeGag";
	if (Math.round(seconds / 500) % 15 == 0) Image = Image + "_Blink";
	return Image;

}

// Draw all the inventory icons
function DrawInventory(ctx) {

	// Draw the player icon
	if (((MouseX >= 1) && (MouseX <= 74) && (MouseY >= 601) && (MouseY <= 674)) || (IsMobile))
		DrawImage(ctx, "Icons/" + GetPlayerIconImage() + "_Active.png", 0, 601);
	else
		DrawImage(ctx, "Icons/" + GetPlayerIconImage() + "_Inactive.png", 0, 601);
	
	// Scroll in the full inventory to draw the icons
	var Pos = 1;
	for (var I = 0; I < PlayerInventory.length; I++) {
		if (((MouseX >= 1 + Pos * 75) && (MouseX <= 74 + Pos * 75) && (MouseY >= 601) && (MouseY <= 674)) || (IsMobile))
			DrawImage(ctx, "Icons/" + PlayerInventory[I][PlayerInventoryName] + "_Active.png", 1 + Pos * 75, 601);
		else
			DrawImage(ctx, "Icons/" + PlayerInventory[I][PlayerInventoryName] + "_Inactive.png", 1 + Pos * 75, 601);
		DrawText(ctx, PlayerInventory[I][PlayerInventoryQuantity].toString(), Pos * 75 + 64, 661, "#000000");
		Pos = Pos + 1;
	};

	// Scroll in the locked inventory also
	for (var I = 0; I < PlayerLockedInventory.length; I++) {
		if (((MouseX >= 1 + Pos * 75) && (MouseX <= 74 + Pos * 75) && (MouseY >= 601) && (MouseY <= 674)) || (IsMobile))
			DrawImage(ctx, "Icons/" + PlayerLockedInventory[I] + "_Active.png", 1 + Pos * 75, 601);
		else
			DrawImage(ctx, "Icons/" + PlayerLockedInventory[I] + "_Inactive.png", 1 + Pos * 75, 601);
		DrawImage(ctx, "Icons/Lock.png", 56 + Pos * 75, 653)
		Pos = Pos + 1;
	};
	
}

// Build the bottom bar menu
function BuildBottomBar() {

	// Paints the background depending on the current stage
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 600, 1200, 1, "black");
	DrawRect(ctx, 0, 601, 1200, 74, "white");
	DrawRect(ctx, 975, 600, 1, 675, "black");
	DrawInventory(ctx);

	// Draw the leave icon and clock
	if (LeaveIcon != "") {
		DrawImage(ctx, "Icons/Clock.png", 985, 621);
		DrawText(ctx, msToTime(CurrentTime), 1073, 637, "black");
		if (((MouseX >= 1125) && (MouseX <= 1200) && (MouseY >= 600) && (MouseY <= 675)) || (IsMobile)) DrawImage(ctx, "Icons/" + LeaveIcon + "_Active.png", 1125, 600);
		else DrawImage(ctx, "Icons/" + LeaveIcon + "_Inactive.png", 1125, 600);
	} else {
		DrawImage(ctx, "Icons/Clock.png", 1010, 621);
		DrawText(ctx, msToTime(CurrentTime), 1110, 637, "black");
	}

}

// Draw the player image (can zoom if an X and Y are provided)
function DrawPlayerImage(X, Y) {

	// The file name changes if the player is gagged or blinks at specified intervals
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	var ImageName = "Clothed";
	if (Common_PlayerCostume != "") ImageName = ImageName + "_" + Common_PlayerCostume
	if (Common_PlayerUnderwear == true) ImageName = "Underwear";
	if (Common_PlayerNaked == true) ImageName = "Naked";
	if (PlayerHasLockedInventory("Cuffs") == true) ImageName = ImageName + "_Cuffs";
	if (PlayerHasLockedInventory("Rope") == true) ImageName = ImageName + "_Rope";
	if ((PlayerHasLockedInventory("Collar") == true) && !Common_PlayerClothed) ImageName = ImageName + "_Collar";
	if (PlayerHasLockedInventory("Ballgag") == true) ImageName = ImageName + "_Ballgag";
	if (PlayerHasLockedInventory("TapeGag") == true) ImageName = ImageName + "_TapeGag";
	
	// The image is created dynamically every time and can be zoomed
	if ((X == 0) && (Y == 0)) DrawImage(ctx, "C999_Common/Player/" + ImageName + ".jpg", 600, 0);
	else {
		var img = new Image;
		img.src = "C999_Common/Player/" + ImageName + ".jpg";
		ctx.drawImage(img, X, Y, 600, 600, 600, 0, 1200, 1200);		
	}	
	
}