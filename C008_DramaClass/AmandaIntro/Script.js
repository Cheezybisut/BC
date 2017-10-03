var C008_DramaClass_AmandaIntro_CurrentStage = 0;

// Chapter 8 - Amanda Intro Load
function C008_DramaClass_AmandaIntro_Load() {

	// Load the scene parameters
	ActorLoad("Amanda", "DressingRoom");
	LoadInteractions();

}

// Chapter 8 - Amanda Intro Run
function C008_DramaClass_AmandaIntro_Run() {
	BuildInteraction(C008_DramaClass_AmandaIntro_CurrentStage);
}

// Chapter 8 - Amanda Intro Click
function C008_DramaClass_AmandaIntro_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_AmandaIntro_CurrentStage);
	var ClickInv = GetClickedInventory();

}