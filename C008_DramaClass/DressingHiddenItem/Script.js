var C008_DramaClass_DressingHiddenItem_CurrentStage = 0;

// Chapter 8 - Hidden Item - Load
function C008_DramaClass_DressingHiddenItem_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "DressingRoom";
	LoadInteractions();
}

// Chapter 8 - Hidden Item - Run
function C008_DramaClass_DressingHiddenItem_Run() {
	BuildInteraction(C008_DramaClass_DressingHiddenItem_CurrentStage);
}

// Chapter 8 - Hidden Item - Click
function C008_DramaClass_DressingHiddenItem_Click() {
	ClickInteraction(C008_DramaClass_DressingHiddenItem_CurrentStage);
}

// Chapter 8 - Hidden Item - Take Item - Add 2 random items to the player inventory
function C008_DramaClass_DressingHiddenItem_TakeItem() {
	PlayerAddRandomItem();
}