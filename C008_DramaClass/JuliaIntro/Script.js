var C008_DramaClass_JuliaIntro_CurrentStage = 0;

// Chapter 8 - Julia Intro Load
function C008_DramaClass_JuliaIntro_Load() {

	// Set the timer limits at 14:00
	StartTimer(14 * 60 * 60 * 1000, "C008_DramaClass", "Outro");

	// Load the scene parameters
	ActorLoad("Julia", "");
	LoadInteractions();
	LeaveIcon = "";
	
	// If Julia doesn't like the player, we skip the "hug" intro
	if (ActorGetValue(ActorLove) < 1) C008_DramaClass_JuliaIntro_CurrentStage = 20;

}

// Chapter 8 - Julia Intro Run
function C008_DramaClass_JuliaIntro_Run() {
	BuildInteraction(C008_DramaClass_JuliaIntro_CurrentStage);
}

// Chapter 8 - Julia Click
function C008_DramaClass_JuliaIntro_Click() {	

	// Regular interactions
	ClickInteraction(C008_DramaClass_JuliaIntro_CurrentStage);

}