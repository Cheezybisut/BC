var C008_DramaClass_Julia_CurrentStage = 0;
var C008_DramaClass_Julia_IsDamsel = false;
var C008_DramaClass_Julia_IsHeroine = false;
var C008_DramaClass_Julia_IsVillain = false;
var C008_DramaClass_Julia_ScriptRefused = false;
var C008_DramaClass_Julia_EndingKiss = false;
var C008_DramaClass_Julia_EndingHug = false;
var C008_DramaClass_Julia_EndingDomme = false;
var C008_DramaClass_Julia_EndingTwoPrisoners = false;

// Chapter 8 - Julia Load
function C008_DramaClass_Julia_Load() {

	// Set the timer limits at 14:00
	StartTimer(14 * 60 * 60 * 1000, "C008_DramaClass", "Outro");

	// Load the scene parameters
	C008_DramaClass_Julia_CurrentStage = C008_DramaClass_Theater_GlobalStage;
	ActorLoad("Julia", "Theater");
	LoadInteractions();
	
	// Cannot leave before Julia gave her instructions
	if (C008_DramaClass_Julia_CurrentStage < 100) LeaveIcon = "";
	
	// Set the role variables
	C008_DramaClass_Julia_IsDamsel = (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel");
	C008_DramaClass_Julia_IsHeroine = (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine");
	C008_DramaClass_Julia_IsVillain = (C008_DramaClass_JuliaIntro_PlayerRole == "Villain");
	
	// Keep the ending type
	C008_DramaClass_Julia_EndingKiss = (C008_DramaClass_Theater_Ending == "Kiss");
	C008_DramaClass_Julia_EndingHug = (C008_DramaClass_Theater_Ending == "Hug");
	C008_DramaClass_Julia_EndingDomme = (C008_DramaClass_Theater_Ending == "Domme");
	C008_DramaClass_Julia_EndingTwoPrisoners = (C008_DramaClass_Theater_Ending == "TwoPrisoners");

}

// Chapter 8 - Julia Run (beyond 300, she's on stage with the students)
function C008_DramaClass_Julia_Run() {
	BuildInteraction(C008_DramaClass_Julia_CurrentStage);
	if (C008_DramaClass_Julia_CurrentStage >= 300) DrawInteractionActor();
}

// Chapter 8 - Julia Click
function C008_DramaClass_Julia_Click() {	
	ClickInteraction(C008_DramaClass_Julia_CurrentStage);
}

// Chapter 8 - Julia Refuse Script
function C008_DramaClass_Julia_RefuseScript() {
	ActorChangeAttitude(-1, 0);
	C008_DramaClass_Julia_ScriptRefused = true;
}

// Chapter 8 - Julia Start Drama (Global stage becomes 100)
function C008_DramaClass_Julia_StartDrama() {
	C008_DramaClass_Theater_GlobalStage = 100;
	SetScene(CurrentChapter, "Theater");
}