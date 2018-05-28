var C012_AfterClass_Wardrobe_CurrentStage = 0;

// Chapter 12 After Class - Wardrobe Load
function C012_AfterClass_Wardrobe_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "Dorm";
	LoadInteractions();
}

// Chapter 12 After Class - Wardrobe Run
function C012_AfterClass_Wardrobe_Run() {
	BuildInteraction(C012_AfterClass_Wardrobe_CurrentStage);
}

// Chapter 12 After Class - Wardrobe Click
function C012_AfterClass_Wardrobe_Click() {	

	// Regular interactions
	ClickInteraction(C012_AfterClass_Wardrobe_CurrentStage);

}

// Chapter 12 After Class - When the player changes clothes (cannot be done if restrained)
function C012_AfterClass_Wardrobe_Change(NewCloth) {
	if (!Common_PlayerRestrained) {
		PlayerClothes(NewCloth);
		SetScene(CurrentChapter, "Dorm");
		CurrentTime = CurrentTime + 50000;
	} else OverridenIntroText = GetText("CannotChange");	
}