var C008_DramaClass_SarahIntro_CurrentStage = 0;

// Chapter 8 - Sarah Intro Load
function C008_DramaClass_SarahIntro_Load() {

	// Load the scene parameters
	ActorLoad("Sarah", "DressingRoom");
	LoadInteractions();

}

// Chapter 8 - Sarah Intro Run
function C008_DramaClass_SarahIntro_Run() {
	BuildInteraction(C008_DramaClass_SarahIntro_CurrentStage);
}

// Chapter 8 - Sarah Intro Click
function C008_DramaClass_SarahIntro_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_SarahIntro_CurrentStage);
	var ClickInv = GetClickedInventory();

}