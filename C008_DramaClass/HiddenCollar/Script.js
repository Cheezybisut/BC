var C008_DramaClass_HiddenCollar_CurrentStage = 0;

// Chapter 8 - Hidden Collar - Load
function C008_DramaClass_HiddenCollar_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "DressingRoom";
	LoadInteractions();
}

// Chapter 8 - Hidden Collar - Run
function C008_DramaClass_HiddenCollar_Run() {
	BuildInteraction(C008_DramaClass_HiddenCollar_CurrentStage);
}

// Chapter 8 - Hidden Collar - Click
function C008_DramaClass_HiddenCollar_Click() {
	ClickInteraction(C008_DramaClass_HiddenCollar_CurrentStage);
}

// Chapter 8 - Hidden Collar - Take Collar
function C008_DramaClass_HiddenCollar_TakeCollar() {
	PlayerAddInventory("Collar", 1);
}