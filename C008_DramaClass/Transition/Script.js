// Chapter 8 - Transition Load
function C008_DramaClass_Transition_Load() {
	
	// Time is 13:30:00 at max in the transition, unlock if needed
	if (CurrentTime >= 13.5 * 60 * 60 * 1000) CurrentTime = 13.5 * 60 * 60 * 1000;
	StopTimer(CurrentTime);
	PlayerReleaseBondage();
	ActorSpecificClearInventory("Amanda", true);
	ActorSpecificClearInventory("Sarah", true);

	// Sets the clothes depending on the role
	PlayerClothes(C008_DramaClass_JuliaIntro_PlayerRole);
	ActorLoad("Amanda", "");
	ActorSpecificSetCloth("Amanda", C008_DramaClass_JuliaIntro_AmandaRole);
	ActorLoad("Sarah", "");
	ActorSpecificSetCloth("Sarah", C008_DramaClass_JuliaIntro_SarahRole);
	LeaveIcon = "";

}

// Chapter 8 - Transition Run
function C008_DramaClass_Transition_Run() {
	
	// Paints the background
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");
	DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Julia.jpg", 800, 0);
	
	// Sets if the transition is late or not
	var LateForDrama = "Transition";
	if (CurrentTime == 13.5 * 60 * 60 * 1000) LateForDrama = "Late";
		
	// Draw the outro text
	DrawText(ctx, GetText(LateForDrama + "1"), 400, 150, "White");
	if (TextPhase >= 1) DrawText(ctx, GetText(LateForDrama + "2"), 400, 300, "White");
	if ((TextPhase >= 2) && (Common_PlayerCrime != "AmandaStranded") && (Common_PlayerCrime != "SarahStranded")) DrawText(ctx, GetText(LateForDrama + "3"), 400, 450, "White");
	if ((TextPhase >= 2) && (Common_PlayerCrime == "AmandaStranded")) DrawText(ctx, GetText("Amanda"), 400, 450, "White");
	if ((TextPhase >= 2) && (Common_PlayerCrime == "SarahStranded")) DrawText(ctx, GetText("Sarah"), 400, 450, "White");

}

// Chapter 8 - Transition Click
function C008_DramaClass_Transition_Click() {

	// Jump to the next animation
	TextPhase++;
	if (TextPhase >= 3) SetScene(CurrentChapter, "Julia");

}